/*
 * @Author: lin.zehong 
 * @Date: 2018-09-13 20:41:33 
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2018-12-19 12:25:40
 * @Desc: Cropper组件，截图的相关操作
 */
import React from 'react';
import { Button, Modal } from 'antd';
import Cropper from 'react-cropper';
import Zcon from 'zteui-icon';
import styles from './CropperPic.less';

export default class CropperPic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cropResult: null,
      isActive: "drag",
    };
  }

  cropImage = () => {
    if (this.cropper.getCroppedCanvas() === 'null') {
      return false;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
    });
  }

  crop = () => {
    this.setState({ isActive: "crop" });
    if (this.checkCropper()) {
      this.cropper.setDragMode("crop");
    }
  }

  download = () => {
    this.setState({ isActive: "download" });
    const { cropResult } = this.state;
    let pictureData = "";
    if (cropResult) {
      pictureData = cropResult;
    } else {
      pictureData = this.cropper.getCroppedCanvas().toDataURL();
    }
    // const pictureData = cropResult ? cropResult : this.cropper.getCroppedCanvas().toDataURL(); // base64
    this.dataURIToBlob(pictureData, this.callback); // base64也就是dataURI
    // let downloadElement = document.createElement('a');
    // downloadElement.setAttribute('href', pictureData);
    // let fileName = '截图' + Date.now() + '.png';
    // downloadElement.setAttribute('download', fileName);
    // downloadElement.click();
    // pictureData = null;
  }

  drag = () => {
    this.setState({ isActive: "drag" });
    if (this.checkCropper()) {
      this.cropper.setDragMode("move");
    }
  }

  zoomAdd = () => {
    this.setState({ isActive: "zoomAdd" });
    if (this.checkCropper()) {
      this.cropper.zoom(+0.1);
    }
  }

  zoomReduce = () => {
    this.setState({ isActive: "zoomReduce" });
    if (this.checkCropper()) {
      this.cropper.zoom(-0.1);
    }
  }

  check = () => {
    this.setState({ isActive: "check" });
    if (this.checkCropper()) {
      this.cropper.crop();
    }
  }

  close = () => {
    this.setState({ isActive: "close" });
    if (this.checkCropper()) {
      this.cropper.clear();
      this.drag();
      this.setState({
        cropResult: null,
      });
    }
  }

  checkCropper = () => {
    if (this.cropper) {
      return true;
    }
    return false;
  }

  sure = () => {
    this.download();
    const { hiddenVisible } = this.props;
    hiddenVisible();
  }

  dataURIToBlob = (dataURI, callback) => {
    const binStr = window.atob(dataURI.split(',')[1]);
    const len = binStr.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i += 1) {
      arr[i] = binStr.charCodeAt(i);
    }
    callback(new window.Blob([arr]));
  }

  callback = (blob) => {
    const a = document.createElement('a');
    a.download = `截图${Date.now()}.png`;
    a.innerHTML = 'download';
    a.href = window.URL.createObjectURL(blob);
    a.click();
  };

  render() {
    const { src, hiddenVisible } = this.props;
    const { isActive } = this.state;
    return (
      <Modal
        destroyOnClose
        visible
        closable={false}
        className={styles.modalRoot}
        width={550}
        height={400}
        footer={null}
      >
        <div className={styles.root} style={{ zIndex: 2000, width: '550px', height: '400px' }}>
          <div className={styles.wrapImg}>
            <Cropper
              src={src}
              ref={cropper => {
                this.cropper = cropper;
              }}
              ready={() => {
                this.cropper.clear();
                this.drag();
                // this.cropper.setDragMode("drag");
              }}
              cropend={this.cropImage}
              className={styles.cropImg}
              style={{ height: '100%', width: '100%' }}
              aspectRatio={16 / 9}
              guides={false}
            />
          </div>
          <div className={`${styles.operatWrap} operatWrap`}>
            <div className={styles.iconWrap}>
              <Zcon type="screenshot" className={isActive === "crop" ? "crop" : ""} onClick={this.crop} title="截图" />
              <Zcon type="download" className={isActive === "download" ? "download" : ""} onClick={this.download} title="下载" />
              <Zcon type="pointer-move" className={isActive === "drag" ? "drag" : ""} onClick={this.drag} title="移动" />
              <Zcon type="zoom-in" className={isActive === "zoomAdd" ? "zoomAdd" : ""} onClick={this.zoomAdd} title="放大" />
              <Zcon type="zoom-out" className={isActive === "zoomReduce" ? "zoomReduce" : ""} onClick={this.zoomReduce} title="缩小" />
              <Zcon type="close" className={isActive === "close" ? "close" : ""} onClick={this.close} title="清除" />
            </div>
            <div className={`${styles.btnWrap} btnWrap`}>
              <Button onClick={hiddenVisible}>取消</Button>
              {/* <Button type="primary" onClick={this.sure}>确认</Button> */}
            </div>
          </div>
        </div>
      </Modal>



    );
  }
}
