import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Booking from './pages/Booking'
import Profile from './pages/Profile'
import Line from './pages/Line'
import DashboardHome from './pages/admin/DashboardHome'

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/line' element={<Line />} />
        <Route path='/profile/:tel' element={<Profile />} />
        <Route path='/home' element={<Home />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/dashboard' element={<DashboardHome />} />

      </Routes >
    </>
  )
}

export default App
