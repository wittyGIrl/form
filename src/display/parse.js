/*
* 解析页面上的组件
*
*/
import {$, isNil} from '../utils'
// import {getComponent} from '../components/form/display';

import {createComponent} from './components';
import Store from './store';

function parseOptions(item){
  var options = $(item).attr('x-options');
  if(isNil(options)){
    return null;
  }
  if (options[0] !== '{') {
      options = '{' + options + '}';
  }
  return (new Function("return " + options))();
}

function parse(context){
  var components = $('[x-component]', context);
  var componentName, opts;
  var data = Store.getData(), com;
  components.each(function(i, item){
    componentName = $(item).attr('x-component');
    opts = parseOptions(item);
    if(!opts) return;
    if(window.__mode){
      opts.mode = window.__mode;
    }
    com = createComponent(componentName, item, opts);
//    if(com && com.props.title && com.props.datasource && com.props.datasource.modelformat && com.props.datasource.modeltype){
    if(com && com.props.datasource && com.props.datasource.modelformat && com.props.datasource.modeltype){
        data['modelformat']=com.props.datasource.modelformat;
        data['modeltype']=com.props.datasource.modeltype;
    }
   if(com && com.props.name && !data[com.props.name] && com.props.dataOptions && !com.props.dataOptions.isComputed){
      data[com.props.name] = '';
    }
  });
}
/*流程级别使用脚本*/
function useScript(context){
  // var components = $('[x-component]', context);
  // var componentName, opts;
  // var data = Store.getData(), com;
  var script = document.createElement("script");
  script.src = 'http://localhost:8000/a.js';
  document.head.appendChild(script);
}
function parseDataOptions(context){
  var components = $('[x-component]', context);
  var componentName, opts;
  var data = new Object() , com;
  components.each(function(i, item){
    componentName = $(item).attr('x-component');
    if(componentName.toLowerCase() !="form" && componentName.toLowerCase() !="block" && componentName.toLowerCase() !="table" &&
        componentName.toLowerCase() !="row" && componentName.toLowerCase() !="col" && componentName.toLowerCase() !="language")
    {
      var addId=(new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);
      opts = parseOptions(item);
      if(!opts) return;
      if(window.__mode){
        opts.mode = window.__mode;
      }
      com = createComponent(componentName, item, opts);
      var inputName="input_"+addId;
      if(com && com.props.dataOptions){
          var setDataOption=new Object();
          setDataOption=com.props.dataOptions
          for(var p in setDataOption)
              if(p=="hidden")
                delete setDataOption[p];
              else if(p=="id")
                delete setDataOption[p];
              else if(p.indexOf("default")!=-1){
                var tempValue=setDataOption[p].value;
                setDataOption[p]=tempValue;
              }
          data[inputName] = setDataOption;
        }
      }
    });
    var datas = [];
	  for (var p in data) {
	    if (p && p.indexOf("input") == -1) delete data[p];else datas.push(data[p]);
	  }
    var setResult=JSON.stringify(datas);
	  return setResult;
}

export default parse;
export {parseOptions,parseDataOptions,useScript};
