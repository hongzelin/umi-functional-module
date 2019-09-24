import React from 'react';
import Link from 'umi/link';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

const BaseMenu = ({ location }) => (
  <Menu
    selectedKeys={[location.pathname]}
    mode="inline"
    theme="dark"
  >
    <Menu.Item key="/">
      <Link to="/">
        <Icon type="home" />
        <span>Home</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="/users">
      <Link to="/users">
        <Icon type="user" />
        <span>Users</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="/taskFlow">
      <Link to="/taskFlow">
        <Icon type="user" />
        <span>任务配置</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="/camera">
      <Link to="/camera">
        <Icon type="video-camera" />
        <span>在线摄像头</span>
      </Link>
    </Menu.Item>
    <SubMenu
      key="/system"
      title={
        <span>
          <Icon type="setting" />
          <span>系统管理</span>
        </span>
      }
    >
      <Menu.Item key="/system/menu">
        <Link to="/system/menu"><span>菜单管理</span></Link>
      </Menu.Item>
      <Menu.Item key="/system/privilege">
        <Link to="/system/privilege"><span>权限管理</span></Link>
      </Menu.Item>
      <Menu.Item key="/system/role">
        <Link to="/system/role"><span>角色管理</span></Link>
      </Menu.Item>
      <Menu.Item key="/system/user">
        <Link to="/system/user"><span>账号管理</span></Link>
      </Menu.Item>
    </SubMenu>
    <Menu.Item key="/404">
      <Link to="/page-you-dont-know">
        <Icon type="frown-circle" />
        <span>404</span>
      </Link>
    </Menu.Item>
  </Menu>
);
export default BaseMenu;
