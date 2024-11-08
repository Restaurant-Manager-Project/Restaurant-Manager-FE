import React, { useEffect } from 'react'
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBowlFood, faChair, faFilePen, faHome, faUser, faUserEdit, faUsers, faUtensils, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    useEffect(() => {
        const open = document.querySelector('.openBar')
        const close = document.querySelector('.closeBar')
        const sidebar = document.querySelector('.sidebar')
        const options = document.querySelectorAll('.sidebar-option')

        close.addEventListener('click', () => {
            sidebar.style.width = '5%'
            options.forEach(option => {
                const text = option.querySelector('span')
                option.style.padding = '10px'
                option.style.justifyContent = 'center'
                text.style.opacity = '0'
                
            })
            open.style.display = 'block'
            close.style.display = 'none'
        })

        open.addEventListener('click', () => {
            sidebar.style.width = '17%'
            options.forEach(option => {
                const text = option.querySelector('span')
                option.style.padding = '10px 27px'
                option.style.justifyContent = 'start'

                text.style.opacity = '1'
            })
            open.style.display = 'none'
            close.style.display = 'block'
        })
    }, [])
    return (
        <div className='sidebar'>
            <div className="sidebar-options">
                <div className="barMenu">
                    <span className='openBar'><FontAwesomeIcon icon={faBars} /></span>
                    <span className='closeBar'><FontAwesomeIcon icon={faXmark} /></span>
                </div>


                <NavLink to='/' className="sidebar-option" title='Trang chu'>
                    <p><FontAwesomeIcon icon={faHome} /></p><span>Trang chủ</span>
                </NavLink>
                <NavLink to='/SanPham' className="sidebar-option">
                    <p><FontAwesomeIcon icon={faBowlFood} /></p><span>Món ăn</span>
                </NavLink>
                <NavLink to='/Loai' className="sidebar-option">
                    <p><FontAwesomeIcon icon={faUtensils} /></p><span>Loại</span>
                </NavLink>
                <NavLink to='/Ban' className="sidebar-option">
                    <p><FontAwesomeIcon icon={faChair} /></p><span>Bàn</span>
                </NavLink>
                <NavLink to='/DonHang' className="sidebar-option">
                    <p><FontAwesomeIcon icon={faFileLines} /></p><span>Đơn hàng</span>
                </NavLink>
                <NavLink to='/KhachHang' className="sidebar-option">
                    <p><FontAwesomeIcon icon={faUsers} /></p><span>Khách hàng</span>
                </NavLink>
                <NavLink to='/NhaCungCap' className="sidebar-option">
                    <p><FontAwesomeIcon icon={faUserEdit} /></p><span>Nhà cung cấp</span>
                </NavLink>
                <NavLink to='/PhieuNhap' className="sidebar-option">
                    <p><FontAwesomeIcon icon={faFilePen} /></p><span>Phiếu nhập</span>
                </NavLink>
                <NavLink to='/PhanQuyen' className="sidebar-option">
                    <p><FontAwesomeIcon icon={faBriefcase} /></p><span>Phân quyền</span>
                </NavLink>
                <NavLink to='/TaiKhoan' className="sidebar-option">
                    <p><FontAwesomeIcon icon={faUser} /></p><span>Tài khoản</span>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar