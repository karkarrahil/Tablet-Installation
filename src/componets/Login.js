import { Button, Col, Form, Input, message, Row } from 'antd'
import { LockFilled, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'
import './Login.css'
import { Link, Navigate, Route, Router, Routes, useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { login } from '../store/createSlice'
import { duration } from 'moment'


export const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const success = () => {

        messageApi.open({
            type: 'success',
            content: 'login success',
            duration:10
        })
    }
    const error = () => {
       message.error('wrong password or username')
    }
    const onFinish = (data) => {
        console.log(data);
        if (data.username === 'admin@123' && data.password === 'admin@123') {
            dispatch(login());
            success()
            setTimeout(() => {
                navigate('/Layout/Master')
            }, 2000);
        } else {

            error()
        }
    }
    return (
        <div style={{ height: '100vh', display: 'flex', justifyItems: 'center', alignItems: 'center', justifyContent: 'center' }}>
            {contextHolder}
            <div className="Form">
                <h1 style={{ textAlign: 'center', margin: '12px' }}>Login</h1>
                <Form onFinish={onFinish} style={{ width: '400px', fontSize: "18px", display: 'flex', flexDirection: 'column', justifyContent: 'center', justifyItems: 'center' }} labelCol={{
                    span: 8,
                }}>
                    <Form.Item name={'username'} label='username'>
                        <Input type='text' prefix={<UserOutlined />} style={{ borderRadius: '40px', padding: '5px', fontSize: "18px" }} />
                    </Form.Item>
                    <Form.Item name={'password'} label='password'>
                        <Input.Password prefix={<LockOutlined />} style={{ borderRadius: '40px', padding: '5px', fontSize: "18px" }} />
                    </Form.Item>
                    <Button type='primary' htmlType='submit' style={{ height: '40px', fontWeight: 'bold', fontSize: '18px' }} block>login</Button>
                </Form>

            </div>
        </div>
    )
}


