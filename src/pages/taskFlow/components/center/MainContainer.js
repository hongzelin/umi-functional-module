import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import { connect } from 'dva'
import * as constants from '../../constants/constants'
import Util from '../../../../utils/utils'
import dropImg from '../../../../assets/drop_blank.png'
import './MainContainer.less'

export const ItemTypes = {
  KNIGHT: 'knight',
};

const dropSpec = {
  canDrop() {
    return true;
  },
  drop(props, monitor, component) {
    /**
     * 获取index页面传递过来的回调方法
     */
    const { props: { dropDownCB } } = component;
    /**
     * getClientOffset获得拖拽体放下的坐标
     */
    const dropInfo = {};
    dropInfo.coordinate = monitor.getClientOffset();
    // dropInfo.coordinate = monitor.getSourceClientOffset();
    dropInfo.createInfo = monitor.getItem();
    // console.log('放下了', dropInfo);
    dropDownCB(dropInfo);
  },
};

function collect(connector, monitor) {
  return {
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

const mapStateToProps = state => ({
  nodeList: state[constants.NAMESPACE].nodeList,
})

const mapDispatchToProps = dispatch => ({
  setMainContainerPos(payload) {
    dispatch({
      type: `${constants.NAMESPACE}/dump`,
      payload: { mainContainerPosition: payload },
    })
  },
})

let mouseX;
let mouseY;
let objX;
let objY;
let isDown = false; // 是否按下鼠标

@connect(mapStateToProps, mapDispatchToProps)
class MainContainer extends Component {
  componentDidMount() {
    // 挂载完毕后获得主绘图容器的x,y坐标值
    const { setMainContainerPos } = this.props;
    setMainContainerPos(Util.getDomPosition(this.refDiagram));
  }

  onRef = (ref) => {
    this.refDiagram = ref
  }

  mouseDown = (e) => {
    const obj = document.getElementById('mydiv')
    obj.style.cursor = 'move';
    const div = document.getElementsByName('change')[0];
    objX = div.style.left;
    objY = div.style.top;
    mouseX = e.clientX;
    mouseY = e.clientY;
    isDown = true;
  }

  mouseMove = (e) => {
    const div = document.getElementsByName('change')[0];
    const x = e.clientX;
    const y = e.clientY;
    if (isDown) {
      div.style.left = `${parseInt(objX, 10) + parseInt(x, 10) - parseInt(mouseX, 10)}px`;
      div.style.top = `${parseInt(objY, 10) + parseInt(y, 10) - parseInt(mouseY, 10)}px`;
    }
  }

  mouseUp = (e) => {
    if (isDown) {
      const x = e.clientX;
      const y = e.clientY;
      const div = document.getElementsByName('change')[0];
      div.style.left = `${parseInt(x, 10) + parseInt(mouseX, 10) - parseInt(objX, 10)}px`;
      div.style.top = `${parseInt(y, 10) + parseInt(mouseY, 10) - parseInt(objY, 10)}px`;
      mouseX = x;
      mouseY = y;
      document.getElementById('mydiv').style.cursor = 'default';
      isDown = false;
    }
  }

  renderDefault = () => (
    <div className="blank-wrap">
      <div className="blank-content">
        <img src={dropImg} alt="" />
        <p className="content-text">从左侧目录中拖拽算子至此来创建任务</p>
      </div>
    </div>
  )

  renderRootContainer() {
    const { nodeList } = this.props;
    return (
      <div
        className="dragContainer"
      // id="mydiv"
      // name="change"
      // style={{ backgroundColor: '#708090',
      // position: 'relative', top: 0, left: 0 }}
      // onMouseDown={this.mouseDown}
      // onMouseMove={this.mouseMove}
      // onMouseUp={this.mouseUp}
      >
        <div id="diagramContainer" className="mainContainer" ref={this.onRef}>
          {nodeList.length ?
            nodeList
            :
            this.renderDefault()
          }
        </div>
      </div>
    )
  }

  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget(this.renderRootContainer())
  }
}

MainContainer.propTypes = {
  connectDropTarget: PropTypes.func,
  setMainContainerPos: PropTypes.func,
  nodeList: PropTypes.arrayOf(PropTypes.any),
}

MainContainer.defaultProps = {
  connectDropTarget: () => { },
  setMainContainerPos: () => { },
  nodeList: [],
}

export default DropTarget(ItemTypes.KNIGHT, dropSpec, collect)(MainContainer);
