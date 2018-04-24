import ajax from '../ajax';
//import {message} from '../lang';
var message=formLang.message;

import Constants from '../constants';
import Store from './index';
import Actions from '../actions';

import {timeToFriendlyText} from '../utils';

let _data = {
  current: 'history',
  data: {},
  flag: {
    history: true,
  },
};

var menuStore = {
  getData(){
    return _data;
  },

  // init(config) {
  //   Object.assign(_user, _.pick(config, ['id', 'name', 'description', 'isAuthenticated']));
  // },

  select(index, callback) {
    index = index || _data.current;
    switch (index) {
      case 'history':
        if(_data.flag.history){
          history(callback);
        }
        break;
      default:
        break;
    }
    _data.current = index;
  },

  reset(open = false, index = 'history', callback){
    if(open === true && index === _data.current){
      history(callback);
    } else {
      _data.flag[index] = true;
    }
  },
};

//历史记录
function history(callback){
  var config = Store.getConfig();
  if(config){
    ajax.get(
      config.history, {
        data: { id: config.id },
        success(data) {
          if(!data) return;
          _data.data.history = formatHistory(data);
          _data.flag.history = false;

          _data.placeholder = message.nothing;

          Store.emitChange();
        },
        error(data) {
          callback.error(data);
        },
      }
    );

    _data.placeholder = message.loading;
  }
}

function formatHistory(data){
  if(!data.length) return;
  return data.map(function(item){
    return {
      id: item.id,
      text: message.create(item.createTime),
      value: `${message.update(timeToFriendlyText(item.lastUpdateTime))}, ${message.historyHint}`,
    };
  });
}

export default menuStore;
