/*
* 工具箱，自带删除面板。
*/
import React, {Component, PropTypes} from 'react';

import {grey200, grey300} from 'material-ui/styles/colors';
import Popover from 'material-ui/Popover';

import IconDelete from 'material-ui/svg-icons/action/delete';

import Datagrid from 'datagrid';

import Drag from './draggable/drag';
import Drop from './draggable/drop';

import Alert from './common/alert';

import Editor from 'editors';

import getOptions from './form/options';

import {spacing} from '../theme';

//import {placeholder, kit} from '../lang';
var placeholder=formLang.placeholder;
var kit=formLang.kit;

import {Mode} from '../constants';

import {getLang} from './mixinUtils';

import Actions from '../actions';

const styles = {
  root: {
    position: 'absolute',
    top: 0,
    //bottom: 0,
    left: 0,
    zIndex: 10,
    overflowY: 'auto',
    borderWidth: '0 0 1px 1px',
    borderStyle: 'solid',
    width: '100%',
    borderColor: grey300,
    float:'left',
    marginBottom:'10px',
  },
  popover: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 15,
    backgroundColor: 'white',
    textAlign: 'center',
  },
  svg: {
    height: 80,
    width: 80,
  },
  drag: {
    padding: '3px 4px',
    textAlign: 'center',
    boxShadow: null,
    borderWidth: '1px',
    borderRight: 'dashed 1px',
    borderColor: grey300,
    lineHeight: '40px',
    float:'left',
    minWidth: '2%',
    height:'40px',
  },
  funcBtn: {
    padding: '5px 8px',
    textAlign: 'center',
    boxShadow: null,
    borderWidth: '1px',
    borderRight: 'dashed 1px',
    borderColor: grey300,
    lineHeight: '40px',
    float:'left',
    minWidth: '2%',
    height: '40px',
    cursor: 'pointer',
  },
};

export default class Kit extends Component{
  renderDustbin(){
    if(this.props.mode.equalTo(Mode.DRAG, true)){
      return (
        <Drop style={styles.popover}>
          <IconDelete color={grey200} style={styles.svg}/>
        </Drop>
      );
    }
  }

  render() {
    var {mode} = this.props;
    return (
      <div ref='container' className="kit" style={styles.root}>
        <Drag mode={mode} source="kit" target={'Text'}
          title={getLang(kit, 'textElement')} style={styles.drag}>
          <img src={require('../../public/icons/label.png')} />
          {getLang(kit, 'textElement') }
        </Drag>

        <Drag mode={mode} source="kit" target={'labeledTextbox'}
           style={styles.drag}>

         <Editor  disabled={true} placeholder="" style={{width:40+'px',height:15+'px'}}/>
        </Drag>

        <Drag mode={mode} source="kit" target={'labeledRadio'}
          title={getLang(kit, 'radio')} style={styles.drag}>
          <img src={require('../../public/icons/radio.png')} />{getLang(kit, 'radio') }
        </Drag>

        <Drag mode={mode} source="kit" target={'labeledCheckbox'}
          title={getLang(kit, 'checkbox')} style={styles.drag}>
          <img src={require('../../public/icons/checkbox.png')} />{getLang(kit, 'checkbox') }
        </Drag>

        <Drag mode={mode} source="kit" target={'labeledCombobox'}
          title={getLang(kit, 'combobox')} style={styles.drag}>
          {/*<Editor type="combobox" disabled={true}/>*/}
          <img src={require('../../public/icons/combobox.png')} />{getLang(kit, 'combobox') }
        </Drag>

        <Drag mode={mode} source="kit" target={'labeledDatebox'}
            title={getLang(kit, 'datebox')} style={styles.drag}>
            <img src={require('../../public/icons/calendar.png')} />{getLang(kit, 'datebox') }
          {/* <Editor disabled={true} placeholder={getLang(kit, 'datebox')}/> */}
        </Drag>
        {/*
        <Drag mode={mode} source="kit" target={'labeledDateboxRange'}
          title={getLang(kit, 'dateRange')} style={styles.drag}>
          <Editor disabled={true} placeholder="日期范围"/>
        </Drag> */}

      {/*  <Drag mode={mode} source="kit" target={'datagrid'}
          title={getLang(kit, 'datagrid')} style={styles.drag}>
          <img src={require('../../public/icons/table.png')} />{getLang(kit, 'datagrid') }
        </Drag>*/}
      {/*  <Drag mode={mode} source="kit" target={'datagrid'}
          title={getLang(kit, 'datagrid')} style={styles.drag}>
          <img src={require('../../public/images/datebox_arrow.png')} />{getLang(kit, 'datagrid') }
        <Datagrid title={getLang(kit, 'datagrid')} pagination={false} fit={false} toolbar={false}></Datagrid>
        </Drag>*/}

        <Drag mode={mode} source="kit" target={'employeeSelector'}
          title={getLang(kit, 'employeeSelector')} style={styles.drag}>
          <img src={require('../../public/icons/employee.png')} />
          {getLang(kit, 'employeeSelector') }
          {/* <Editor disabled={true} placeholder={getLang(kit, 'employeeSelector')}/> */}
        </Drag>

        <Drag mode={mode} source="kit" target={'accountSelector'}
          title={getLang(kit, 'accountSelector')} style={styles.drag}>
          <img src={require('../../public/icons/account.png')} />
          {getLang(kit, 'accountSelector') }
          {/*   <Editor disabled={true} placeholder={getLang(kit, 'accountSelector')}/> */}
        </Drag>

        <Drag mode={mode} source="kit" target={'departmentSelector'}
           title={getLang(kit, 'departmentSelector')} style={styles.drag}>
           <img src={require('../../public/icons/depart.png')} />
           {getLang(kit, 'departmentSelector') }
        {/*  <Editor disabled={true} placeholder={getLang(kit, 'departmentSelector')}/> */}
        </Drag>

        <Drag mode={mode} source="kit" target={'jobTitleSelector'}
           title={getLang(kit, 'jobTitleSelector')} style={styles.drag}>
           <img src={require('../../public/icons/jobTitle.png')} />
           {getLang(kit, 'jobTitleSelector') }
          {/*<Editor disabled={true} placeholder={getLang(kit, 'jobTitleSelector')}/> */}
        </Drag>

        <Drag mode={mode} source="kit" target={'positionSelector'}
           title={getLang(kit, 'positionSelector')} style={styles.drag}>
          <img src={require('../../public/icons/position.png')} />
          {getLang(kit, 'positionSelector') }
          {/*<Editor disabled={true} placeholder={getLang(kit, 'positionSelector')}/> */}
        </Drag>

        <Drag mode={mode} source="kit" target={'roleSelector'}
           title={getLang(kit, 'roleSelector')} style={styles.drag}>
           <img src={require('../../public/icons/role.png')} />
           {getLang(kit, 'roleSelector') }
          {/*<Editor disabled={true} placeholder={getLang(kit, 'roleSelector')}/> */}
        </Drag>

        <Drag mode={mode} source="kit" target={'groupSelector'}
           title={getLang(kit, 'groupSelector')} style={styles.drag}>
           <img src={require('../../public/icons/group.png')} />
           {getLang(kit, 'groupSelector') }
        {/*  <Editor disabled={true} placeholder={getLang(kit, 'groupSelector')}/> */}
        </Drag>

        <Drag mode={mode} source="kit" target={'popupSelector'}
           title={getLang(kit, 'popupSelector')} style={styles.drag}>
           <img src={require('../../public/icons/popup.png')} />
           {getLang(kit, 'popupSelector') }
          {/*<Editor disabled={true} placeholder={getLang(kit, 'popupSelector')}/> */}
        </Drag>
        <div style={styles.funcBtn} title="删除" onClick={this._handleClick}>
          <img src={require('../../public/icons/delete.png')} />{getLang(kit, 'delete') }
        </div>
        {this.renderDustbin()}
      </div>
    );
  }
  _handleClick = (e) => {
    Actions.remove();
  }
}
