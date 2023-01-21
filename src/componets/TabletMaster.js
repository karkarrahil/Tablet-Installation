import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Popconfirm, Popover, Space, Table, Tabs } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSerial, EditSerialNumber, findIndex, removeSerial, updateData } from '../store/createSlice';

export const TabletMaster = () => {
    const dataSource = useSelector((state) => state.application.serialNumbers);
    const [Edit, setEdit] = useState(false);
    const [data, setDataSource] = useState();
    const [newData, setNewData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [form1] = useForm();
    const dispatch = useDispatch();
    const onSearch = (value) => {
        console.log(value)
    }
    const operations = () => {
        return (
            <>
                <Button type='primary' onClick={() => setIsOpen(true)}>Add Installation</Button>
                <Modal open={isOpen}
                    onCancel={() => setIsOpen(false)}

                    footer={[
                        <Button type='primary' onClick={() => {
                            form1.validateFields().then(value => {
                                dispatch(addSerial(value));
                                form1.resetFields()
                            })
                        }}>ADD</Button>
                    ]}
                >
                    <label htmlFor="srNO">serial No:</label>
                    <Form form={form1} onKeyDown={(e) => {

                        if (e.code === 'Enter') {
                            form1.validateFields().then(value => {
                                dispatch(addSerial(value));
                                form1.resetFields();

                            })
                        }

                    }}>
                        <Form.Item name={'serialNumber'} rules={[
                            {
                                required: true,
                                message: 'serial number is compulsory!'
                            },

                        ]}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>

            </>
        )
    };
    const columns = [
        {
            title: 'serial NO:',
            dataIndex: 'serialNumber',
            key: '01',
        },
        {
            title: 'action',
            key: '02',
            render: (record) => {
                return (
                    <>
                        <Space>
                            <EditFilled style={{ color: 'green' }} onClick={() => {

                                setEdit(true)
                                setNewData(record);
                                dispatch(findIndex(record.serialNumber));
                            }} />
                            <Popconfirm title='delete serial numbers' description='Are you sure to delete!' onConfirm={() => {
                                dispatch(removeSerial(record.serialNumber))
                            }}>
                                <DeleteFilled style={{ color: 'red' }} />
                            </Popconfirm>
                        </Space>
                    </>

                )

            }
        }

    ]

    return (
        <div
            style={{ marginLeft: '300px', padding: '7px' }} 
        >

            <div className="Tab" style={{ display: 'flex' }}>
                {/* <Button type='primary' style={{
                    alignSelf: 'end'
                }} onClick={() => setIsOpen(true)}>Add Tab</Button>
                <Modal open={isOpen} onCancel={() => setIsOpen(false)} onOk={() => setIsOpen(false)}>
                    <h2>serial No:</h2>
                    <label htmlFor='serialNo'>serial no:</label>
                    <Input type='number' id='serialNo' />
                </Modal> */}
                <Tabs defaultActiveKey='tab1' tabBarExtraContent={operations()}>
                    <Tabs.TabPane tab='Tablet' key={'tab1'} >
                        <Table tableLayout='fixed' columns={columns} dataSource={dataSource} />
                    </Tabs.TabPane>
                </Tabs>
            </div>
            <Modal open={Edit} onCancel={() => setEdit(false)} onOk={() => {

                dispatch(updateData(newData.serialNumber))
                setEdit(false)
            }}>
                <label htmlFor="input">serial NO: </label>
                <Input id='input' value={newData?.serialNumber} onChange={(e) => {
                    setNewData((pre) => {
                        return {
                            ...pre, serialNumber: e.target.value
                        }
                    })
                }} />
            </Modal>
            {/* <Table columns={columns} dataSource={data} /> */}


        </div>
    )
}
