import React from 'react'
import { Icon } from 'antd'
import HocNodeUI from '../hocUI/HocNodeUI'
import './StrategyUI.less'

const del = (e, id, eventObj) => {
  e.stopPropagation();
  if (id) {
    eventObj.onRemove(id);
  }
}

const StrategyUI = HocNodeUI('l-s-wrap')(({ info, eventObj }) => (
  <div className="wrap-content">
    <span className="strategy-logo">
      &#60;&#8260;&#62;
    </span>
    <span className="content-name">
      {info.name}
    </span>
    <Icon
      type="close"
      className="icon-close"
      size='xs'
      onClick={e => del(e, info.uuid, eventObj)}
    />
  </div>
))

export default StrategyUI;
