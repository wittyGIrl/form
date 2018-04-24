/*
* 拓展 json editor
* 提供编辑框测试逻辑
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
import FormElement from '../../../core/formElement';

import Alert from '../../common/alert';

import Editor from 'editors';

import {register} from 'json-editor/lib/common/editor';

import {getLang} from '../../mixinUtils';
import options from '../options/labeledTextbox';
import {setOptions} from '../options/index';
import FormEditor from '../editor';
import {getCol,getLabel,getTextBox} from './transData';



export default class BindingFunc extends Component{
  static defaultProps = {
    value:{},
  }
  state = {
    tables:['choose to edit'],
  }
  constructor(props, context){
    super(props, context);
  }
	render(){
	  const { value, onClick, onChange, ...props} = this.props;
    return (
      <span>
        <select ref="tablesName"  onChange={this.selChange} className="x-editor" style={{width:150+'px',height:27+'px',lineHeight:27+'px',borderTopLeftRadius:'0',borderBottomLeftRadius:'0'}}>
          setTimeout(()=>{
            this.state.tables.map(function(table,i){
              return <option key={i} value={table}>{table}</option>
          })},500)
        </select>
        <input defaultValue={value.modeltype} onChange={this._handleChange} className="x-textbox x-editor" style={{width:130+'px',marginLeft:-150+'px',marginTop:-5+'px',borderRight: 'white',height:27+'px',borderTopRightRadius:'0',borderBottomRightRadius:'0'}} ref="inputType" />
        <select className="x-editor" defaultValue={value.modelformat} ref="saveType"  onChange={this.changeSelect} style={{marginLeft:30+'px',marginTop:5+'px'}}>
          <option value="modeltablename">{property.modeltablename}</option>
          <option value="modeltype">{property.modeltype}</option>
        </select>
        <button onClick={this.handleClick} className="link-button">{configText.detection}</button>
      </span>
    );
	}
  componentDidMount =(e) =>{
    var userTables;
    var href = (window.location.href).match(/(\S*)(?=formDesigner)/);
    var url;
    var that=this;
    if(href && href[0])
     url=href[0]+"formdesigner/form/gettablenamesAvailable";
    $.ajax({
      url: url,
      type: 'get',
      success: function(data){
        data.splice(0,0,'choose to edit');
        that.setState({
          tables:data
        })
      }
    })
  }
  selChange = (e) =>{
    var values=this.refs.tablesName.value;
    if(values !='choose to edit'){
      this.refs.inputType.focus();
      this.refs.inputType.value=values;
      this.props.value.modeltype=values;
      var href = (window.location.href).match(/(\S*)(?=formDesigner)/);
      var that=this;
      // $.ajax({
      //   url:href[0]+"formdesigner/form/getfieldsAvailable?tablename="+values,
      //   type: 'get',
      //   success: function(data){
      //     Actions.remove(FormElement.getRoot().children);
      //     data.map(function(column,i){
      //      //FormElement.getRoot().children[0].children[0].addChild(table[i]);
      //      var newRow=new FormElement('Row',null,FormElement.getRoot().children[0].children[0]);
      //      var newCol1=new FormElement('Col',getCol(),newRow);
      //      var newLabel=new FormElement('Text',getLabel(column),newCol1);
      //      var newCol2=new FormElement('Col',getCol(),newRow);
      //      var element=new FormElement('LabeledTextbox',getTextBox(column),newCol2);
      //    })
      //   }
      // });
    }
  }
  changeSelect = (e) =>{
    var {onChange} = this.props;
		this.props.value.modelformat = e.target.value;
  }
	_handleChange = (e) => {
		var {onChange} = this.props;
		this.props.value.modeltype = e.target.value;
    this.props.value.modelformat = this.refs.saveType.value;
  }
  handleClick = (e) => {
    if((this.refs.saveType.value).toLowerCase()=="modeltablename"){
      var checkValues=(this.refs.inputType.value).trim();
      var reg=/^[a-zA-Z_][a-zA-Z0-9_]{0,31}$/g;
      if(!reg.test(checkValues))
          $.messager.alert(message.checkResult,message.falseVariable,'error');
      else{
        var href = (window.location.href).match(/(\S*)(?=formDesigner)/);
          var url = href[0] + "formDesigner/form/checktablenameavailable?tablename=" +this.refs.inputType.value;
          $.ajax({
            type: "get",
            url: url,
            success: function (data) {
               if(data)
                {
                  $.messager.alert(message.checkResult,message.successCheck,'info');
               }
               else {
                 $.messager.alert(message.checkResult,message.failCheck,'error');
              }
           },
           error:function(data){
             $.messager.alert(message.checkResult,message.failCheck,'error');
           }
         });
       }
    }
    else if((this.refs.saveType.value).toLowerCase()=="modeltype"){
    var href = (window.location.href).match(/(\S*)(?=formDesigner)/);
      var url = href[0] + "formDesigner/form/getformmodeltype?modeltypename=" +this.refs.inputType.value;
      $.ajax({
        type: "get",
        url: url,
        success: function (data) {
          if(data){
            $.messager.alert(message.checkResult,data,'info');
          }
          else
            $.messager.alert(message.checkResult,"未发现表名",'error');
       },
       error:function(){
            $.messager.alert(message.checkResult,"地址错误",'error');
       }
     });
    }
    else{
      $.messager.alert(message.checkResult,'unforeseen error','error');
    }
  }
}
register('bindingFunc', BindingFunc);
