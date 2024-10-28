import React from 'react'
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBowlFood, faChair, faFilePen, faHome, faUser, faUserEdit, faUsers, faUtensils } from '@fortawesome/free-solid-svg-icons'
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        
        <NavLink to='/' className="sidebar-option">
            <p><FontAwesomeIcon icon={faHome} /> Trang chủ</p>
        </NavLink>
        <NavLink to='/SanPham' className="sidebar-option">
            <p><FontAwesomeIcon icon={faBowlFood} /> Món ăn</p>
        </NavLink>
        <NavLink to='/Loai' className="sidebar-option">
            <p><FontAwesomeIcon icon={faUtensils} /> Loại</p>
        </NavLink>
        <NavLink to='/Ban' className="sidebar-option">
            <p><FontAwesomeIcon icon={faChair} /> Bàn</p>
        </NavLink>
        <NavLink to='/DonHang' className="sidebar-option">
            <p><FontAwesomeIcon icon={faFileLines} /> Đơn hàng</p>
        </NavLink>
        <NavLink to='/KhachHang' className="sidebar-option">
            <p><FontAwesomeIcon icon={faUsers} /> Khách hàng</p>
        </NavLink>
        <NavLink to='/NhaCungCap' className="sidebar-option">
            <p><FontAwesomeIcon icon={faUserEdit} /> Nhà cung cấp</p>
        </NavLink>
        <NavLink to='/PhieuNhap' className="sidebar-option">
            <p><FontAwesomeIcon icon={faFilePen} /> Phiếu nhập</p>
        </NavLink>
        <NavLink to='/PhanQuyen' className="sidebar-option">
            <p><FontAwesomeIcon icon={faBriefcase} /> Phân quyền</p>
        </NavLink>
        <NavLink to='/TaiKhoan' className="sidebar-option">
            <p><FontAwesomeIcon icon={faUser} /> Tài khoản</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
