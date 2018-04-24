/*
* 表单显示
*
*/
import '../polyfill';
import {$} from '../utils';

import Store from './store';

import parse,{parseDataOptions,useScript} from './parse';

require("../../less/display.less");

export default Store;
export {parse,parseDataOptions,useScript};

// extend easyui
if ($.fn.form){
  var validate = $.fn.form.methods['validate'];

  $.fn.form.methods['validate'] = function(jq){
    var valid = validate(jq);
    if(valid === true){
      var invalidbox = jq.find('.witui-invalid');
      invalidbox.filter(':not(:disabled):first').focus();
      valid = invalidbox.length == 0;
    }
    return valid;
  }
}
