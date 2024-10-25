import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Routes, Route} from 'react-router-dom'
import TrangChu from './pages/TrangChu/TrangChu'
import SanPham from './pages/SanPham/SanPham'
import Loai from './pages/Loai/Loai'
import DonHang from './pages/DonHang/DonHang'
import KhachHang from './pages/KhachHang/KhachHang'
import PhieuNhap from './pages/PhieuNhap/PhieuNhap'
import TaiKhoan from './pages/TaiKhoan/TaiKhoan'
import AddSanPham from './components/AddSanPham/AddSanPham'
import EditSanPham from './components/EditSanPham/EditSanPham'

const App = () => {
  const [showAddSanPham, setShowAddSanPham] = useState(false)
  const [showEditSanPham, setShowEditSanPham] = useState(false)

  
  return (
    <>
    {showAddSanPham ? <AddSanPham setShowAddSanPham={setShowAddSanPham} /> : <></>}
    {showEditSanPham? <EditSanPham setShowEditSanPham={setShowEditSanPham} /> : <></>}
      <div>
        <Navbar/>
        <hr />
        <div className="app-content">
          <Sidebar/>
          <Routes>
            <Route path='/TrangChu' element={<TrangChu />} />
            <Route path='/SanPham' element={<SanPham setShowAddSanPham={setShowAddSanPham} setShowEditSanPham={setShowEditSanPham}/>} />
            <Route path='/Loai' element={<Loai />} />
            <Route path='/DonHang' element={<DonHang />} />
            <Route path='/KhachHang' element={<KhachHang />} />
            <Route path='/PhieuNhap' element={<PhieuNhap />} />
            <Route path='/TaiKhoan' element={<TaiKhoan />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
