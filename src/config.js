/*
* default config
*/
import {get} from './utils';
//import {configText} from './lang';
var configText=formLang.configText;
const _config = {
  lang: 'zh-CN',
  editors : {
    checkbox: {editor: {type: 'checkbox'}},
    none: {
      type: 'textbox',
      desabled: 'disabled'
    },
    type: {
      type: 'combobox',
      options: [
        {text: configText.string, value: 'string'},
        {text: configText.number, value: 'int'},
        {text: configText.bool, value: 'bool'},
        {text: configText.datetime, value: 'datetime'}
      ]
    },
    textAlign: {
      type: 'combobox',
      options: [
        {text: configText.select, value: ''},
        {text: configText.center, value: 'center'},
        {text: configText.alignLeft, value: 'left'},
        {text: configText.alignRight, value: 'right'},
      ],
    },
    languageType: {
      type: 'combobox',
      options: [
        {text: configText['zh-CN'], value: 'zh-CN'},
        {text: configText.en, value: 'en'},
        {text: configText['zh-TW'], value: 'zh-TW'},
      ],
    },
    colType: {
      type: 'combobox',
      options: [
        {text: configText.select, value: ''},
        {text: configText.level1, value: 1},
        {text: configText.level2, value: 2},
        {text: configText.level3, value: 3},
        {text: configText.plainText, value: 0},
      ],
    },
    theme: {
      type: 'combobox',
      options: [
        {text: configText['default'], value: 'default'},
        {text: configText.simple, value: 'simple'},
      ],
    },
  },
  binding: {
    environment: [
      {value: '', text: configText.select},
      {value: 'employee.id', text: configText['employee.id']},
      {value: 'employee.name', text: configText['employee.name']},
      {value: 'employee.jobNo', text: configText['employee.jobNo']},
      {value: 'orgInfo.id', text: configText['orgInfo.id']},
      {value: 'orgInfo.name', text: configText['orgInfo.name']},
      {value: 'orgInfo.namePath', text: configText['orgInfo.namePath']},
      {value: 'account.id', text: configText['account.id']},
      {value: 'account.loginId', text: configText['account.loginId']},
      {value: 'acount.domainAccount', text: configText['acount.domainAccount']},
      {value: 'processInstance.pIId', text: configText['processInstance.pIId']},
      {value: 'processInstance.name', text: configText['processInstance.name']},
      {value: 'processInstance.state', text: configText['processInstance.state']},
      {value: 'workItem.id', text: configText['workItem.id']},
      {value: 'workItem.name', text: configText['workItem.name']},
      {value: 'workItem.state', text: configText['workItem.state']},
    ],
  },
  options: {
    bindingValue: {
      editor: {
        type: 'bindingValueBox',
        label: configText.binding,
      },
      isValue: true,
    },
    bindingDate: {
      editor: {
        type: 'bindingDate',
      },
      isValue: true,
    },
    bindingJsFile: {
      editor: {
        type: 'bindingJsFile',
        label: ''
      },
      isValue: true,
    },
    bindingFunc: {
      editor:{
        type:'bindingFunc',
        label:'',
      },
        isValue: true,
    },
    comboEdit:{
      editor: {
        type: 'comboEdit',
      }
    },
      isValue:true,
  }
};
var configManager = {
  get(path) {
    if(path){
      return get(_config, path);
    }
    return _config;
  },

  // set(config) {
  //   _config = config;
  // },
};

export default configManager;
