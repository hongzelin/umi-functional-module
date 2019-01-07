/*
 * @Author: lin.zehong
 * @Date: 2018-12-29 09:52:04
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-01-07 14:05:57
 * @Desc: 基础Table组件，基于Antd Table
 */
import React from 'react';
import { connect } from "dva";
import { Table, Spin, Alert } from 'antd';
import styles from './Table.less';

/**
 * 页面需要传递的参数：
 *    api 接口请求数据
 *    rowKey 表数据key字段
 *    columns 表字段
 *    pagination 是否展示分页
 *    query 查询条件
 *    rowSelection 复选框，参考antd table 组件 rowSelection
 *    isShowTip、handleSelectRows、selectKeysLength 三个属性配置使用
 *      isShowTip 是否显示tip头部提示 bool
 *      handleSelectRows 清除方法
 *      selectKeysNums 复选框选择的数量
 *    selectedRows 复选框选中的row
 *
 * state值：
 *    list 列表数据
 *    current 页码
 *    pageSize 页现实数据条数
 *    total 数据总条数
 */
class TableTemplate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
    }
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate = prevProps => {
    const queryPrev = prevProps.query;
    const { query } = this.props;
    if (this.isObjectValueEqual(queryPrev, query)) return;
    if (query.isReset) {
      this.setState({ pageSize: 5, pageNum: 1 });
    }
    this.getData();
  };

  // 两个对象相同属性的属性值是否相等
  isObjectValueEqual = (a, b) => {
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);
    if (aProps.length !== bProps.length) {
      return false;
    }
    for (let i = 0; i < aProps.length; i += 1) {
      const propName = aProps[i];
      if (a[propName] !== b[propName]) {
        return false;
      }
    }
    return true;
  }

  getData = () => {
    const { dispatch, api, query } = this.props;
    // delete query.isReset;
    // delete query.t;
    const { pageSize, pageNum } = this.state;
    dispatch({
      type: 'tableModel/fetch',
      payload: {
        api,
        pageSize,
        pageNum,
        query,
      },
    }).then(result => {
      this.handleData(result);
    })
  }

  // 处理数据
  handleData = (result) => {
    const { data, totalCount } = result;
    this.setState({
      list: data,
      total: totalCount,
    })
  }

  changePageNum = (pageNum) => {
    this.setState({ pageNum });
  }

  changePageSize = (pageNum, pageSize) => {
    this.setState({ pageSize });
  }

  changePage = (pageNum, pageSize) => {
    this.setState({ pageSize, pageNum });
    this.getData();
  }

  rowClassName = (record) => {
    const { selectedRows } = this.props;
    if (!selectedRows || selectedRows.length <= 0) return;
    for (let i = 0; i < selectedRows.length; i += 1) {
      if (record.privId && selectedRows[i] === record.privId) { // 只针对权限做处理，点击选中行。
        // 点击行的样式
        return 'ant-table-row-selected';
      }
    }
    return '';
  }

  render() {
    const { pageSize, total, pageNum, list } = this.state;
    const { columns, pagination, loading, rowSelection, onRow, rowKey, isShowTip, selectKeysNums, handleSelectRows } = this.props;

    const tipContent = (
      <div className={styles.message}>
        <Alert
          message={(
            <div className={styles.tip}>
              已选择
              <a style={{ fontWeight: 600 }}>{selectKeysNums || 0}</a>
              项&nbsp;&nbsp;
              <a onClick={() => handleSelectRows([])} style={{ marginLeft: 24 }}>清空</a>
            </div>
          )}
          type="info"
          showIcon
        />
      </div>
    )

    const paginationData = {
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions: ['5', '10', '15', '20'],
      className: "ant-table-pagination",
      total,
      current: pageNum,
      pageSize,
      onChange: this.changePageNum,
      onShowSizeChange: this.changePageSize,
      // onChange: this.changePage,
      // onShowSizeChange: this.changePage,
    };

    return (
      <div className={styles.root}>
        <Spin spinning={loading}>
          {/* <div className={styles.search}>{searchRender}</div> */}
          {isShowTip ? tipContent : null}
          <div className={styles.content}>
            <Table
              columns={columns}
              dataSource={list}
              pagination={pagination ? paginationData : false}
              rowKey={record => record[rowKey]}
              rowSelection={rowSelection}
              onRow={onRow}
              rowClassName={this.rowClassName} // 权限选中样式特殊处理
            // expandedRowKeys={expandedRowKeys}
            />
          </div>
        </Spin>
      </div>
    );
  }
}


function mapStateToProps({ loading }) {
  return {
    loading: loading.models.tableModel,
  };
}

export default connect(mapStateToProps)(TableTemplate);
