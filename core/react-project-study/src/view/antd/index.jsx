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
import PrizeItem from './PrizeItem';


import axios from 'axios';


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

const [renderArr,setRenderArr] = useState([{
  id:120100,
},{
  id:130400
},{
  id:130500
}])

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const history = useHistory()


  const getCurrentData = (callBackData)=>{
    setCurrentData(callBackData)
  }


  

  // const getComdStock=async (record)=>{

  //   const res2 = await axios({
  //       url:`https://m.maizuo.com/gateway?cityId=${record}&ticketFlag=1&k=7406159`,
  //       method:"get",
  //       headers:{
  //           'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16395416565231270166529","bc":"110100"}',
  //           'X-Host': 'mall.film-ticket.cinema.list'
  //       }
  //       })

  //       return res2
  //   }


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

                      {
                        renderArr.map((actId)=>{

                         
                    
                          return <PrizeItem record={actId.id} key={actId.id}></PrizeItem>
                        })
                      }
                      <button onClick={()=>{
                        setRenderArr([{id:231000},...renderArr])
                      }}>Add</button>
                  </Layout>
              </Layout>
          </PersistGate>
      </Provider>
  );
};

export default withJump(AntdHome)
