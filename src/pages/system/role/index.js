/*
 * @Author: lin.zehong
 * @Date: 2018-12-25 14:24:32
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2019-05-03 10:37:21
 * @Desc: 角色管理
 */
import React from 'react';
import RolePage from './components/RolePage';
import RoleRelPrivilegePage from './components/RoleRelPrivilegePage';

export default () => {
  return (
    <div>
      <RolePage />
      <RoleRelPrivilegePage />
    </div>
  )
}
