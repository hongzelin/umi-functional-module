/*
 * @Author: lin.zehong
 * @Date: 2019-08-07 11:28:12
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-08-20 09:49:19
 * @Desc: 個人工作台--资源盘点
 */
import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { connect } from "dva";
import TitlePage from 'components/Title';
import TitleNum from 'components/TitleNum';
import styles from './Inventory.less';

const Inventory = (props) => {
  useEffect(() => {
    const { getResource } = props;
    getResource();
  },[])

  const { resourceData } = props;
  const {
    dataDirectoryCount, businessCount, apiCount,
    authorizedRecord, authorizedBusinessCall,
  } = resourceData || {};

  return (
    <div className={styles.root}>
      <TitlePage title="資源盤點" />
      <TitleNum title="數據目錄數量" num={dataDirectoryCount || 0} linkUrl="directory/directorylist" />
      <TitleNum title="事項數量" num={businessCount || 0} linkUrl="projects" />
      <TitleNum title="API數量" num={apiCount || 0} linkUrl="API" />
      <TitleNum title="已授權記錄" num={authorizedRecord || 0} />
      <TitleNum title="已授權的事項累計調用量" num={authorizedBusinessCall || 0} linkUrl="monitor" style={{borderRight: 0}} />
    </div>
  );
}

  Inventory.propTypes = {
    resourceData: PropTypes.objectOf(PropTypes.any),
  }
  
  Inventory.defaultProps = {
    resourceData: {},
  }

  const mapStateToProps = ({ workbench }) => ({
    resourceData: workbench.resourceData,
  });
  
  const mapDispatchToProps = dispatch => ({
    getResource(payload) {
      dispatch({
        type: 'workbench/getResource',
        payload,
      });
    },
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
