import React, { useEffect, useState } from 'react';
import '../../src/booking.css';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Button, Form, Input, Radio, TimePicker, message } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { InfoCircleOutlined } from '@ant-design/icons';
import API from "../lib/api"
import moment from "moment-timezone"
import _ from "lodash"
import Navbar from '../components/Navbar';
function Booking() {
  const numRows = 4; // จำนวนแถวของโต๊ะ
  const numCols = 5; // จำนวนคอลัมน์ของโต๊ะ
  const [tables, setTables] = useState();
  const [selectedTable, setSelectedTable] = useState(null);
  const [reservationInfo, setReservationInfo] = useState({
    name: '',
    numPeople: 0,
  });

  const onFinish = (values) => {
    console.log('Success:', values);
    const { time } = values
    // let timeSelect = Number(dayjs(time).format("HH"))
    // console.log(arrTimeDf.concat(arrTimeF));
    // console.log(timeSelect);
    // if(!arrTimeDf.concat(arrTimeF).includes(timeSelect)){
    API.post('/booking', { ...values, time: new Date, status: "booking" }).then(res => {
      message.success("OK")
      window.location.reload()
    }).catch(res => {
      message.error(res.message)
    })
    // }else{
    //   message.error("time error")
    // }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleReservationInfoChange = (e) => {
    const { name, value } = e.target;
    setReservationInfo({
      ...reservationInfo,
      [name]: value,
    });
  };


  dayjs.extend(customParseFormat);
  const onChange = (time, timeString) => {
    console.log(new dayjs(time));
  };

  const [form] = Form.useForm();
  const [data, setData] = useState()

  const getData = async () => {
    let rawData = await API.get("/booking", { params: { table: tables } })
    console.log(rawData.data);
    setData(rawData.data)
  }
  const [user, setUser] = useState(localStorage.getItem("user"))
  useEffect(() => {
    form.setFieldsValue({ customer: user, count: 1 })
    getData()
  }, [])

  // useEffect(() => {
  //   if (data?.length > 0) {
  //     arrTimeF = []
  //     for (const iterator of data) {
  //       if (iterator?.time) {
  //         let time = Number(moment(iterator?.time).format("HH"));
  //         arrTimeF.push(time)
  //       }
  //     }
  //   }
  // }, [data])
  let arrTimeF = [];
  let arrTimeDf = [0, 1, 2, 3, 4, 5, 6, 7, 8, 22, 23, 24];
  function range() {
    let arrTime = [];
    arrTime = arrTimeDf.concat(arrTimeF)
    console.log(arrTime);
    return arrTime
  }

  const LoopRadio = () => {
    let h = []
    if (data) {
      for (let index = 1; index < 10; index++) {
        h.push(<Radio.Button value={index}>A{index}</Radio.Button>)
      }
      return h
    }
  }

  let tableBooking = ["A1", "A2", "A3","A4","A5","B1", "B2", "B3","B4","B5","C1", "C2", "C3","C4","C5","D1", "D2", "D3","D4","D5"]

  return (
    <>
    <Navbar/>
    <div className="container">
      <h2>ฟอร์มการจองโต๊ะ</h2>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Table" name="table" rules={[{ required: true }]} /*onChange={e => { setTables(e.target.value) }}*/>
          <Radio.Group className="custom-radio-group">
            {data && tableBooking.map(id => {
              let result = data?.find(res => { console.log(res); return res.table === id })
              console.log(result);
              if (result) {
                return <Radio.Button value={id} disabled>{id}</Radio.Button>
              } else {
                return <Radio.Button value={id}>{id}</Radio.Button>
              }
            })}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Customer Name"
          tooltip={{
            title: 'Customer Name',
            icon: <InfoCircleOutlined />,
          }}
          name="customer"
          rules={[{ required: true }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          label="tel"
          tooltip={{
            title: 'Tel',
            icon: <InfoCircleOutlined />,
          }}
          name="tel"
          rules={[{ required: true }]}
        >
          <Input placeholder="Tel" />
        </Form.Item>
        <Form.Item
          label="Number Of Customer"
          tooltip={{
            title: '5n',
            icon: <InfoCircleOutlined />,
          }}
          name="count"
          rules={[{ required: true }]}
        >
          <Input placeholder="input placeholder" type='number' />
        </Form.Item>
        {/* <Form.Item label="TimePicker" name="time" rules={[{ required: true }]}>
          <TimePicker defaultValue={dayjs()} format={"HH:mm"} minuteStep={60} disabledHours={() => range()} />
        </Form.Item> */}
        <Form.Item >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
    </>
  );
}

export default Booking;
