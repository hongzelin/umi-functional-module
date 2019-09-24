// 撤回做了处理，通过新增操作操作之前的数据 dataSource 和 nodeList
// 优化了 handleNodelistData 和 setDataSource，统一使用 dump 修改数据
/*
 * @Author: lin.zehong
 * @Date: 2019-05-16 15:22:37
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-06-27 16:18:16
 * @Desc: JSPlumb 组件
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Message, Spin } from 'antd';
import * as constants from '../../constants/constants';
import JSPlumbUtils from './JSPlumbUtils';
import JspDefaultOptions from './JspDefaultOptions';
import PropsTypesConfig from './PropsTypesConfig';
import ToolsBar from '../ToolsBar';
import VirtualDOMHandle from './VirtualDOMHandle';
import styles from './JSPlumbFlow.less';

const containerId = 'diagramContainer';

const mapStateToProps = state => ({
  data4: state[constants.NAMESPACE].dataSource,
  nodeList: state[constants.NAMESPACE].nodeList,
  historyRecord: state[constants.NAMESPACE].historyRecord,
  algoDetail: state[constants.NAMESPACE].algoDetail,
  runLocation: state[constants.NAMESPACE].runLocation,
  mainContainerPosition: state[constants.NAMESPACE].mainContainerPosition,
  isLoading: state.loading.models[constants.NAMESPACE],
});

const mapDispatchToProps = dispatch => ({
  delItem(payload) {
    dispatch({
      type: `${constants.NAMESPACE}/delItem`,
      payload,
    })
  },
  saveStreams(payload) {
    return dispatch({
      type: `${constants.NAMESPACE}/saveStreams`,
      payload,
    })
  },
  online(payload) {
    return dispatch({
      type: `${constants.NAMESPACE}/online`,
      payload,
    })
  },
  getUpDownStreams(payload) {
    return dispatch({
      type: `${constants.NAMESPACE}/getUpDownStreams`,
      payload,
    })
  },
  getAlgorithmDetails(payload) {
    dispatch({
      type: `${constants.NAMESPACE}/getAlgorithmDetails`,
      payload,
    })
  },
  dump(payload) {
    dispatch({
      type: `${constants.NAMESPACE}/dump`,
      payload,
    })
  },
  clear() {
    dispatch({
      type: `${constants.NAMESPACE}/clear`,
    })
  },
});

@connect(mapStateToProps, mapDispatchToProps)
class JSPlumbFlow extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isClear: false,
    };
    this.init();
  }

  componentDidMount() {
    this.initFlow();
  }

  componentWillUnmount() {
    const { clear } = this.props;
    clear();
    this.clearCanvas();
  }

  init = () => {
    const instance = window.jsPlumb.getInstance({
      ...JspDefaultOptions.instanceConfig,
      Container: containerId,
    });
    this.jsPlumbForword = instance;
    this.VirtualDomClass = null;

    // 全局的一些事件
    this.initEvents();
  };

  // 初始化流程图
  initFlow = () => {
    this.jsPlumbForword.ready(() => {
      this.loadDataAndPaint();
    });
  };

  // 初始化事件
  initEvents = () => {
    this.jsPlumbForword.bind('dblclick', conn => {
      this.handleHistory();
      this.jsPlumbForword.deleteConnection(conn);
    });

    this.jsPlumbForword.bind('beforeDrop', conn => {
      const flag = this.checkBeforeDrop(conn);
      if (flag) {
        this.handleHistory();
      }
      return flag;
    });
  };

  // 连线前校验是否可以连接
  checkBeforeDrop = (conn) => {
    const { sourceId, targetId } = conn;
    if (sourceId.indexOf('start') > -1 && targetId.indexOf('end') > -1) {
      Message.warning('开始节点不能直接连接结束节点');
      return false;
    }
    if (sourceId.indexOf('start') > -1 && targetId.indexOf('strategy') > -1) {
      Message.warning('开始节点不能直接连接策略');
      return false;
    }
    if (sourceId.indexOf('strategy') > -1 && targetId.indexOf('end') > -1) {
      Message.warning('策略不能直接连接结束节点');
      return false;
    }
    if (sourceId.indexOf('strategy') > -1 && targetId.indexOf('strategy') > -1) { // eslint-disable-line
      Message.warning('策略不能直接连接策略');
      return false;
    }
    if (sourceId === targetId) {
      Message.warning('不能连接自身输入！');
      return false;
    }
    return true;
  }

  // 加载数据并绘制流程图
  loadDataAndPaint = () => {
    this.JSPUtils = new JSPlumbUtils(this.jsPlumbForword);
    const { getUpDownStreams, taskId, type, dump } = this.props;
    getUpDownStreams({ taskId, type }).then(data4 => {
      this.VirtualDomClass = new VirtualDOMHandle(data4, this.getEventObj());
      this.VirtualDomClass.setDataSource(data4);
      this.VirtualDomClass.init({ cursor: 'move' });
      dump({
        nodeList: this.VirtualDomClass.nodeList,
      })
      this.paint(data4);
    });
  };

  paint = (data4) => {
    const { nodeData, connectionData } = data4;
    setTimeout(() => { // 必须等到界面渲染完后，再绑定 createPlumbAndBindEvent
      nodeData.forEach(info => {
        this.JSPUtils.createPlumbAndBindEvent(info.uuid, info); // 设置默认表现
      });

      connectionData.forEach(info => {
        this.JSPUtils.setConnection(info); // 创建连线
      });
    }, 500);
  }

  // 回退
  goBack = () => {
    const { historyRecord, dump } = this.props;
    if (historyRecord.length === 0) {
      Message.warning('没有可回退的操作。');
      return;
    }
    // 删除对应的算子或者连线，再删除历史记录
    const data4 = historyRecord.pop();
    this.clearCanvas();
    this.VirtualDomClass.updateNodeFlow(data4, this.getEventObj());
    dump({
      dataSource: data4,
      nodeList: this.VirtualDomClass.nodeList,
    })
    this.paint(data4);

    this.changeClear(true);
  };

  // 清除画布
  clearCanvas = () => {
    this.jsPlumbForword.deleteEveryEndpoint();
    this.clearJspData();
    this.changeClear(false);
  };

  // 新增任务有撤回时，isClear：true，可进行清空操作
  changeClear = (param) => {
    this.setState({ isClear: param });
  }

  // 保存
  save = () => {
    const { taskId, saveStreams, runLocation, data4 } = this.props;
    const { nodeData } = data4;
    if (this.checkCalLocation()) return;

    const dataStreams =
      nodeData.map(({ endpointId, uuid, type, name, x, y }) => (
        { endpointId, uuid, type, name, x, y }
      ))
    const connections = this.getAllConnections();
    saveStreams({
      taskId: parseInt(taskId, 10),
      connections,
      dataStreams,
      runLocations: runLocation,
    }).then(({ errCode, data }) => {
      if (errCode === '0' && data === 'SUCCESS') {
        Message.show({
          type: 'success',
          title: this.renderSaveSuccessTip(),
          duration: 3000,
        })
      } else {
        Message.show({
          type: 'error',
          title: this.renderSaveErrorTip(data),
          duration: 3000,
        })
      }
    });
  };

  renderSaveSuccessTip = () => (
    <div>
      <span>验证通过！</span>
      <span className={styles.saveTip} onClick={this.online}>上线任务</span>
    </div>
  )

  renderSaveErrorTip = (data) => (
    <div>
      <span>验证失败！</span>
      <ul className="log-tip">
        {
          data.split('||').map(item => (
            <li className="tip-item">
              {item}
            </li>
          ))
        }
      </ul>
    </div>
  )

  // 获取所有连线信息
  getAllConnections = () => {
    const allConnections = this.jsPlumbForword.getAllConnections();
    const connections = [];
    for (let i = 0; i < allConnections.length; i += 1) {
      const info = allConnections[i];
      const { sourceId, targetId, scope, endpoints } = info;
      let checkStdiKey = info.scope;
      let checkStdoKey = info.scope;
      // 策略输出，算子输入
      if (sourceId.indexOf('strategy') > -1 && targetId.indexOf('algorithm') > -1) { // eslint-disable-line
        for (let j = 0; j < endpoints.length; j += 1) {
          if (endpoints[j].isTarget) {
            checkStdiKey = endpoints[j].scope;
            checkStdoKey = endpoints[j].scope;
          }
        }
      }
      connections.push({
        sourceEndpointId: `source_${sourceId}`,
        targetEndpointId: `target_${targetId}`,
        stdiKey: scope,
        stdoKey: scope,
        checkStdiKey,
        checkStdoKey,
      });
    }
    return connections;
  }

  // 校验算子详情计算位置
  checkCalLocation = () => {
    const { data4: { nodeData }, runLocation } = this.props;
    const calLocation = runLocation.filter(item => item.runLocation === ''); // 计算位置选择为空
    if (calLocation.length) {
      Message.warning(`请选择${calLocation[0].algorithmName}算子的计算位置`);
      return true;
    }
    for (const item of nodeData) {
      const { endpointId, type, name } = item;
      if (runLocation.length === 0 && type === 'algorithm') {
        Message.warning(`前选择${name}算子的计算位置`);
        return true;
      } else if (type === 'algorithm') {
        const isHasLocation = runLocation.filter(location =>
          location.algorithmVersionId === endpointId); // 算子在计算位置中找不到
        if (isHasLocation.length === 0) {
          Message.warning(`前选择${name}算子的计算位置`);
          return true;
        }
      }
    }
    return false;
  }

  // 上线
  online = () => {
    const { taskId, online, data4, history } = this.props;
    if (data4.nodeData.length === 0) {
      Message.warning('任务编排为空，不能进行上线操作');
      return;
    }
    online({ status: '', editType: 'ONLINE', taskId })
      .then(({ errCode, data }) => {
        if (errCode === '0' && data === 'SUCCESS') {
          Message.success('任务上线成功');
          history.push({
            pathname: '/tasklist',
          });
        } else {
          Message.show({
            type: 'error',
            title: this.renderOnlineErrorTip(data),
            duration: 3000,
          })
        }
      });
  };

  renderOnlineErrorTip = (data) => (
    <div>
      <span>上线失败！</span>
      <Link
        to={`/#/toLookOnlineLog/${data}`}
        target="_blank"
      >
        查看日志
      </Link>
    </div>
  )

  // model 中相关删除相关 jsp 数据
  clearJspData = () => {
    const { dump } = this.props;
    dump({
      nodeList: [],
      dataSource: {
        nodeData: [],
        connectionData: [],
      },
      historyRecord: [],
    })
  };

  // 新增历史记录
  handleHistory = () => {
    const { data4 } = this.props;
    const dataSource = data4;
    const historyNodeData = [].concat(dataSource.nodeData);
    const param = {
      nodeData: historyNodeData,
      connectionData: this.getAllConnections(),
    };
    const { dump, historyRecord } = this.props;
    historyRecord.push(param);
    if (historyRecord.length === 11) {
      historyRecord.shift();
    }
    dump({ history: historyRecord });
  };

  // 拖动算子或者策略时，mouseUp 实时更新位置 x、y
  handleDomMouseUp = (e, info) => {
    const x = e.currentTarget.offsetLeft;
    const y = e.currentTarget.offsetTop;
    this.updateDataSource(x, y, info);
  };

  updateDataSource = (x, y, info) => {
    const { data4 = {}, dump } = this.props;
    const { nodeData = [] } = data4;
    for (let i = 0; i < nodeData.length; i += 1) {
      if (nodeData[i].uuid === info.uuid) {
        data4.nodeData[i].x = x;
        data4.nodeData[i].y = y;
      }
    }
    dump(data4);
  };

  // 点击算子获取详情
  handleDomClick = (e, info) => {
    const { dump, algoDetail } = this.props;
    const { uuid, type, endpointId } = info;
    dump({ isActiveAlgo: uuid });
    if (type === 'algorithm' && algoDetail.algorithmVersionId !== endpointId) {
      this.handlerDetail(endpointId);
    }
  };

  handlerDetail = id => {
    const { getAlgorithmDetails, taskId } = this.props;
    getAlgorithmDetails({
      taskId,
      algorithmVersionId: id,
      status: 'PUBLISHED',
    });
  };

  // 删除算子
  handleIconRemove = tache => {
    this.handleHistory();
    const { delItem } = this.props;
    delItem({ uuid: tache });
    this.jsPlumbForword.deleteEndpoint(`source_${tache}`);
    this.jsPlumbForword.deleteEndpoint(`target_${tache}`);
  };

  // 校验算子是否重复
  checkIsReapeatOpeartor = (dropInfo) => {
    const { createInfo: { type, endpointId } = {} } = dropInfo;
    const { data4 = {} } = this.props;
    const { nodeData } = data4;
    if (type === 'algorithm' && nodeData.length) {
      const leg = nodeData.filter(item => item.endpointId === endpointId).length; // eslint-disable-line
      return leg;
    }
    return 0;
  }

  // 传递给算子获取策略所绑定的事件
  getEventObj = () => ({
    onClick: this.handleDomClick,
    onRemove: this.handleIconRemove,
    onMouseUp: this.handleDomMouseUp,
  })

  // 新增添加节点的方法
  createNewNode = (visoData) => {
    const { mainContainerPosition } = this.props;
    const mainContainerPositionToJs = mainContainerPosition;
    const scrollTopHtml = document.getElementsByTagName('html')[0].scrollTop; // 滚动条在HTML元素上
    const scrollToplayout =
      document.getElementsByClassName('ant-layout')[1].scrollTop; //eslint-disable-line
    const {
      coordinate: { x, y },
      createInfo: { name, width, height, type, id, uuid,
        endpointId, sourceEndpoints, targetEndpoints },
    } = visoData;
    const newInfo = {
      id,
      uuid,
      endpointId,
      name,
      type,
      width,
      height,
      sourceEndpoints,
      targetEndpoints,
      x: `${x - mainContainerPositionToJs.x}`,
      y: `${y - mainContainerPositionToJs.y - height / 2 + scrollTopHtml + scrollToplayout}`,
    };

    this.handleHistory();
    const { data4, dump } = this.props;
    data4.nodeData.push(newInfo);
    dump(data4);
  }

  // 左侧工具栏节点拖拽至主面板上的回调方法
  handleDropDown = dropInfo => {
    const { data4, dump } = this.props;
    const isReapeat = this.checkIsReapeatOpeartor(dropInfo);
    if (isReapeat > 0) {
      Message.warning('该拖拽算子已存在');
      return;
    }
    this.createNewNode(dropInfo);
    const newNodeData = data4;

    // 实例化 VirtualDOMHandle，执行新增方法
    this.VirtualDomClass.addNodeFlow(newNodeData, dropInfo, this.getEventObj());

    // console.log('reCreatorData.nodeList', this.VirtualDomClass.nodeList);
    // MainContainer nodeList
    dump({
      nodeList: this.VirtualDomClass.nodeList,
    })

    // 绑定 jspPlumb 事件
    this.JSPUtils.createPlumbAndBindEvent(dropInfo.createInfo.uuid, dropInfo.createInfo); // eslint-disable-line
  };

  // DOM渲染
  render() {
    const { isClear } = this.state;
    const { isLoading, taskId, type } = this.props;
    return (
      <Spin spinning={isLoading}>
        <div className={styles.jspWrap}>
          <div id="operate">
            <div id="toolsbar">
              <ToolsBar
                dropDownCB={dropInfo => this.handleDropDown(dropInfo)}
                goBack={() => this.goBack()}
                clearCanvas={() => this.clearCanvas()}
                save={() => this.save()}
                online={() => this.online()}
                taskId={taskId}
                type={type}
                isClear={isClear}
              />
            </div>
          </div>
        </div>
      </Spin>
    );
  }
}

JSPlumbFlow.propTypes = PropsTypesConfig.propTypes;
JSPlumbFlow.defaultProps = PropsTypesConfig.defaultProps;

export default JSPlumbFlow;
