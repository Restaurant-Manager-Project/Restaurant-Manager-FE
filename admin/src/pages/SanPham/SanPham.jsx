import React from 'react'
import './SanPham.css'
import '../../dungchung.css'
import { assets } from "../../assets/assets";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faWrench } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


const SanPham = ({setShowAddSanPham, setShowEditSanPham}) => {
  return (
    <div className='container'>
      <div className="header">
        <div className="timkiem">
          <input className='input-timkiem' type="text" placeholder="Tìm kiếm sản phẩm..." />
          <button className='btn-timkiem'>Tim kiem</button>
        </div>
        <button className='btn-them' onClick={() => setShowAddSanPham(true)}><FontAwesomeIcon icon={faPlus} /> Thêm</button>
      </div>
      <div className="sanpham-content-title content-title title">
        <p>STT</p>
        <p>Sản phẩm</p>
        <p>Tên sản phẩm</p>
        <p>Giá</p>
        <p>Số lượng</p>
        <p>Hành động</p>
      </div>
      <hr />
      <div className="content">
        
        <div className="sanpham-content-title content-title content-item">
          <p>1</p>
          <img src={assets.proportion1} alt="" />
          <p>Example Food</p>
          <p>150,000đ</p>
          <p>1</p>
          <p className='btn'>
              <button onClick={() => setShowEditSanPham(true)}><FontAwesomeIcon icon={faWrench} /></button>
            <button onClick={() => confirm('Xóa sản phẩm')}><FontAwesomeIcon icon={faTrash} /></button>
          </p>
          {/* <button><FontAwesomeIcon icon={faTrash} /></button> */}
        </div>
        <div className="sanpham-content-title content-title content-item">
          <p>1</p>
          <img src={assets.proportion1} alt="" />
          <p>Example Food</p>
          <p>150,000đ</p>
          <p>1</p>
          <p className='btn'>
            <Link to={`/san-pham/edit/1`}>
              <button><FontAwesomeIcon icon={faWrench} /></button>
            </Link>
            <button onClick={() => confirm('Xóa sản phẩm')}><FontAwesomeIcon icon={faTrash} /></button>
          </p>
        </div>
        <div className="sanpham-content-title content-title content-item">
          <p>1</p>
          <img src={assets.proportion1} alt="" />
          <p>Example Food</p>
          <p>150,000đ</p>
          <p>1</p>
          <p className='btn'>
            <Link to={`/san-pham/edit/1`}>
              <button><FontAwesomeIcon icon={faWrench} /></button>
            </Link>
            <button onClick={() => confirm('Xóa sản phẩm')}><FontAwesomeIcon icon={faTrash} /></button>
          </p>
        </div>
        <div className="sanpham-content-title content-title content-item">
          <p>1</p>
          <img src={assets.proportion1} alt="" />
          <p>Example Food</p>
          <p>150,000đ</p>
          <p>1</p>
          <p className='btn'>
            <Link to={`/san-pham/edit/1`}>
              <button><FontAwesomeIcon icon={faWrench} /></button>
            </Link>
            <button onClick={() => confirm('Xóa sản phẩm')}><FontAwesomeIcon icon={faTrash} /></button>
          </p>
        </div>
        <div className="sanpham-content-title content-title content-item">
          <p>1</p>
          <img src={assets.proportion1} alt="" />
          <p>Example Food</p>
          <p>150,000đ</p>
          <p>1</p>
          <p className='btn'>
            <Link to={`/san-pham/edit/1`}>
              <button><FontAwesomeIcon icon={faWrench} /></button>
            </Link>
            <button onClick={() => confirm('Xóa sản phẩm')}><FontAwesomeIcon icon={faTrash} /></button>
          </p>
        </div>
        <div className="sanpham-content-title content-title content-item">
          <p>1</p>
          <img src={assets.proportion1} alt="" />
          <p>Example Food</p>
          <p>150,000đ</p>
          <p>1</p>
          <p className='btn'>
            <Link to={`/san-pham/edit/1`}>
              <button><FontAwesomeIcon icon={faWrench} /></button>
            </Link>
            <button onClick={() => confirm('Xóa sản phẩm')}><FontAwesomeIcon icon={faTrash} /></button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SanPham
