/*
 * @Author: lin.zehong 
 * @Date: 2018-12-02 15:52:07 
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2018-12-14 23:48:06
 * @Desc: 在线摄像头--收藏
 */

import React from 'react';
import TreeCollect from './TreeCollect';
import styles from './CameraCollect.less';

const CameraCollect = (props) => {
  const { dispatch, isExpand } = props;
  function toggleTree() {
    dispatch({
      type: 'onlineCamera/toggleTree',
    });
  }
  const dimension = document.getElementById('cameraCollectId');
  const left = dimension ? dimension.offsetLeft : 0;
  return (
    <div className={styles.root} id="cameraCollectId">
      <div className={styles.wrapTit}>
        <h4 className={styles.left}>摄像头收藏夹</h4>
        <span className={styles.right} onClick={() => toggleTree()}>{isExpand ? "收起" : "展开"}</span>
      </div>
      <TreeCollect {...props} offsetLeft={left} />
    </div>
  );
}

export default CameraCollect;
