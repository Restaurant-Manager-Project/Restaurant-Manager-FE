import React from 'react'
import "./PhieuNhap.css"
import "../../dungchung.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faWrench } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const PhieuNhap = () => {
  return (
    <div className='container'>
      <div className="header">
        <div className="timkiem">
          <input className='input-timkiem' type="text" placeholder="Tìm kiếm phiếu nhập..." />
          <button className='btn-timkiem'>Tìm kiếm</button>
        </div>
        <button className='btn-them' ><FontAwesomeIcon icon={faPlus} /> Thêm</button>
      </div>
      <div className="phieunhap-content-title content-title title">
        <p>STT</p>
        <p>ID</p>
        <p>Nhà cung cấp</p>
        <p>Giá tiền</p>
        <p>Hành động</p>
      </div>
      <hr />
    </div>
  )
}

export default PhieuNhap