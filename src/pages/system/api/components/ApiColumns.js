/*
 * @Author: lin.zehong 
 * @Date: 2018-08-22 17:14:45 
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2018-10-13 10:39:52
 * @Desc: Api管理Columns
 */
import React from 'react';
import { Badge, Divider, Popconfirm } from 'antd';

/**
 * 函数
 * handleView 查看方法
 * handleUpdate 更新方法
 * handleDelete 删除方法
 */
const ApiColumns = (handleView, handleUpdate, handleDelete) => {
  return (
    [
      {
        title: 'API名称',
        dataIndex: 'apiName',
        render: (text, record) => {
          return (
            <span>
              <a onClick={() => handleView(record)}>{text}</a>
            </span>
          );
        },
      },
      {
        title: 'API路径',
        dataIndex: 'apiUrl',
      },
      {
        title: 'API说明',
        dataIndex: 'remark',
      },
      {
        title: '状态',
        dataIndex: 'status', // 10301 生效 10304 失效
        render: (val) => {
          const status = {
            '10301': {
              badgeStatus: 'success',
              text: '有效',
            },
            '10304': {
              badgeStatus: 'error',
              text: '失效',
            },
          };
          if (status[val]) {
            return <Badge status={status[val].badgeStatus} text={status[val].text} />;
          }
        },
      },
      {
        title: '操作',
        render: (text, record, ) => {
          return (
            <span>
              <a onClick={() => handleUpdate(record)}>修改</a>
              <Divider type="vertical" />
              <Popconfirm title="确定删除此记录吗?" onConfirm={() => handleDelete(record)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ]
  );
};

export default ApiColumns;