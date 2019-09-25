/*
 * @Author: lin.zehong
 * @Date: 2019-08-06 15:11:07
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-08-20 14:13:53
 * @Desc: 申请单或者审批单，头部标题审批结果
 */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from './TitleResult.less';

export default class TitleResult extends Component {

  switchColor = () => {
    const { title } = this.props;
    let renderColor = {};
    switch(title) {
      case '審批通過':
        renderColor = { color: '#52C41A', border: '1px solid #B7EB8F', background: '#F6FFED'};
        break;
      case '待審批':
        renderColor = { color: '#1890FF', border: '1px solid #91d5ff', background: '#E6F7FF'};
        break;
      case '審批不通過':
        renderColor = { color: '#FA541C', border: '1px solid #FFBB96', background: '#FFF2E8'};
        break;
      case '已撤回':
        renderColor = { color: '#939393', border: '1px solid #c5c5c5', background: '#f2f2f2'};
        break;
      default:
        renderColor = { color: '#1890FF', border: '1px solid #91d5ff', background: '#E6F7FF'};
    };
    return renderColor;
  }

  render() {
    const { title } = this.props;
    return (
      <span className={styles.result} style={this.switchColor()}>{title}</span>
    );
  }
}

TitleResult.propTypes = {
  title: PropTypes.string,
};

TitleResult.defaultProps = {
  title: "待審批",
};