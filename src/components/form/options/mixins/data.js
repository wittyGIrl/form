import config from '../../../../config';

const data =  {
  isComputed: false,
  name: '',
  type: '',
  length:50,
  defaultValue: {value: '', binding: ''},
  expression: '',
  hidden: '',
};
const dataOptions = {
  _options: {
    isComputed: {
      editor: {type: 'checkbox'},
    },
  //  name: config.get('options.comboEdit'),
    type: {
      editor: config.get('editors.type'),
      hidden: {
        targetName: 'computed',
        targetValues: false,
      }
    },
    length:{
      hidden:{
        targetName: 'type',
        targetValues: 'string',
      }
    },
    defaultValue: Object.assign({
        hidden: {
          targetName: 'computed',
          targetValues: false,
        }
      }, config.get('options.bindingValue')
    ),
    default: Object.assign(
      config.get('options.bindingValue')
    ),
    expression: {
      hidden: {
        targetName: 'isComputed',
        targetValues: true,
      }
    },
  }
};

export {data, dataOptions};
