/*
* 日期范围控件
*/
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import moment from 'moment';
import {isString, isDate} from '../../utils'

import {Mode} from '../../constants';

import FormEditor from './editor';

import {createViewText} from '../mixinUtils';

//import {button} from '../../lang';
var button=formLang.button;
import Datebox from 'editors/lib/editor/datebox';

import {dataBinding} from '../mixinUtils'

export default class LabeledDateboxRange extends Component{
  static defaultProps = {
    name: '',
    required: false,
    requiredMessage: '该项为必填项',
    rule: '',
    invalidMessage: '请输入有效值',
    value: '',
    vertical: false,
    readOnly: false,
  }

  render() {
    let {
      label, vertical, dataInputs, start, end, data, startPlaceholder, endPlaceholder,
      requiredMessage, invalidMessage, style, labelStyle, containerStyle, todayButton, displayMode,
      parent, target, col, row, selectKey,
      ...props
    } = this.props;
    start = this.state.start;
    end = this.state.end;
    todayButton = todayButton === true ? button.today: null;

    style = Object.assign({}, style);
    labelStyle = Object.assign({}, labelStyle);
    containerStyle = Object.assign({}, containerStyle);
    if(vertical){
      labelStyle.display = 'block';
    }

    var children = [];
    if(label){
      children.push(
        <lable className="x-editor-label" style={labelStyle} key="label">{label}</lable>
      );
    }

    children.push(
      <Datebox {...props} name={startName} value={start} startDate={start} endDate={end}
        style={style} placeholder={startPlaceholder.value} key="start" todayButton={todayButton}
        />
    );
    children.push(
      <Datebox {...props} name={endName} value={end} startDate={start} endDate={end}
        style={style} placeholder={endPlaceholder.value} key="end" todayButton={todayButton}
        />
    );

    return (
      <span>
        {children}
      </span>
    );
  }

  _handleChangeStart = (value) => {
    var {data, dataInputs} = this.props;
    var {startData, endData} = data;
    if(!startData || startData.isComputed) return;
    if(dataInputs){
      var date = this._getDate(value);
      var end = dataInputs[endData.name];
      if(end && this._getDate(end) < date){
        dataInputs[startData.name] = end;
        dataInputs[endData.name] = value;
        this.setState({start: end, end: value});
      } else {
        dataInputs[startData.name] = value;
        this.setState({start: value});
      }
    }
  }

  _handleChangeEnd = (value) => {
    var {data, dataInputs} = this.props;
    var {startData, endData} = data;
    if(!endData || endData.isComputed) return;
    if(dataInputs){
      var date = this._getDate(value);
      var start = dataInputs[startData.name];
      if(start && this._getDate(start) > date){
        dataInputs[startData.name] = value;
        dataInputs[endData.name] = start;
        this.setState({start: value, end: start});
      } else {
        dataInputs[endData.name] = value;
        this.setState({end: value});
      }
    }
  }

  _getDate(date){
    if(isDate(date)){
      return date;
    }
    if(isString(date)){
      var mom = moment(date);
      if(mom.isValid()){
        return mom._d;
      } else {
        console.error(`error: invalid string to get moment( ${date} )`);
      }
    }
    return date._d;
  }
}
