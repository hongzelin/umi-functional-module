/*
 * @Author: lin.zehong
 * @Date: 2019-06-13 10:22:11
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-06-27 16:41:25
 * @Desc: 高阶：开始、结束、算子、策略等UI高阶
 */

import React, { Component } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import * as constants from '../../constants/constants';
import './HocNodeUI.less'

const HocNodeUI = (classNames) => (WrappedComponent) => {
  const mapStateToProps = state => ({
    isActiveAlgo: state[constants.NAMESPACE].isActiveAlgo,
  })

  @connect(mapStateToProps, null)
  class HocUI extends Component {
    static propTypes = {
      eventObj: PropTypes.objectOf(PropTypes.any),
      info: PropTypes.objectOf(PropTypes.any),
      styleObj: PropTypes.objectOf(PropTypes.any),
      isActiveAlgo: PropTypes.string,
    }

    static defaultProps = {
      eventObj: {},
      info: {},
      styleObj: {},
      isActiveAlgo: '-1',
    }

    render() {
      const { info, styleObj, eventObj, isActiveAlgo } = this.props;
      return (
        <div
          key={info.uuid}
          id={info.uuid}
          className={`l-entity-wrap ${classNames} ${isActiveAlgo === info.uuid ? 'isActive' : ''}`}
          style={styleObj}
          onClick={(e) => {
            eventObj.onClick(e, info)
          }}
          onMouseUp={(e) => {
            eventObj.onMouseUp(e, info)
          }}
        >
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }
  return HocUI;
}

export default HocNodeUI;
