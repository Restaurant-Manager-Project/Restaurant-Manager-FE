import React, { useState } from 'react'
import './dungchung.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Routes, Route} from 'react-router-dom'
import TrangChu from './pages/TrangChu/TrangChu'
import SanPham from './pages/SanPham/SanPham'
import Loai from './pages/Loai/Loai'
import DonHang from './pages/DonHang/DonHang'
import KhachHang from './pages/KhachHang/KhachHang'
import NhaCungCap from './pages/NhaCungCap/NhaCungCap'
import PhieuNhap from './pages/PhieuNhap/PhieuNhap'
import TaiKhoan from './pages/TaiKhoan/TaiKhoan'
import AddSanPham from './components/AddSanPham/AddSanPham'
import EditSanPham from './components/EditSanPham/EditSanPham'
import AddLoai from './components/AddLoai/AddLoai'
import EditLoai from './components/EditLoai/EditLoai'
import ChiTietDonHang from './components/ChiTietDonHang/ChiTietDonHang'
import AddKhachHang from './components/AddKhachHang/AddKhachHang'
import EditKhachHang from './components/EditKhachHang/EditKhachHang'
import AddNhaCungCap from './components/AddNhaCungCap/AddNhaCungCap'
import EditNhaCungCap from './components/EditNhaCungCap/EditNhaCungCap'
import AddPhieuNhap from './components/AddPhieuNhap/AddPhieuNhap'
import AddTaiKhoan from './components/AddTaiKhoan/AddTaiKhoan'
import EditTaiKhoan from './components/EditTaiKhoan/EditTaiKhoan'

const App = () => {
  const [showAddSanPham, setShowAddSanPham] = useState(false)
  const [showEditSanPham, setShowEditSanPham] = useState(false)
  const [showAddLoai, setShowAddLoai] = useState(false)  // Thêm state cho modal thêm loại sản phẩm
  const [showEditLoai, setShowEditLoai] = useState(false)  // Thêm state cho modal sửa loại sản phẩm
  const [showChiTietDonHang, setShowChiTietDonHang] = useState(false)  // Thêm state cho modal chi tiết đơn hàng
  const [showAddKhachHang, setShowAddKhachHang] = useState(false)  // Thêm state cho modal thêm khách hàng
  const [showEditKhachHang, setShowEditKhachHang] = useState(false)  // Thêm state cho modal sửa khách hàng
  const [showAddNhaCungCap, setShowAddNhaCungCap] = useState(false)  // Thêm state cho modal thêm nhà cung cấp
  const [showEditNhaCungCap, setShowEditNhaCungCap] = useState(false)  // Thêm state cho modal sửa nhà cung cấp
  const [showAddPhieuNhap, setShowAddPhieuNhap] = useState(false) // Thêm
  const [showAddTaiKhoan, setShowAddTaiKhoan] = useState(false)  // Thêm state cho modal thêm tài khoản
  const [showEditTaiKhoan, setShowEditTaiKhoan] = useState(false)  // Thêm state cho modal sửa tài khoản
  

  
  return (
    <>
    {showAddSanPham ? <AddSanPham setShowAddSanPham={setShowAddSanPham} /> : <></>}
    {showEditSanPham? <EditSanPham setShowEditSanPham={setShowEditSanPham} /> : <></>}
    {showAddLoai? <AddLoai setShowAddLoai={setShowAddLoai} /> : <></>}
    {showEditLoai? <EditLoai setShowEditLoai={setShowEditLoai} /> : <></>}
    {showChiTietDonHang? <ChiTietDonHang setShowChiTietDonHang={setShowChiTietDonHang} /> : <></>}
    {showAddKhachHang ? <AddKhachHang setShowAddKhachHang={setShowAddKhachHang} /> : <></>}
    {showEditKhachHang ? <EditKhachHang setShowEditKhachHang={setShowEditKhachHang} /> : <></>}
    {showAddNhaCungCap? <AddNhaCungCap setShowAddNhaCungCap={setShowAddNhaCungCap} /> : <></>}
    {showEditNhaCungCap? <EditNhaCungCap setShowEditNhaCungCap={setShowEditNhaCungCap} /> : <></>}
    {showAddPhieuNhap? <AddPhieuNhap setShowAddPhieuNhap={setShowAddPhieuNhap} /> : <></>}
    {showAddTaiKhoan? <AddTaiKhoan setShowAddTaiKhoan={setShowAddTaiKhoan} /> : <></>}
    {showEditTaiKhoan? <EditTaiKhoan setShowEditTaiKhoan={setShowEditTaiKhoan} /> : <></>}
      <div>
        <Navbar/>
        <hr />
        <div className="app-content">
          <Sidebar/>
          <Routes>
            <Route path='/' element={<TrangChu />} />
            <Route path='/SanPham' element={<SanPham setShowAddSanPham={setShowAddSanPham} setShowEditSanPham={setShowEditSanPham}/>} />
            <Route path='/Loai' element={<Loai setShowAddLoai={setShowAddLoai} setShowEditLoai={setShowEditLoai}/>} />
            <Route path='/DonHang' element={<DonHang setShowChiTietDonHang={setShowChiTietDonHang}/>} />
            <Route path='/KhachHang' element={<KhachHang setShowAddKhachHang={setShowAddKhachHang} setShowEditKhachHang={setShowEditKhachHang}/>} />
            <Route path='/NhaCungCap' element={<NhaCungCap setShowAddNhaCungCap={setShowAddNhaCungCap} setShowEditNhaCungCap={setShowEditNhaCungCap}/>} />
            <Route path='/PhieuNhap' element={<PhieuNhap setShowAddPhieuNhap={setShowAddPhieuNhap}/>} />
            <Route path='/TaiKhoan' element={<TaiKhoan setShowAddTaiKhoan={setShowAddTaiKhoan} setShowEditTaiKhoan={setShowEditTaiKhoan}/>} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
