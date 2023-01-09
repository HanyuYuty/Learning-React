import React, { useState,useEffect } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme,Select as NewSelect,  } from 'antd';
import Navigation from './Navigation';
import TableList from './TableList';
import {persistor,store} from './redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import  Modal  from './components/Modal';
import withJump from './HOC/withJump';
import Select from './components/Select/Select';
import { connect } from 'react-redux';
import { useHistory,Switch,Route } from 'react-router-dom';
import routerConfig from './router_config';
import RouterComponent from './components/RouterComponent';





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
  getItem('影院', '/list', <PieChartOutlined />),
  getItem('其他', '/else', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];
const AntdHome = (props) => {


  const [collapsed, setCollapsed] = useState(false);
  const [isShowModal,setIsShowModal] = useState(false);
  const [currentData,setCurrentData] = useState({})
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const history = useHistory()


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
                  <Sider
                      collapsible
                      collapsed={collapsed}
                      onCollapse={value => setCollapsed(value)}
                  >
                      <div
                          style={{
                              height: 32,
                              margin: 16,
                              background: 'rgba(255, 255, 255, 0.2)',
                          }}
                      />
                      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onSelect={({ item, key, keyPath, selectedKeys, domEvent })=>{
                       history.push(keyPath[0])
                      }}/>
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
                        <Switch>
                          {
                            routerConfig&&routerConfig.map(routes=><RouterComponent {...routes} key={routes} prop={{setIsShowModal,getCurrentData,isShowModal}}></RouterComponent>)
                          }
                        </Switch>
                          {/* <Navigation></Navigation>
                          <Select
                              options={cityList}
                              onChange={(e, value) => {
                                  // console.log('e',e,value);
                              }}
                          ></Select>
                          <NewSelect
                              options={cityList}
                              style={{
                                  width: 300,
                              }}
                              showSearch
                              filterOption={(input, option) => {
                                return (option?.label ?? '').includes(input)
                              }}
                          ></NewSelect>
                          <TableList
                              setIsShowModal={setIsShowModal}
                              getCurrentData={getCurrentData}
                          ></TableList> */}
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
                      {isShowModal && (
                          <Modal setIsShowModal={setIsShowModal} currentData={currentData}></Modal>
                      )}
                  </Layout>
              </Layout>
          </PersistGate>
      </Provider>
  );
};

export default withJump(AntdHome)
