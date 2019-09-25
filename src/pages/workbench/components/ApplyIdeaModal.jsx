/*
 * @Author: lin.zehong
 * @Date: 2019-08-07 11:28:12
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-08-19 19:31:00
 * @Desc: 個人工作台--审批意见 / 审批 modal
 */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "dva";
import { Modal } from 'antd';
import { Idea } from 'components/Mattersform';
import styles from './ApplyIdeaModal.less';

class ApplyIdeaModal extends Component {

  componentDidMount() {
    const { getInfo, userId, record, type } = this.props;
    const { applyCode, approvalCode } = record;
    if (type === "apply") {
      getInfo({
        type: 2,
        applyCode,
        userId,
      });
    }
    if (type === "approval") {
      getInfo({
        type: 1,
        approvalCode,
        userId,
      });
    }
  }

  handleOk = () => {
    this.handleCancel();
  };

  handleCancel = () => {
    const { handleVisible } = this.props;
    handleVisible(false);
  };

  render() {
    const { title, approvalFormList, record } = this.props;
    const { applyCode } = record;
    return (
      <div className={styles.root}>
        <Modal
          title={`${applyCode || title}-審批意見`}
          visible
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={680}
        >
          <Idea
            isShowTitle={false}
            data={approvalFormList || [{}]}
            options={{
              rootStyle: {
                padding: 0,
                margin: 0,
              },
              ideaStyle: {
                width: '100%',
              },
            }}
          />
        </Modal>
      </div>
    );
  }
}

ApplyIdeaModal.propTypes = {
  userId: PropTypes.string,
  title: PropTypes.string,
  record: PropTypes.objectOf(PropTypes.any),
  approvalFormList: PropTypes.arrayOf(PropTypes.any),
}

ApplyIdeaModal.defaultProps = {
  userId: "",
  title: '標題',
  record: {},
  approvalFormList: [],
}

const mapStateToProps = ({ applyForm, publicModel }) => ({
  userId: publicModel.userId,
  approvalFormList: applyForm.approvalFormList,
});

const mapDispatchToProps = dispatch => ({
  getInfo(payload) {
    dispatch({
      type: 'applyForm/getInfo',
      payload,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplyIdeaModal);
