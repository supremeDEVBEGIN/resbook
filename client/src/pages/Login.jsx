import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import API from '../lib/api';
import Swal from 'sweetalert2';
import liff from '@line/liff'
import Navbar from '../components/Navbar';

const initialLogin = {
  name: '',
  password: '',
};

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, setLogin] = useState(initialLogin);

  const loginWeb = async (e) => {
    e.preventDefault();

    if (login.name === "" || login.password === "") {
      alert("กรุณากรอกข้อมูล");
    } else {
      try {
        const res = await API.post(`/login`, {
          name: login.name,
          password: login.password,
        });

        console.log(res.data);

        Swal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch({
          type: "LOGIN",
          payload: {
            user: res.data.user,
            level: res.data.level,
            token: res.data.token,
          },
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.user);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("tel", res.data.tel);
        localStorage.setItem("level", res.data.level);

        // ไปยังหน้า Home หลังจากล็อกอินเสร็จสิ้น
        navigate("/home");
      } catch (error) {
        if (error.response && error.response.status === 403) {
          Swal.fire({
            icon: "error",
            title: "ไม่พอข้อมูลผู้ใช้",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "รหัสผ่านไม่ถูกต้อง",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };


  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <h2>เข้าสู่ระบบ</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">ชื่อผู้ใช้งาน</label>
          <input
            type="text"
            className="form-control"
            placeholder="ชื่อผู้ใช้งาน"
            value={login.name}
            onChange={(e) => {
              setLogin({ ...login, name: e.target.value });
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            รหัสผ่าน
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="กรอกรหัสผ่าน"
            value={login.password}
            onChange={(e) => {
              setLogin({ ...login, password: e.target.value });
            }}
          />
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => loginWeb(e)}
          >
            เข้าสู่ระบบ
          </button>
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-success mt-3"
          >
            Login with Line
          </button>
        </div>
      </form>
    </div>
    </>
  );
}

export default Login;
