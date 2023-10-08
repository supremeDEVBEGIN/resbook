import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import API from '../lib/api';
import { useParams } from 'react-router-dom';
import { Card } from 'antd';

function History() {
    const params = useParams();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        API.get(`api/history/${params.id}`)
            .then((response) => {
                console.log(response);
                const userData = response.data;
                setHistory(userData);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const cancelBooking = (_id) => {
        API.delete(`api/history/${_id}`)
            .then((response) => {
                console.log(response.data);
                loadUsers();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h1>รายการจองโต๊ะ</h1>
                {history.map((reservation) => (
                    <Card
                        key={reservation.key}
                        style={{
                            fontSize: '16px',
                            marginBottom: '20px',
                            backgroundColor: 'rgb(0 0 0 / 38%)',
                            border: '1px solid rgb(255 255 255)',
                            color: 'white',
                            display: 'flex',
                            flexDirection: 'column', // แสดงเป็นคอลัมน์
                            alignItems: 'flex-start', // จัดให้ปุ่มอยู่ด้านบน
                        }}
                    >
                        <h4>โต๊ะ: {reservation.table}</h4>
                        <p>ชื่อผู้จอง: {reservation.customer}</p>
                        <p>เบอร์โทร: {reservation.tel}</p>
                        <p>จำนวนคน: {reservation.count}</p>
                        <p>
                            สถานะ:{' '}
                            <span className={`badge ${reservation.status === 'รอการยืนยัน' ? 'bg-primary' : 'bg-success'}`}>
                                {reservation.status}
                            </span>
                        </p>
                        <button type="button" class="btn btn-warning" onClick={() => cancelBooking(reservation.key)} >
                            ยกเลิกการจอง
                        </button>
                    </Card>
                ))}
            </div>
        </>
    );
}

export default History;
