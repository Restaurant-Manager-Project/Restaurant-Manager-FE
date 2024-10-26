import React from 'react'
import "./TaiKhoan.css"
import "../../dungchung.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faWrench } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const TaiKhoan = () => {
  return (
    <div className='container'>
      <div className="header">
        <div className="timkiem">
          <input className='input-timkiem' type="text" placeholder="Tìm kiếm tài khoản..." />
          <button className='btn-timkiem'>Tìm kiếm</button>
        </div>
        <button className='btn-them' ><FontAwesomeIcon icon={faPlus} /> Thêm</button>
      </div>
      <div className="taikhoan-content-title content-title title">
        <p>STT</p>
        <p>ID nhân viên</p>
        <p>Quyền</p>
        <p>Trạng thái</p>
        <p>Hành động</p>
      </div>
      <hr />
    </div>
  )
}

export default TaiKhoan