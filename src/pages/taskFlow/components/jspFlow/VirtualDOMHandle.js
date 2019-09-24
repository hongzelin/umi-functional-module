import React from 'react'
import OperatorUI from '../entityUI/OperatorUI'
import StartUI from '../entityUI/StartUI'
import EndUI from '../entityUI/EndUI'
import StrategyUI from '../entityUI/StrategyUI'

const MIN_WIDTH = 180;
const HEIGHT = 36;

export default class VirtualDOMHandle {
  /**
   * @param dataSource 需要更新的虚拟dom数据源
   * @param handleEvent 给每个节点绑定的事件
   */
  constructor(dataSource, eventObj) {
    /**
     * dataSource 传递进来的数据源
     * nodeList 结合dataSource处理后的虚拟dom集合
     * eventObj 事件绑定对象合集
     * mark forward代表正向渲染 reverse代表反向渲染
     * reduxProps 全局Redux引用
     */
    this.dataSource = dataSource;
    this.nodeList = {};
    this.eventObj = eventObj || {};
  }

  /**
   * 用于判断返回到底是哪种类型的节点或者流程(或者后期扩展的其他类型)
   * info 节点信息对象
   * styleObj 节点css样式对象
   */
  getRenderSortFlow(info, styleObj) {
    let { type } = info;
    type = type.indexOf('strategy') > -1 ? 'strategy' : type;

    switch (type) {
      case 'start': // 开始节点
        return (
          <StartUI
            info={info}
            styleObj={styleObj}
            eventObj={this.eventObj}
            key={info.uuid}
            workFlowName='start'
          />
        );
      case 'end': // 结束节点
        return (
          <EndUI
            info={info}
            styleObj={styleObj}
            eventObj={this.eventObj}
            key={info.uuid}
            workFlowName='end'
          />
        );
      case 'algorithm': // 算子
        return (
          <OperatorUI
            info={info}
            styleObj={styleObj}
            eventObj={this.eventObj}
            key={info.uuid}
            workFlowName='algorithm'
          />
        );
      case 'strategy': // 策略
        return (
          <StrategyUI
            info={info}
            styleObj={styleObj}
            eventObj={this.eventObj}
            key={info.uuid}
            workFlowName='strategy'
          />
        );
      default:
        return (
          <div
            key={info.uuid}
            id={info.id}
            style={styleObj}
            data-type={info.type}
          >
            <span className="viso-name" key={info.name}>{info.name}</span>
          </div>
        );
    }
  }

  /**
   * 初始化调用，包括:
   * 1.获取style样式并进行传递styleNewObj的合并
   * 2.getRenderSortFlow调用渲染虚拟dom
   * 3.给对象赋值nodeList，更新虚拟dom
   * @param styleNewObj
   */
  init(styleNewObj) {
    this.nodeData = this.dataSource.nodeData;
    const allNodeList = this.nodeData.map((info) => {
      const styleObj = {
        position: 'absolute',
        left: `${info.x}px`,
        top: `${info.y}px`,
        cursor: 'move',
        minWidth: MIN_WIDTH,
        height: HEIGHT,
      };
      if (info.width) {
        styleObj.width = `${info.width}px`
        styleObj.height = `${info.height}px`
      }
      const newStyleObj = Object.assign({}, styleObj, styleNewObj);
      return this.getRenderSortFlow(info, newStyleObj);
    });
    this.nodeList = allNodeList;
  }

  /**
   * 新增拖拽节点
   * newNodeData 最新数据源
   * dropInfo 当前节点信息
   * eventObj 当前节点需要绑定的事件
   * styleNewObj 当前节点需要新增或者更新的样式，默认为空对象
   * @param newNodeData
   * @param eventObj
   */
  addNodeFlow(newNodeData, dropInfo, eventObj, styleNewObj = {}) {
    /**
     * 首先更改下 dataSource 的值，新传递进来的 newNodeData 就是当前最新的数据源
     * 再更新一下需要绑定的事件
     */
    this.dataSource = newNodeData;
    this.eventObj = eventObj;
    const newNodeFlowItem = this.dataSource.nodeData.find(item => (
      item.id === dropInfo.createInfo.id
    ));
    const styleObj = {
      position: 'absolute',
      left: `${newNodeFlowItem.x}px`,
      top: `${newNodeFlowItem.y}px`,
      cursor: 'move',
      minWidth: MIN_WIDTH,
      height: HEIGHT,
    };
    if (newNodeFlowItem.width) {
      styleObj.width = `${newNodeFlowItem.width}px`
      styleObj.height = `${newNodeFlowItem.height}px`
    }
    const newStyleObj = Object.assign({}, styleObj, styleNewObj);
    const newNodeList = this.getRenderSortFlow(newNodeFlowItem, newStyleObj);
    this.nodeList.push(newNodeList);
    this.updateNodeFlowCssStyle();
  }

  /**
   * 这里是循环所有的节点数据去更新相应的css样式，虽然现在和 updateNodeFlow 方法有些重复，
   * 但是在以后方便扩展，分别管理逻辑和样式。
   * @param styleNewObj
   */
  updateNodeFlowCssStyle(styleNewObj = {}) {
    const allNodeList = this.dataSource.nodeData.map((item) => {
      const styleObj = {
        position: 'absolute',
        left: `${item.x}px`,
        top: `${item.y}px`,
        cursor: 'move',
        minWidth: MIN_WIDTH,
        height: HEIGHT,
      };
      if (item.width) {
        styleObj.width = `${item.width}px`
        styleObj.height = `${item.height}px`
      }
      const newStyleObj = Object.assign({}, styleObj, styleNewObj);
      return this.getRenderSortFlow(item, newStyleObj);
    });
    this.nodeList = allNodeList;
  }

  /**
   * 更新节点，可以是样式、绑定方法等等
   * @param info
   */
  updateNodeFlow(newNodeData, eventObj, styleNewObj = {}) {
    this.dataSource = newNodeData;
    this.eventObj = eventObj;
    const allNodeList = this.dataSource.nodeData.map((item) => {
      const styleObj = {
        position: 'absolute',
        left: `${item.x}px`,
        top: `${item.y}px`,
        cursor: 'move',
        minWidth: MIN_WIDTH,
        height: HEIGHT,
      };
      if (item.width) {
        styleObj.width = `${item.width}px`
        styleObj.height = `${item.height}px`
      }
      const newStyleObj = Object.assign({}, styleObj, styleNewObj);
      return this.getRenderSortFlow(item, newStyleObj);
    });
    this.nodeList = allNodeList;
  }

  /**
   * 清空单例模式下实例所有的数据，用于销毁组件的时候调用
   */
  clearData(dataSource) {
    this.dataSource = dataSource;
    this.nodeList = [];
  }

  /**
   * 设置实例的数据源
   */
  setDataSource(dataSource) {
    this.dataSource = dataSource;
  }
}
