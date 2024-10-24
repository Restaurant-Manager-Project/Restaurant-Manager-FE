import React from 'react'
import './EditSanPham.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { assets } from "../../assets/assets";

function EditSanPham ({setShowEditSanPham}) {

  return (
    <div className="edit-sanpham">
        <form className="edit-sanpham-container">
            <div className="edit-sanpham-title">
                <h2>Sửa món ăn</h2>
                <div className="close-btn" onClick={()=>setShowEditSanPham(false)}><FontAwesomeIcon icon={faXmark} /></div>
            </div>
            <div className="edit-sanpham-inputs">
              <input type="text" placeholder='Nhập tên món ăn...' disabled/>
              <select name="sanpham-loai" id="sanpham-loai">
                <option value="">Loại món ăn</option>
                <option value="1">Món ��n</option>
                <option value="2">Thức uống</option>
                <option value="3">Thức ��n ngon</option>
                <option value="4">món ăn khác</option>
              </select>
              <input type="file" />
              <img src={assets.proportion1} alt="" />
              <textarea name="sanpham-mota" id="sanpham-mota"></textarea>
            </div>
            <button>Sửa món ăn</button>
        </form>
    </div>
  )
}

export default EditSanPham