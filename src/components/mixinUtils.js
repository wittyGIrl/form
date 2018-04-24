import {isNil} from '../utils';
//import {isNil, debounce} from '../utils';
export function debounced(func, delay) {
  if(func){
    if(delay){
      return debounce(func, delay);
    } else {
      return func;
    }
  }
  return null;
}
export function getLang(lang, key){
  if(lang && lang[key]){
    return lang[key];
  }
  return key;
}

const dataBinding = {
  compute(props, data) {
    var {dataInputs} = props;
    data = data || props.data;
    var hidden, value;
    if(data.hidden){
      try{
        var func = dataBinding.getFunction(dataInputs, data.hidden);
        hidden = func(dataInputs);
      } catch(e){
        console.error(`hidden expresssion error, please check data.hidden. ${e.message}`);
      }
    }

    if(data.isComputed){
      if(data.expression){
        try{
          var func1 = dataBinding.getFunction(dataInputs, data.expression);
          value = func1(dataInputs);
        } catch(e){
          console.error(`expresssion error, please check data.expresssion. ${e.message}`);
        }
      }
    } else if(data.name){
      var val = dataInputs[data.name];
      if(!isNil(val)){
        value = val;
      }
    }
    return {hidden, value};
  },

  getValueForType(type, value) {
    switch(type){
      case 'bool':
        if(value === 'false') return false;
        return !!value;
      case 'int':
        value = value - 0;
        return isNaN(value) ? 0 : value;
      default:
        return value;
    }
  },

  /*
  * 得到可以执行表达式的函数，带有dataInputs中的数据作为function内部的临时变量
  */
  getFunction(dataInputs, expression){
    var arr = [];
    for(var key in dataInputs){
      if(!dataInputs.hasOwnProperty(key)) continue;
      arr.push(`var ${key} = dataInputs.${key};`);
    }
    arr.push(`return ${expression};`);
    return new Function('dataInputs', arr.join(''));
  },
};

export {dataBinding};

export function createViewText(label, text, key){
  var labelElem = null;
  if(label){
    labelElem = (
      <span className="x-editor-label" key="label">{label}</span>
    );
  }
  return (
    <span key={key}>
      {labelElem}
      <span className="x-editor-label">
        {text}
      </span>
    </span>
  );
}

// 当为无单位的数字时，会在后面添加上 px 作为单位,
export function prefixUnitless(unitless){
  var num = unitless - 0;
  if(isNaN(num)){
    return unitless;
  }
  return `${unitless}px`;
}
