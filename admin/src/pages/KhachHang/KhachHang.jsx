import React from 'react'
import "./KhachHang.css"
import "../../dungchung.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faWrench } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const KhachHang = () => {
  return (
    <div className='container'>
      <div className="header">
        <div className="timkiem">
          <input className='input-timkiem' type="text" placeholder="Tìm kiếm khách hàng..." />
          <button className='btn-timkiem'>Tìm kiếm</button>
        </div>
        <button className='btn-them' ><FontAwesomeIcon icon={faPlus} /> Thêm</button>
      </div>
      <div className="khachhang-content-title content-title title">
        <p>STT</p>
        <p>Tên khách hàng</p>
        <p>Số điện thoại</p>
        <p>Khuyến mãi có thể sử dụng</p>
        <p>Hành động</p>
      </div>
      <hr />
    </div>
  )
}

export default KhachHang