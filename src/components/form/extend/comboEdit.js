/*
* 拓展 json editor
* 提供可选可填的编辑控件
*/
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
//import {button, tabs, configText, property,message} from '../../../lang';
var button=formLang.button;
var tabs=formLang.tabs;
var configText=formLang.configText;
var property=formLang.property;
var message=formLang.message;
import {styles} from '../../../theme';
import config from '../../../config';
import Store from '../../../stores';
import Actions from  '../../../actions';

import Alert from '../../common/alert';

import Editor from 'editors';

import {register} from 'json-editor/lib/common/editor';

import {getLang} from '../../mixinUtils';
import {setOptions} from '../options/index';
import FormEditor from '../editor';
import Options from '../options/form';
import {converseData} from './bindingFunc';


export default class comboEdit extends Component{
  static defaultProps = {
    value:''
  }
  constructor(props, context){
    super(props, context);
    var {value}=props;
    this.state = {
      tables:['ready to select'],
      value:props.value||''
    }
  }
  componentDidMount () {
		if (this.props.autofocus && !this.props.noedit) {
			this.focus();
		}
		this._createDebouncedChange();
	}
	render(){
	  const {onClick, onChange, ...props} = this.props;
    var value=this.state.value;
    return (
      <span>
      <select ref="tablesName"  onChange={this.selChange} className="x-editor" style={{width:150+'px',height:27+'px',lineHeight:27+'px',borderTopLeftRadius:'0',borderBottomLeftRadius:'0'}}>
        setTimeout(()=>{
          this.state.tables.map(function(table,i){
            return <option key={i} value={table}>{table}</option>
        })},100)
      </select>
      <input value={value} onChange={this._handleChange} className="x-textbox x-editor" style={{width:130+'px',marginLeft:-150+'px',marginTop:-5+'px',borderRight: 'white',height:27+'px',borderTopRightRadius:'0',borderBottomRightRadius:'0'}} ref="inputType" />
      </span>
    );
	}
  componentWillMount =(e) =>{
    var that=this;
    var newTable;
    function conS(){
      if(converseData && converseData.value && converseData.value.modeltype){
        var tablename=(converseData.value.modeltype).trim();
        if(newTable!=tablename){
          var dataSet=['ready to select'];
          newTable=tablename;
          var href = (window.location.href).match(/(\S*)(?=formDesigner)/);
          $.ajax({
            url:href[0]+"formdesigner/form/getfieldsAvailable?tablename="+tablename,
            type: 'get',
            success: function(data){
              data.map(function(column,i){
                dataSet.splice(i+1,0,column.columnName);
              })
              that.setState({
                tables:dataSet
              })
            }
          });
        }
      }
    }
    setInterval(conS,500);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.value!=this.state.value)
      this.setState({
        value:nextProps.value
      })
  }
  selChange =(e) =>{
    var {onChange}=this.props;
    var values=this.refs.tablesName.value;
    if(values !='ready to select'){
      this.refs.inputType.focus();
      this.refs.inputType.value=values;
    }
  }
  _handleChange =(e) =>{
   var {onChange}=this.props;
   var oldValue = this.state.value;
   var value=e.target.value;
   this.setState({
     oldValue:value
   });
   if(this._debouncedChange){
			this._debouncedChange(value, oldValue);
		}
 }
 _createDebouncedChange(){
		var {onChange, delay} = this.props;
		this._debouncedChange = debounced(onChange, delay);
	}
}
register('comboEdit', comboEdit);
