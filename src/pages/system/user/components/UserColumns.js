/*
 * @Author: lin.zehong
 * @Date: 2018-08-22 17:14:45
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-05-04 14:26:20
 * @Desc: 账号Columns
 */
import React, { Fragment } from 'react';
import { Badge, Divider, Popconfirm } from 'antd';

/**
 * 函数
 * handleView 查看方法
 * handleUpdate 更新方法
 * handleDelete 删除方法
 * tooltipRender 根据需要显示toolTip标签
 */
const UserColumns = (handleView, handleUpdate, handleDelete, tooltipRender) => {
  return (
    [
      {
        title: '账号',
        dataIndex: 'userCode',
        render: (val, row) => (
          <Fragment>
            <a
              onClick={(e) => {
                e.preventDefault();
                handleView(row);
              }}
            >
              {val}
            </a>
          </Fragment>
        ),
      },
      {
        title: '用户名称',
        dataIndex: 'userName',
      },
      {
        title: '角色',
        dataIndex: 'nickname',
        render(text, val) {
          const roleList = val.roles || [];
          const roleText = roleList.map(role => {
            return role.rolesName;
          }).join('，');
          return tooltipRender && tooltipRender(roleText);
        },
      },
      {
        title: '备注',
        dataIndex: 'comments',
        render(text) {
          return tooltipRender && tooltipRender(text);
        },
      },
      {
        title: '状态',
        dataIndex: 'useState', // 00A 生效 00X 失效
        render(val) {
          const status = {
            '10301': {
              badgeStatus: 'success',
              text: '有效',
            },
            '10304': {
              badgeStatus: 'error',
              text: '无效',
            },
          };
          return <Badge status={status[val].badgeStatus} text={status[val].text} />;
        },
      },
      {
        title: '操作',
        render: (val, record) => {
          if (record.useState === 10301) {
            return (
              <div>
                <Fragment>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      handleUpdate(val);
                    }}
                  >
                    修改
                  </a>
                </Fragment>
                <Divider type="vertical" />
                <Popconfirm title="确定删除此记录吗?" onConfirm={() => handleDelete(val)} okText="删除" cancelText="取消">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    删除
                  </a>
                </Popconfirm>
              </div>
            );
          } else {
            return (<span />);
          }
        },
      },
    ]
  );
};

export default UserColumns;
