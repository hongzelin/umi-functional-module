/*
 * @Author: lin.zehong
 * @Date: 2019-03-24 17:29:23
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-06-27 11:03:41
 * @Desc: containers - 标准输入输出
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Select } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const mapStateToProps = state => ({
  stdio: state.taskFlowStaticModel.staticData.stdio,
});

@connect(mapStateToProps, null)
class Stdio extends React.Component {
  state = {
    outputs: [],
    stdioIKey: null,
    stdioOKey: null,
  };

  // field = new Field(this);

  componentDidMount() {
    const inputStatic = this.getInputStatic();
    if (inputStatic.length) {
      const { data } = this.props;
      let iKey = null;
      let oKey = null;
      if (data && data.stdioKey) {
        // 详情
        [iKey, oKey] = data.stdioKey.split(':');
      } else {
        iKey = 'RtspUrl';
      }
      this.handleState(iKey, oKey);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data } = this.props;
    const newData = nextProps.data;
    if (newData && newData.stdioKey && newData !== data) {
      const [iKey, oKey] = nextProps.data.stdioKey.split(':');
      this.handleState(iKey, oKey);
    }
  }

  handleState = (iKey, oKey) => {
    const outputStatic = this.getOutputStatic(iKey);
    this.setState({
      stdioIKey: iKey,
      stdioOKey: oKey || 'OriginalImage',
      outputs: outputStatic,
    });
  };

  renderInput = () => {
    const { isUpgrade } = this.props;
    const inputStatic = this.getInputStatic();
    return (
      <Select
        placeholder="请选择"
        style={{ width: '200px' }}
        disabled={isUpgrade}
        onChange={this.handleInput}
        popupContainer={triggerNode => triggerNode.parentNode}
      >
        {inputStatic.map(({ paramKey, paramValue }) => (
          <Option value={paramKey} key={paramKey}>
            {paramValue}
          </Option>
        ))}
      </Select>
    );
  };

  renderOutput = () => {
    const { outputs } = this.state;
    const { isUpgrade } = this.props;
    return (
      <Select
        placeholder="请选择"
        style={{ width: '200px' }}
        disabled={isUpgrade}
        popupContainer={triggerNode => triggerNode.parentNode}
      >
        {outputs.map(({ paramKey, paramValue }) => (
          <Option key={paramKey} value={paramKey}>
            {paramValue}
          </Option>
        ))}
      </Select>
    );
  };

  getInputStatic = () => {
    const { stdio } = this.props;
    const inputStatic = [];
    const inputKey = [];
    for (const item of stdio) {
      const { paramKey, paramValue } = item;
      const [iKey] = paramKey.split(':');
      const [iValue] = paramValue.split(':');
      if (inputKey.indexOf(iKey) === -1) {
        inputKey.push(iKey);
        inputStatic.push({
          paramKey: iKey,
          paramValue: iValue,
        });
      }
    }
    return inputStatic;
  };

  handleInput = value => {
    const output = this.getOutputStatic(value);
    this.setState({ outputs: output });
    const { form } = this.props;
    form.setFieldsValue({ stdioOutput: null });
  };

  getOutputStatic = inputKey => {
    const { stdio } = this.props;
    const outputStatic = [];
    for (const item of stdio) {
      const { paramKey, paramValue } = item;
      const [iKey, oKey] = paramKey.split(':');
      const oValue = paramValue.split(':')[1];
      if (iKey === inputKey) {
        outputStatic.push({
          paramKey: oKey,
          paramValue: oValue,
        });
      }
    }
    return outputStatic;
  };

  render() {
    const { stdioIKey, stdioOKey } = this.state;
    const {
      form: { getFieldDecorator },
      data,
    } = this.props;

    return (
      <Fragment>
        <FormItem
          label='算子输入'
        >
          {getFieldDecorator('stdioInput', {
            initialValue: data.stdioInput || stdioIKey,
            rules: [
              {
                required: true,
                message: '输入不能为空',
              },
            ],
          })(this.renderInput())}
        </FormItem>

        <FormItem
          label="算子输出"
        >
          {getFieldDecorator('stdioOutput', {
            initialValue: data.stdioOutput || stdioOKey,
            rules: [
              {
                required: true,
                message: '输出不能为空',
              },
            ],
          })(this.renderOutput())}
        </FormItem>
      </Fragment>
    );
  }
}

Stdio.propTypes = {
  form: PropTypes.objectOf(PropTypes.any),
  isUpgrade: PropTypes.bool,
  data: PropTypes.objectOf(PropTypes.any),
  stdio: PropTypes.arrayOf(PropTypes.any),
};

Stdio.defaultProps = {
  form: {},
  isUpgrade: false,
  data: {},
  stdio: [],
};

export default Stdio;
