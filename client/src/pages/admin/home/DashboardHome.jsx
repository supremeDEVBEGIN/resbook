import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import { Card, Col, Row } from 'antd';
import API from '../../../lib/api'


function DashboardHome() {
  const [data1, setData1] = useState([])
  const [data2, setData2] = useState()
  const [data3, setData3] = useState()
  const [data4, setData4] = useState()

  const getdata1 = () => {
    API.get('/dashboard').then(
      res => {
        // res.data.map(r => {
        //   console.log(r);
        //   setData1((e) => { return { ...e,time: r.time.toString(),count: r.time.toString() } })
        // })
        let { data } = res
        console.log(data);
        setData1(data)
      }
    )
  }

  const getdata2 = () => {
    API.get('/dashboardtoday').then(
      res => {
        setData2(res.data)
      }
    )
  }

  const getdata3 = () => {
    API.get('/dashboarduser').then(
      res => {
        setData3(res.data)
      }
    )
  }

  const getdata4 = () => {
    API.get('/dashboard').then(
      res => {
        setData4(res.data)
      }
    )
  }

  useEffect(() => {
    getdata1()
    getdata2()
    getdata3()
  }, [])
  let data = [
    {
      "_id": 278,
      "time": "2023-10-05T16:15:47.429Z",
      "count": 1
    },
    {
      "_id": 277,
      "time": "2023-10-04T16:15:47.429Z",
      "count": 1
    },
    {
      "_id": 279,
      "time": "2023-10-06T16:15:56.506Z",
      "count": 4
    }
  ];

  const config = {
    data,
    xField: 'time',
    yField: 'count',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
  };
  return (
    <>
      <Row gutter={[16, 32]} style={{ margin: '10px' }}>
        <Col span={8}>
          <Card style={{ fontSize: '32px' }}>
            ผู้ใช้งาน : {data3}
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ fontSize: '32px' }}>
            โต๊ะที่ถูกจองวันนี้ :{data2?.length || 0}
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ fontSize: '32px' }}>
            โต๊ะที่ถูกจองรายสัปดาห์ :
          </Card>
        </Col>
        <Col span={24}>
          <Card >
            {data1 ? <Column {...config} /> : null}
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default DashboardHome