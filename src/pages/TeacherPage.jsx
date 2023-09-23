import { Fragment, lazy, useEffect, useState } from 'react';
import { Space, Table, Button, Modal,Input, Form, Checkbox } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import request from "../server";

const TeacherPage = () => {
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Image',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (data) =>{
        return  <img height={50} src={data} loading={lazy} alt="" />
      }
    },
    {
      title: 'Is Married',
      dataIndex: 'isMarried',
      key: 'isMarried',
      render: (data) => data ? "Yes" : "No"
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size="middle">
          <Button warning type='primary' onClick={() => edit(record.id)}>Edit</Button>
          <Button danger type='primary'>Delete</Button>
        </Space>
        )},
    },
  ];
  
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false)
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      console.log('Fetching teacher data...');
      const response = await request.get("teacher");
      setLoading(false);
      const responseData = response.data;
      setData(responseData);
    } catch (error) {
      console.log('Error retrieving teacher data:', error);
    }finally {
      setBtnLoading(false);
    }
  }

  const showModal = () => {
    setSelected(null);
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleOk = async () => {
    try{
      setBtnLoading(true);
      const values = await form.validateFields();
      if( selected === null){
        await request.post("teacher",values);
      }else {
        await request.put(`teacher/${selected}`,values);
      }
      getData();
      setIsModalOpen(false);
    }catch(err){
      console.log(err);
    }finally{
      setBtnLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function edit(id) {
    setSelected(id);
    setIsModalOpen(true);
    let {data} = await request.get(`teacher/${id}`);
    form.setFieldsValue(data);
  }

  return ( 
  <Fragment >
  <Table loading={loading} bordered title={() => <div style={{display: 'flex', justifyContent:'space-between',alignItems:'center'}}>
    <h1>Teachers ({data.length})</h1>
    <Button type='primary' onClick={showModal}>Add Teacher</Button>
  </div> } columns={columns} dataSource={data} />;
   <Modal title="Teacher Data" open={isModalOpen} onOk={handleOk} confirmLoading={btnLoading} onCancel={handleCancel} okText={selected === null ? 'Add Teacher' : 'Save Teacher'}>

   <Form
    form={form}
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
    autoComplete="off"
  >
    <Form.Item
      label="First Name"
      name="firstName"
      rules={[
        {
          required: true,
          message: 'Please Fill !',
        },
      ]}
    >
     <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="First Name" />
    </Form.Item>

    <Form.Item
      label="Last Name"
      name="lastName"
      rules={[
        {
          required: true,
          message: 'Please Fill !',
        },
      ]}
    >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Last Name" />
    </Form.Item>

    <Form.Item
      label="Image"
      name="avatar"
      rules={[
        {
          required: true,
          message: 'Please Fill !',
        },
      ]}
    >
        <Input />
    </Form.Item>

    <Form.Item
      name="isMarried"
      wrapperCol={{
        span: 24,
      }}
      valuePropName='checked'
      >
      <Checkbox>IsMarried</Checkbox>
    </Form.Item>

  </Form>
   </Modal>
 </Fragment>
)};

export default TeacherPage;

