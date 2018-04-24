import {EventEmitter} from 'events';
import {isNil, isObject} from '../utils';

import FormElement from '../core/formElement.js';

const CHANGE_EVENT = 'change';

let _data = {};

const Store = Object.assign({}, EventEmitter.prototype, {
  setData(key, data) {
    if(isNil(key) || key === '') return;
    if(isObject(key)){
      Object.assign(_data, key);
    } else {
      _data[key] = data;
    }
    this.emitChange();
  },

  getData(key) {
    if(key){
      return _data[key];
    }
    return _data;
  },

  validate() {
    return true;
  },

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

export default Store;
