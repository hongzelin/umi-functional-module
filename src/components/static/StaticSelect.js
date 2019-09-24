/*
 * @Author: lin.zehong
 * @Date: 2018-07-09 14:14:35
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-05-05 14:18:23
 * @Desc: 获取静态数据
 * @param: 后台返回参数：paramKey，paramValue
 */
import React from 'react';
import { connect } from "dva";
import { Select } from 'antd';

const { Option } = Select;

class StaticSelect extends React.Component {

  state = {
    data: [],
  }

  componentDidMount() {
    const { code } = this.props;
    if (!code) {
      return;
    }
    const params = {
      paramKey: code,
    };
    this.getData(params);
  }

  getData = (params) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'staticSelectModel/fetch',
      payload: params,
    }).then(({ errCode, data = [] }) => {
      if (errCode === "0") {
        this.setState({ data });
      }
    })
  }

  render() {
    const { data } = this.state;
    return (
      <Select {...this.props} placeholder="请选择">
        {data.map((item) => (
          <Option key={item.paramKey} value={item.paramKey}>
            {item.paramValue}
          </Option>
        ))}
      </Select>
    );
  }
}

function mapStateToProps({ loading }) {
  return {
    loading: loading.models.staticSelectModel,
  };
}

export default connect(mapStateToProps)(StaticSelect);
