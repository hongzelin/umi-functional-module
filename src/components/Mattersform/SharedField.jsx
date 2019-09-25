/*
 * @Author: lin.zehong
 * @Date: 2019-08-06 15:28:02
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-09-24 17:25:38
 * @Desc: 共享栏位选择
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import { formatDataArr } from 'utils';
import Table from 'components/Table';
import Title from './Title';
import Columns from './Columns';
import styles from './SharedField.less';

export default class SharedField extends Component {
  state = {
    query: {},
  };

  // 数据处理
  handleData = (datas = []) => {
    const formatData = [];
    let _id = 0;
    if (datas.length) {
      datas.forEach(({ dataDirectoryId, dataDirectoryName, paramDetailList }) => {
        paramDetailList.map((item, index) => {
          _id += 1;
          formatData.push({
            id: _id,
            dataDirectoryId,
            dataDirectoryName,
            dataDirectoryNameRowSpan: index === 0 ? paramDetailList.length : 0,
            ...item,
          })
          return null;
        });
      })
    }
    return formatData;
  }

  // 渲染事项 Columns
  renderBussionCol = (data = []) => {
    const { isFromHome, handleOnSureData } = this.props;
    return (
      (data || []).map(item => {
        return {
          title: item.name,
          dataIndex: "businessList",
          key: item.id,
          align: 'center',
          render: (value, record) => {
            if (value && value.length > 0) {
              for (const val of value) {
                if (val.businessName === item.name) {
                  return (
                    isFromHome ?
                      <Checkbox onChange={(e) => handleOnSureData(e, val.businessId, record)} />
                      :
                      <Checkbox checked={val.isChoosed} disabled />
                  )
                }
              }
            }
            return (
              <Checkbox disabled />
            )
          },
        };
      })
    )
  }

  render() {
    const { query } = this.state;
    const { title, columns: cols, type, data } = this.props;
    const tabData = this.handleData(data);
    const _data = formatDataArr(cols, type);
    const bussionCol = this.renderBussionCol(_data);

    const columns = Columns(bussionCol);

    return (
      <div className={styles.root}>
        <Title title={title} />
        <div className={styles.tab}>
          <Table
            isStatic
            dataStatic={tabData}
            columns={columns}
            rowKey="id"
            pagination={false}
            query={query}
            options={{ bordered: true }}
            size="middle"
          />
        </div>
      </div>
    );
  }
}

SharedField.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.any),
  data: PropTypes.arrayOf(PropTypes.any),
  type: PropTypes.string,
  isFromHome: PropTypes.bool,
};

SharedField.defaultProps = {
  columns: [],
  data: [],
  type: "business",
  isFromHome: false,
};
