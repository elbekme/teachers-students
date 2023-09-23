import { Button, Form, Input, message } from 'antd';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { LockOutlined,UserOutlined } from '@ant-design/icons';
const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try{
      setLoading(true);
      await axios.post('https://reqres.in/api/login',values);
      setLoading(false);
      navigate('/dashboard')
      message.success('Login succes !');
    }catch (err) {
      message.error("Email or Password is wrong")
    }
  };

  return (
    <div className="login" style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
       <Form
    name="login"
    labelCol={{
      span: 24,
    }}
    wrapperCol={{
      span: 24,
    }}
    style={{
      maxWidth: 600,
    }}
    onFinish={onFinish}
    autoComplete="off"
  >
    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          type: 'email',
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
              <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />

    </Form.Item>

    <Form.Item
      wrapperCol={{
        span: 24,
      }}
    >
      <Button loading={loading} style={{width:'100%'}} type="primary" htmlType="submit">
        Login
      </Button>
    </Form.Item>
  </Form>
    </div>
  )
}

export default LoginPage