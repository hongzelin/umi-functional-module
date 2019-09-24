import React from 'react'
import { Icon } from 'antd'
import HocNodeUI from '../hocUI/HocNodeUI'

const del = (e, id, eventObj) => {
  e.stopPropagation();
  if (id) {
    eventObj.onRemove(id);
  }
}

const OperatorUI = HocNodeUI('l-o-wrap')(({ info, eventObj }) => (
  <div className="wrap-content" key={info.uuid}>
    <span className="icon-wrap">
      <Icon type="database" className="icon-item" size='xs' />
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

export default OperatorUI;
