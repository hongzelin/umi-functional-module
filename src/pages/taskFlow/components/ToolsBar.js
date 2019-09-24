/*
 * @Author: lin.zehong
 * @Date: 2019-05-22 10:38:40
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-06-27 16:43:12
 * @Desc: 整体布局
 */
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import MainContainer from './center/MainContainer';
import Tools from './center/Tools';
import Strategy from './left/strategy/Strategy';
import Operator from './left/operator/Operator';
import DetailRight from './right/Detail';
import './ToolsBar.less';

@DragDropContext(HTML5Backend)
class ToolsBar extends Component {
  render() {
    return (
      <div className="container-all">
        <Row style={{ display: 'flex' }}>
          <Col span={5}>
            <div id="left" className="tools-bar-left">
              <Operator {...this.props} />
              <Strategy {...this.props} />
            </div>
          </Col>
          <Col span={14}>
            <div className="tools-bar-right">
              <Tools {...this.props} />
              <MainContainer {...this.props} />
            </div>
          </Col>
          <Col span={5}>
            <div className="right-attr">
              <DetailRight {...this.props} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ToolsBar;
