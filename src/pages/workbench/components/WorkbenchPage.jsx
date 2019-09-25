import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "dva";
import { ADMIN, BUREAUS, APPLICANT } from '../constants';
import ApplicantPage from './applicant/ApplicantPage';
import BureausPage from './bureaus/BureausPage';
import AdminPage from './admin/AdminPage';
import styles from './WorkbenchPage.less';

class WorkbenchPage extends Component {

  componentDidMount() {
    const { countByState } = this.props;
    countByState();
  }

  switchRole = () => {
    const { role } = this.props;
    let templateRole = null;
    switch (role) {
      case APPLICANT: // 申請方
        templateRole = <ApplicantPage role={role} />;
        break;
      case BUREAUS: // 委辦局
        templateRole = <BureausPage role={role} />;
        break;
      case ADMIN: // 系統管理員
        templateRole = <AdminPage role={role} />;
        break;
      default:
        templateRole = <ApplicantPage />;
    }
    return templateRole;
  }

  render() {
    return (
      <div className={styles.root}>
        <h1 className={styles.mainTitle}>個人工作台</h1>
        {this.switchRole()}
      </div>
    );
  }
}

WorkbenchPage.propTypes = {
  role: PropTypes.string,
};

WorkbenchPage.defaultProps = {
  role: 'deptNormalUser', // 申請方 deptNormalUser / 委辦局 deptAdminUser / 系統管理員 sysAdmin
};

const mapStateToProps = ({ publicModel }) => ({
  userId: publicModel.userId,
  role: publicModel.roleCharacter,
});

const mapDispatchToProps = dispatch => ({
  countByState(payload) {
    dispatch({
      type: 'applyForm/countByState',
      payload,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkbenchPage);

