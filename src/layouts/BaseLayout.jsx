/*
 * @Author: lin.zehong
 * @Date: 2018-12-20 13:54:23
 * @Last Modified by: lin.zehong
 * @Last Modified time: 2018-12-25 17:18:50
 * @Desc: 基础布局
 */
import React from 'react';
import { Layout, Icon, LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { connect } from "dva";
import withRouter from 'umi/withRouter';
import styles from './BaseLayout.less';
import BaseMenu from './BaseMenu';
import logo from '../assets/logo.png';

const { Header, Sider, Content } = Layout;

@connect(({ publicModel }) => ({
  publicModel,
}))
class BaseLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  }

  render() {
    const { children, location } = this.props;
    const { collapsed } = this.state;
    return (
      <div className={styles.normal}>
        <LocaleProvider locale={zhCN}>
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
            >
              <div className={`${styles.logo} ${collapsed ? styles.active : ''}`}>
                <img src={logo} alt="logo" />
                <span className={styles.title}>系统模块</span>
              </div>
              <BaseMenu location={location} />
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                  className={styles.trigger}
                  type={collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
              </Header>
              <Content style={{
                margin: '16px', padding: 16, background: '#fff', minHeight: 280,
              }}
              >
                {children}
              </Content>
            </Layout>
          </Layout>
        </LocaleProvider>
      </div>
    );
  }
}

export default withRouter(BaseLayout);
