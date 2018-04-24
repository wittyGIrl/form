import {isNil} from '../../utils';

import Col from './common/col';
import Row from './common/row';
import Datagrid from './common/datagrid';
import Form from './form';
import LabeledTextbox from './labeledTextbox';
import LabeledRadio from './labeledRadio';
import LabeledCheckbox from './labeledCheckbox';
import LabeledCombobox from './labeledCombobox';
import LabeledDatebox from './labeledDatebox';
import LabeledDateboxRange from './labeledDateboxRange';

import DragDrop from '../draggable/dragDrop';
import Editor from './editor';

import Alert from '../common/alert';

var form = {
  Form,
  Col,
  Row,

  Datagrid,

  LabeledTextbox,
  LabeledRadio,
  LabeledCheckbox,
  LabeledCombobox,
  LabeledDatebox,
  LabeledDateboxRange,

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
//  return form[name];
}
