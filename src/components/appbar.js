import React, {Component, PropTypes} from 'react';
//import lang, {button, state as stateText} from '../lang';

import {blueGrey600, grey300, redA100, white} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import LinkButton from 'json-editor/lib/common/linkButton';

//icon
import IconActionCheck from 'material-ui/svg-icons/action/check-circle';
import IconActionDone from 'material-ui/svg-icons/action/done';
import IconActionDoneAll from 'material-ui/svg-icons/action/done-all';
import IconActionVisibility from 'material-ui/svg-icons/action/visibility';

// flux
import Actions from '../actions';
import Constants from '../constants';
import Store from '../stores';

import {spacing} from '../theme';

import {getLang} from './mixinUtils';

var lang=formDefaults;
var button=formLang.button;
var stateText=formLang.state;
const styles = {
  root: {
    zIndex: 500,
    height: spacing.appbarHeight,
    lineHeight: spacing.appbarHeight + 'px',
    minHeight: '40px',
    paddingLeft: '0px',
    backgroundColor: blueGrey600,
    verticalAlign: 'middle',
  },
  titleStyle: {
    lineHeight: 'inherit',
    overflow: 'inherit',
    height: null,
  },
  btn: {
    width: 'inherit',
    height: 'inherit',
    padding: '0px',
    margin: '0px 3px'
  },
  iconBtn: {
    width: spacing.appbarHeight,
    height: spacing.appbarHeight,
    // margin: '0 14px',
    padding: '5px',
  },
  titleRoot: {
    height: spacing.appbarHeight + 'px',
  },
  title: {
    height: spacing.appbarHeight + 'px',
    verticalAlign: 'top',
    textTransform: 'none',
  },
  titleBtn: {
    font: 'inherit',
  },
  labelStyle: {
    fontSize: 'inherit',
    textTransform: 'inherit',
    padding: '0px 20px',
    color: 'white',
  },
  titleLabel: {
    textTransform: 'none',
    fontSize: 20,
    padding: '0px 20px',
    verticalAlign: 'top',
    color: 'white',
  },
  stateLabel: {
    fontSize: 13,
    position: 'fixed',
    color: grey300,
  },
  iconStyleRight: {
    marginRight: '0px',
  },
};

export default class MyAppBar extends Component {
  render() {
    var {title, language, state, children} = this.props;

    let titleElem = (
      <div style={styles.titleRoot}>
        <RaisedButton label={lang.name} backgroundColor={redA100}
          onTouchTap={this._handleToggleLeft}
          labelStyle={styles.labelStyle}
          style={styles.title}
          buttonStyle={styles.titleBtn}
        />

        <IconButton style={styles.iconBtn} tooltip={getLang(button, 'save')} iconStyle={styles.svg}
          onTouchTap={this._handleSave}
        >
          <IconActionCheck color="white"/>
        </IconButton>
        <IconButton style={styles.iconBtn} tooltip={getLang(button, 'release')} iconStyle={styles.svg}
          onTouchTap={this._handleRelease}
        >
          <IconActionDone color="white"/>
        </IconButton>
        <IconButton style={styles.iconBtn} tooltip={getLang(button, 'releaseNew')} iconStyle={styles.svg}
          onTouchTap={this._handleReleaseNew}
        >
          <IconActionDoneAll color="white"/>
        </IconButton>
        <IconButton style={styles.iconBtn} tooltip={getLang(button, 'preview')} iconStyle={styles.svg}
          onTouchTap={this._handlePreview}
        >
          <IconActionVisibility color="white"/>
        </IconButton>

        <FlatButton label={title} backgroundColor={blueGrey600}
          onTouchTap={this._handleToggleRight}
          labelStyle={styles.titleLabel}
          style={styles.title}>
        </FlatButton>

        <span style={styles.stateLabel}>
          {getLang(stateText, state)}
        </span>
      </div>
    );

    // iconElementLeft = {<span/>} iconElementLeft如果不传，会使用默认的iconElementLeft，所以这里传<span/>
    return (
      <div>
        <AppBar
          title={titleElem}
          iconElementLeft={<noscript/>}
          iconStyleRight={styles.iconStyleRight}
          iconElementRight={null}
          style={styles.root}
          titleStyle={styles.titleStyle}
        >
        </AppBar>
        {children}
      </div>
    );
  }

  _handleToggleLeft = () => {
    Actions.toggleLeft();
  }

  _handleToggleRight = () => {
    var {form, language} = this.props;
    Actions.toggleRight(true, [{
      name: 'basic',
      data: form.getData('attributes'),
    }, {
      name: 'language',
      data: language,
    }]);
  }

  _handlePreview = () => {
    Actions.preview();
  }

  _handleSave = () => {
    Actions.save();
  }

  _handleRelease = () => {
    Actions.save(true);
  }

  _handleReleaseNew = () => {
    Actions.save(true, true);
  }
}
