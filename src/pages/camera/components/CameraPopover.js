/*
 * @Author: lin.zehong 
 * @Date: 2018-12-06 10:54:46 
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2018-12-20 16:20:52
 * @Desc: 摄像头popover
 */

import React from 'react';
import { connect } from "dva";
import { Popover } from 'antd';
import Zcon from "zteui-icon";
import VideoPage from './video/VideoPage';
import styles from './CameraPopover.less';

class CameraPopover extends React.PureComponent {
  state = {
    hovered: false,
  };

  handleHoverChange = (visible) => {
    this.setState({
      hovered: visible,
    });
  }

  player = () => {
    this.setState({ hovered: false });
    const { dispatch, camera } = this.props;
    dispatch({
      type: "onlineCamera/changeCameraId",
      payload: { currentCameraId: camera.sxtxxId, currentCameraBm: camera.sbbm },
    });
    // movePanTo(camera); // 移动地图
  }

  render() {
    const { camera, xzqhData, sxjLxData, keyId, currentId, currentBm } = this.props;
    const { sbbm, sbmc, sxjlx, xzqh, azdz, cjrqDt, sbzt } = camera;
    const sxjlxItem = sxjLxData.filter(item => item.sxjlx === sxjlx)[0]; // 摄像机类型静态数据获取
    const xzqhItem = xzqhData.filter(item => item.xzqh === xzqh)[0]; // 区域静态数据获取
    const { hovered } = this.state;
    const hoverContent = (
      <ul className={styles.iconList}>
        <li className={styles.iconitem}>
          <span className={styles.title}>设备编码</span>
          <span className={styles.val}>{sbbm}</span>
        </li>
        <li className={styles.iconitem}>
          <span className={styles.title}>设备名称</span>
          <span className={styles.val}>{sbmc}</span>
        </li>
        <li className={styles.iconitem}>
          <span className={styles.title}>类型</span>
          <span className={styles.val}>{sxjlxItem ? sxjlxItem.lxmc : ''}</span>
        </li>
        <li className={styles.iconitem}>
          <span className={styles.title}>区域</span>
          <span className={styles.val}>{xzqhItem ? xzqhItem.xzqhmc : ''}</span>
        </li>
        <li className={styles.iconitem}>
          <span className={styles.title}>安装地址</span>
          <span className={styles.val}>{azdz}</span>
        </li>
        <li className={styles.iconitem}>
          <span className={styles.title}>安装时间</span>
          <span className={styles.val}>{cjrqDt}</span>
        </li>
        <li className={styles.iconitem}>
          <span className={styles.title}>状态</span>
          <span className={styles.val}>{sbzt === "1" ? '在线' : '离线'}</span>
        </li>
      </ul>
    );
    return (
      <div className={styles.root}>
        <Popover
          style={{ width: 500 }}
          content={hoverContent}
          title="基础信息"
          trigger="hover"
          visible={hovered}
          onVisibleChange={this.handleHoverChange}
        >
          {
            sxjlx === 3 || sxjlx === 4 || sxjlx === 5 ?
              <Zcon type="gun" className={currentBm === sbbm ? styles.active : ''} style={{ color: sbzt === "1" ? "#1890FF" : "#5B6586" }} onClick={() => this.player()} /> :
              <Zcon type="monitor" className={currentBm === sbbm ? styles.active : ''} style={{ color: sbzt === "1" ? "#1890FF" : "#5B6586" }} onClick={() => this.player()} />
          }
        </Popover>
        {
          currentId === keyId ?
            <div style={{ position: 'relative', left: '-146px', top: '-280px' }}><VideoPage camera={camera} /></div>
            : null
        }
      </div>
    );
  }
}

function mapStateToProps({ publicModel, loading, onlineCamera }) {
  return {
    sxjLxData: publicModel.SxjLxData,
    xzqhData: publicModel.xzqhData,
    loading,
    currentId: onlineCamera.currentCameraId, // 当前播放器的摄像头sxtxxId
    currentBm: onlineCamera.currentCameraBm, // 当前播放器的摄像头编码
  };
}

export default connect(mapStateToProps)(CameraPopover);
