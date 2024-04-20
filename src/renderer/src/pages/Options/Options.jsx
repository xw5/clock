import { useState } from 'react';
import { Form, Input, Checkbox, Button, Select, Slider } from 'antd';

function Options({}) {

   const onFinish = () => {
     
   }

   const onFinishFailed = () => {
     
   }

   const handleChange = () => {
     
   }

  return (
    <div className="warp">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="时钟款式"
          name="clockstyle"
          rules={[
            {
              required: true,
              message: '请选择时钟款式',
            },
          ]}
        >
          <Select
            defaultValue="normal"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: 'normal', label: '普通数字' },
              { value: 'flip', label: '翻页时钟' }
            ]}
          />
        </Form.Item>

        <Form.Item
          label="时钟尺寸"
          name="size"
        >
          <Slider
            defaultValue={100}
            min={60}
            max={100}
            tooltip={{
              open: false,
            }}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Options