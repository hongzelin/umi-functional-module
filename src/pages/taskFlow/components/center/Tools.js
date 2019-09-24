import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva';
import * as constants from '../../constants/constants';
import './Tools.less'

const mapStateToProps = state => ({
  data4: state[constants.NAMESPACE].dataSource,
  historyRecord: state[constants.NAMESPACE].historyRecord,
  isPass: state[constants.NAMESPACE].isPass,
});

@connect(mapStateToProps, null)
class Tools extends React.Component {
  renderDetail = () => ( // 详情
    <div className="header_section header--detail">
      <i className="iconfont icon-o-goback" title="撤销" />
      <i className="iconfont icon-o-clear" title="清除" />
      <i className="iconfont icon-o-save" title="保存" />
      {/* <i className="iconfont icon-o-code" title="自动布局" /> */}
      <i className="iconfont icon-o-online" title="上线" />
    </div>
  )

  renderCreate = () => {
    const { clearCanvas, save, goBack, online, isClear, isPass }
      = this.props;
    return (
      <div className="header_section">
        <i
          className="iconfont icon-o-goback"
          title="撤销"
          onClick={() => goBack()}
        />
        {
          isClear ? // 新增任务未进行操作撤回时，是无法操作清空的
            (
              <i
                className="iconfont icon-o-clear"
                title="清除"
                onClick={() => clearCanvas()}
              />
            )
            :
            (
              <i
                className="iconfont icon-o-clear isActive"
                title="清除"
              />
            )
        }
        <i
          className="iconfont icon-o-save"
          title="保存"
          onClick={() => save()}
        />
        {/* <i className="iconfont icon-o-code" title="自动布局" /> */}
        {
          isPass ?
            (
              <i
                className="iconfont icon-o-online"
                title="上线"
                onClick={() => online()}
              />
            )
            :
            (
              <i
                className="iconfont icon-o-online isActive"
                title="上线"
              />
            )
        }
      </div>
    )
  }

  render() {
    const { type, data4: { nodeData } } = this.props;
    return (
      <div className="main_header">
        {
          type === 'detail' || nodeData.length === 0 ?
            this.renderDetail()
            :
            this.renderCreate()
        }
      </div>
    )
  }
}

Tools.propTypes = {
  goBack: PropTypes.func,
  clearCanvas: PropTypes.func,
  save: PropTypes.func,
  online: PropTypes.func,
  type: PropTypes.string,
  isClear: PropTypes.bool,
  isPass: PropTypes.bool,
  data4: PropTypes.arrayOf(PropTypes.any),
}

Tools.defaultProps = {
  goBack: () => {},
  clearCanvas: () => {},
  save: () => {},
  online: () => {},
  type: '-1',
  isClear: false,
  isPass: false,
  data4: [],
}

export default Tools;
