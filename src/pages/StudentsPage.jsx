import { useEffect, useState, lazy, Fragment } from 'react';
import request from '../server';

import { Space, Table, Button } from 'antd';

const StudentsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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
          <Button warning type='primary'>Edit</Button>
          <Button danger type='primary'>Delete</Button>
        </Space>
        )},
    },
  ];


  useEffect(() => {
    getData();
  }, []);
  
  async function getData() {
    try {
      setLoading(true);
      let { data } = await request.get("teacher");
      const promises = data.map((teacher) => request.get(`teacher/${teacher.id}/students`));
      const results = await Promise.all(promises);
      const flattenedData = results.map(response => response.data).flat();
      setData(flattenedData);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  console.log(data);

  return (
    <Fragment >
      <h1>Students ({data.length})</h1>
      <Table loading={loading} bordered columns={columns} dataSource={data} />
    </Fragment>
    
  )
}

export default StudentsPage