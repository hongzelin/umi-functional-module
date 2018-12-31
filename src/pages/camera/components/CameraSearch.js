/*
 * @Author: lin.zehong
 * @Date: 2018-12-02 15:52:07
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2018-12-25 13:57:05
 * @Desc: 在线摄像头--头部搜索
 */

import React from 'react';
import { connect } from "dva";
import { Select, Input } from 'antd';
import styles from './CameraSearch.less';

const { Option } = Select;
const { Search } = Input;

class CameraSearch extends React.Component {

  state = {
    _xzqh: "",
    _sxjlx: "",
    _sbmc: "",
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({ // 行政区划
      type: "publicModel/handleXzqhQuery",
      payload: {},
    });
    dispatch({ // 摄像机类型
      type: "publicModel/handleGetSxjlx",
      payload: {},
    });
  }

  handleChangeXzqh = (value) => {
    const { _sxjlx, _sbmc } = this.state;
    this.setState({ _xzqh: value });
    const params = {
      xzqh: value,
      sxjlx: _sxjlx,
      sbmc: _sbmc,
    };
    this.sendAction(params);
  }

  handleChangeSxjLx = (value) => {
    const { _xzqh, _sbmc } = this.state;
    this.setState({ _sxjlx: value });
    const params = {
      xzqh: _xzqh,
      sxjlx: value,
      sbmc: _sbmc,
    };
    this.sendAction(params);
  }

  onSearch = (value) => { // 因为现在可能要做模糊搜索，所以，先注释掉精准查询，定位选中的样式
    // const { dispatch, movePanTo } = this.props;
    const trimValue = this.trim(value);
    const { _xzqh, _sxjlx } = this.state;
    this.setState({ _sbmc: trimValue });
    const params = {
      xzqh: _xzqh,
      sxjlx: _sxjlx,
      sbmc: trimValue,
    };
    // if (trimValue) { // 搜索的名称不为空，才需要走特殊处理，否则跟区域、摄像头类型一样就可以了。
    //   dispatch({
    //     type: "onlineCamera/cameraSearchEff",
    //     payload: params,
    //   }).then((result) => {
    //     if (result && result.length) {
    //       const camera = result[0];
    //       movePanTo(camera);
    //       dispatch({
    //         type: "onlineCamera/changeCameraBm",
    //         payload: { currentCameraBm: camera.sbbm || -1 },
    //       });
    //     }
    //   })
    // } else {
    this.sendAction(params);
    // }
  }

  trim = (str) => {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  }

  sendAction = (params) => {
    const { dispatch } = this.props;
    const { xzqh, sxjlx, sbmc } = params;
    dispatch({
      type: "onlineCamera/cameraQueryEff",
      payload: { xzqh, sxjlx, sbmc },
    })
  }

  render() {
    const { xzqhData, SxjLxData } = this.props;
    let _SxjLxData = SxjLxData || [];
    _SxjLxData = [
      { sxjlx: "", lxmc: "全部" },
      ..._SxjLxData,
    ];
    let _xzqhData = xzqhData || [];
    _xzqhData = [
      { xzqhId: '00', xzqh: "", xzqhmc: "全部" },
      ..._xzqhData,
    ];
    return (
      <div className={styles.root}>
        <Select placeholder="请选择" className={styles.slt} style={{ width: 120 }} onChange={(value) => this.handleChangeXzqh(value)}>
          {_xzqhData &&
            _xzqhData.map(item => (
              <Option key={item.xzqhId} value={item.xzqh}>
                {item.xzqhmc}
              </Option>
            ))}
        </Select>
        <Select placeholder="请选择" className={styles.slt} style={{ width: 120 }} onChange={(value) => this.handleChangeSxjLx(value)}>
          {_SxjLxData &&
            _SxjLxData.map(item => (
              <Option key={item.sxjlx} value={item.sxjlx}>
                {item.lxmc}
              </Option>
            ))}
        </Select>
        <Search
          placeholder="搜索摄像头"
          onSearch={value => this.onSearch(value)}
          enterButton
          style={{ width: 220, marginLeft: '10px' }}
        />
      </div>
    );
  }
}

function mapStateToProps({ publicModel }) {
  return {
    xzqhData: publicModel.xzqhData,
    SxjLxData: publicModel.SxjLxData,
  };
}

export default connect(mapStateToProps)(CameraSearch);
