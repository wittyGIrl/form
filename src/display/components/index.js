import Store from '../store';
import {$, isNil} from '../../utils';

require("editors/less/index.less");

import Component from './component';
import Form from './form';
import Block from './block';
import Table from './table';
import Row from './row';
import Col from './col';
import LabeledTextbox from './labeledTextbox';
import LabeledDatebox from './labeledDatebox';
import LabeledCombobox from './labeledCombobox';
import LabeledRadio from './labeledRadio';
import LabeledCheckbox from './labeledCheckbox';
import LabeledDateboxRange from './labeledDateboxRange';
import Datagrid from './datagrid';
import Text from './text';
import PopupSelector from './popupSelector';
import EmployeeSelector from './employeeSelector';
import AccountSelector from './accountSelector';
import DepartmentSelector from './departmentSelector';
import PositionSelector from './positionSelector';
import JobTitleSelector from './jobTitleSelector';
import RoleSelector from './roleSelector';
import GroupSelector from './groupSelector';

var _registered = {
  Form,
  Block,
  Table,
  Row,
  Col,
  LabeledTextbox,
  LabeledDatebox,
  LabeledCombobox,
  LabeledRadio,
  LabeledCheckbox,
  LabeledDateboxRange,
  Datagrid,
  Text,

  PopupSelector,
  EmployeeSelector,
  AccountSelector,
  DepartmentSelector,
  PositionSelector,
  JobTitleSelector,
  RoleSelector,
  GroupSelector,
};

var _components = [];

function getComponent(name){
  return _registered[name];
}

export function createComponent(name, target, options){
  var Component = getComponent(name);
  if(!Component) return;
  var props = Object.assign($.extend(true, {}, Component.defaultProps), options);
  var com = new Component(target, props);

  _components.push(com);
  return com;
}

initState();

function initState(){
  Store.addChangeListener(render);
}

function render(){
  var data = Store.getData();
  var key;
  _components.forEach(function(com){
    key = com.props.field || com.props.name;
    var dataOptions = com.props.dataOptions;
    var value, hidden;
    if(dataOptions && dataOptions.isComputed){
      value = run(data, dataOptions.expression);
    } else {
      if(key){
        value = isNil(data[key]) ? '' : data[key];
      } else if(com.getValue){
        value = com.getValue(data);
      }
    }
    if(dataOptions && dataOptions.hidden){
      if(dataOptions.hidden === true || dataOptions.hidden === 'true'){
        hidden = true;
      } else {
        hidden = run(data, dataOptions.hidden);
      }
    }
    if(!isNil(value) || !isNil(hidden)){
      com.setProps({value, hidden});
    }
  });
}

// 解析 expression
var _funcMap = {};

function run(data, expression){
  if(!data || !expression) return;
  if(!_funcMap[expression]){
    try{
      _funcMap[expression] = createFunc(data, expression);
    } catch(e){
      _funcMap[expression] = null;
      return;
    }
  }
  return _funcMap[expression](data);
}

function createFunc(data, expression){
  var arr = [];
  for(var key in data){
    if(!data.hasOwnProperty(key))continue;
    arr.push('var ');
    arr.push(key);
    arr.push(' = ');
    arr.push('data.');
    arr.push(key);
    arr.push(';');
  }
  arr.push('return ');
  arr.push(expression);
  return new Function('data', arr.join(''));
}
