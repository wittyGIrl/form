import React, {Component, PropTypes} from 'react';
import {styles} from '../../../theme';

import {grey500} from 'material-ui/styles/colors';
import IconContentAdd from 'material-ui/svg-icons/content/add';
import IconContentClear from 'material-ui/svg-icons/content/clear';

import Editor from 'json-editor/lib/common/editor';
import Field from 'json-editor/lib/field';
import FlatButton from 'json-editor/lib/common/flatButton';

export default class NameValuePairList extends Component{
  static propTypes = {
    placeholder: PropTypes.string,
    data: PropTypes.array,
  }

  static defaultProps = {
    placeholder: '点击添加语言项...',
    data: [],
  }

  render() {
    var {data, placeholder, onChange, onAdd, onRemove, onNameChange} = this.props;
    var children = [];
    var me = this;
    if(data){
      children = data.map((item, i) => {
        return (
          <div key={i}>
            <Editor type="textbox" value={item.name} owner={item} target="name" delay={1000} onChange={onNameChange.bind(null, i)}></Editor>
            <Editor type="textbox" value={item.value} owner={item} target="value" delay={1000} onChange={onChange}></Editor>
            <FlatButton style={styles.btn} onClick={onRemove.bind(null, i)}>
    					<IconContentClear color={grey500} style={styles.svg}></IconContentClear>
    				</FlatButton>
          </div>
        );
      });
    } else {
      children.push(placeholder);
    }
    return (
      <div className="name-value-pair-list">
        <FlatButton style={styles.btn} onClick={onAdd}>
					<IconContentAdd color={grey500} style={styles.svg}></IconContentAdd>
				</FlatButton>
        {children}
      </div>
    );
  }
}
