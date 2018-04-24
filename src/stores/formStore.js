import ajax from '../ajax';
import {isNil, isString, isArray, uniquePush} from '../utils';

import Store from './index';
import Constants from '../constants';

import FormElement, {componentType} from '../core/formElement';
import mappingManager from '../core/gridMapping';

import getOptions from '../components/form/options';

var _form = FormElement.getRoot();

var _drag;
var _selected = [];

/*
* extend FormElement
*/
FormElement.prototype.isSelected = function() {
  return ~_selected.indexOf(this);
};

function getTarget(target, name){
  if(target.name === name){
    return target;
  }
  var result;
  switch (name) {
    case componentType.Row:
      switch (target.name) {
        case componentType.Col:
          result = new FormElement('Row', getOptions('row'));
          result.addChild(target);
          break;
        default:
          result = new FormElement('Col', getOptions('col'));
          result.addChild(target);
          target = result;
          result = new FormElement('Row', getOptions('row'));
          result.addChild(target);
          break;
      }
      break;
    case componentType.Col:
      switch (target.name) {
        case componentType.Row:
          result = target.getChildren();
          break;
        default:
          result = new FormElement('Col', getOptions('col'));
          result.addChild(target);
          break;
      }
      break;
  }
  return result;
}

var formStore = {
  getData() {
    return _form;
  },

  fromJson(data) {
    _form.fromJson(data);
    //mappingManager.init(_form);
  },

  createControl(type, data, parent) {
    return new FormElement(type, data, parent);
  },

  startDrag(data) {
    _drag = data;
  },

  /*
  * @return indicate whether form changed.
  */
  endDrag(target) {
    if(!_drag) return false;

    //remove
    if(isNil(target)){
      _drag.remove();
      _selected.length = 0;
      this.refreshTable();
      return true;
    }

    //拖拽到它自己上，或者将其拖拽到自己的子节点上，直接返回
    if(target === _drag || target.parent === _drag) return false;

    var dragTarget;
    if(typeof _drag === 'string'){
      if(_drag === componentType.Text){
        dragTarget = FormElement.getTextElement();
      } else {
        var opts = getOptions(_drag);
        dragTarget = new FormElement(opts.name, opts);
      }
    } else {
      dragTarget = _drag;
    }

    dragTarget.remove();


    if(target.name === 'Col'){
      target.parent.addChild(getTarget(dragTarget, 'Col'), target.getIndex());
    } else if(target.name === 'Row'){
      target.addChild(getTarget(dragTarget, 'Col'));
    } else {
      target.addChild(getTarget(dragTarget, 'Row'));
    }
    this.refreshTable();
    return true;
  },

  refreshTable(){
    FormElement.getRoot().getChildren().forEach((block) => mappingManager.count(block.getChildren()[0]));
  },

  /*
  * target {Col}
  */
  add(data, target){
    var {type, options} = data;
    var root = FormElement.getRoot();
    root.addChild(FormElement.getDefaultBlock(), data.options);
    // var root = FormElement.getBlock();
    // if(type === 'row'){
    //   var row = FormElement.getDefaultRow(mappingManager, target);
    //   _form.addChild(row, target.parent.getIndex());
    // } else {
    //   var colIndex = target.x;
    //   var current;
    //   root.getChildren().forEach(function(row, rowIndex){
    //     current = mappingManager.get(colIndex, rowIndex);
    //     if(current.x < colIndex){
    //       current.setSpan({colSpan: current.getSpan().colSpan + 1});
    //     } else {
    //       row.addChild(FormElement.getDefaultCol(), colIndex);
    //     }
    //   });
    // }
    // mappingManager.init(root);
  },

  remove(formElements){
    if(!formElements){
      formElements = _selected.splice(0, _selected.length);
    }
    var changed = false;
    if(isArray(formElements)){
      if(formElements.length > 0){
        formElements.forEach(element => element.remove());
        changed = true;
      }
    } else {
      formElements.remove();
      changed = true;
    }
    if(changed){
      var root = FormElement.getRoot();
      var blocks = root.getChildren();
      if(blocks.length === 0){
        root.addChild(FormElement.getDefaultBlock());
      }
      this.refreshTable();
      return formElements;
    }
  },

  merge(){
    var elements = _selected;
    if(!elements || elements.length === 0) return;
    var removed = [];
    var start = elements[0];
    var oldY = start.y;
    var left = find(start, 'getLeft');
    var right = find(start, 'getRight');
    var leftPos = left ? left.x : start.x;
    var rightPos = getPos(right, 'x');
    var top = find(start, 'getTop', true);
    var bottom = find(start, 'getBottom', true);

    if(removed.length){
      if(top !== start){
        start.remove();
        top.parent.addChild(start, top.getIndex());
      }
      start.setSpan({
        colSpan: rightPos - left.x,
        rowSpan: getPos(bottom, 'y') - top.y,
      });
      removed.forEach((item) => item.remove());
      _selected.length = 0;
      _selected.push(start);
      mappingManager.init(FormElement.getRoot());
    }

    function find(current, type, checkRight){
      var next = mappingManager[type](current);
      var right;
      outer:
      while(next && ~elements.indexOf(next)){
        if(checkRight){
          right = mappingManager.getRight(next);
          while(right){
            if(~elements.indexOf(right) && getPos(right, 'x') <= rightPos){
              uniquePush(removed, right);
              right = mappingManager.getRight(right);
            } else {
              if(getPos(next, 'x') === rightPos){
                uniquePush(removed, next);
                current = next;
              }
              break outer;
            }
          }
        }
        uniquePush(removed, next);
        current = next;
        next = mappingManager[type](current);
      }
      return current;
    }
    function getPos(target, type){
      return target[type] + target.getSpan()[type === 'x' ? 'colSpan' : 'rowSpan'];
    }
  },

  separate(){
    var elements = _selected;
    elements.forEach(function(elem){

    });
    if(happened){
      mappingManager.init(root);
    }
  },

  select(formElement, singleSelect){
    if(singleSelect === true){
      _selected.length = 0;
    }
    _selected.push(formElement);
  },

  getSelected(){
    return _selected;
  },
};
//
// formStore.fromJson({
//   name:'Form',
//   attributes: {title: ""},
//   // children:[{
//   //     name: 'Row',
//   //     children: [{
//   //       name: 'Col',
//   //       children: [{
//   //         name: componentType.Text,
//   //         type: componentType.Text,
//   //         attributes: {value: 'tete'},
//   //       }]
//   //     }, {
//   //       name: 'Col',
//   //       children: [{
//   //         name: componentType.Text,
//   //         type: componentType.Text,
//   //         attributes: {value: 'tete'},
//   //       }]
//   //     }]
//   //   }
//   // ]
// });

export default formStore;
