/*
 * @Author: lin.zehong
 * @Date: 2018-12-02 22:13:59
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-05-02 22:55:17
 * @Desc: 收藏夹--树
 */
import React from 'react';
import { connect } from 'dva';
import { Tree, Menu, Modal, message, Button } from 'antd';
import Zcon from 'zteui-icon';
import TreeModal from './TreeModal';
// import TreeSideModal from './TreeSideModal';
import styles from './TreeCollect.less';

const { TreeNode } = Tree;
const { confirm } = Modal;

class TreeCollect extends React.Component {
  state = {
    expandedKeys: ['-1'],
    frequency: 0,
    selectedKeys: [],
    cameraDetail: {},
    isShowBtn: false,
    stopToggleBtn: false,
    insTime: 0,
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "onlineCamera/collectQueryEff",
      payload: {},
    })
  }

  componentWillUnmount = () => {
    this.clearTime();
  };

  // 触发自动巡查任务
  handleInspection = (insTime) => {
    this.setState({ frequency: 0, isShowBtn: true, insTime }, () => {
      this.clearTime(); // 如果在巡查任务，再次点击巡查，应该把之前的任务先清掉
      this.beginIns(); // 先触发一次
      this.time = setInterval(this.beginIns, insTime * 1000); // 参数为毫秒
    });
  }

  // 开始播放巡检任务
  beginIns = () => {
    const { frequency } = this.state;
    const { inspectionCamera } = this.props;
    const cameraNum = inspectionCamera.length;
    if (frequency === cameraNum) {
      message.success('巡查完成');
      this.clearTime();
      this.setState({ isShowBtn: false });
      return;
    }
    const arr = [];
    arr.push(`${inspectionCamera[frequency].sxtxxId}`);
    this.setState({
      selectedKeys: arr,
      frequency: frequency + 1,
    }, () => {
      this.beginPlayer(inspectionCamera[frequency]);
    });
  }

  // 开始播放摄像头视频
  beginPlayer = (favoritesDetail) => {
    if (favoritesDetail && favoritesDetail.sxtxxId) {
      this.player(favoritesDetail);
    }
  }

  // 树点击事件
  onSelect = (selectedKeys, info) => {
    if (info.node.props.favorites) return; // 点击收藏夹
    if (selectedKeys && selectedKeys.length) {
      this.beginPlayer(info.node.props.favoritesDetail);
      this.setState({ selectedKeys });
    }
  }

  clearTime = () => {
    if (this.time) {
      clearInterval(this.time);
    }
  }

  // 查询收藏夹下的所有摄像头，显示收藏夹全部删除弹出窗
  selectAllCamera = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'onlineCamera/collectSelectCameraEff',
      payload: {},
    }).then(() => {
      this.showDeleteConfirm();
    })
  }

  // 查询收藏夹下的所有摄像头，展示自动巡查弹出窗
  selectAllCameraShowInspection = (modalTitle, key) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'onlineCamera/collectSelectCameraEff',
      payload: {},
    }).then(() => {
      const { cameraNum } = this.props;
      if (cameraNum === 0) {
        message.warning("该收藏夹没有摄像头可巡查");
      } else {
        dispatch({
          type: 'onlineCamera/showModal',
          payload: {
            modalTitle,
            menuKey: key,
          },
        })
      }
    })
  }

  // 删除收藏夹
  showDeleteConfirm = () => {
    const that = this;
    const { cameraNum } = this.props;
    confirm({
      title: '确定要删除该收藏夹？',
      content: cameraNum === 0 ? '删除该收藏夹后不可恢复' : `该收藏夹包含了${cameraNum}个摄像头，删除后不可恢复`, // 还缺个接口
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      destroyOnClose: true,
      iconType: 'close-circle',
      className: 'deleteStyle',
      onOk() {
        that.onDelete();
        that.hideTreeRight();
      },
      onCancel() {
        that.hideTreeRight();
      },
    });
  }

  // 收藏夹删除
  onDelete = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'onlineCamera/collectDeteleEff',
      payload: {},
    })
  }

  // 取消收藏摄像头
  onCancelCamera = () => {
    const { dispatch } = this.props;
    const { cameraDetail } = this.state;
    const { id } = cameraDetail;
    dispatch({
      type: 'onlineCamera/cancelCameraEff',
      payload: { id },
    })
  }

  // 树节点点击事件
  handleMenuClick = ({ item, key }) => {
    const modalTitle = item.props.children;
    const { dispatch } = this.props;
    if (key === '1') {
      this.selectAllCameraShowInspection(modalTitle, key);
    } else if (key === '2' || key === '3' || key === '4') {
      dispatch({
        type: 'onlineCamera/showModal',
        payload: {
          modalTitle,
          menuKey: key,
        },
      })
    } else if (key === '5') { // 删除当前收藏夹及当前收藏夹下的摄像头和文件全部删除
      this.selectAllCamera(); // 查询收藏夹下的所有摄像头；
    } else if (key === '6') { // 取消收藏摄像头
      this.onCancelCamera();
    }
  }

  // 树节点右键事件
  treeNodeonRightClick = ({ event, node }) => {
    event.persist();
    const { offsetLeft, _isCollapsed } = this.props;
    const menuWidth = _isCollapsed ? 80 : 200;
    const { favorites, favoritesDetail } = node.props;
    this.changefavorites(favorites);
    const hasChild = !!(favorites && favorites.scjId); // 收藏夹
    this.setState({
      rightClickNodeTreeItem: {
        pageX: event.pageX - offsetLeft - 16 - menuWidth,
        pageY: event.target.offsetTop + 28,
        key: node.props.eventKey,
        id: node.props.eventKey,
        title: node.props.title,
        favorites,
        favoritesDetail,
        hasChild,
      },
      cameraDetail: favoritesDetail,
    });
  }

  // 右键节点页面展示
  getNodeTreeRightClickMenu = () => {
    const { rightClickNodeTreeItem } = this.state;
    const { pageX, pageY, hasChild, key } = { ...rightClickNodeTreeItem };
    const tmpStyle = {
      position: 'absolute',
      left: `${pageX}px`,
      top: `${pageY}px`,
      boxShadow: '2px 2px 10px #333333',
    };
    const menuHasNode = (
      <Menu
        onClick={this.handleMenuClick}
        style={tmpStyle}
        className={styles.categs_tree_rightmenu}
      >
        <Menu.Item key='1'>自动巡查</Menu.Item>
        <Menu.Item key='2'>重命名</Menu.Item>
        <Menu.Item key='3'>添加同级目录</Menu.Item>
        <Menu.Item key='4'>添加子目录</Menu.Item>
        <Menu.Item key='5'>删除</Menu.Item>
      </Menu>
    );
    const menuRoot = (
      <Menu
        onClick={this.handleMenuClick}
        style={tmpStyle}
        className={styles.categs_tree_rightmenu}
      >
        <Menu.Item key='1'>自动巡查</Menu.Item>
        <Menu.Item key='2'>重命名</Menu.Item>
        <Menu.Item key='4'>添加子目录</Menu.Item>
      </Menu>
    );
    const menuNoNode = (
      <Menu
        onClick={this.handleMenuClick}
        style={tmpStyle}
        className={styles.categs_tree_rightmenu}
      >
        <Menu.Item key='6'>取消收藏</Menu.Item>
      </Menu>
    );

    const menu = hasChild ? (key === "-1" ? menuRoot : menuHasNode) : menuNoNode;

    return (rightClickNodeTreeItem == null) ? '' : menu;
  }

  // 隐藏右键菜单
  hideTreeRight = () => {
    this.setState({ rightClickNodeTreeItem: null });
  }

  // 更新store favorites对象
  changefavorites = (favorites) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'onlineCamera/changefavorites',
      payload: { favorites },
    })
  }

  // 停止巡查
  stopIns = () => {
    try {
      this.clearTime();
      this.setState({ stopToggleBtn: true });
      message.success('停止巡检成功');
    } catch (error) {
      message.error('停止巡检失败');
    }
  }

  // 启动巡查
  startUpIns = () => {
    try {
      const { insTime } = this.state;
      this.time = setInterval(this.beginIns, insTime * 1000);
      this.setState({ stopToggleBtn: false });
      message.success('启动巡检成功');
    } catch (error) {
      message.error('启动巡检失败');
    }
  }

  // 终止巡查
  getOverIns = () => {
    try {
      this.playerClose(); // 关闭播放器
      this.clearTime();
      this.setState({ isShowBtn: false });
      message.success('终止巡检成功');
    } catch (error) {
      message.error('终止巡检失败');
    }
  }

  playerClose = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "onlineCamera/changeCameraId",
      payload: { currentCameraId: -1, currentCameraBm: '-1' },
    });
  }

  player = (favoritesDetail) => {
    const { dispatch, movePanTo } = this.props;
    dispatch({
      type: "onlineCamera/changeCameraId",
      payload: { currentCameraId: favoritesDetail.sxtxxId, currentCameraBm: favoritesDetail.sxtId }, // sxtId就是设备编码
    });
    movePanTo(favoritesDetail); // 移动地图
  }

  render() {
    const { expandedKeys, selectedKeys, isShowBtn, stopToggleBtn } = this.state;
    const { visible, modalTitle, menuKey, dispatch, isExpand, gData } = this.props;
    const loop = data => data.map((item) => {
      if (item.children && item.favorites) {
        return <TreeNode key={item.key} icon={<Zcon type="thing" />} title={item.title} favorites={item.favorites}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode key={item.favoritesDetail.sxtxxId} title={item.title} favoritesDetail={item.favoritesDetail} />;
    });
    return (
      <div className={`${styles.root} ${isExpand ? '' : styles.hideTree}`} onClick={() => this.hideTreeRight()}>
        {
          visible ?
            <TreeModal visible={visible} modalTitle={modalTitle} menuKey={menuKey} dispatch={dispatch} hideTreeRight={this.hideTreeRight} handleInspection={this.handleInspection} />
            : null
        }
        <Tree
          showIcon
          className="draggable-tree"
          defaultExpandedKeys={expandedKeys}
          selectedKeys={selectedKeys}
          onRightClick={this.treeNodeonRightClick}
          onSelect={this.onSelect}
        >
          {loop(gData)}
        </Tree>
        {this.getNodeTreeRightClickMenu()}
        <div className={styles.insWrapBtn} style={{ display: isShowBtn ? 'block' : 'none' }}>
          {
            stopToggleBtn ?
              <Button onClick={() => this.startUpIns()}>启动巡查</Button>
              :
              <Button onClick={() => this.stopIns()}>停止巡查</Button>
          }
          <Button type="primary" onClick={() => this.getOverIns()}>终止巡查</Button>
        </div>
      </div>
    );
  }
}

// function mapStateToProps({ onlineCamera, publicModel }) {
function mapStateToProps({ onlineCamera }) {
  return {
    gData: onlineCamera.collectTree,
    cameraNum: onlineCamera.cameraNum,
    inspectionCamera: onlineCamera.inspectionCamera,
    _isCollapsed: false,
    // _isCollapsed: publicModel._isCollapsed,
  };
}

export default connect(mapStateToProps)(TreeCollect);
