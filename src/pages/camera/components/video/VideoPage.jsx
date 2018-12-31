/*
 * @Author: lin.zehong 
 * @Date: 2018-09-27 20:39:30 
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2018-12-20 15:05:06
 * @Desc: 视频直播 主页
 */
import React from 'react';
import { Row, Col } from 'antd';
import Zcon from "zteui-icon";
import { connect } from "dva";
import VideoPlayer from '../../../../components/aliplayer/VideoPlayer';
import CropperPic from '../../../../components/aliplayer/CropperPic';
import PlayerCollect from '../PlayerCollect';
import styles from './VideoPage.less';

const index = 0;

@connect()
class VideoPage extends React.Component {
  state = {
    cropResult: null,
    visiblePic: false,
    // videoId: "videoId_0",
  }

  videoId = `videoId_${index + 1}`;

  componentDidMount() {
    // const timestamp = new Date().getTime();
    // this.setState({ videoId: `videoId_${timestamp}` }, () => {
    //   this.initVideo();
    // });
    this.index = index + 1;
    this.initVideo();
  }

  componentWillUnmount() {
    if (!this.video) return;
    const { videoId } = this;
    const options = { videoId };
    const player = this.video.getPlayer();
    if (player) {
      const ele = document.getElementById("videoParent");
      if (!ele) return;
      this.video.removePlayer(ele, options);
    }
  }

  initVideo = () => {
    // const { camera, dispatch } = this.props;
    // if (!camera.sxtxxId) return;
    // dispatch({
    //   type: "onlineCamera/playing",
    //   payload: { sxtxxId: camera.sxtxxId },
    // }).then(res => {
    //   if (res.errCode === 0 && res.data && res.data.spyUrl) {
    //     this.startPlayer(res.data.spyUrl);
    //   }
    // });

    this.startPlayer("http://common.qupai.me/player/qupai.mp4");

    // this.startPlayer("http://live.hkstv.hk.lxdns.com/live/hks/playlist.m3u8");
  }

  startPlayer = (playingUrl) => {
    if (playingUrl) {
      // 创建播放器
      const ele = document.getElementById("videoParent");
      const { videoId } = this;
      this.video = new VideoPlayer();
      const options = { liveStatus: 1, videoId }; // 1:直播，2点播
      this.video.play(playingUrl, ele, options);

      const player = this.video.getPlayer();
      if (player) {
        player.on('snapshoted', (data) => {
          const pictureData = data.paramData.base64;
          if (player.fullscreenService.isFullScreen) {
            player.fullscreenService.cancelFullScreen()
          }
          this.setState({
            visiblePic: true,
            cropResult: pictureData,
          });
        });
      }
    }
  }

  handleCancel = () => {
    const { handleCancel } = this.props;
    handleCancel();
  }

  handleScreenScaleCancel = () => {
    this.initVideo();
  }

  closePlayer = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "onlineCamera/changeCameraId",
      payload: { currentCameraId: -1, currentCameraBm: '-1' },
    });
  }

  render() {
    const { visiblePic, cropResult } = this.state;
    const { camera } = this.props;
    return (
      <div className={styles.root}>

        <div className="ant-popover ant-popover-placement-top">
          <div className="ant-popover-content">
            <div className="ant-popover-arrow" />
            <div className="ant-popover-inner" role="tooltip">
              <div className="ant-popover-title">{camera.sbmc}</div>
              <div className="ant-popover-inner-content" style={{ width: '300px', height: '218px' }}>
                <Row className={styles.content}>
                  <Col span={24} className={styles.video} id="videoParent">
                    <div id={this.videoId} />
                  </Col>
                </Row>
                <Zcon type="close" className={styles.iconClose} onClick={() => this.closePlayer()} />
                <PlayerCollect camera={camera} />
              </div>
            </div>
          </div>
        </div>

        {
          visiblePic ?
            <CropperPic src={cropResult} hiddenVisible={() => this.setState({ visiblePic: false })} />
            :
            null
        }
      </div>
    );
  }
}

export default VideoPage;
