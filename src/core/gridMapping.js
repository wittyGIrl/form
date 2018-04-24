/*
* 记录每个单元格和 col 元素的对应关系
*/
import {isNumber} from '../utils';

var _mapping = [];

function initMapping(row, col){
  _mapping.length = row;
  for(var i = 0; i < row; i++){
    if(!_mapping[i]) _mapping[i] = [];
    _mapping[i].length = col;
    initArray(_mapping[i]);
  }
}

function initArray(arr){
  for(var i = 0, l = arr.length; i < l; i++){
    arr[i] = null;
  }
}

function init(root){
  var rows, pos, table;
  root.getChildren().forEach(function(block){
    table = block[0];
    count(table);
    initMapping(table.row, table.col);
    rows = root.getChildren();
    pos = {y: 0}, i, l, cols;
    rows.forEach(place);
  });
  function place(row, rowIndex){
    cols = row.getChildren();
    for(i = 0, l = cols.length; i < l; i++){
      pos.x = 0;
      refresh(pos, rowIndex, i, cols[i]);
    }
    pos.y++;
  }
}

function refresh(pos, rowIndex, colIndex, col){
  var newX, newY, temp, span;
  while(_mapping[pos.y][pos.x]){
    pos.x++;
  }
  span = col.getSpan();
  Object.assign(col, pos);
  newX = pos.x + span.colSpan;
  newY = pos.y + span.rowSpan;
  while(pos.x < newX){
    temp = pos.y;
    while(temp < newY){
      _mapping[temp][pos.x] = col;
      temp++;
    }
    pos.x++;
  }
}


function getMapping(){
  return _mapping;
}

function count(table){
  if(!table) return;
  var rows = table.getChildren();
  table.row = rows.length;
  var maxCount = {row: 0, col: 0}, temp;
  rows.forEach(function(row){
    temp = countCol(row);
    if(maxCount.col < temp.col){
      maxCount.col = temp.col;
    }
    maxCount.row += temp.row;
  });

  Object.assign(table, maxCount);
}

function countCol(row){
  var cols = row.getChildren(), span, max = {row: 0, col: 0};
  cols.forEach(function(col){
    span = col.getSpan();
    if(max.row < span.rowSpan){
      max.row = span.rowSpan;
    }
    max.col += span.colSpan;
  });
  return max;
}

// 判断one和another是否相邻
function isNear(one, another){
  if(one.x === another.x){

  } else if(one.y === another.y){
    if(one.x === another.x + 1){ //on the left
      return 'left';
    } else if(one.x + 1 === another.x){ // on the right
      return 'right';
    }
  }
}

const manager = {
  init,
  count,
  refresh,
  set(x, y, elem) {
    if(isNumber(y)){
      _mapping[y][x] = elem;
    } else {
      _mapping[x] = elem;
    }
  },
  get(x, y) {
    if(isNumber(y)){
      return _mapping[y][x];
    }
    return _mapping[x];
  },
  getLeft(target) {
    if(target.x > 0){
      return _mapping[target.y][target.x - 1];
    }
  },
  getRight(target) {
    var x = target.x;
    var row = _mapping[target.y];
    while(++x < row.length){
      if(row[x] !== target){
        return row[x];
      }
    }
  },
  getTop(target) {
    if(target.y > 0){
      return _mapping[target.y - 1][target.x];
    }
  },
  getBottom(target) {
    var y = target.y;
    while(++y < _mapping.length){
      if(_mapping[y][target.x] !== target){
        return _mapping[y][target.x];
      }
    }
  },

  isNear(one, another) {
    return another === one.getLeft() || another === one.getRight() || another === one.getTop() || another === one.getBottom();
  },
};

export default manager;
