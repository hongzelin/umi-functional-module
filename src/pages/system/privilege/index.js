/*
 * @Author: lin.zehong
 * @Date: 2018-12-25 14:24:32
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-01-05 22:38:10
 * @Desc: 权限管理
 */
import React from 'react';
import PrivilegePage from './components/PrivilegePage';
import PrivilegeRelMenuPage from './components/PrivilegeRelMenuPage';

export default () => {
  return (
    <div>
      <PrivilegePage />
      <PrivilegeRelMenuPage />
    </div>
  )
}
