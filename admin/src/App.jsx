import React, { useState } from 'react';
import './dungchung.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import TrangChu from './pages/TrangChu/TrangChu';
import SanPham from './pages/SanPham/SanPham';
import Loai from './pages/Loai/Loai';
import Ban from './pages/Ban/Ban';
import LichDatBan from './components/LichDatBan/LichDatBan';
import DonHang from './pages/DonHang/DonHang';
import KhachHang from './pages/KhachHang/KhachHang';
import NhaCungCap from './pages/NhaCungCap/NhaCungCap';
import PhieuNhap from './pages/PhieuNhap/PhieuNhap';
import TaiKhoan from './pages/TaiKhoan/TaiKhoan';
import AddSanPham from './components/AddSanPham/AddSanPham';
import EditSanPham from './components/EditSanPham/EditSanPham';
import AddLoai from './components/AddLoai/AddLoai';
import EditLoai from './components/EditLoai/EditLoai';
import ChiTietDonHang from './components/ChiTietDonHang/ChiTietDonHang';
import AddKhachHang from './components/AddKhachHang/AddKhachHang';
import EditKhachHang from './components/EditKhachHang/EditKhachHang';
import AddNhaCungCap from './components/AddNhaCungCap/AddNhaCungCap';
import EditNhaCungCap from './components/EditNhaCungCap/EditNhaCungCap';
import AddPhieuNhap from './components/AddPhieuNhap/AddPhieuNhap';
import AddTaiKhoan from './components/AddTaiKhoan/AddTaiKhoan';
import EditTaiKhoan from './components/EditTaiKhoan/EditTaiKhoan';

const App = () => {
  const [showAddSanPham, setShowAddSanPham] = useState(false);
  const [showEditSanPham, setShowEditSanPham] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Thêm state để lưu trữ sản phẩm được chọn
  const [showAddLoai, setShowAddLoai] = useState(false);
  const [showEditLoai, setShowEditLoai] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // Thêm state để lưu trữ loại món ăn được chọn
  const [showChiTietDonHang, setShowChiTietDonHang] = useState(false);
  const [showAddKhachHang, setShowAddKhachHang] = useState(false);
  const [showEditKhachHang, setShowEditKhachHang] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null); // Thêm state để lưu trữ khách hàng được chọn
  const [showAddNhaCungCap, setShowAddNhaCungCap] = useState(false);
  const [showEditNhaCungCap, setShowEditNhaCungCap] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null); // Thêm state để lưu trữ nhà cung cấp được chọn
  const [showAddPhieuNhap, setShowAddPhieuNhap] = useState(false);
  const [showAddTaiKhoan, setShowAddTaiKhoan] = useState(false);
  const [showEditTaiKhoan, setShowEditTaiKhoan] = useState(false);

  const handleEditSanPham = (product) => {
    setSelectedProduct(product);
    setShowEditSanPham(true);
  };

  const handleEditLoai = (category) => {
    setSelectedCategory(category);
    setShowEditLoai(true);
  };

  const handleEditKhachHang = (client) => {
    setSelectedClient(client);
    setShowEditKhachHang(true);
  };

  const handleEditNhaCungCap = (supplier) => {
    setSelectedSupplier(supplier);
    setShowEditNhaCungCap(true);
  };

  return (
    <>
      {showAddSanPham && <AddSanPham setShowAddSanPham={setShowAddSanPham} />}
      {showEditSanPham && (
        <EditSanPham
          setShowEditSanPham={setShowEditSanPham}
          product={selectedProduct}
        />
      )}
      {showAddLoai && <AddLoai setShowAddLoai={setShowAddLoai} />}
      {showEditLoai && (
        <EditLoai
          setShowEditLoai={setShowEditLoai}
          category={selectedCategory}
        />
      )}
      {showChiTietDonHang && (
        <ChiTietDonHang setShowChiTietDonHang={setShowChiTietDonHang} />
      )}
      {showAddKhachHang && (
        <AddKhachHang setShowAddKhachHang={setShowAddKhachHang} />
      )}
      {showEditKhachHang && (
        <EditKhachHang
          setShowEditKhachHang={setShowEditKhachHang}
          client={selectedClient}
        />
      )}
      {showAddNhaCungCap && (
        <AddNhaCungCap setShowAddNhaCungCap={setShowAddNhaCungCap} />
      )}
      {showEditNhaCungCap && (
        <EditNhaCungCap
          setShowEditNhaCungCap={setShowEditNhaCungCap}
          supplier={selectedSupplier}
        />
      )}
      {showAddPhieuNhap && (
        <AddPhieuNhap setShowAddPhieuNhap={setShowAddPhieuNhap} />
      )}
      {showAddTaiKhoan && (
        <AddTaiKhoan setShowAddTaiKhoan={setShowAddTaiKhoan} />
      )}
      {showEditTaiKhoan && (
        <EditTaiKhoan setShowEditTaiKhoan={setShowEditTaiKhoan} />
      )}
      <div>
        <Navbar />
        <hr />
        <div className="app-content">
          <Sidebar />
          <Routes>
            <Route path="/" element={<TrangChu />} />
            <Route
              path="/SanPham"
              element={
                <SanPham
                  setShowAddSanPham={setShowAddSanPham}
                  setShowEditSanPham={handleEditSanPham}
                />
              }
            />
            <Route
              path="/Loai"
              element={
                <Loai setShowAddLoai={setShowAddLoai} setShowEditLoai={handleEditLoai} />
              }
            />
            <Route path="/Ban" element={<Ban />} />
            <Route path="/Ban/LichDatBan" element={<LichDatBan />} />
            <Route
              path="/DonHang"
              element={<DonHang setShowChiTietDonHang={setShowChiTietDonHang} />}
            />
            <Route
              path="/KhachHang"
              element={
                <KhachHang
                  setShowAddKhachHang={setShowAddKhachHang}
                  setShowEditKhachHang={handleEditKhachHang}
                />
              }
            />
            <Route
              path="/NhaCungCap"
              element={
                <NhaCungCap
                  setShowAddNhaCungCap={setShowAddNhaCungCap}
                  setShowEditNhaCungCap={handleEditNhaCungCap}
                />
              }
            />
            <Route
              path="/PhieuNhap"
              element={<PhieuNhap setShowAddPhieuNhap={setShowAddPhieuNhap} />}
            />
            <Route
              path="/TaiKhoan"
              element={
                <TaiKhoan
                  setShowAddTaiKhoan={setShowAddTaiKhoan}
                  setShowEditTaiKhoan={setShowEditTaiKhoan}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;