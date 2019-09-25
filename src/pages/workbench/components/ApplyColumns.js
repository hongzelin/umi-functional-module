/*
 * @Author: lin.zehong
 * @Date: 2018-08-22 17:14:45
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-08-16 11:27:23
 * @Desc: 申請单 Columns
 */
import React from 'react';
import { Badge, Divider, Popconfirm } from 'antd';
import { ADMIN } from '../constants';
import styles from './Columns.less';

// 詳情
const detail = (handleView, record) => (
  <span className={styles.handle}>
    <a onClick={() => handleView(record)}>詳情</a>
  </span>
);

// 詳情和審批意見
const detailAndIdea = (handleView, record, handleIdea) => (
  <span className={styles.handle}>
    <a onClick={() => handleView(record)}>詳情</a>
    <Divider type="vertical" />
    <a onClick={() => handleIdea(record)}>審批意見</a>
  </span>
);

// 詳情和撤回
const detailAndGoback = (handleView, record, handleGoBack) => (
  <span className={styles.handle}>
    <a onClick={() => handleView(record)}>詳情</a>
    <Divider type="vertical" />
    <Popconfirm title="確定要撤回此申請單嗎?" onConfirm={() => handleGoBack(record)}>
      <a>撤回</a>
    </Popconfirm>
  </span>
);

// 操作
const renderOperate = (handleView, handleIdea, handleGoBack, record, options) => {
  const { role, status } = options;
  // admin，待審批
  if (role === ADMIN && status === "待審批") {
    return detail(handleView, record);
  }
  // 委辦局、申請方，待審批
  if (status === "待審批") {
    return detailAndGoback(handleView, record, handleGoBack);
  }
  if (status === "已審批") {
    return detailAndIdea(handleView, record, handleIdea);
  }
  if (status === "已撤回") {
    return detail(handleView, record);
  }
}

/**
 * 函数
 * handleView 详情
 * handleIdea 審批意見
 * handleGoBack 撤回
 * options 其他參數
 */
const Columns = (handleView, handleIdea, handleGoBack, options = {}) => {
  const { status: s } = options;
  const renderFilter = (s === "待審批" || s === "已撤回") ? {} : {
    filters: [
      { text: "審批通過", value: 1 },
      { text: "審批不通過", value: 0 },
    ],
    filterMultiple: false,
  };

  return (
    [
      {
        title: '申請單編碼',
        dataIndex: 'applyCode',
        render: (text) => {
          return (
            <span title={text}>
              {text}
              {/* <a onClick={() => handleView(record)}>{text}</a> */}
            </span>
          );
        },
      },
      {
        title: '發起事項',
        dataIndex: 'launchBusinessNames',
        render: (text) => {
          return (
            <span title={text}>
              {text}
            </span>
          );
        },
      },
      {
        title: '發起部門',
        dataIndex: 'launchDeptName',
        // render: (val) => {
        //   const value = {
        //     '1': '一级菜单',
        //     '2': '二级菜单',
        //     '3': '三级菜单',
        //   };
        //   return <span>{value[val]}</span>;
        // },
      },
      {
        title: '申請數據目錄',
        dataIndex: 'dataDirectoryNames',
        render: (text) => {
          return (
            <span title={text}>
              {text}
            </span>
          );
        },
      },
      {
        title: '申請理由',
        dataIndex: 'applyReason',
        render: (text) => {
          return (
            <span title={text}>
              {text}
            </span>
          );
        },
      },
      {
        title: '狀態',
        dataIndex: 'stateAndResult', // 10301 生效 10304 失效
        ...renderFilter,
        render: (val) => {
          const status = {
            '審批通過': {
              badgeStatus: 'success',
              text: '審批通過',
            },
            '待審批': {
              badgeStatus: 'warning',
              text: '待審批',
            },
            '審批不通過': {
              badgeStatus: 'error',
              text: '審批不通過',
            },
            '撤回': {
              badgeStatus: 'default',
              text: '撤回',
            },
          };
          if (status[val]) {
            return <Badge status={status[val].badgeStatus} text={status[val].text} />;
          }
        },
      },
      {
        title: '發起時間',
        dataIndex: 'launchTime',
      },
      {
        title: '審批時間',
        dataIndex: 'approvalTime',
      },
      {
        title: '操作',
        render: (text, record) => {
          return (
            renderOperate(handleView, handleIdea, handleGoBack, record, options)
          );
        },
      },
    ]
  );
};

export default Columns;
