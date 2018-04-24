import {isNil} from '../../utils';

import DragDrop from '../draggable/dragDrop';
import Editor from './editor';

import Col from './col';
import Row from './row';
import Form from './form';
import Block from './block';
import Table from './table';
import Datagrid from './datagrid';
import LabeledTextbox from './labeledTextbox';
import LabeledRadio from './labeledRadio';
import LabeledCheckbox from './labeledCheckbox';
import LabeledCombobox from './labeledCombobox';
import LabeledDatebox from './labeledDatebox';
import LabeledDateboxRange from './labeledDateboxRange';
import PopupSelector from './popupSelector';
import AccountSelector from './accountSelector';
import RoleSelector from './roleSelector';
import GroupSelector from './groupSelector';
import JobTitleSelector from './jobTitleSelector';
import PositionSelector from './positionSelector';
import DepartmentSelector from './departmentSelector';
import EmployeeSelector from './employeeSelector';
import text from './text';

import Alert from '../common/alert';

// extend
import BindingValueBox from './extend/bindingValueBox';
import BindingFunc from './extend/bindingFunc';
import comboEdit from './extend/comboEdit';
import bindingDate from './extend/bindingDate';
import bindingJsFile from './extend/bindingJsFile';
import Anchor from './extend/anchor';
import LanguageBox from './extend/languageBox';

var form = {
  Form,
  Block,
  Table,
  Col,
  Row,

  Datagrid,

  text,
  LabeledTextbox,
  LabeledRadio,
  LabeledCheckbox,
  LabeledCombobox,
  LabeledDatebox,
  LabeledDateboxRange,
  PopupSelector,
  EmployeeSelector,
  AccountSelector,
  DepartmentSelector,
  PositionSelector,
  JobTitleSelector,
  RoleSelector,
  GroupSelector,

  Editor,
  DragDrop,
  Alert,
};

export default form;

export function registerComponent(component){
  if(isNil(component)) return;
  Object.assign(form, component);
}

export function getComponent(name){
  if(isNil(name)) return;
  return form[name];
}
