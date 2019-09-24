/*
 * @Author: lin.zehong
 * @Date: 2019-03-29 16:14:27
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-06-27 11:23:30
 * @Desc: 左边配置发布算子
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Popconfirm } from 'antd'
import { connect } from 'dva'
import * as constants from '../../../constants/constants';
import MenuItem from './OperatorSource'
import BalloonContent from './BalloonContent'
import Styles from './Operator.less'

const { SubMenu } = Menu;

const mapStateToProps = state => ({
  algorithmList: state[constants.NAMESPACE].algorithmList,
})

const mapDispatchToProps = dispatch => ({
  getAlgorithmList(payload) {
    dispatch({
      type: `${constants.NAMESPACE}/getAlgorithmList`,
      payload,
    })
  },
  getAlgorithmDetails(payload) {
    dispatch({
      type: `${constants.NAMESPACE}/getAlgorithmDetails`,
      payload,
    })
  },
})

@connect(mapStateToProps, mapDispatchToProps)
class Operator extends React.Component {
  state = {
    visible: false,
  }

  componentDidMount() {
    this.handleList();
  }

  handleList = (params) => {
    const { getAlgorithmList } = this.props;
    getAlgorithmList(params || {});
  }

  handleVisible = (v) => {
    this.setState({ visible: v })
  }

  handlerDetail = (id) => {
    const { getAlgorithmDetails, taskId } = this.props;
    getAlgorithmDetails({
      taskId,
      algorithmVersionId: id,
      status: 'PUBLISHED',
    });
  }

  render() {
    const { visible } = this.state;
    const { algorithmList } = this.props;
    const BContent = (
      <BalloonContent
        handleVisible={this.handleVisible}
        handleList={this.handleList}
      />
    )
    return (
      <div className={Styles.opera_lwrap}>
        <div className={Styles.lTitle}>
          <h3 className={Styles.subTitle}>算子</h3>
          <div id="balloonWrap">
            <Popconfirm
              overlayClassName="overlayWrap"
              style={{ width: 230 }}
              visible={visible}
              title={visible && BContent}
              icon={null}
            >
              <div
                className={Styles.title_right}
                onClick={() => this.handleVisible(true)}
              >
                <Icon type="filter-list" size="xs" className={Styles.icon_list} />
                <span className={Styles.text}>筛选</span>
              </div>
            </Popconfirm>
          </div>
        </div>

        <Menu
          defaultOpenKeys={['0']}
          mode="inline"
          className={Styles.opera_lMenu}
        >
          <SubMenu key="0" title="算子列表">
            {
              algorithmList.length > 0 ?
                algorithmList.map(algorithm => (
                  <MenuItem
                    key={algorithm.algorithmVersionId}
                    id={algorithm.algorithmVersionId}
                    nodeData={algorithm}
                    handlerDetail={this.handlerDetail}
                  />
                ))
                : (
                  <Menu.Item key="1" className={Styles.item_noData}>
                    <span className={Styles.text}>暂无数据</span>
                  </Menu.Item>
                )}
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

Operator.propTypes = {
  algorithmList: PropTypes.arrayOf(PropTypes.any),
  getAlgorithmList: PropTypes.func,
  getAlgorithmDetails: PropTypes.func,
  taskId: PropTypes.string,
}

Operator.defaultProps = {
  algorithmList: [],
  getAlgorithmList: () => { },
  getAlgorithmDetails: () => { },
  taskId: '-1',
}


export default Operator;
