import React, { useState, useEffect } from 'react';
import API from '../lib/api';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';

function Profile() {
  const params = useParams();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    tel: '',
  });

  useEffect(() => {
    API.get(`/profile/${params.tel}`)
      .then((response) => {
        const { name, email, tel } = response.data;
        setProfileData({ name, email, tel });
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลโปรไฟล์:', error);
      });
  }, [params.tel]);

  const submitEdit = async () => {
    try {
      await API.put(`/editprofile/${params.tel}`, {
        name: profileData.name,
        email: profileData.email,
        tel: profileData.tel,
      });

      Swal.fire({
        icon: 'success',
        title: 'บันทึกโปรไฟล์สำเร็จ!',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/home');
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการอัพเดทโปรไฟล์:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <h2>แก้ไขโปรไฟล์</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">ชื่อ</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={profileData.name}
            onChange={(e) =>
              setProfileData({ ...profileData, name: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">อีเมล</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={profileData.email}
            onChange={(e) =>
              setProfileData({ ...profileData, email: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">เบอร์โทรศัพท์</label>
          <input
            type="tel"
            className="form-control"
            name="tel"
            value={profileData.tel}
            onChange={(e) =>
              setProfileData({ ...profileData, tel: e.target.value })
            }
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={submitEdit}
        >
          บันทึกโปรไฟล์
        </button>
      </form>
    </div>
    </>
  );
}

export default Profile;
