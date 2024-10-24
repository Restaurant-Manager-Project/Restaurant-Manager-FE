import React from 'react'
import './AddSanPham.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { assets } from "../../assets/assets";

function AddSanPham ({setShowAddSanPham}) {

  return (
    <div className="add-sanpham">
        <form className="add-sanpham-container">
            <div className="add-sanpham-title">
                <h2>Thêm món ăn</h2>
                <div className="close-btn" onClick={()=>setShowAddSanPham(false)}><FontAwesomeIcon icon={faXmark} /></div>
            </div>
            <div className="add-sanpham-inputs">
                <input type="text" placeholder='Nhập tên món ăn...' required/>
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
            <button>Thêm món ăn</button>
        </form>
    </div>
  )
}

export default AddSanPham
