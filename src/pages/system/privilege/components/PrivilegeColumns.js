/*
 * @Author: lin.zehong
 * @Date: 2018-08-22 17:14:45
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-01-02 16:12:23
 * @Desc: 权限Columns
 */
import React, { Fragment } from 'react';
import { Badge, Divider, Popconfirm } from 'antd';

/**
 * 函数
 * handleView 查看方法
 * handleUpdate 更新方法
 * handleDelete 删除方法
 */
const PrivilegeColumns = (handleView, handleUpdate, handleDelete) => {
  return (
    [
      {
        title: '权限名称',
        dataIndex: 'privName',
        render: (val, row) => (
          <Fragment>
            <a onClick={() => handleView(row)}>{val}</a>
          </Fragment>
        ),
      },
      {
        title: '状态',
        dataIndex: 'useState', // 10301 生效 10304 失效
        render(val) {
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
          return <Badge status={status[val].badgeStatus} text={status[val].text} />;
        },
      },
      {
        title: '操作',
        render: (val) => {
          return (
            <Fragment>
              <a onClick={() => handleUpdate(val)}>修改</a>
              <Divider type="vertical" />
              <Popconfirm title="确定删除此记录吗?" onConfirm={() => handleDelete(val)}>
                <a onClick={(e) => { e.preventDefault() }}>删除</a>
              </Popconfirm>
            </Fragment>
          );
        },
      },
    ]

  );
};

// 权限关联菜单
const RelMenuColumns = (handleRelDelete) => {
  return (
    [
      {
        title: '菜单名称',
        dataIndex: 'menuName',
      },
      {
        title: '菜单路径',
        dataIndex: 'menuUrl',
      },
      {
        title: '操作',
        render: (val) => {
          return (
            <Fragment>
              <Popconfirm title="确定删除此记录吗?" onConfirm={() => handleRelDelete(val)}>
                <a href="" onClick={(e) => { e.preventDefault(); }}>删除</a>
              </Popconfirm>
            </Fragment>
          );
        },
      },
    ]
  );
};

// 权限关联API
const RelApiColumns = (handleRelDelete) => {
  return (
    [
      {
        title: 'API名称',
        dataIndex: 'apiName',
      },
      {
        title: 'API路径',
        dataIndex: 'apiUrl',
      },
      {
        title: '操作',
        render: (val) => {
          return (
            <Fragment>
              <Popconfirm title="确定删除此记录吗?" onConfirm={() => handleRelDelete(val)}>
                <a href="" onClick={(e) => { e.preventDefault(); }}>删除</a>
              </Popconfirm>
            </Fragment>
          );
        },
      },
    ]
  );
};

export { PrivilegeColumns, RelMenuColumns, RelApiColumns };
