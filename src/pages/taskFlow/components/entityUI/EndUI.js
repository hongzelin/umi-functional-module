import React from 'react'
import HocNodeUI from '../hocUI/HocNodeUI'

const EndUI = HocNodeUI('l-o-wrap')(({ info }) => (
  <div className="wrap-content" key={info.uuid}>
    <span className="icon-wrap icon-wrap__bg">
      <i className="iconfont icon-end" />
    </span>
    <span className="content-name">
      {info.name}
    </span>
  </div>
))

export default EndUI;
