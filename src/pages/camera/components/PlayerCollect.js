/*
 * @Author: lin.zehong 
 * @Date: 2018-12-02 15:52:07 
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2018-12-14 16:00:59
 * @Desc: 在线摄像头--摄像头popover收藏功能
 */

import React from 'react';
import { connect } from "dva";
import Zcon from "zteui-icon";
import { Popover, Tree, Button, message } from 'antd';
import styles from './PlayerCollect.less';

const { TreeNode } = Tree;

class PlayerCollect extends React.Component {

  state = {
    clicked: false,
    favorites: {},
  };

  componentDidMount = () => {
    const { dispatch, gData } = this.props;
    if (gData && gData.length > 0) return;
    dispatch({
      type: "onlineCamera/favoritesListEff",
      payload: {},
    });
  }

  showTree = () => {
    this.setState({
      clicked: true,
    })
  }

  hideTree = () => {
    this.setState({
      clicked: false,
    })
  }

  onSelect = (selectedKeys, info) => {
    const { favorites } = info.node.props;
    this.setState({ favorites });
  }

  insertCamera = () => {
    const { favorites } = this.state;
    const { scjId } = favorites;
    const { camera, dispatch } = this.props;
    if (!scjId) {
      message.warning("请选择收藏夹");
      return;
    }
    dispatch({
      type: 'onlineCamera/insertCameraEff',
      payload: {
        scjId,
        sxtId: camera.sbbm,
        sxtName: camera.sbmc,
        sxtxxId: camera.sxtxxId,
        jd: camera.jd,
        wd: camera.wd,
      },
    })
    this.setState({
      clicked: false,
    })
  }

  render() {
    const { clicked } = this.state;
    const { gData } = this.props;
    const loop = data => data.map((item) => {
      if (item.children && item.children.length) {
        return <TreeNode key={item.key} title={item.title} favorites={item.favorites}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode key={item.key} title={item.title} favorites={item.favorites} />;
    });
    const clickContent = (
      <div className={styles.treeWrap}>
        <Zcon type="close" className={styles.iconClose} onClick={() => this.hideTree()} />
        <Tree
          className="draggable-tree"
          onSelect={this.onSelect}
        >
          {loop(gData)}
        </Tree>
        <div className={styles.btnWrap}>
          <Button size="small" onClick={() => this.insertCamera()}>收藏</Button>
        </div>
      </div>
    );
    return (
      <div className={styles.root}>
        <Popover
          content={(
            <div>
              {clicked ? clickContent : null}
            </div>
          )}
          title='收藏至'
          placement="rightTop"
          trigger="click"
          visible={clicked}
        >
          <span className={styles.name} onClick={() => this.showTree()}>收藏</span>
        </Popover>
      </div>
    );
  }
}

function mapStateToProps({ onlineCamera }) {
  return {
    gData: onlineCamera.onlyCollectData,
  };
}

export default connect(mapStateToProps)(PlayerCollect);
