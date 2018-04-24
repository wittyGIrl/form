/*
* component 相关的工具方法
*/
import {debounce, isString, isNil, get} from '../../utils';

export function debounced(func, delay) {
  if(func){
    if(delay){
      return debounce(func, delay);
    } else {
      return func;
    }
  }
  return null;
}

const rules = {
  //仅数字和字母
  ASCII(value) {
    var flag = !/[^a-zA-Z0-9]/.test(value);
    if(flag){
      //以数字开头
      return !/^[0-9]/.test(value);
    }
    return flag;
  },
  //仅数字
  number(value) {
    return !isNaN(value - 0);
  },
};

export function validate(rule, value) {
  if(rules[rule]){
    return rules[rule](value);
  }
  return true;
}

/*
* 快捷设置 readonly, disabled
*/
export function setAttr(jq, attr, value){
  if(value){
    jq.attr(attr, attr);
  } else {
    jq.removeAttr(attr);
  }
}

export function getEnvironment(key, defaultValue){
  var result = get(__getFormData(), key, defaultValue);
  return !isNil(result) && result !== '' ? result : defaultValue;
}
