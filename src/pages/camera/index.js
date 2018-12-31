/*
 * @Author: lin.zehong 
 * @Date: 2018-12-02 15:52:07 
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2018-12-15 22:27:44
 * @Desc: 在线摄像头
 */

import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import styles from './index.less';
import CameraMap from './components/CameraMap';

const cameraPage = ({ dispatch, onlineCamera, loading }) => {

  const {
    isExpand,
    webcamAllData,
  } = onlineCamera;

  const mapProps = {
    dispatch,
    webcamAllData,
    isExpand,
  };

  return (
    <div className={styles.root}>
      <Spin spinning={loading.global}>
        <CameraMap {...mapProps} />
      </Spin>
    </div>
  );
}

function mapStateToProps({ onlineCamera, loading }) {
  return {
    onlineCamera,
    loading,
  };
}

export default connect(mapStateToProps)(cameraPage);
