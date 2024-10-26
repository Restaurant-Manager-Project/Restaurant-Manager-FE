import React from 'react'
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        
        <NavLink to='/TrangChu' className="sidebar-option">
            <p><FontAwesomeIcon icon={faHome} /> Trang chủ</p>
        </NavLink>
        <NavLink to='/SanPham' className="sidebar-option">
            <p><FontAwesomeIcon icon={faBriefcase} /> Món ăn</p>
        </NavLink>
        <NavLink to='/Loai' className="sidebar-option">
            <p><FontAwesomeIcon icon={faBriefcase} /> Loại</p>
        </NavLink>
        <NavLink to='/Ban' className="sidebar-option">
            <p><FontAwesomeIcon icon={faBriefcase} /> Bàn</p>
        </NavLink>
        <NavLink to='/DonHang' className="sidebar-option">
            <p><FontAwesomeIcon icon={faFileLines} /> Đơn hàng</p>
        </NavLink>
        <NavLink to='/KhachHang' className="sidebar-option">
            <p><FontAwesomeIcon icon={faBriefcase} /> Khách hàng</p>
        </NavLink>
        <NavLink to='/PhieuNhap' className="sidebar-option">
            <p><FontAwesomeIcon icon={faBriefcase} /> Phiếu nhập</p>
        </NavLink>
        <NavLink to='/PhanQuyen' className="sidebar-option">
            <p><FontAwesomeIcon icon={faBriefcase} /> Phân quyền</p>
        </NavLink>
        <NavLink to='/TaiKhoan' className="sidebar-option">
            <p><FontAwesomeIcon icon={faBriefcase} /> Tài khoản</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
