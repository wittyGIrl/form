/*
* app 入口
*
*/
import React, {Component, PropTypes} from 'react';

import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';

import EventListener from 'react-event-listener';

import {$} from '../utils'

import Store from '../stores';
import Actions from '../actions';

import Constants, {Mode} from '../constants';

import AppBar from './appbar';
import LeftBar from './leftbar';
import Main from './main';
import RightMenu from './rightMenu';
import ErrorDialog from './error';

export default class App extends Component{
  constructor(props, context){
    super(props, context);
    this.state = Store.getData();
  }

  componentDidMount() {
    Store.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  }

  render() {
    let {form, mode, property, language, rightMenu, title, loading, state, menu, bottomMessage, error} = this.state;
    let snackbar = (
      <Snackbar
        open={!!bottomMessage}
        message = {bottomMessage || ''}
        autoHideDuration={2000}
        onRequestClose={() => Actions.clearMessage()}
      />
    );

    let errorElem = null;
    if(error){
      errorElem = (
        <ErrorDialog error={error} onClearError={() => Actions.clearError()}/>
      );
    }
    let center;
    if(loading === true){
      center = (
        <div className="progress">
          <CircularProgress />
        </div>
      );
    } else {
      center = (
        <Main data={form} mode={mode} property={property}/>
      );
    }

    return (
      <div>
        <EventListener target="window" onKeyDown={this._handleKeyDown}></EventListener>
        <AppBar title={title} form={form} language={language} state={state}>
          <LeftBar title={title} open={mode.equalTo(Mode.MENU)} menu={menu} />
        </AppBar>
        {center}
        <RightMenu {...rightMenu}></RightMenu>
        {errorElem}
        {snackbar}
      </div>
    );
  }

  _onChange = () => {
    this.setState(Store.getData());
  }

  _handleKeyDown = (e) => {
    var keyCode = e.keyCode;
    var {mode} = this.state;
    if(!mode.equalTo(Mode.NORMAL)){
      switch (keyCode) {
        case 27: //esc
          Actions.changeMode();
          e.preventDefault();
          break;
        case 83: //s
          if(e.ctrlKey){
            Actions.autosave();
            e.preventDefault();
          }
          break;
        default:
          break;
      }
      return;
    }
    switch (keyCode) {
      case 46:// Delete
        Actions.remove();
        e.preventDefault();
        break;
      case 33: // pg up
      case 37: // left
      case 38: // up
        break;
      case 32: // space
      case 34: // pg down
      case 39: // right
      case 40: // down
        //Actions.slide.next();
        //break;
      case 79:
        // overView();
      case 9: // tab
        //Actions.toggleRight();
        break;
      case 83: //s
        if(e.ctrlKey){
          Actions.autosave();
          e.preventDefault();
        }
        break;
      default:
        break;
    }
  }

}
