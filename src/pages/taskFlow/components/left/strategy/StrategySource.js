import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import Util from '../../../../../utils/utils'
import Styles from './index.scoped.less'

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
      stategy: { stategyId, stategyName, type } = {},
      allStdoKey }
      = props;
    return {
      id: `strategy_${stategyId}_${Util.randHash()}`,
      uuid: `strategy_${stategyId}_${Util.randHash()}`,
      key: `key_strategy_${stategyId}_${Util.randHash()}`,
      endpointId: stategyId,
      type,
      minWidth: 180,
      height: 36,
      name: stategyName,
      documentation: '',
      formKey: '',
      sourceEndpoints: [
        { dataType: allStdoKey },
        // { dataType: allStdoKey.replace(/\+/g, ' ') },
      ],
      targetEndpoints: [
        { dataType: allStdoKey },
        // { dataType: allStdoKey.replace(/\+/g, ' ') },
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
class StrategySource extends Component {
  render() {
    const { connectDragSource, isDragging, stategy }
      = this.props;
    return connectDragSource(
      <li
        className={Styles.item}
        key={stategy.stategyId}
        title={stategy.stategyName}
        style={{
          opacity: isDragging ? 0.5 : 1,
          paddingLeft: '32px',
        }}
      >
        <span className={Styles.icon}>
          &#60;&#8260;&#62;
        </span>
        <span className={Styles.text}>{stategy.stategyName}</span>
      </li>
    )
  }
}

StrategySource.propTypes = {
  isDragging: PropTypes.bool,
  stategy: PropTypes.objectOf(PropTypes.any),
  connectDragSource: PropTypes.func,
}

StrategySource.defaultProps = {
  isDragging: false,
  stategy: {},
  connectDragSource: () => { },
}

export default StrategySource;
