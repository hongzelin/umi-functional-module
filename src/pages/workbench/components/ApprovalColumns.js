/*
 * @Author: lin.zehong
 * @Date: 2018-08-22 17:14:45
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-08-20 15:35:27
 * @Desc: 审批单 Columns
 */
import React from 'react';
import { Badge, Divider } from 'antd';
import { ADMIN, BUREAUS } from '../constants';
import styles from './Columns.less';

// 詳情
const detail = (handleView, record) => (
  <span className={styles.handle}>
    <a onClick={() => handleView(record)}>詳情</a>
  </span>
);

// 詳情和審批
const detailAndApporval = (handleView, record, handleApproval) => (
  <span className={styles.handle}>
    <a onClick={() => handleView(record)}>詳情</a>
    <Divider type="vertical" />
    <a onClick={() => handleApproval(record)}>審批</a>
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

// 操作
const renderOperate = (handleView, handleIdea, handleApproval, record, options) => {
  const { role, status } = options;
  if (role === ADMIN && status === "待審批") {
    return detail(handleView, record);
  }
  if (role === BUREAUS && status === "待審批") {
    return detailAndApporval(handleView, record, handleApproval);
  }
  if (status === "已審批") {
    return detailAndIdea(handleView, record, handleIdea);
  }
}

/**
 * 函数
 * handleView 详情
 * handleIdea 審批意見
 * handleApproval 審批
 * options 其他參數
 */
const Columns = (handleView, handleIdea, handleApproval, options = {}) => {
  const { status: s } = options;
  const renderFilter = s === "待審批" ? {} : {
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
        // filters: [
        //   { text: "文化局", value: 0 },
        //   { text: "行政公職局", value: 1 },
        //   { text: "法務局", value: 2 },
        //   { text: "身份證明局", value: 3 },
        // ],
        // filterMultiple: false,
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
        dataIndex: 'stateAndResult',
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
        title: '操作',
        render: (text, record) => {
          return (
            renderOperate(handleView, handleIdea, handleApproval, record, options)
          );
        },
      },
    ]
  );
};

export default Columns;
