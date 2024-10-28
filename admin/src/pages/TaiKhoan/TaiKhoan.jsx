import React from 'react'
import "./TaiKhoan.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faWrench } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const TaiKhoan = ({setShowAddTaiKhoan, setShowEditTaiKhoan}) => {
    return (
        <div className='container'>
        <div className="header">
            <div className="timkiem">
            <input className='input-timkiem' type="text" placeholder="Tìm kiếm tài khoản..." />
            <button className='btn-timkiem'>Tìm kiếm</button>
            </div>
            <button className='btn-them' onClick={()=>setShowAddTaiKhoan(true)}><FontAwesomeIcon icon={faPlus} /> Thêm</button>
        </div>
        <div className="taikhoan-content-title content-title title">
            <p>STT</p>
            <p>ID nhân viên</p>
            <p>Quyền</p>
            <p>Trạng thái</p>
            <p>Hành động</p>
        </div>
        <hr />
        <div className="content">
            <div className="taikhoan-content-title content-title content-item">
                <p>1</p>
                <p>NV001</p>
                <p>Quản trị</p>
                <p>Hoạt động</p>
                <p className='btn'>
                        <div className="btn-container">
                            <button className='btn-edit' onClick={() => setShowEditTaiKhoan(true)}><FontAwesomeIcon icon={faWrench} /></button>
                            <span className='tooltip'>Chỉnh sửa</span>
                        </div>
                        <div className="btn-container">
                            <button className='btn-remove' onClick={() => confirm('Xóa sản phẩm')}><FontAwesomeIcon icon={faTrash} /></button>
                            <span className='tooltip'>Xóa</span>
                        </div>
                    </p>
            </div>
        </div>
        </div>
    )
}

export default TaiKhoan