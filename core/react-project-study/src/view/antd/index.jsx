import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, } from 'antd';
import Navigation from './Navigation';
import TableList from './TableList';
import {persistor,store} from './redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import  Modal  from './components/Modal';






const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];
const AntdHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isShowModal,setIsShowModal] = useState(false);
  const [currentData,setCurrentData] = useState({})
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const getCurrentData = (callBackData)=>{
    setCurrentData(callBackData)
  }



  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout
          style={{
            minHeight: '100vh',
          }}
        >
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div
              style={{
                height: 32,
                margin: 16,
                background: 'rgba(255, 255, 255, 0.2)',
              }}
            />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
          </Sider>
          <Layout className="site-layout">
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
            />
            <Content
              style={{
                margin: '0 16px',
              }}
            >
            <Navigation></Navigation>
            <TableList setIsShowModal={setIsShowModal} getCurrentData={getCurrentData}></TableList>
              {/* <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                }}
              >
                Bill is a cat.
              </div> */}
            </Content>
            {/* <Footer
              style={{
                textAlign: 'center',
              }}
            >
              Ant Design ©2018 Created by Ant UED
            </Footer> */}
            {isShowModal&&<Modal setIsShowModal={setIsShowModal} currentData={currentData} ></Modal>}
          </Layout>
        </Layout>
      </PersistGate>
    </Provider>
  );
};
export default AntdHome;
