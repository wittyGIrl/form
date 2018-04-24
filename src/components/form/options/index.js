import {extend, extendWithOptions} from '../../../utils';

import formOpts from './form';
import blockOpts from './block';
import tableOpts from './table';
import rowOpts from './row';
import colOpts from './col';
import dgOpts from './datagrid';
import tbOpts from './labeledTextbox';
import radioOpts from './labeledRadio';
import cbOpts from './labeledCheckbox';
import comboOpts from './labeledCombobox';
import dbOpts from './labeledDatebox';
import drOpts from './labeledDateboxRange';
import textOpts from './text';
import popupOpts from './popupSelector';
import employeeOpts from './employeeSelector';
import accountOpts from './accountSelector';
import departmentOpts from './departmentSelector';
import positionOpts from './positionSelector';
import jobTitleOpts from './jobTitleSelector';
import roleOpts from './roleSelector';
import groupOpts from './groupSelector';

var _options;
export default function getOptions(type){
  type = type.toLowerCase();
  if(!_options[type]) return;
  var origin = _options[type];
  var opts = extend(true, {}, origin.options);
  opts.attributes = extendWithOptions(opts.attributes, origin.propOptions);
  return opts;
}

export function setOptions(type, options){
  if(!_options)_options = {};
  _options[type] = options;
}
