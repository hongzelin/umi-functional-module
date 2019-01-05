/*
 * @Author: lin.zehong
 * @Date: 2018-08-07 17:17:26
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-01-05 21:48:34
 * @Desc: Tree && TreeSelect 组件
 */

import React, { PureComponent } from 'react';
import { connect } from "dva";
import { TreeSelect, Tree, message } from 'antd';
import PropTypes from 'prop-types';

const { TreeNode } = Tree;

/**
 * 基础TreeSelect组件，基于Antd TreeSelect和tree
 * initTitle 初始化根部显示的标题
 * isSpecialTitle 由于名称可以重复，所以，增加此属性，扩展title新增名称加路径
 * method 方法
 * paramKey 查询需要传递的参数key
 * colums 后台返回来对应的字段
 * onChange 操作方法
 */
class ParentTreeSelect extends PureComponent {

  constructor(props) {
    super(props);

    const { initTitle } = this.props;
    this.state = {
      treeData: [{
        title: initTitle,
        key: '-1',
        value: '-1',
        level: 0,
      }],
    };
  }

  onLoadData = (treeNode) => { // 这里的treeNode参数，其实是render中，this.state.treeData
    return new Promise((resolve) => {
      if (treeNode.props.children && treeNode.props.children.length > 0) {
        resolve();
        return;
      }
      // 查询上级菜单接口待定 pmenuid--父级菜单id
      const { method, paramKey, dispatch } = this.props;
      const params = {};
      params[paramKey] = treeNode.props.value;

      dispatch({
        type: method,
        payload: params,
      }).then(result => {
        if (!result) {
          return;
        }
        const { data } = result;
        if (result.errCode !== '0') {
          message.error(result.errMsg);
        } else {
          const treeD = [];
          for (let i = 0; i < data.length; i += 1) {
            const { colums } = this.props;
            treeD.push({
              title: colums.isSpecialTitle ? `${data[i][colums.title]}(${data[i].menuUrl})` : data[i][colums.title],
              key: data[i][colums.key],
              level: data[i][colums.level],
              value: `${data[i][colums.value]}`,
              isLeaf: data[i][colums.isLeaf],
            });
          }
          treeNode.props.dataRef.children = treeD;
          const { treeData } = this.state;
          this.setState({
            treeData: [...treeData],
          });
        }
        resolve();
      });
    });
  }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode {...item} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} dataRef={item} />;
    });
  }

  render() {
    const { onChange, disabled, placeholder, style, value } = this.props;
    const { treeData } = this.state;
    return (
      <TreeSelect
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        style={style}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        labelInValue
        loadData={this.onLoadData}
      >
        {this.renderTreeNodes(treeData)}
      </TreeSelect>
    );
  }
}

ParentTreeSelect.propTypes = {
  initTitle: PropTypes.string,
  method: PropTypes.string.isRequired,
  paramKey: PropTypes.string.isRequired,
  colums: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

ParentTreeSelect.defaultProps = {
  initTitle: "根节点",
};

export default connect()(ParentTreeSelect);
