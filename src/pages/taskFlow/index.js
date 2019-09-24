/*
 * @Author: lin.zehong
 * @Date: 2019-05-22 09:40:14
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-06-26 17:28:54
 * @Desc: 任务编辑--主入口
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import JSPlumbFlow from './components/jspFlow/JSPlumbFlow';
import styles from './index.less';
import 'jsplumb';

const mapDispatchToProps = dispatch => ({
  getStatic(payload) {
    dispatch({
      type: 'taskFlowStaticModel/staticData',
      payload,
    })
  },
});
@connect(null, mapDispatchToProps)
class JSPlumbFlowIndex extends Component {

  constructor(props) {
    super(props);
    this.getStatic();
  }

  getStatic = () => {
    const { getStatic } = this.props;
    getStatic();
  }

  render() {
    const { match: { params: { taskId, type } } = {} } = this.props;
    return (
      <div className={styles.taskWrap}>
        <JSPlumbFlow
          {...this.props}
          taskId={taskId}
          type={type}
        />
      </div>
    );
  }
}

JSPlumbFlowIndex.defaultProps = {
  taskId: "-1",
  type: 'create',
  match: {},
};

JSPlumbFlowIndex.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
  taskId: PropTypes.string,
  type: PropTypes.string,
};

export default withRouter(JSPlumbFlowIndex)
