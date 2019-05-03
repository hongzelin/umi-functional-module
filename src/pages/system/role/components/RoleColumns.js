/*
 * @Author: lin.zehong
 * @Date: 2018-08-22 17:14:45
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-01-07 17:10:12
 * @Desc: 角色Columns
 */
import React, { Fragment } from 'react';
import { Badge, Divider, Popconfirm } from 'antd';

/**
 * 函数
 * handleUpdate 更新方法
 * handleDelete 删除方法
 */
const RColumns = (handleUpdate, handleDelete) => {
  return (
    [
      {
        title: '角色名称',
        dataIndex: 'rolesName',
        width: 110,
      },
      {
        title: '角色描述',
        dataIndex: 'comments',
        width: 180,
      },
      {
        title: '状态',
        dataIndex: 'useState',
        width: 60,
        render: (text) => {
          let val = "";
          let code = text;
          if (code === 10301) {
            val = "有效";
            code = "success";
          } else if (code === 10304) {
            val = "无效";
            code = "error";
          }
          return (
            <Badge status={code} text={val} />
          );
        },
      },
      {
        title: '操作',
        width: 100,
        render: (val) => {
          if (val.useState === 10301) {
            return (
              <Fragment>
                <a onClick={() => { handleUpdate(val) }}>修改</a>
                <Divider type="vertical" />
                <Popconfirm title="确定删除此记录吗?" onConfirm={() => handleDelete(val)}>
                  <a onClick={(e) => { e.preventDefault(); }}>删除</a>
                </Popconfirm>
              </Fragment>
            );
          }
        },
      },
    ]

  );
};

const RolePrivColumns = (handleDeleteRolePriv) => {
  return (
    [
      {
        title: '访问权限',
        dataIndex: 'privName',
      },
      {
        title: '操作',
        width: '20%',
        render: (val) => {
          return (
            <Fragment>
              <Popconfirm title="确定删除此记录吗?" onConfirm={() => handleDeleteRolePriv(val)}>
                <a href="">删除</a>
              </Popconfirm>
            </Fragment>
          );
        },
      },
    ]
  );
};

export { RColumns, RolePrivColumns };
