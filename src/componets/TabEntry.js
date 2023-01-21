import { DeleteFilled, EditFilled, PlusCircleOutlined } from '@ant-design/icons';
import { AutoComplete, Button, DatePicker, Form, Input, InputNumber, message, Modal, Popconfirm, Popover, Table, Tabs } from 'antd';
import { Typography } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useEffect, useState } from 'react'
import { addInstall, remove } from '../store/createSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom'
import { DataEntry } from './DataEntry';
import moment from 'moment';
const { Title } = Typography;
export const TabEntry = () => {
    const [modalOpen, setModal] = useState(false);
    const dispatch = useDispatch();
    const [data, setDataSource] = useState();
    const table = useSelector((state) => state.application.table);
    const serialNumbers = useSelector((state) => state.application.serialNumbers);
    console.log(serialNumbers);
    const [form] = Form.useForm()
    useEffect(() => {

        const results = table.map((items) => {
            const { payload } = items;
            return payload
        })
        setDataSource(results);

    }, [table])

    const handleOpenChange = (newOpen) => {
        setModal(newOpen);
    };
    const options = [
        {
            value: 'Burns Bay Road',
            isFRes: true
        },
        {
            value: 'Downing Street',
        },
        {
            value: 'Wall Street',
        },
    ];
    const columns = [
        {
            title: 'DATE',
            dataIndex: 'time',
            key: '01',
        },
        {
            title: 'Serial No:',
            dataIndex: 'serialNumbers',

            key: '02',
        },
        {
            title: 'Unique No:',
            dataIndex: 'key',
            key: '03',
        },
        {
            title: 'remarks',
            dataIndex: 'remarks',
            key: '04',
        },
        {
            title: 'action',
            key: '05',
            render: (record) => {
                return (
                    <>
                        <div>
                            <Popconfirm
                                title='delete the task'
                                description='Are you sure to delete this student?'
                                onConfirm={() => {
                                    dispatch(remove(record.key))
                                }}
                            >

                                <DeleteFilled style={{ color: 'red' }} onClick={() => console.log(record)} />
                            </Popconfirm>
                        </div>
                    </>
                )
            }
        }
    ]
    const operations = () => {

        return (
            <>
                <Button type='primary' onClick={() => setModal(true)}>Add Installation</Button>
                <Modal open={modalOpen}
                    onCancel={() => { setModal(false) }}
                    footer={[
                        <Button form='form1' key={'submit'} type='primary' onClick={() => {
                            form.validateFields().then((data) => {
                                data['time'] = moment(data.time).format('YYYY-MM-DD');
                                dispatch(addInstall(data));
                                form.resetFields();
                            });


                        }}>submit</Button>
                    ]}

                >
                    <Form name='form' id='form1' form={form} labelCol={{ span: 10 }} style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyItems: 'center', alignContent: 'center', margin: 'auto' }}>
                        <Form.Item name='date' label="select date" rules={[
                            {
                                required: true,
                                message: 'date is compulsory to add !'
                            }
                        ]} >
                            <DatePicker format="YYYY-MM-DD" autoFocus />

                        </Form.Item>
                        <Form.Item label='serial No' rules={[
                            {
                                required: 'true',
                                message: 'serial no is compulsory  to add !'
                            },
                            {
                                validator(rule, value) {
                                    const selectCheck = serialNumbers.find(items => (items.label === value));
                                    if (selectCheck) {
                                        return Promise.resolve()
                                    } else {
                                        return Promise.reject(new Error('not found!'))
                                    }

                                }
                            }
                        ]} name='serialNumbers'>
                            <AutoComplete options={serialNumbers} listHeight={130} filterOption={(inputValue, option) =>
                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            } />
                        </Form.Item>
                        <Form.Item label='Unique ID' rules={[
                            {
                                required: true,
                                message: 'Unique id is must be compulsory!'
                            }
                        ]} name='key'>
                            <Input type='text' />
                        </Form.Item>
                        <Form.Item label='remarks' rules={[
                            {
                                required: true,
                                message: 'please add remarks !'
                            }
                        ]} name='remarks'>
                            <Input />
                        </Form.Item>

                    </Form>
                </Modal>

            </>
        )
    };
    return (
        <>
            <div style={{ marginLeft: '300px', padding: '8px' }}>

                <Tabs defaultActiveKey='tab1' tabBarExtraContent={operations()}>
                    <Tabs.TabPane tab={'Installation'} key={'tab1'}>
                        <Table columns={columns} dataSource={data} />
                    </Tabs.TabPane>

                </Tabs>

            </div>
            <Outlet />
        </>
    )
}
