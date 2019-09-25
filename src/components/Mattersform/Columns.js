/*
 * @Author: lin.zehong
 * @Date: 2018-08-22 17:14:45
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-08-11 18:07:52
 * @Desc: 共享栏位选择Columns
 */
// import React from 'react';
// import styles from './Columns.less';


/**
 * 函数
 * bussionCol 事项 children 字段
 * handleUpdate 更新方法
 * handleDelete 删除方法
 */
const Columns = (bussionCol) => {
  return (
    [
      {
        title: '事項信息',
        children: bussionCol,
      },
      {
        title: '數據目錄',
        dataIndex: 'dataDirectoryName',
        render: (value, row) => {
          const obj = {
            children: value,
            props: {
              rowSpan: row.dataDirectoryNameRowSpan,
            },
          };
          return obj;
        },
      },
      {
        title: '欄位CODE',
        dataIndex: 'paramCodeAlias',
      },
      {
        title: '欄位名稱',
        dataIndex: 'paramNameAlias',
      },
      {
        title: '欄位描述',
        dataIndex: 'paramIntro',
      },
      {
        title: '欄位模型',
        dataIndex: 'paramType',
      },
    ]
  );
};

export default Columns;
