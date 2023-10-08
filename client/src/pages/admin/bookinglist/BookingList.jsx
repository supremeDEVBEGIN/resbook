import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'antd';
import API from '../../../lib/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './bookinglist.css'


function BookingList() {
  const navigate = useNavigate();

  const editBookingclick = (userId) => {
    navigate(`/editbooking/${userId}`);
  };

  const getData = async () => {
    API.get("/api/booking").then(res => {
      console.log(res.data);
      setBooking(res.data)
    });
  }

  useEffect(() => {
    getData()
  }, [])

  const deleteTable = (userId) => {
    Swal.fire({
      title: 'ยืนยันการลบการจอง',
      text: 'คุณต้องการลบการจองใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ลบ',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        API.delete(`api/booking/${userId}`)
          .then((response) => {
            console.log(response.data);
            getData();
            Swal.fire('ลบการจองเรียบร้อย', '', 'success');
          })
          .catch((error) => {
            console.error(error);
            Swal.fire('เกิดข้อผิดพลาดในการลบ', '', 'error');
          });
      }
    });
  };

  const [bookings, setBooking] = useState([
  ]);



  return (
    <Card title="การจองโต๊ะ" style={{ margin: '10px' }}>
      <div>
        {bookings.map((booking) => (
          <Card key={booking.id} style={{ marginBottom: '10px' }}>
            <Row>
              <Col span={12}>
                <p><strong>โต๊ะ:</strong> {booking.table}</p>
                <p><strong>ชื่อผู้จอง:</strong> {booking.customer}</p>
              </Col>
              <Col span={12}>
                <p><strong>เบอร์โทร:</strong> {booking.tel}</p>
                <p><strong>สถานะการจอง:</strong> <span className={`status-text ${booking.status === 'รอการยืนยัน' ? 'red-text' : 'green-text'}`}>{booking.status}</span></p>
              </Col>
            </Row>


            <Button style={{ margin: '10px' }} onClick={() => editBookingclick(booking._id)} >
              แก้ไขข้อมูล
            </Button>
            <Button style={{ margin: '10px' }} onClick={() => deleteTable(booking._id)}>
              ลบการจอง
            </Button>
          </Card>
        ))}
      </div>
    </Card>
  );
}

export default BookingList;
