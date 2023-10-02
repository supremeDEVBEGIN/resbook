import React from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  FileOutlined,
} from '@ant-design/icons';

const { Sider, Content } = Layout;

function DashboardHome() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={100} theme="dark">
        <Menu mode="vertical" theme="dark" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />} />
          <Menu.Item key="2" icon={<UserOutlined />} />
          <Menu.Item key="3" icon={<FileOutlined />} />
        </Menu>
      </Sider>
      <Layout>
        <Content>เนื้อหาของแดชบอร์ดของคุณ</Content>
      </Layout>
    </Layout>
  );
}

export default DashboardHome;
