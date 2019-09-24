/*
 * @Author: lin.zehong
 * @Date: 2019-03-24 17:29:23
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-06-27 15:49:26
 * @Desc: containers - 任务编辑 算子详情
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Input, Select } from 'antd'
import { withRouter } from 'dva/router'
import * as constants from '../../constants/constants'
import styles from './Detail.less'

const FormItem = Form.Item;
const { Option } = Select;

const mapStateToProps = state => ({
  algoDetail: state[constants.NAMESPACE].algoDetail,
  calculateLocation: state.taskFlowStaticModel.staticData.calculateLocation, // 静态数据
  locations: state[constants.NAMESPACE].runLocation,
})

const mapDispatchToProps = dispatch => ({
  runLocation(payload) {
    dispatch({
      type: `${constants.NAMESPACE}/dump`,
      payload,
    })
  },
})

@connect(mapStateToProps, mapDispatchToProps)
class Detail extends React.Component {

  componentWillReceiveProps(nextProps) {
    const { algoDetail } = this.props;
    if (nextProps.algoDetail && nextProps.algoDetail !== algoDetail) {
      const { locations } = nextProps;
      const {
        algorithmVersionId,
        algorithmName,
        providerName,
        algorithmModelStr,
        stdoKey,
        stdiKey,
        performance,
      } = nextProps.algoDetail;
      const flag = locations.filter(item => item.algorithmVersionId === algorithmVersionId); // eslint-disable-line

      const handleLocation = flag.length && flag[0].runLocation ? { location: flag[0].runLocation.split(',') } : null;

      const { form } = this.props;
      form.setFieldsValue({
        algorithmName,
        providerName,
        algorithmModelStr,
        stdoKey,
        stdiKey,
        performance,
        ...handleLocation,
        // location: (flag.length && flag[0].runLocation && flag[0].runLocation.split(',')) || null, // eslint-disable-line
      });
    }
  }

  handleChange = (value) => {
    const { runLocation, algoDetail, locations } = this.props;
    const { algorithmVersionId, algorithmName } = algoDetail;
    if (!algorithmVersionId) return;
    const params = {
      algorithmVersionId,
      algorithmName,
      runLocation: value.join(),
    };
    const flag = locations.filter((item, index) => {
      if (item.algorithmVersionId === algorithmVersionId) {
        locations.splice(index, 1, params);
        return true;
      }
      return false;
    });
    if (flag.length) {
      runLocation({ runLocation: locations });
    } else {
      locations.push(params);
      runLocation({ runLocation: locations });
    }
  }

  render() {
    const {
      form: { getFieldDecorator },
      data, isUpgrade, calculateLocation = [], type,
    } = this.props;
    const dataSource = calculateLocation.map(({ paramValue, paramKey }) => (
      <Option key={paramKey} value={paramKey}>{paramValue}</Option>
    ));

    return (
      <div>
        <h3 className={styles.subTitle}>
          算子详情
        </h3>
        <Form
          size='medium'
          className={styles.wrapForm}
        >
          <FormItem label="算子名称">
            {
              getFieldDecorator('algorithmName', {
                initialValue: data.algorithmName,
              })(
                <Input disabled={isUpgrade} />
              )
            }
          </FormItem>

          <FormItem label='厂商'>
            {
              getFieldDecorator('providerName', {
                initialValue: data.providerName,
              })(
                <Input disabled={isUpgrade} />
              )
            }
          </FormItem>

          <FormItem label='模型'>
            {
              getFieldDecorator('algorithmModelStr', {
                initialValue: data.algorithmModelStr,
              })(
                <Input disabled={isUpgrade} />
              )
            }
          </FormItem>

          <FormItem label='输出'>
            {
              getFieldDecorator('stdoKey', {
                initialValue: data.stdoKey,
              })(
                <Input disabled={isUpgrade} />
              )
            }
          </FormItem>

          <FormItem label='输入'>
            {
              getFieldDecorator('stdiKey', {
                initialValue: data.stdiKey,
              })(
                <Input disabled={isUpgrade} />
              )
            }
          </FormItem>

          <FormItem label='性能'>
            {
              getFieldDecorator('performance', {
                initialValue: data.performance,
              })(
                <Input disabled={isUpgrade} />
              )
            }
          </FormItem>

          <FormItem label="计算位置">
            <div className="location-wrap" id="locationWrap">
              {
                getFieldDecorator('location', {
                  rules: [
                    {
                      required: true,
                      message: '计算位置不能为空',
                    },
                  ],
                })(
                  <Select
                    placeholder="请选择"
                    mode="multiple"
                    onChange={this.handleChange}
                    style={{ width: '100%' }}
                    disabled={type === 'detail'}
                  >
                    {dataSource}
                  </Select>
                )
              }
            </div>
          </FormItem>

        </Form>
      </div>
    );
  }
}

Detail.propTypes = {
  form: PropTypes.objectOf(PropTypes.any),
  calculateLocation: PropTypes.arrayOf(PropTypes.any),
  algoDetail: PropTypes.objectOf(PropTypes.any),
  isUpgrade: PropTypes.bool,
  data: PropTypes.objectOf(PropTypes.any),
  locations: PropTypes.arrayOf(PropTypes.any),
  type: PropTypes.string,
  runLocation: PropTypes.func,
}

Detail.defaultProps = {
  form: {},
  calculateLocation: [],
  algoDetail: {},
  isUpgrade: true,
  data: {},
  locations: [],
  type: 'create',
  runLocation: () => { },
}

export default withRouter(Form.create()(Detail))
