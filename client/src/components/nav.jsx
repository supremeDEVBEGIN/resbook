import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Navbar() {

  const [token, setToken] = useState('')
  const [level, setLevel] = useState('')
  const [user, setUser] = useState('')

  useEffect(() => {
    let l = localStorage.getItem('level')
    let n = localStorage.getItem('user')
    let t = localStorage.getItem('token')
    if (t !== "") {
      setLevel(l)
      setUser(n)
      setToken(t)
    }
  })

  useEffect(() => {
    console.log(token);
  }, [token])

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem('level')
    localStorage.removeItem('user')
    window.location.reload()
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-nav">
        <Link className="nav-link" to={'/'}>
          หน้าหลัก
        </Link>
        <Link className="nav-link" to={'/booking'}>
          จองโต๊ะ
        </Link>
      </div>
      {
        token === "" || !token ? // no login # no token and user
          <>
            <div className="navbar-nav ms-auto">
              <Link className="nav-link" to={'/register'}>
                สมัครสมาชิก
              </Link>
              <Link className="nav-link" to={'/login'}>
                เข้าสู่ระบบ
              </Link>
            </div>
          </>
          :
          // login succress
          <>
            <div className="navbar-nav ms-auto">
              {user} : 
              <Link className="nav-link" onClick={() => logout()} >
                logout
              </Link>
            </div>
          </>
      }
    </nav>
  );
}

export default Navbar;
