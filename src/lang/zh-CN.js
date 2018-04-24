
export default {
  name: '表单设计器',
  sidebar: '浏览',
  defaultName: '未命名',
};

export const menu = {
  "new": '新建',
  open: '打开',
  saveAs: '另存为',
  history: '历史版本',
  shortkey: '快捷键',
};
export const tabs = {
  'language': '多语言值',
  'environment': '系统值',
  'self': '自定义值',
  'empty': '清空',
}

export const button = {
  save: '保存',
  release: '发布到当前版本',
  releaseNew: '发布到新版本',
  preview: '预览',
  confirm: '确认',
  cancel: '取消',
  close: '关闭',
  signin: '登录',
  signup: '注册',
  logout: '退出',
  add: '添加',
  edit: '编辑',
  remove: '删除',
  compute: '计算',
  today: '今天',
  personCenter: '个人中心',
  markdown: '使用markdown编辑',
  expand: '展开',
  collapse: '收起',
  fullscreen: '全屏',
  help: '查看帮助',
  menu: '菜单',
  background: '设置为默认背景',
  moreFiles: '到个人中心中查看更多...',
  clearAllDrafts: '清除全部草稿',
  binding: '点击编辑绑定值',
  bindingLanguage: '设置多语言',
};

export const kit = {
  textElement: '文字',
  textbox: '文本框',
  radio: '单选按钮',
  checkbox: '单选框',
  combobox: '下拉框',
  datebox: '日期控件',
  dateRange: '日期范围控件',
  datagrid: '表格控件',
  popupSelector: '复杂选择',
  employeeSelector: '职员选择',
  accountSelector: '账号选择',
  departmentSelector: '部门选择',
  positionSelector: '职位选择',
  jobTitleSelector: '职务选择',
  roleSelector: '角色选择',
  groupSelector: '群组选择',
  delete: '删除',
};

export const state = {
  ready: '准备就绪',
  saved: '所有更改已经保存',
  saving: '正在保存...',
};

export const message = {
  successSave: '保存成功',
  successAutosave: '自动保存成功',
  successOperate: '操作成功',
  fullscreen: '按ESC退出全屏',
  loading: '加载中...',
  nothing: '这里什么也没有...',
  successCheck:'表名可用',
  failCheck:'表名已存在',
  falseVariable:'格式错误',
  checkResult:'测试结果',

  create(time){
    return `创建于 ${time}`;
  },

  update(time){
    return `最后更新于 ${time}`;
  },

  historyHint: '点击还原为该历史记录',
};

export const placeholder = {
  default: '请输入...',
  select: '请选择...',
  datebox: '请选择日期...',
  employeeSelector: '请选择职员...',
  accountSelector: '请选择账号...',
  roleSelector: '请选择角色...',
  departmentSelector: '请选择部门...',
  positionSelector: '请选择职位...',
  jobTitleSelector: '请选择职务...',
  groupSelector: '请选择群组...',
  datagrid: '表格',
  option1: '选项1',
  option2: '选项2',
  textbox: '请输入',
  number: '数字',
  ascii: '数字和字母',
};

export const shortkey = {
  keys: [
    // {text: 'Ctrl + C', value: '复制'},
    // {text: 'Ctrl + X', value: '剪切'},
    // {text: 'Ctrl + V', value: '粘贴'},
    // {text: 'Ctrl + Z', value: '撤销'},
    // {text: 'Ctrl + Y', value: '重做'},
    {text: 'Ctrl + 鼠标左键', value: '多选'},
    // {text: '鼠标右键 / Alt + 鼠标左键', value: '拖拽画布'},
    {text: 'Delete', value: '删除'},
    // {text: '上 下 左 右', value: '切换选中节点'},
  ]
};

export const property = {
  // common
  title: '标题',
  datasource:'数据源',
  modeltablename:'表名',
  modeltype:'类型',
  theme: '主题',
  placeholder: '占位文字',
  label: '显示文字',
  vertical: '垂直布局',
  optionsVertical: '选项垂直布局',
  on: '选中值',
  off: '未选中值',
  basis: '宽度百分比',
  text: '文字',
  readOnly: '只读',
  options: '全部选项',
  option: '选项',
  style: '样式',
  script: '脚本地址',
  containerStyle: '容器样式',
  labelStyle: '显示文字样式',
  width: '宽度',
  height: '高度',
  require: '必填标志',
  cellpadding: '单元格内边距',
  cellspacing: '单元格外边距',
  textAlign: '对齐方式',
  langs: '多语言',

  //data
  dataOptions: '数据属性',
  isComputed: '是否为计算值',
  value: '值',
  name: '名称',
  displayName: '显示名',
  type: '类型',
  defaultValue: '默认值',
  length: '最大长度',
  defaultText: '默认显示文字',
  expression: '表达式',
  hidden: '隐藏',
  onChange: '绑定值改变事件',
  dataInputs : '数据输入',

  //textbox
  required: '必填项',
  requiredMessage: '必填提示文字',
  rule: '验证规则',
  invalidMessage: '无效提示文字',
  multiline: '多行文本框',
  editable: '可编辑',

  //Datebox
  dateFormat: '日期格式',
  todayButton: '是否显示今天按钮',
  showYearDropdown: '显示下拉年份选择框',
  startPlaceholder: '开始占位文字',
  endPlaceholder: '结束占位文字',
  startData: '开始值',
  endData: '结束值',

  //datagrid
	idField: 'id属性名',
	multiSelect: '多选',
	fit: '自适性',
	fitColumns: '列宽自适应',
	toolbar: '工具栏',
	inlineEdit: '行内编辑',
	rowNumber: '行号',
	rowNumberWidth: '行号宽度',
	pagination: '分页',
  pageSize: '每页显示的行数',
	paginationLabel: '分页显示文字',
  columns: '全部列',
  column: '列',
  field: '属性',

  //editor
  editor: '编辑器',
  textboxOptions: '编辑器属性',
  comboboxOptions: '编辑器属性',
  checkboxOptions: '编辑器属性',
  radioOptions: '编辑器属性',
  dateboxOptions: '编辑器属性',

  //tab
  basic: '基本属性',
  col: '列属性',
  data: '数据属性',
  block: '块属性',
  colSpan: '跨列数',
  rowSpan: '跨行数',
  language: '多语言',
};

export const columns = {
  name: '名称',
  lastUpdateTime: '上次更新时间',
  createTime: '创建时间',
};

export const time = {
  justnow: '刚刚',
  minutesago(m){
    return `${m} 分钟前`;
  },
  hoursago(h){
    return `${h} 小时前`;
  },
  yesterday: '昨天',
  daysago(d){
    return `${d} 天前`;
  },
  longago: '很久之前',
};

export const configText = {
  select: '请选择',
  string: '字符串',
  bool:'布尔值',
  number: '数字',
  datetime: '日期',
  center: '居中',
  alignLeft: '左对齐',
  alignRight: '右对齐',
  'zh-CN': '中文简体',
  en: '英文',
  'zh-TW': '中文繁体',
  level1: '一级标题',
  level2: '二级标题',
  level3: '三级标题',
  plainText: '普通文本',
  'default': '默认',
  'simple': '简约',
  'employee.id': '提交人id',
  'employee.name': '提交人姓名',
  'employee.jobNo': '提交人工号',
  'orgInfo.id': '提交人首要部门id',
  'orgInfo.name': '提交人首要部门名称',
  'orgInfo.namePath': '提交人首要部门层级名称',
  'account.id': '提交人账号id',
  'account.loginId': '提交人账号登录名',
  'acount.domainAccount': '提交人账号域账户',
  'processInstance.pIId': '流程id',
  'processInstance.name': '流程名称',
  'processInstance.state': '当前流程状态',
  'workItem.id': '当前任务id',
  'workItem.name': '当前任务名称',
  'workItem.state': '当前任务状态',
  'binding': '绑定值',
  'detection':'检测'
};
