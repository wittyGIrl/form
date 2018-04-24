import {EventEmitter} from 'events';
import {isNil, isArray, debounce, extend, cloneWithoutOptions} from '../utils';

import Constants, {Mode as ConstantsMode} from '../constants';
import Dispatcher from '../dispatcher';

import ajax from '../ajax';
//import lang, {message} from '../lang';
var lang=formDefaults;
var message=formLang.message;
import config from '../config';

import Mode from '../core/mode';

import menuStore from './menuStore';
import formStore from './formStore';
import parseOption from '../display/parse';

const CHANGE_EVENT = 'change';

let languagePropsOptions = {
  _options: {
    langs: {
      editor: {type: 'languageBox'},
      isValue: true,
    },
  },
};
let languageOptions = {
  langs: {},
};

let _config = {
  preview: '/preview',
  recent: '',
  history: '',
};

let _data = {
  property: null,
  loading: false,
  mode: new Mode(ConstantsMode.NORMAL),
  bottomMessage: null,
  error: null,
  menu: menuStore.getData(),
  rightMenu: {
    anchor: null,
    owner: null,
    disabled: {},
  },
  title: lang.defaultName,
  state: 'ready',
  form: formStore.getData(),
  language: Object.assign({}, languageOptions, languagePropsOptions),
};

let _drag = {};

function getData(){
  var form = formStore.getData().toJson();
  var language = {name: 'Language', attributes: cloneWithoutOptions(_data.language)};
  return [form, language];
}

function preview(callback){
  if(_config.preview){
    callback = callback || _callback;
    ajax.post(
      _config.preview, {
        data: {
          json: JSON.stringify(getData()),
          id: _config.id
        },
        success(data) {
          if(isNil(data)) return;
          window.open(_config.preview + '/' + data);
        },
        error(data) {
          callback.error(data);
        },
      }
    );
  }
}

function save(isDeploy, isNewVersion, callback){
  // if(getData()[0] && getData()[0].children[0] && getData()[0].children[0].children[0])
  // {
  //   var formDatas=getData()[0].children[0].children[0];//获取表格的行
  // }
  if(_config.save){
    callback = callback || _callback;
    ajax.post(
      _config.save, {
        data: {
          json: JSON.stringify(getData()),
          isDeploy,
          isNewVersion,
          id: _config.id
        },
        success(data) {
          callback.success(data);
        },
        error(data) {
          callback.error(data);
        },
      }
    );
  }
}

function autosave(callback){
  if(_config.draft){
    callback = callback || _callback;
    _data.state = 'saving';
    ajax.post(
      _config.draft, {
        data: {
          json: JSON.stringify(getData()),
          id: _config.id
        },
        success(data) {
          _data.state = 'saved';
          menuStore.reset(_data.mode.equalTo(ConstantsMode.MENU), 'history', callback);
          callback.success(message.successAutosave);
        },
        error(data) {
          callback.error(data);
        },
      }
    );
    Store.emitChange();
  }
}

const debouncedAutosave = debounce(autosave, 60000);

function loadDraft(draftId, callback) {
  if(_config.draft){
    callback = callback || _callback;
    ajax.get(
      _config.draft, {
        data: { draftId },
        success(data) {
          if(!data) return;
          Store.fromJson(JSON.parse(data));
          callback.success(message.successOperate);
        },
        error(data) {
          callback.error(data);
        },
      }
    );
  }
}

function clearAllDrafts(callback) {
  if(_config.clearAllDrafts){
    callback = callback || _callback;
    ajax.post(
      _config.clearAllDrafts, {
        data: { id: _config.id },
        success(data) {
          menuStore.reset(_data.mode.equalTo(ConstantsMode.MENU), 'history', callback);
          callback.success(message.successOperate);
        },
        error(data) {
          callback.error(data);
        },
      }
    );
  }
}

function setMode(mode){
  mode = mode || ConstantsMode.NORMAL;
  if(typeof mode === 'string'){
    _data.mode = new Mode(mode);
  } else {
    _data.mode = mode;
  }
}

function setMessage(message){
  _data.bottomMessage = message;
}

function clearMessage(){
  _data.bottomMessage = null;
}

function setError(error){
  _data.error = error;
}

function clearError(){
  _data.error = null;
}

const Store = Object.assign({}, EventEmitter.prototype, {
  setConfig(config) {
    if(config){
      _config = config;
      // init other store
    }
  },

  getConfig(config) {
    return _config;
  },

  setData(data) {
    _data = data;
    this.emitChange();
  },

  getData(fileId) {
    return _data;
  },

  fromJson(form) {
    if(form){
      formStore.fromJson(form);
      this.emitChange();
    }
  },

  setMode: setMode,

  setMessage: setMessage,

  setError: setError,

  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
});


// Register callback to handle all updates
Dispatcher.register((action) => {
  switch (action.actionType) {
    //---------------drag------------------
    case Constants.START_DRAG:
      formStore.startDrag(action.data.target);
      if(action.data.source){
        setMode(ConstantsMode.DRAG + '.' + action.data.source);
      } else {
        setMode(ConstantsMode.DRAG);
      }
      Store.emitChange();
      break;

    case Constants.END_DRAG:
      if(action.data !== false){
        if(formStore.endDrag(action.data)){
          debouncedAutosave();
        }
      }

      setMode();

      Store.emitChange();
      break;

    case Constants.ADD:
      formStore.add(action.data, _data.rightMenu.owner);
      _data.rightMenu.anchor = null;
      debouncedAutosave();
      Store.emitChange();
      break;

    case Constants.REMOVE:
      if(formStore.remove(action.data, _data.rightMenu.owner)){
        _data.rightMenu.anchor = null;
        debouncedAutosave();
        Store.emitChange();
      }
      break;

    case Constants.MERGE:
      formStore.merge();
      _data.rightMenu.anchor = null;
      debouncedAutosave();
      Store.emitChange();
      break;

    case Constants.SEPARATE:
      formStore.separate();
      _data.rightMenu.anchor = null;
      debouncedAutosave();
      Store.emitChange();
      break;

    case Constants.SELECT:
      var target = action.data.data;
      if(target.name === 'Row' || target.name === 'Col' || target.name === 'Block'){
        if(_data.mode.equalTo(ConstantsMode.PROPERTY)){
          _data.property = target.getProperty();
        }
      }

      formStore.select(target, action.data.singleSelect);
      Store.emitChange();
      break;

    //----------property------------
    case Constants.ADD_CHILD:
      var target1 = action.data.parent;
      var child = extend(true, {}, action.data.child);
      if(isArray(target1)){
        target1.push(child);
      } else {
        Object.assign(target1, child);
      }

      Store.emitChange();
      break;

    case Constants.REMOVE_CHILD:
      var {parent, index} = action.data;
      if(isArray(parent)){
        parent.splice(index, 1);
      } else {
        delete parent[index];
      }

      debouncedAutosave();

      Store.emitChange();
      break;

    case Constants.SAVE:
      var {isDeploy, isNewVersion} = action.data;
      save(isDeploy, isNewVersion);
      break;

    case Constants.PREVIEW:
      preview();
      break;

    // case Constants.CONTENT_CHANGE:
    //   presentationStore.contentChange(action.data, _callback);
    //   break;
    //
    // case Constants.TITLE_CHANGE:
    //   presentationStore.titleChange(action.data, _callback);
    //   break;
    //

    case Constants.CHANGE_MODE:
      setMode(action.data.mode);
      Store.emitChange();
      break;

    case Constants.VALUE_CHANGE:
      debouncedAutosave();
      Store.emitChange();
      break;

    case Constants.TOGGLE_LEFT:
      if(_data.mode.equalTo(ConstantsMode.NORMAL)){
        setMode(ConstantsMode.MENU);
      } else {
        setMode(ConstantsMode.NORMAL);
      }
      menuStore.select(null, _callback, true);
      Store.emitChange();
      break;

    case Constants.TOGGLE_RIGHT:
      let flag = isNil(action.data.open) ? _data.mode.equalTo(ConstantsMode.NORMAL) : action.data.open;
      if(flag){
        setMode(ConstantsMode.PROPERTY);
      } else {
        setMode(ConstantsMode.NORMAL);
      }
      _data.property = action.data.data;
      Store.emitChange();
      break;

    //---------------draft------------------
    case Constants.AUTO_SAVE:
      autosave();
      break;
    case Constants.LOAD_DRAFT:
      loadDraft(action.data);
      break;
    case Constants.CLEAR_ALL_DRAFTS:
      clearAllDrafts();
      break;

    //---------------menu------------------
    case Constants.MENU_SELECT:
      menuStore.select(action.data, _callback);
      Store.emitChange();
      break;

    case Constants.TOGGLE_RIGHT_MENU:
      Object.assign(_data.rightMenu, action.data);
      Store.emitChange();
      break;


    //---------------message------------------
    case Constants.SET_MESSAGE:
      setMessage(action.data);
      Store.emitChange();
      break;
    case Constants.CLEAR_MESSAGE:
      clearMessage();
      Store.emitChange();
      break;

    case Constants.SET_ERROR:
      setError(action.data);
      Store.emitChange();
      break;
    case Constants.CLEAR_ERROR:
      clearError();
      Store.emitChange();
      break;

    default:
      break;
  }
});


var _callback = {
  /*
  * 成功消息和错误处理的回调函数
  *
  * @param msg
  */
  success(msg) {
    _data.bottomMessage = msg || message.successSave;
    Store.emitChange();
  },

  error(msg) {
    if(msg){
      _data.error = msg;
      Store.emitChange();
    }
  },
};


export default Store;
