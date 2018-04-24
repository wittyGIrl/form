import config from '../../../../config';

const data =  {
  isComputed: false,
  name: 'input_'+Math.floor(Math.random()*100),
  type: '',
  length:'50',
  defaultValue: {value: '', binding: ''},
  defaultText: {value: '', binding: ''},
  expression: '',
  hidden: '',
};

const dataOptions = {
  _options: {
    isComputed: {
      editor: {type: 'checkbox'},
    },
    // name: {
    //   hidden: {
    //     targetName: 'computed',
    //     targetValues: false,
    //   }
    // },
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
    defaultText: Object.assign({
        hidden: {
          targetName: 'computed',
          targetValues: false,
        }
      }, config.get('options.bindingValue')
    ),
    defaultValue: Object.assign({
        // hidden: {
        //   targetName: 'computed',
        //   targetValues: false,
        // }
      }, config.get('options.bindingValue')
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
