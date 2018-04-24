const constants = {
  //---------------design------------------
  START_DRAG: 'START_DRAG',
  END_DRAG: 'END_DRAG',
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  MERGE: 'MERGE',
  SEPARATE: 'SEPARATE',
  SELECT: 'SELECT',
  PREVIEW: 'PREVIEW',

  //---------------property------------------
  ADD_CHILD: 'ADD_CHILD',
  REMOVE_CHILD: 'REMOVE_CHILD',

  //---------------presentation------------------
//  ADD: 'ADD',
  SAVE: 'SAVE',
  AUTO_SAVE: 'AUTO_SAVE',

  CHANGE_MODE: 'CHANGE_MODE',
  CONTENT_CHANGE: 'CONTENT_CHANGE',
  TITLE_CHANGE: 'TITLE_CHANGE',
  VALUE_CHANGE: 'VALUE_CHANGE',
  TOGGLE_LEFT: 'TOGGLE_LEFT',
  TOGGLE_RIGHT: 'TOGGLE_RIGHT',

  //------------draft--------------------
  LOAD_DRAFT: 'LOAD_DRAFT',
  CLEAR_ALL_DRAFTS: 'CLEAR_ALL_DRAFTS',

  //---------------menu------------------
  MENU_SELECT: 'MENU_SELECT',
  TOGGLE_RIGHT_MENU: 'TOGGLE_RIGHT_MENU',

  //---------------message------------------
  SET_MESSAGE: 'SET_MESSAGE',
  CLEAR_MESSAGE: 'CLEAR_MESSAGE',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

const Mode = {
  NORMAL: 'NORMAL',
  DRAG: 'DRAG',
  MENU: 'MENU',
  PROPERTY: 'PROPERTY',

  // display mode
  DEFAULT: 'DEFAULT',
  VIEW: 'VIEW',
  PRINT: 'PRINT',
};

export default constants;
export {Mode};
