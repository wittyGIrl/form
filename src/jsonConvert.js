/*
* 根据 json 来生成 react component
*/
import React from 'react';

import {getComponent} from './components/form';

import {guid, isNil} from './utils';

/*
* get the form with drag and drop warpper from json.
*
* @param parent 当前data的上一级
*/
function fromJson(formElement){
  if(typeof formElement === 'string') return formElement;
  if(!formElement) return;
  if(formElement.isText()){
    if(formElement.name === 'OriginText'){
      return formElement.getData('attributes').value;
    }
    return formElement.getData('attributes').value.value;
  }
  var children = [];
  formElement.getChildren().forEach((child, index) => {
    ensureKey(child.getData());
    children.push(fromJson(child));
  });

  var attributes = Object.assign(
    {},
    formElement.getData('attributes'),
    {target: formElement}
  );
  //children.length ? children : null 对于不能有子节点的元素，react使用 children === null 来判断，否则抛出异常
  var component = getComponent(formElement.name);
  if(component){
    return React.createElement(component, attributes, children.length ? children : null);
  } else {
    return React.createElement(formElement.name, {key: attributes.key}, children.length ? children : null);
  }
}

/*
* 如果child.attributes不包含key属性，那么为她生成一个。
*/
function ensureKey(data){
  if(typeof data === 'object'){
    if(!data.attributes) {
      data.attributes = {};
    }
    if(!data.attributes.key){
      var key = guid();
      data.attributes.key = key;
    }
  }
}

export {fromJson};
