import { useState } from 'react';
import {Outlet, Link, useLocation } from 'react-router-dom'

import {
    RightOutlined,
    LeftOutlined,
    UserOutlined,
    ProfileOutlined,
    TeamOutlined,
} from '@ant-design/icons';

import { Layout, Menu, Button, theme } from 'antd';

const { Header, Sider, Content } = Layout;

  const AdminLayout = () => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();

    return (
      <Layout className='admin-layout'>
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className='admin-logo'>Logo</div>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            items={[
              {
                key: '/dashboard',
                icon: <ProfileOutlined />,
                label: <Link to="/dashboard">Dashboard</Link>,
              },
              {
                key: '/teachers',
                icon:<UserOutlined />,
                label:<Link to="/teachers">Teachers</Link>,
              },
              {
                key: '/students',
                icon: <TeamOutlined />,
                label:<Link to="/students">Students</Link>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    );
  };
  export default AdminLayout;