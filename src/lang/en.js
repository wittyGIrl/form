
export default {
  name: 'Form Designer',
  sidebar: 'Browse',
  defaultName: 'Unnamed',
};

export const menu = {
  "new": 'New',
  open: 'Open',
  saveAs: 'SaveAs',
  history: 'History',
  shortkey: 'ShortKey',
};
export const tabs = {
  'language': 'Language',
  'environment': 'Environment',
  'self': 'Customize',
}

export const button = {
  save: 'Save',
  release: 'Release',
  releaseNew: 'Release New Version',
  preview: 'Preview',
  confirm: 'Confirm',
  cancel: 'Cancel',
  close: 'Close',
  signin: 'Sign In',
  signup: 'Sign Up',
  logout: 'Logout',
  add: 'Add',
  edit: 'Edit',
  remove: 'Remove',
  today: 'Today',
  personCenter: 'Person Center',
  markdown: 'Markdown',
  expand: 'Expand',
  collapse: 'Collapse',
  fullscreen: 'Fullscreen',
  help: 'Help',
  menu: 'Menu',
  background: 'Background',
  moreFiles: 'more...',
  clearAllDrafts: 'Clear All Drafts',
  binding: 'Binding',
  bindingLanguage: 'MultiLanuage',
};

export const kit = {
  textElement: 'Plain Text',
  textbox: 'Text Box',
  radio: 'Radio Box',
  checkbox: 'Checkbox',
  combobox: 'Combobox',
  datebox: 'Datebox',
  dateRange: 'Date Range',
  datagrid: 'Datagrid',
  popupSelector: 'Popup',
  employeeSelector: 'Employee',
  accountSelector: 'Account',
  departmentSelector: 'Department',
  positionSelector: 'Position',
  jobTitleSelector: 'JobTitle',
  roleSelector: 'Role',
  delete: 'delete',
  groupSelector: 'Group',
  datagrid: 'Datagrid',
};

export const state = {
  ready: 'Ready',
  saved: 'Saved',
  saving: 'Saving...',
};

export const message = {
  successSave: 'Save Success',
  successAutosave: 'Autosave Success',
  successOperate: 'Operation Success',
  fullscreen: 'Esc to Quit',
  loading: 'Loading...',
  nothing: 'Nothing...',
  successCheck:'tableName is available',
  failCheck:'tableName is already existed',
  falseVariable:'false format',
  checkResult:'check Result',

  create(time){
    return `Created ${time}`;
  },

  update(time){
    return `Last Updated ${time}`;
  },

  historyHint: 'Click here to load the history.',
};

export const placeholder = {
  default: 'please input...',
  select: 'please select...',
  datebox: 'please select date...',
  employeeSelector: 'please select an employee...',
  accountSelector: 'please select an account...',
  roleSelector: 'please select a role...',
  departmentSelector: 'please select a department...',
  positionSelector: 'please select a position...',
  jobTitleSelector: 'please select a job title...',
  groupSelector: 'please select a group...',
  datagrid: 'Datagrid',
  option1: 'Option 1',
  option2: 'Option 2',
  textbox: 'please input',
  number: 'number',
  ascii: 'number and word',
};

export const shortkey = {
  keys: [
    // {text: 'Ctrl + C', value: '复制'},
    // {text: 'Ctrl + X', value: '剪切'},
    // {text: 'Ctrl + V', value: '粘贴'},
    // {text: 'Ctrl + Z', value: '撤销'},
    // {text: 'Ctrl + Y', value: '重做'},
    {text: 'Ctrl + Left Click', value: 'MultiSelect'},
    // {text: '鼠标右键 / Alt + 鼠标左键', value: '拖拽画布'},
    {text: 'Delete', value: 'Delete'},
    // {text: '上 下 左 右', value: '切换选中节点'},
  ]
};

export const property = {
  // common
  title: 'Title',
  datasource:'datasource',
  modeltype:'model type',
  modeltablename:'table name',
  theme: 'Theme',
  placeholder: 'Placeholder',
  label: 'Label',
  vertical: 'Vertical',
  optionsVertical: 'Vertical Options',
  on: 'On Value',
  off: 'Off Value',
  basis: 'Basis',
  text: 'Text',
  readOnly: 'Readonly',
  options: 'Options',
  option: 'Option',
  style: 'Style',
  containerStyle: 'Container Style',
  labelStyle: 'Label Style',
  width: 'Width',
  height: 'Height',
  require: 'Require',
  cellpadding: 'Cellpadding',
  cellspacing: 'Cellspacing',
  textAlign: 'Text Align',
  langs: 'Lanuages',

  //data
  dataOptions: 'Data Options',
  isComputed: 'Is Computed',
  value: 'Value',
  name: 'Name',
  displayName: 'Display Name',
  type: 'Type',
  defaultValue: 'Default Value',
  defaultText: 'Default Text',
  length: 'string Length',
  expression: 'Expression',
  hidden: 'Hidden',
  onChange: 'Change Event',
  dataInputs : 'Data Inputs',

  //textbox
  required: 'Required',
  requiredMessage: 'Required Message',
  rule: 'Rule',
  invalidMessage: 'Invalid Message',
  multiline: 'Multiline',
  editable: 'Editable',

  //Datebox
  dateFormat: 'Date Format',
  todayButton: 'Today Button',
  showYearDropdown: 'Show Year DropDwon',
  startPlaceholder: 'Start PlaceHoldaer',
  endPlaceholder: 'End PlaceHolder',
  startData: 'Start Data',
  endData: 'End Data',

  //datagrid
	idField: 'Id',
	multiSelect: 'MultiSelect',
	fit: 'Fit',
	fitColumns: 'Fit Columns',
	toolbar: 'Toolbar',
	inlineEdit: 'Inline Edit',
	rowNumber: 'Row Number',
	rowNumberWidth: 'Row Number Width',
	pagination: 'Pagination',
  pageSize: 'Page Size',
	paginationLabel: 'Pagination Label',
  columns: 'Columns',
  column: 'Column',
  field: 'Field',

  //editor
  editor: 'Editor',
  textboxOptions: 'Editor Options',
  comboboxOptions: 'Editor Options',
  checkboxOptions: 'Editor Options',
  radioOptions: 'Editor Options',
  dateboxOptions: 'Editor Options',

  //tab
  basic: 'Basic',
  col: 'Column',
  data: 'Data',
  block: 'Block',
  colSpan: 'ColSpan',
  rowSpan: 'RowSpan',
  language: 'Language',
};

export const columns = {
  name: 'Name',
  lastUpdateTime: 'Last Update Time',
  createTime: 'Create Time',
};

export const time = {
  justnow: 'Just Now',
  minutesago(m){
    return `${m} Minute Age`;
  },
  hoursago(h){
    return `${h} Hours Ago`;
  },
  yesterday: 'Yesterday',
  daysago(d){
    return `${d} Days Ago`;
  },
  longago: 'Long Ago',
};

export const configText = {
  select: 'Please Select',
  string: 'String',
  number: 'Number',
  bool:'Boolean',
  datetime: 'Date',
  center: 'Center',
  alignLeft: 'Align Left',
  alignRight: 'Align Right',
  'zh-CN': 'zh-CN',
  en: 'en',
  'zh-TW': 'zh-TW',
  level1: 'Level 1',
  level2: 'Level 2',
  level3: 'Level 3',
  plainText: 'Plain Text',
  'default': 'Default',
  'simple': 'Simple',
  'employee.id': 'Submitter Id',
  'employee.name': 'Submitter Name',
  'employee.jobNo': 'Submitter Jobno',
  'orgInfo.id': 'Submitter Department Id',
  'orgInfo.name': 'Submitter Department Name',
  'orgInfo.namePath': 'Submitter Department Name Path',
  'account.id': 'Submitter Account Id',
  'account.loginId': 'Submitter Account',
  'acount.domainAccount': 'Submitter Domain Account',
  'processInstance.pIId': 'Process Id',
  'processInstance.name': 'Process Name',
  'processInstance.state': 'Process State',
  'workItem.id': 'Work Item Id',
  'workItem.name': 'Work Item Name',
  'workItem.state': 'Work Item State',
  'binding': 'Binding Value',
  'detection':'detection'
};
