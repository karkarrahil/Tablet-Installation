import React, { Children } from 'react'
import { Button, Layout, Popover, Space } from 'antd'

import { Divider, Menu } from 'antd'

import { TabEntry } from './TabEntry';
import { TabletOutlined, PlusOutlined, LineChartOutlined, UserOutlined, UpSquareFilled, LogoutOutlined } from '@ant-design/icons'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logOut } from '../store/createSlice';
const { Header, Footer, Sider, Content } = Layout;

export const LayoutApp = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = [
        {
            label: <h1 style={{ fontSize: '30px', borderBottom: '3px solid black' }}>Tablet</h1>,
            key: '/Layout/',
            icon: <TabletOutlined style={{ fontSize: '19px' }} />,
            render: (value) => {
                return <h1>{value}</h1>
            }
        },
        {
            label: 'Tab Entry',
            icon: <PlusOutlined />,
            key: '/Layout/Tab'
        },
        {
            label: 'Tablet Detail',
            icon: <LineChartOutlined />,
            key: '',
            children: [
                {
                    label: 'Tablet Master',
                    key: '/Layout/Master'
                }
            ]
        },
        {
            label: 'Report Installation',
            key: '/Report',
            type: 'group',
            children: [
                {
                    label: 'Installation Report',
                    key: '/InstallationReport'
                },
            ]
        }
    ]
    const Navigate = (key) => {
        navigate(key)
    }
    const Admin = () => {
        return (
            <Button icon={<LogoutOutlined />} danger onClick={() => dispatch(logOut())}>LogOut</Button>
        )
    }

    return (

        <div style={{ height: '100vh', overflow: 'auto' }}>
            <Layout>
                <div>

                    <Sider width={300} theme='light' style={{
                        height: '100vh', overflow: 'auto', position: 'fixed', left: '0',
                        top: '0',
                        bottom: '0',
                        color: 'white',
                        // padding: '10px',
                        // background: '#001529',
                        width: '500px'

                    }}>

                        <Menu mode='inline'  defaultSelectedKeys={'/Layout/Master'} items={items} onClick={({ key }) => Navigate(key)} />
                    </Sider>
                </div>
                <Layout>
                    {/* <Header>Header</Header> */}
                    <Content style={{ overflowX: 'auto', overflow: 'auto' }}>
                        <Header>
                            <div className="nav" style={{ padding: '0px', paddingLeft: '260px', gap: '10px', color: 'white', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'end' }}>
                                <div className="icon">
                                    <Popover content={<Admin />} trigger='click'>
                                        <Space>

                                            <UserOutlined style={{ background: 'white', color: 'black', padding: '12px', marginTop: '12px', borderRadius: '40px' }} />
                                            <b>Rahil</b>
                                        </Space>
                                    </Popover>
                                </div>
                            </div>
                        </Header>
                        {children}


                    </Content>

                </Layout>
            </Layout >
            <Outlet />
        </div >
    )
}
