import React from 'react'
import "./Loai.css"
import "../../dungchung.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faWrench } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Loai = () => {
  return (
    <div className='container'>
      <div className="header">
        <div className="timkiem">
          <input className='input-timkiem' type="text" placeholder="Tìm kiếm loại món ăn..." />
          <button className='btn-timkiem'>Tim kiem</button>
        </div>
        <button className='btn-them' ><FontAwesomeIcon icon={faPlus} /> Them</button>
      </div>
      <div className="loai-content-title content-title title">
        <p>STT</p>
        <p>Hình ảnh</p>
        <p>Loại</p>
        <p>Hành động</p>
      </div>
      <hr />
    </div>
  )
}

export default Loai