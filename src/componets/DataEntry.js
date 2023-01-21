import { Button, DatePicker, Form, Input, InputNumber } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React from 'react'
import { useDispatch } from 'react-redux'
import { addInstall } from '../store/createSlice'
import moment from "moment";
import nextId from "react-id-generator";
import uuid from 'react-uuid'
export const DataEntry = () => {
    const [form] = Form.useForm()
    const htmlid = nextId()
    const dispatch = useDispatch()
    const onFinish = (data) => {
        data["time"] = moment(data.time).format("YYYY-MM-DD")
        console.log(data);
        dispatch(addInstall(data));
        form.resetFields();
    }
    const unique_id = uuid();
    return (
        <div>
            <Form name='form' form={form} onFinish={onFinish} labelCol={{ span: 10 }} style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyItems: 'center', alignContent: 'center', margin: 'auto' }}>
                <Form.Item name='date' label="select date" required>
                    <DatePicker format="YYYY-MM-DD" autoFocus />

                </Form.Item>
                <Form.Item label='serial No' name='serialNumbers' required>
                    <InputNumber min={0} required style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label='Unique ID' name='key' required>
                    <Input type='text' required />
                </Form.Item>
                <Form.Item label='remarks' name='remarks'>
                    <Input />
                </Form.Item>
                <Button type='primary' htmlType='submit'  block>submit</Button>
            </Form>
        </div>
    )
}
