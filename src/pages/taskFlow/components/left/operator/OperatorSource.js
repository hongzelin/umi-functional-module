import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import Util from '../../../../../utils/utils'

export const ItemTypes = {
  KNIGHT: 'knight',
};

const knightSpec = {
  /**
   * 拖拽开始触发beginDrag
   * @param props
   * @param monitor
   * @param component
   * @returns {{id: string, type: string, width: number, height: number}}
   */
  beginDrag(props) {
    const {
      nodeData: {
        name, sourceEndpoint, targetEndpoint,
        algorithmName, algorithmVersionId,
        stdiKey, stdoKey } = {},
    } = props;
    return {
      id: `algorithm_${algorithmVersionId}_${Util.randHash()}`,
      uuid: `algorithm_${algorithmVersionId}_${Util.randHash()}`,
      key: `key_algorithm_${algorithmVersionId}_${Util.randHash()}`,
      type: 'algorithm',
      endpointId: algorithmVersionId,
      minWidth: 180,
      height: 36,
      name: name || algorithmName,
      sourceEndpoints: [
        { dataType: sourceEndpoint || stdoKey },
      ],
      targetEndpoints: [
        { dataType: targetEndpoint || stdiKey },
      ],
    };
  },
};
function collect(connector, monitor) {
  return {
    connectDragSource: connector.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

@DragSource(ItemTypes.KNIGHT, knightSpec, collect)
class OperatorSource extends Component {
  render() {
    const { connectDragSource, isDragging, id, nodeData, handlerDetail }
      = this.props;
    return connectDragSource(
      <li
        role="menuitem"
        title={nodeData.algorithmName}
        tabIndex="-1"
        className="next-menu-item"
        style={{
          opacity: isDragging ? 0.5 : 1,
          paddingLeft: '32px',
        }}
        onClick={() => handlerDetail(id)}
      >
        <div className="next-menu-item-inner">
          <span className="next-menu-item-text">{nodeData.algorithmName}</span>
        </div>
      </li>
    )
  }
}

OperatorSource.propTypes = {
  isDragging: PropTypes.bool,
  id: PropTypes.number,
  nodeData: PropTypes.objectOf(PropTypes.any),
  connectDragSource: PropTypes.func,
  handlerDetail: PropTypes.func,
}

OperatorSource.defaultProps = {
  isDragging: false,
  id: -1,
  nodeData: {},
  connectDragSource: () => { },
  handlerDetail: () => { },
}

export default OperatorSource;
