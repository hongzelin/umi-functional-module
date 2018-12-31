/*
 * @Author: lin.zehong
 * @Date: 2018-12-02 15:52:07
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2018-12-19 14:11:34
 * @Desc: 在线摄像头--地图
 */

import React from 'react';
import { connect } from "dva";
import { message } from 'antd';
import Imap from '@cbd/react-imap';
import Supercluster from "supercluster";
import CameraCollect from './CameraCollect';
import CameraSearch from './CameraSearch';
import CameraPopover from './CameraPopover';
import styles from './CameraMap.less';

const floatDivStyle = { position: "absolute" };
const initZoom = 16; // 初始化层级是10比较舒服
let indexCluster = 0;

class CameraMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.data = [];
    this.index = null;
    this.state = {
      floatLayerData: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "onlineCamera/cameraQueryEff",
      payload: {},
    });
  }

  componentDidUpdate = prevProps => {
    const webcamAllDataPrev = prevProps.webcamAllData;
    const { webcamAllData } = this.props;
    if (webcamAllDataPrev === webcamAllData) return;
    const clustersData = [];
    webcamAllData.map((item, index) => {
      const cluster = {
        type: "Feature",
        id: index,
        geometry: {
          type: "Point",
          coordinates: [item.jd, item.wd, item.sxtxxId],
          cameraObj: item,
        },
      };
      clustersData.push(cluster); // 聚合数据
      return null;
    });
    this.doCluster(clustersData); // 先聚合，后把聚合的数据展示在地图上
  };

  doCluster = cameraData => {
    const index = new Supercluster({
      radius: 80,
      maxZoom: 18,
    });
    index.load(cameraData);
    this.index = index;
    this.handleZoomChange(initZoom);
  };

  handleZoomChange = zoom => {
    this.currentZoom = zoom;
    if (zoom === 18) {
      this.renderAllCamera(); // 最大层级，渲染展开所在区域的所有摄像头
      return;
    }
    const floatData = [];
    try {
      const clusters = this.getClustersByZoom(zoom);
      clusters.map(({ geometry, properties }) => {
        const [lng, lat, keyId] = geometry.coordinates;
        const { cameraObj } = geometry;
        let fData = "";
        if (properties && properties.point_count > 0) {
          fData = this.renderCluster(lng, lat, properties); // 聚合数据
        } else {
          fData = this.renderOneCamera(lng, lat, keyId, cameraObj); // 摄像头
        }
        floatData.push(fData);
        return null;
      });
      this.setState({
        floatLayerData: floatData,
      });
    } catch (e) {
      return "";
    }
  };

  // 根据层级，获取当前区域的聚合数据
  getClustersByZoom = zoom => {
    const bounds = this.amap.map.getBounds();
    const bboxf = [
      bounds.southwest.lng,
      bounds.southwest.lat,
      bounds.northeast.lng,
      bounds.northeast.lat,
    ];
    const clusters = this.index.getClusters(bboxf, zoom);
    return clusters;
  };

  // 渲染所有摄像头,18级为最后一集，应该把可见区域的所有集合都散开；关键方法 getLeaves
  renderAllCamera = () => {
    const clusters = this.getClustersByZoom(18);
    const floatData = [];
    clusters.map(({ geometry, properties }) => {
      if (properties && properties.point_count > 0) {
        const finishCamera = this.index.getLeaves(properties.cluster_id); // 可见区域最后一级，应该展开把还没有散开的聚合摄像头散开
        finishCamera.map(finishItem => {
          const [lng, lat, keyId] = finishItem.geometry.coordinates;
          const { cameraObj } = finishItem.geometry;
          const fData = this.renderOneCamera(lng, lat, keyId, cameraObj);
          floatData.push(fData);
          return null;
        });
      } else {
        const [lng, lat, keyId] = geometry.coordinates;
        const { cameraObj } = geometry;
        const fData = this.renderOneCamera(lng, lat, keyId, cameraObj);
        floatData.push(fData);
      }
      return null;
    });
    this.setState({
      floatLayerData: floatData,
    });
  };

  // 返回渲染单个摄像头floatData对象
  renderOneCamera = (jd, wd, keyId, cameraObj) => {
    return {
      lng: jd,
      lat: wd,
      key: keyId,
      render: pixel => {
        return (
          <div
            key={keyId}
            style={Object.assign({}, floatDivStyle, {
              left: pixel.x,
              top: pixel.y,
            })}
          >
            <div key={keyId} className={styles.mark}>
              <CameraPopover camera={cameraObj} keyId={keyId} />
            </div>
          </div>
        )
      },
    };
  };

  // 渲染聚合数据
  renderCluster = (jd, wd, properties) => {
    indexCluster += 1;
    const keyId = `cluster_${indexCluster + 1}`;
    const size = this.getPointSize(properties.point_count);
    return {
      lng: jd,
      lat: wd,
      key: keyId,
      render: pixel => {
        return (
          <div
            key={keyId}
            style={Object.assign({}, floatDivStyle, {
              left: pixel.x,
              top: pixel.y,
            })}
          >
            <div key={keyId} className={styles.clusterWrap}>
              <div className={styles.contentWrap} style={{ width: size, height: size }}>
                <span className={styles.num}>{properties.point_count}</span>
              </div>
            </div>
          </div>
        )
      },
    };
  };

  getPointSize = (num) => {
    if (num < 10) { return '24px'; }
    else if (num < 100) { return '30px'; }
    else if (num < 1000) { return '36px'; }
    else { return '40px'; }
  };

  movePanTo = (camera) => {
    this.amap.panTo(camera.jd, camera.wd);
    if (this.currentZoom && this.currentZoom !== 18) { // 先在当前层级获取摄像头，如果没有再下钻到最大层级（如果是18级最大层级了，就不需要判断了。）
      const flag = this.checkCurrentZoomCamera(camera.sxtxxId);
      if (!flag) { // 如果找不到，则下钻到最大层级
        this.currentZoom = 18; // 最大层级
      }
    }
  };

  // 校验、查询当前层级是否有该摄像头
  checkCurrentZoomCamera = (sxtxxId) => {
    const clusters = this.getClustersByZoom(this.currentZoom);
    for (let i = 0; i < clusters.length; i += 1) {
      const { geometry, properties } = clusters[i];
      if (!(properties && properties.point_count > 0)) { // 与摄像头做对比，聚合数据不需要。
        const keyId = geometry.coordinates[2];
        if (sxtxxId === keyId) {
          return true;
        }
      }
    }
    return false;
  }

  onMoveMap = () => { // 移动的时候，再去加载可见区域的摄像头；superCluster插件已经缓存好了数据。
    if (this.currentZoom) {
      this.handleZoomChange(this.currentZoom);
    }
  };

  onZoomChangeMap = (zoom) => {
    const { currentId } = this.props;
    if (currentId === -1) { // 说明当前没有视频在播放
      this.handleZoomChange(zoom);
    } else { // 关闭播放器，再给提示
      this.playerClose();
      message.warning('视频播放已经停止');
    }
  }

  playerClose = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "onlineCamera/changeCameraId",
      payload: { currentCameraId: -1, currentCameraBm: '-1' },
    });
  }

  registMap = map => {
    this.amap = map;
  };

  render() {
    const { floatLayerData } = this.state;
    const { dispatch, visibleColl, modalTitle, menuKey, isExpand } = this.props;
    const collectProps = { dispatch, modalTitle, menuKey, isExpand };
    return (
      <div className={styles.root}>
        {<Imap
          ref={this.registMap}
          initProps={{
            zoom: initZoom,
            center: { lng: 121.49066, lat: 31.2377 },
          }}
          style={{ width: window.innerWidth - 80, height: window.innerHeight - 64 }}
          onZoomChange={this.onZoomChangeMap}
          onMove={this.onMoveMap}
          floatLayerData={floatLayerData}
        />}
        <CameraSearch movePanTo={this.movePanTo} />
        <CameraCollect {...collectProps} visible={visibleColl} movePanTo={this.movePanTo} />
      </div>
    );
  }
}

function mapStateToProps({ onlineCamera }) {
  return {
    visibleColl: onlineCamera.visible, // 收藏夹展开收起状态控制
    modalTitle: onlineCamera.modalTitle,
    menuKey: onlineCamera.menuKey,
    isExpand: onlineCamera.isExpand,
    currentId: onlineCamera.currentCameraId, // 当前播放器的摄像头sxtxxId
  };
}

export default connect(mapStateToProps)(CameraMap);
