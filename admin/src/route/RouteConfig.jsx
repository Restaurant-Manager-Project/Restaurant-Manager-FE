import React, { useState, useEffect } from 'react';
import TrangChu from '../pages/TrangChu/TrangChu';
import SanPham from '../pages/SanPham/SanPham';
import Loai from '../pages/Loai/Loai';
import Ban from '../pages/Ban/Ban';
import LichDatBan from '../components/LichDatBan/LichDatBan';
import DonHang from '../pages/DonHang/DonHang';
import KhachHang from '../pages/KhachHang/KhachHang';
import NhaCungCap from '../pages/NhaCungCap/NhaCungCap';
import PhieuNhap from '../pages/PhieuNhap/PhieuNhap';
import TaiKhoan from '../pages/TaiKhoan/TaiKhoan';
import AddSanPham from '../components/AddSanPham/AddSanPham';
import EditSanPham from '../components/EditSanPham/EditSanPham';
import AddLoai from '../components/AddLoai/AddLoai';
import EditLoai from '../components/EditLoai/EditLoai';
import AddBan from '../components/AddBan/AddBan';
import AddLichDatBan from '../components/AddLichDatBan/AddLichDatBan';
import ChiTietDonHang from '../components/ChiTietDonHang/ChiTietDonHang';
import AddKhachHang from '../components/AddKhachHang/AddKhachHang';
import EditKhachHang from '../components/EditKhachHang/EditKhachHang';
import AddNhaCungCap from '../components/AddNhaCungCap/AddNhaCungCap';
import EditNhaCungCap from '../components/EditNhaCungCap/EditNhaCungCap';
import AddPhieuNhap from '../components/AddPhieuNhap/AddPhieuNhap';
import AddTaiKhoan from '../components/AddTaiKhoan/AddTaiKhoan';
import EditTaiKhoan from '../components/EditTaiKhoan/EditTaiKhoan';
import PhanQuyen from '../pages/PhanQuyen/PhanQuyen';
import Login from '../pages/Login/Login';
import ProtectedRoute from '../ProtectedRoute';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../AuthProvider';

const RouteConfig = () => {
    const { token } = useAuth();

    const [showAddSanPham, setShowAddSanPham] = useState(false);
    const [showEditSanPham, setShowEditSanPham] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showAddLoai, setShowAddLoai] = useState(false);
    const [showEditLoai, setShowEditLoai] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showAddBan, setShowAddBan] = useState(false);
    const [showAddLichDatBan, setShowAddLichDatBan] = useState(false);
    const [showChiTietDonHang, setShowChiTietDonHang] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [showAddKhachHang, setShowAddKhachHang] = useState(false);
    const [showEditKhachHang, setShowEditKhachHang] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [showAddNhaCungCap, setShowAddNhaCungCap] = useState(false);
    const [showEditNhaCungCap, setShowEditNhaCungCap] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
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
            {!token && (
                <div className="overlay">
                    <Login />
                </div>
            )}
            {token && (
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
                    {showAddBan && <AddBan setShowAddBan={setShowAddBan} />}
                    {showAddLichDatBan && <AddLichDatBan setShowAddLichDatBan={setShowAddLichDatBan} />}
                    {showChiTietDonHang && (
                        <ChiTietDonHang setShowChiTietDonHang={setShowChiTietDonHang} orderId={selectedOrderId} />
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
                    <Routes>
                        <Route path="/" element={<ProtectedRoute><TrangChu /></ProtectedRoute>} />
                        <Route
                            path="/SanPham"
                            element={
                                <ProtectedRoute>
                                    <SanPham
                                        setShowAddSanPham={setShowAddSanPham}
                                        setShowEditSanPham={handleEditSanPham}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/Loai"
                            element={
                                <ProtectedRoute>
                                    <Loai setShowAddLoai={setShowAddLoai} setShowEditLoai={handleEditLoai} />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/Ban" element={<ProtectedRoute><Ban setShowAddBan={setShowAddBan} /></ProtectedRoute>} />
                        <Route path="/Ban/LichDatBan" element={<ProtectedRoute><LichDatBan setShowAddLichDatBan={setShowAddLichDatBan} /></ProtectedRoute>} />
                        <Route
                            path="/DonHang"
                            element={<ProtectedRoute><DonHang setShowChiTietDonHang={setShowChiTietDonHang} setSelectedOrderId={setSelectedOrderId} /></ProtectedRoute>}
                        />
                        <Route
                            path="/KhachHang"
                            element={
                                <ProtectedRoute>
                                    <KhachHang
                                        setShowAddKhachHang={setShowAddKhachHang}
                                        setShowEditKhachHang={handleEditKhachHang}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/NhaCungCap"
                            element={
                                <ProtectedRoute>
                                    <NhaCungCap
                                        setShowAddNhaCungCap={setShowAddNhaCungCap}
                                        setShowEditNhaCungCap={handleEditNhaCungCap}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/PhieuNhap"
                            element={<ProtectedRoute><PhieuNhap setShowAddPhieuNhap={setShowAddPhieuNhap} /></ProtectedRoute>}
                        />
                        <Route
                            path="/TaiKhoan"
                            element={
                                <ProtectedRoute>
                                    <TaiKhoan
                                        setShowAddTaiKhoan={setShowAddTaiKhoan}
                                        setShowEditTaiKhoan={setShowEditTaiKhoan}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/PhanQuyen"
                            element={
                                <ProtectedRoute>
                                    <PhanQuyen />
                                </ProtectedRoute>
                            } />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </>
            )}
        </>
    )
}

export default RouteConfig;