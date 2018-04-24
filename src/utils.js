//import {time} from './lang';
var time=formLang.time;
import {isString, isArray, isObject, isNil} from 'datagrid/lib/utils';

import {extend} from 'datagrid/lib/utils';

export * from 'datagrid/lib/utils';

// export function debounce(fn, opts) {
// 	if (typeof opts==='function') { let p = fn; fn = opts; opts = p; }
// 	let delay = opts && opts.delay || opts || 0,
// 		args, context, timer;
// 	return function(...a) {
// 		args = a;
// 		context = this;
// 		if (!timer) timer = setTimeout( () => {
// 			fn.apply(context, args);
// 			args = context = timer = null;
// 		}, delay);
// 	};
// }
export function timeToFriendlyText(t) {
  var ms = Math.abs(new Date(t) - new Date()),
    s = Math.round(ms / 1000),
    m = Math.round(s / 60),
    h = Math.round(m / 60),
    d = Math.round(h / 24);
  if (s < 60) return time.justnow;
  if (m < 60) return time.minutesago(m || 0);
  if (h < 24) return time.hoursago(h || 0);
  if (d < 2) return time.yesterday;
  if (d <= 30) return time.daysago(d || 0);

  return time.longago;
}

/*
* 浅拷贝，并且不复制以 _options 属性
*/
export function cloneWithoutOptions(obj){
  if(isNil(obj)) return null;
  var cloned = {};
  for(var p in obj){
    if(obj.hasOwnProperty(p) && p !== '_options' && p !== 'key'){
      var source = obj[p];
      if(isArray(source)){
        var res = [];
        for(var i = 0, l = source.length; i<l; i++){
          if(isObject(source[i])){
            res.push(cloneWithoutOptions(source[i]));
          } else {
            res.push(source[i]);
          }
        }
        cloned[p] = res;
      } else if(isObject(source)){
        if(p === 'editor'){
          cloned[p] = cloneEditor(source);
        } else {
          cloned[p] = cloneWithoutOptions(source);
        }
      } else if(!isNil(source)){
        cloned[p] = obj[p];
      }
    }
  }
  return cloned;
}

function cloneEditor(editor){
  if(!editor)return;
  var type = editor.type;
  return {
    type,
    options: cloneWithoutOptions(editor[`${type}Options`]),
  };
}

/*
* 浅拷贝 _options 属性
*/
export function extendWithOptions(obj, options){
  if(isNil(obj)) return null;
  if(isNil(options)) return obj;

  for(var p in options){
    if(options.hasOwnProperty(p)){
      if(p === '_options'){
        obj[p] = options[p];
      } else {
        var source = obj[p];
        if(isArray(source)){
          for(var i = 0, l = source.length; i<l; i++){
            extendWithOptions(source[i], options[p]);
          }
        } else if(isObject(source)){
          extendWithOptions(source, options[p]);
        }
      }
    }
  }

  return obj;
}

export function extendWithOptionsPrefixEditor(obj, options){
  if(isNil(obj)) return null;
  if(isNil(options)) return obj;

  for(var p in options){
    if(options.hasOwnProperty(p)){
      if(p === '_options'){
        obj[p] = options[p];
      } else {
        var source = obj[p];
        if(isArray(source)){
          if(isArray(options[p])){
            if(options[p].length > 0){
              for(var i = 0, l = source.length; i<l; i++){
                extendWithOptionsPrefixEditor(source[i], options[p][0]);
              }
            }
          } else {
            for(var i = 0, l = source.length; i<l; i++){
              extendWithOptionsPrefixEditor(source[i], options[p]);
            }
          }
        } else if(isObject(source)){
          if(p === 'editor'){
            extendEdtior(source, options[p]);
          } else {
            extendWithOptionsPrefixEditor(source, options[p]);
          }
        } else if(isNil(source)){
          obj[p] = options[p];
        }
      }
    }
  }
  return obj;
}

function extendEdtior(editor, options){
  if(!editor)return;
  var type = editor.type;
  var opts = editor.options;
  delete editor.options;
  extendWithOptions(editor, options);
  if(options && options._options){
    extend(true, editor, options._options.options);
    editor.type = type;
  }
  if(opts){
    editor[`${type}Options`] = opts;
  }
}

export function pick(obj, attrs){
  if(isNil(obj)) return null;
  if(!isArray(attrs) || attrs.length === 0) return {};
  var result = {};
  attrs.forEach(function(attr){
    if(isNil(attr)) return;
    result[attr] = obj[attr];
  });
  return result;
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 */
export function get(obj, path, defaultValue){
  if(isNil(obj)) return defaultValue;
  if(isNil(path)) return obj;
  var arr = path.split('.');
  var result = obj;
  for(var i = 0, l = arr.length; i < l; i++){
    if(isNil(result)) return defaultValue;
    result = result[arr[i]];
  }
  return result;
}

// array
export function uniquePush(arr, item){
  if(!~arr.indexOf(item)) arr.push(item);
}

// trim
const reTrimStart = /^\s+/;
const reTrimEnd = /\s+$/;
const reTrim = /^\s+|\s+$/g;

export function trimStart(str){
  if (isString(str)) {
    return str.replace(reTrimStart, '');
  }
  return str;
}

export function trimEnd(str){
  if (isString(str)) {
    return str.replace(reTrimEnd, '');
  }
  return str;
}

export function trim(str){
  if (isString(str)) {
    return str.replace(reTrim, '');
  }
  return str;
}

export function isNilOrEmpty(str){
  return isNil(str) || str === '';
}
