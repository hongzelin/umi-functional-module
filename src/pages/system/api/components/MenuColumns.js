/*
 * @Author: lin.zehong
 * @Date: 2018-08-22 17:14:45
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2018-12-28 15:56:09
 * @Desc: 菜单Columns
 */
import React from 'react';
import { Badge, Divider, Popconfirm } from 'antd';
import styles from './ApiPage.less';

/**
 * 函数
 * handleView 查看方法
 * handleUpdate 更新方法
 * handleDelete 删除方法
 */
const MenuColumns = (handleView, handleUpdate, handleDelete) => {
  return (
    [
      {
        title: '菜单名称',
        dataIndex: 'menuName',
        render: (text, record) => {
          return (
            <span>
              <a onClick={() => handleView(record)}>{text}</a>
            </span>
          );
        },
      },
      {
        title: '菜单路径',
        dataIndex: 'menuUrl',
      },
      {
        title: '菜单层级',
        dataIndex: 'menuLevel',
        render: (val) => {
          const value = {
            '1': '一级菜单',
            '2': '二级菜单',
            '3': '三级菜单',
          };
          return <span>{value[val]}</span>;
        },
      },
      {
        title: '状态',
        dataIndex: 'useState', // 10301 生效 10304 失效
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
          if (record.useState === 10301) {
            return (
              <span className={styles.handle}>
                <a onClick={() => handleUpdate(record)}>修改</a>
                <Divider type="vertical" />
                <Popconfirm title="确定删除此记录吗?" onConfirm={() => handleDelete(record)}>
                  <a>删除</a>
                </Popconfirm>
              </span>
            );
          } else {
            return (<span />);
          }
        },
      },
    ]
  );
};

export default MenuColumns;
