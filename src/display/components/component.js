import {isNil, isNilOrEmpty} from '../../utils'
import {getEnvironment} from './mixinUtils';
import Store from '../store';

export default class Component {
  constructor(dom, props) {
    this.dom = $(dom);
    this.props = props;
    if(props.style){
      this.dom.css(props.style);
    }
  }

	setProps(props) {
		Object.assign(this.props, props);
    if(this.shouldRender()){
      this.render();
    }
	}

  shouldRender(){
    return true;
  }

  render(){
  }

  hide(){
    this.dom.hide();
    return this;
  }

  show(){
    this.dom.show();
    return this;
  }

  _prefixDataOptions(){
    if(this.props.dataOptions){
      if(this.props.dataOptions.name){
        this.props.name = this.props.dataOptions.name;
      }
      if(this.props.dataOptions.id){
        this.props.id = this.props.dataOptions.id;
      }
      if(this.props.dataOptions.defaultValue && isNil(this.props.value)){
        this.props.value = getEnvironment(this.props.dataOptions.defaultValue.binding, this.props.dataOptions.defaultValue.value);
        if(this.props.name){
          Store.getData()[this.props.name] = this.props.value;
        }
      }

      // 显示文字的优先级 dataOptions.text > `__text_${this.props.name}` > dataOptions.defaultText
      if(isNilOrEmpty(this.props.text)){
        if(isNilOrEmpty(this.props.dataOptions.text)){
          var text = Store.getData(`__text_${this.props.name}`);
          if(isNilOrEmpty(text)){
            if(!isNilOrEmpty(this.props.dataOptions.defaultText)){
              this.props.text = getEnvironment(this.props.dataOptions.defaultText.binding, this.props.dataOptions.defaultText.value);
            }
          } else {
            this.props.text = text;
          }
        }
        else {
          this.props.text = Store.getData(this.props.dataOptions.text);
        }
      }
    }
  }
}
