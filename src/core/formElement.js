/*
 * base class
 */
import getOptions from '../components/form/options';
import {isNil, isString, extend, cloneWithoutOptions, extendWithOptionsPrefixEditor} from '../utils';

var _root;
const _componentType = {
  FormElement: 'FormElement',
  Text: 'Text',
  Form: 'Form',
  Block: 'Block',
  Table: 'Table',
  Col: 'Col',
  Row: 'Row',
  Datagrid: 'Datagrid',
  LabeledCheckbox: 'LabeledCheckbox',
  LabeledCombobox: 'LabeledCombobox',
  LabeledTextbox: 'LabeledTextbox',
  LabeledRadio: 'LabeledRadio',
  LabeledDatebox: 'LabeledDatebox',
  LabeledDateboxRange: 'LabeledDateboxRange',
  PopupSelector: 'PopupSelector',
  EmployeeSelector: 'EmployeeSelector',
  AccountSelector: 'AccountSelector',
  RoleSelector: 'RoleSelector',
  DepartmentSelector: 'DepartmentSelector',
  PositionSelector: 'PositionSelector',
  JobTitleSelector: 'JobTitleSelector',
  GroupSelector: 'GroupSelector',
};

function isComponent(name){
  return !!_componentType[name];
}

class FormElement {
  constructor(name, data, parent) {
    this.data = data || {};
    this.name = name;
    this.parent = parent;
    if (parent) {
      parent.addChild(this);
    }
    return this;
  }
  getChildren() {
    if (this.children) {
      return this.children;
    }
    this.children = [];
    return this.children;
  }
  getRoot() {
    var root = this.parent
    while(root.parent != null){
      root = root.parent;
    }
    return root;
  }
  //在当前元素的前面插入一个元素
  before(element){
    if(!this.parent || !element) return;
    this.parent.addChild(element, this.getIndex());
  }
  //在当前元素的后面插入一个元素
  after(element){
    if(!this.parent || !element) return;
    this.parent.addChild(element, this.getIndex() + 1);
  }
  //返回当前元素的前面一个元素
  pre(){
    if(!this.parent) return;
    return this.parent.getChildren()[this.getIndex() + 1];
  }
  //返回当前元素的后面一个元素
  next(){
    if(!this.parent) return;
    return this.parent.getChildren()[this.getIndex() - 1];
  }
  /*
  * child 可以为数组也可以为单个元素
  */
  addChild(child, index) {
    if (!child) return;
    if (child.length) {
      if (typeof index === 'number') {
        var args = [index, 0];
        args = args.concat(child);
        Array.prototype.splice.apply(this.getChildren(), args);
      } else {
        this.children = this.getChildren().concat(child);
      }
      var me = this;
      child.forEach(c => c.parent = me);
    } else {
      if (typeof index === 'number') {
        this.getChildren().splice(index, 0, child);
      } else {
        this.getChildren().push(child);
      }
      child.parent = this;
    }
  }
  removeChild(child) {
    var children = this.getChildren();
    var index = children.indexOf(child);
    if (~index) {
      children.splice(index, 1);
    }
    if (children.length === 0 && this.name === _componentType.Row) {
      this.parent.removeChild(this);
    }
    child.parent = null;
  }
  remove() {
    if (!this.parent) return;
    this.parent.removeChild(this);
  }

  setData(data) {
    this.data = data;
  }
  getData(key) {
    if(isNil(key)){
      return this.data;
    }
    return this.data[key];
  }
  getIndex() {
    if (!this.parent) return;
    return this.parent.getChildren().indexOf(this);
  }
  isCertainComponent(name){
    return this.name === name;
  }
	getProperty() {
    var properties;
    if(this.name === _componentType.Block || this.name === _componentType.Row){
      var attrs = this.getData('attributes');
      properties = [{
        name: 'basic',
  			data: attrs,
      }];
      if(attrs.dataOptions){
        properties.push({
    			name: 'data',
    			data: attrs.dataOptions,
    		});
      }
    }else if(this.getChildren().length > 0){
      var data = this.children[0].getData();
      properties = [];
      if(isComponent(data.name) && data.name !== _componentType.OriginText){
        properties.push({
    			name: 'basic',
    			data: data.attributes,
    		});
      }
      if(data.name !== _componentType.Block){
        properties.push({
    			name: 'col',
    			data: this.getData('attributes'),
    		});
      }
      if(data.attributes.dataOptions){
        properties.push({
    			name: 'data',
    			data: data.attributes.dataOptions,
    		});
      }
    }
    return properties;
	}

  toJson() {
    var attributes = cloneWithoutOptions(this.data.attributes);
    if(attributes){
      if(this.name === _componentType.Col){
        Object.assign(attributes, this.getPrefixedSpan());
      }
    }
    return {
      name: this.name,
      isComponent: isComponent(this.name),
      attributes,
      children: this.getChildren().map(child => child.toJson()),
    };
  }

  fromJson(json) {
    if(json.children && json.children.length > 0){
      var parent = this;
      this.children = json.children.map(child => {
        var element = new FormElement(child.name, child, parent);
        return element.fromJson(child);
      });
    }
    var attributes = json.attributes || {};

    var opts = getOptions(json.name);
    if(opts){
      attributes = extendWithOptionsPrefixEditor(attributes, opts.attributes);
    }
    if(this.name === _componentType.Col && (!this.children || this.children.length === 0)){
      this.children = [FormElement.getTextElement()];
    }
    this.data.attributes = attributes;
    return this;
  }

  getPrefixedSpan() {
    var attrs = this.getData('attributes');
    // 特殊处理，最后一个元素，承担全部
    if(this.getIndex() === this.parent.getChildren().length - 1){
      var all = this.parent.getChildren().reduce(function(acc, child){
        return acc + (child.getData('attributes').colSpan - 0);
      }, 0);
      var table = this.getTable();
      if(table){
        var max = table.col - all;
        if(max > 0){
          return {colSpan: attrs.colSpan - 0 + max, rowSpan: attrs.rowSpan - 0};
        }
      }
    }
    return {colSpan: attrs.colSpan - 0, rowSpan: attrs.rowSpan - 0};
  }

  getSpan() {
    var attrs = this.getData('attributes');
    return {colSpan: attrs.colSpan - 0, rowSpan: attrs.rowSpan - 0};
  }

  setSpan(span) {
    var attrs = this.getData('attributes');
    Object.assign(attrs, span);
    return this;
  }

  getTable(){
    if(this.parent){
      if(this.parent.name === _componentType.Table){
        return this.parent;
      }
      return this.parent.getTable();
    }
    return null;
  }

  // without parent
  clone() {
    var cloned = new FormElement(this.name, $.extend(true, {}, this.data));
    return cloned;
  }

  isText() {
    return this.name === _componentType.Text || this.name === 'OriginText';
  }

  static getDefaultBlock() {
    var block = new FormElement(_componentType.Block, getOptions(_componentType.Block));
    block.addChild(FormElement.getDefaultTable());
    return block;
  }

  static getDefaultTable() {
    return new FormElement(_componentType.Table, getOptions(_componentType.Table));
  }

  static getDefaultRow(mappingManager, target) {
    var attributes = getOptions(_componentType.Row);
    var row = new FormElement(_componentType.Row, attributes);
    var rowIndex = target.getIndex();
    var current;
    var rowMapping = mappingManager.get(0);
    for(var i = 0, l = rowMapping.length; i < l; i++){
      current = rowMapping[i];
      if(current.y < rowIndex){
        current.setSpan({rowSpan: current.getSpan().rowSpan + 1});
      } else {
        row.addChild(FormElement.getDefaultCol());
      }
    }
    return row;
  }

  static getDefaultCol() {
    var attributes = getOptions(_componentType.Col);
    var col = new FormElement(_componentType.Col, attributes);
    col.addChild(FormElement.getTextElement());
    return col;
  }

  static getTextElement() {
    return new FormElement('Text', getOptions('text'));
  }

  static getRoot() {
    if(!_root){
      _root = new FormElement('Form', Object.assign(getOptions('form')));
      var block = new FormElement('Block', getOptions('block'));
      block.addChild(new FormElement('Table', getOptions('table')));
      _root.addChild(block);
    }
    return _root;
  }
}

export default FormElement;
export {_componentType as componentType};
