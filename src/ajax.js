import base64 from 'base64-js';
import {pick} from './utils';

const Ajax = {
  ajax(url, options) {
    if (url) {
      $.ajax(url, $.extend(options || {}, {
        success: successHanlde(options),
        error: errorHandle(options)
      }));
    } else {
      setTimeout(function () {
        if(options.success){
          options.success({});
        }
      }, 0);
    }
  },
  get(url, options) {
    Ajax.ajax(url, $.extend(options || {}, { method: 'get' }));
  },
  post(url, options) {
    Ajax.ajax(url, $.extend(options || {}, { method: 'post' }));
  },
};

function successHanlde(options){
  var callback = pick(options, ['error', 'success']);
  return function(data, textStatus){
    if(data.success === false){
      if(callback.error){
        callback.error(data);
      }
    }
    else if(callback.success){
      callback.success(data);
    }
  };
}

function errorHandle(options) {
  var {error} = options;
  return function (xhr, status, errMsg) {
    var errorHeaderVal = xhr.getResponseHeader("server-error");

    var serverError = null;

    if ($.type(errorHeaderVal) === "string") {
      try {
        serverError = JSON.parse(base64.fromByteArray(errorHeaderVal));
      } catch (e) {}
    }
    if(error){
      error(serverError);
    }
  };
}

export default Ajax;
