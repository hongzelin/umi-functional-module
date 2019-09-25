/*
 * @Author: lin.zehong
 * @Date: 2019-08-06 15:23:31
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-08-11 16:06:12
 * @Desc: 发起事项/申请数据目录，选择的项展示
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDataArr } from 'utils';
import Title from './Title';
import styles from './CheckItem.less';

export default class CheckItem extends Component {
  render() {
    const { title, data, type } = this.props;
    const _data = formatDataArr(data, type);
    // const _data = data.map((item = {}) => {
    //   if (type === "business") {
    //     return {
    //       id: item.businessId,
    //       name: item.businessName,
    //     }
    //   } else if (type === "catalog") {
    //     return {
    //       id: item.dataDirectoryId,
    //       name: item.dataDirectoryName,
    //     }
    //   }
    //   return {};
    // })

    return (
      <div className={styles.root}>
        <Title title={title} />
        <div className={styles.list}>
          {
            _data.map((item = {}) => (
              <span className={styles.item} key={item.id}>{item.name}</span>
            ))
          }
        </div>
      </div>
    );
  }
}

CheckItem.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.any),
}

CheckItem.defaultProps = {
  title: '標題',
  type: 'business', // business 事项, catalog 目录
  data: [],
}