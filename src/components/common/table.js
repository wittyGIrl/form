import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

export default class SimpleTable extends Component{
  static propTypes = {
    stripedRows: PropTypes.bool,
    placeholder: PropTypes.string,
    bodyProps: PropTypes.object,
    headerProps: PropTypes.object,
  };
  static defaultProps = {
    placeholder: '这里什么也没有...',
    tableProps: {},
    bodyProps: {},
    headerProps: {},
  }

  renderRow(item) {
    var {columns} = this.props;
    if(columns && columns.length){
      return columns.map(function(col){
        if(col.key){
          return (
            <TableRowColumn key={col.key}>{item[col.key]}</TableRowColumn>
          );
        }
      });
    }
  }

  render() {
    var {data, columns, placeholder, tableProps, bodyProps, headerProps} = this.props;
    var headerRows = [], rows = [], me = this;
    if(columns && columns.length){
      columns.forEach(function(col){
        headerRows.push(
          <TableHeaderColumn key ={col.key}>{col.text}</TableHeaderColumn>
        );
      });

      if(data && data.length){
        data.forEach(function(item, i){
          rows.push(
            <TableRow key={i}>
              {me.renderRow(item)}
            </TableRow>
          );
        });
      }
      else if(placeholder){
        rows = (
          <TableRow key={0}>
            <TableRowColumn>{placeholder}</TableRowColumn>
          </TableRow>
        );
      }
    }

    return (
      <Table {...tableProps}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false} {...headerProps}>
          <TableRow>
            {headerRows}
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} {...bodyProps}>
          {rows}
        </TableBody>
      </Table>
    );
  }
}
