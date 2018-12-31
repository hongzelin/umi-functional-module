import { Menu, Icon } from 'antd';
import Link from 'umi/link';
const SubMenu = Menu.SubMenu;

function BaseMenu({ location }) {
  return (
    <Menu
      selectedKeys={[location.pathname]}
      mode="inline"
      theme="dark"
    >
      <Menu.Item key="/">
        <Link to="/"><Icon type="home" /><span>Home</span></Link>
      </Menu.Item>
      <Menu.Item key="/users">
        <Link to="/users"><Icon type="user" /><span>Users</span></Link>
      </Menu.Item>
      <Menu.Item key="/camera">
        <Link to="/camera"><Icon type="video-camera" /><span>在线摄像头</span></Link>
      </Menu.Item>
      <SubMenu key="/system" title={<span><Icon type="setting" /><span>系统管理</span></span>}>
        <Menu.Item key="/system/menu">
          <Link to="/system/menu"><span>菜单管理</span></Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="/umi">
        <a href="https://github.com/umijs/umi" target="_blank"><span>umi</span></a>
      </Menu.Item>
      <Menu.Item key="/dva">
        <a href="https://github.com/dvajs/dva" target="_blank"><span>dva</span></a>
      </Menu.Item>
      <Menu.Item key="/404">
        <Link to="/page-you-dont-know"><Icon type="frown-circle" /><span>404</span></Link>
      </Menu.Item>
    </Menu>
  );
}
export default BaseMenu;
