import Dispatcher from '../dispatcher';
import Constants from '../constants';

const Action = {
  //---------------form------------------
  //Drag
  startDrag(target, source) {
    Dispatcher.dispatch({
      actionType: Constants.START_DRAG,
      data: {target, source},
    });
  },

  endDrag(data) {
    Dispatcher.dispatch({
      actionType: Constants.END_DRAG,
      data: data,
    });
  },
  // type row, col, block
  add(type, options) {
    Dispatcher.dispatch({
      actionType: Constants.ADD,
      data: {type, options},
    });
  },

  remove(elements) {
    Dispatcher.dispatch({
      actionType: Constants.REMOVE,
      data: elements,
    });
  },

  merge() {
    Dispatcher.dispatch({
      actionType: Constants.MERGE,
    });
  },

  separate() {
    Dispatcher.dispatch({
      actionType: Constants.SEPARATE,
    });
  },

  //select highlight
  select(data, singleSelect) {
    Dispatcher.dispatch({
      actionType: Constants.SELECT,
      data: {data, singleSelect},
    });
  },

  preview() {
    Dispatcher.dispatch({
      actionType: Constants.PREVIEW,
    });
  },

  //---------------presentation------------------
  //addChild
  addChild(parent, child){
    Dispatcher.dispatch({
      actionType: Constants.ADD_CHILD,
      data: { parent: parent, child: child },
    });
  },
  removeChild(parent, index){
    Dispatcher.dispatch({
      actionType: Constants.REMOVE_CHILD,
      data: {parent: parent, index: index},
    });
  },

  //save
  save(isDeploy, isNewVersion){
    Dispatcher.dispatch({
      data: {isDeploy, isNewVersion},
      actionType: Constants.SAVE,
    });
  },

  changeMode(mode, withoutEmit) {
    Dispatcher.dispatch({
      actionType: Constants.CHANGE_MODE,
      data: {mode: mode, withoutEmit},
    });
  },

  contentChange(content) {
    Dispatcher.dispatch({
      actionType: Constants.CONTENT_CHANGE,
      data: content,
    });
  },

  titleChange(title) {
    Dispatcher.dispatch({
      actionType: Constants.TITLE_CHANGE,
      data: title || '',
    });
  },

  valueChange() {
    Dispatcher.dispatch({
      actionType: Constants.VALUE_CHANGE,
    });
  },

  toggleLeft(data) {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_LEFT,
      data: data,
    });
  },

  toggleRight(open, data) {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_RIGHT,
      data: {open: open, data: data},
    });
  },

  //draft
  autosave(){
    Dispatcher.dispatch({
      actionType: Constants.AUTO_SAVE,
    });
  },

  loadDraft(draftId) {
    Dispatcher.dispatch({
      actionType: Constants.LOAD_DRAFT,
      data: draftId,
    });
  },

  clearAllDrafts() {
    Dispatcher.dispatch({
      actionType: Constants.CLEAR_ALL_DRAFTS,
    });
  },

  //---------------menu------------------
  menuSelect(index) {
    Dispatcher.dispatch({
      actionType: Constants.MENU_SELECT,
      data: index,
    });
  },

  toggleRightMenu(anchor = null, owner = null){
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_RIGHT_MENU,
      data: {anchor, owner},
    });
  },

  //---------------message------------------
  setMessage(message) {
    Dispatcher.dispatch({
      actionType: Constants.SET_MESSAGE,
      data: message,
    });
  },

  clearMessage() {
    Dispatcher.dispatch({
      actionType: Constants.CLEAR_MESSAGE
    });
  },

  setError(error) {
    Dispatcher.dispatch({
      actionType: Constants.SET_ERROR,
      data: error,
    });
  },

  clearError() {
    Dispatcher.dispatch({
      actionType: Constants.CLEAR_ERROR
    });
  },
};

export default Action;
