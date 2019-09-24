/*
 * @Author: lin.zehong
 * @Date: 2019-03-29 16:14:27
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-06-27 15:51:19
 * @Desc: 策略
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import * as constants from '../../../constants/constants';
import StrategySource from './StrategySource'
import Styles from './index.scoped.less'

const mapStateToProps = state => ({
  stategys: state[constants.NAMESPACE].stategys,
  allStdoKey: state[constants.NAMESPACE].allStdoKey,
})

const mapDispatchToProps = dispatch => ({
  getStategys() {
    dispatch({
      type: `${constants.NAMESPACE}/getStategys`,
    })
  },

  getAllStdoKey() {
    dispatch({
      type: `${constants.NAMESPACE}/allStdoKey`,
    })
  },
})

@connect(mapStateToProps, mapDispatchToProps)
class Strategy extends React.Component {
  componentDidMount() {
    const { getStategys, getAllStdoKey } = this.props;
    getAllStdoKey();
    getStategys();
  }

  renderItem = () => {
    const { stategys, allStdoKey } = this.props;
    let renderStategys = (
      <li className={Styles.item_noData}>
        <span className={Styles.text}>暂无数据</span>
      </li>
    );
    if (stategys.length) {
      renderStategys = stategys.map(stategy => (
        <StrategySource
          key={stategy.stategyId + Math.random() * 100}
          stategy={stategy}
          allStdoKey={allStdoKey}
        />
      ))
    }
    return renderStategys;
  }

  render() {
    return (
      <div>
        <h3 className={Styles.subTitle}>
          策略
        </h3>
        <ul className={Styles.list}>
          {this.renderItem()}
        </ul>
      </div>
    )
  }
}

Strategy.propTypes = {
  stategys: PropTypes.arrayOf(PropTypes.any),
  allStdoKey: PropTypes.string,
  getStategys: PropTypes.func,
  getAllStdoKey: PropTypes.func,
}

Strategy.defaultProps = {
  stategys: [],
  allStdoKey: '',
  getStategys: () => { },
  getAllStdoKey: () => { },
}

export default Strategy;
