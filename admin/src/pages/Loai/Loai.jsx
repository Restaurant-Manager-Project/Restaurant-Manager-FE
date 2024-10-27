import React from 'react'
import "./Loai.css"
import "../../dungchung.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faWrench } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { assets } from '../../assets/assets'

const Loai = ({setShowAddLoai, setShowEditLoai}) => {
  return (
    <div className='container'>
        <div className="header">
            <div className="timkiem">
                <input className='input-timkiem' type="text" placeholder="Tìm kiếm loại món ăn..." />
                <button className='btn-timkiem'>Tìm kiếm</button>
            </div>
            <button className='btn-them' onClick={()=>setShowAddLoai(true)}><FontAwesomeIcon icon={faPlus} /> Thêm</button>
        </div>
        <div className="loai-content-title content-title title">
            <p>STT</p>
            <p>Hình ảnh</p>
            <p>Loại</p>
            <p>Hành động</p>
        </div>
        <hr />
        <div className="content">
            <div className="loai-content-title content-title content-item">
                <p>1</p>
                <img src={assets.proportion1} alt="" />
                <p>Example Food</p>
                <p className='btn'>
                    <div className="btn-container">
                        <button className='btn-edit' onClick={() => setShowEditLoai(true)}><FontAwesomeIcon icon={faWrench} /></button>
                        <span className='tooltip'>Chỉnh sửa</span>
                    </div>
                    <div className="btn-container">
                        <button className='btn-remove' onClick={() => confirm('Xóa sản phẩm')}><FontAwesomeIcon icon={faTrash} /></button>
                        <span className='tooltip'>Xóa</span>
                    </div>
                </p>
            </div>
            <div className="loai-content-title content-title content-item">
                <p>1</p>
                <img src={assets.proportion1} alt="" />
                <p>Example Food</p>
                <p className='btn'>
                    <div className="btn-container">
                        <button className='btn-edit' onClick={() => setShowEditLoai(true)}><FontAwesomeIcon icon={faWrench} /></button>
                        <span className='tooltip'>Chỉnh sửa</span>
                    </div>
                    <div className="btn-container">
                        <button className='btn-remove' onClick={() => confirm('Xóa sản phẩm')}><FontAwesomeIcon icon={faTrash} /></button>
                        <span className='tooltip'>Xóa</span>
                    </div>
                </p>
            </div>
            <div className="loai-content-title content-title content-item">
                <p>1</p>
                <img src={assets.proportion1} alt="" />
                <p>Example Food</p>
                <p className='btn'>
                    <div className="btn-container">
                        <button className='btn-edit' onClick={() => setShowEditLoai(true)}><FontAwesomeIcon icon={faWrench} /></button>
                        <span className='tooltip'>Chỉnh sửa</span>
                    </div>
                    <div className="btn-container">
                        <button className='btn-remove' onClick={() => confirm('Xóa sản phẩm')}><FontAwesomeIcon icon={faTrash} /></button>
                        <span className='tooltip'>Xóa</span>
                    </div>
                </p>
            </div>
            <div className="loai-content-title content-title content-item">
                <p>1</p>
                <img src={assets.proportion1} alt="" />
                <p>Example Food</p>
                <p className='btn'>
                    <div className="btn-container">
                        <button className='btn-edit' onClick={() => setShowEditLoai(true)}><FontAwesomeIcon icon={faWrench} /></button>
                        <span className='tooltip'>Chỉnh sửa</span>
                    </div>
                    <div className="btn-container">
                        <button className='btn-remove' onClick={() => confirm('Xóa sản phẩm')}><FontAwesomeIcon icon={faTrash} /></button>
                        <span className='tooltip'>Xóa</span>
                    </div>
                </p>
            </div>
            <div className="loai-content-title content-title content-item">
                <p>1</p>
                <img src={assets.proportion1} alt="" />
                <p>Example Food</p>
                <p className='btn'>
                    <div className="btn-container">
                        <button className='btn-edit' onClick={() => setShowEditLoai(true)}><FontAwesomeIcon icon={faWrench} /></button>
                        <span className='tooltip'>Chỉnh sửa</span>
                    </div>
                    <div className="btn-container">
                        <button className='btn-remove' onClick={() => confirm('Xóa sản phẩm')}><FontAwesomeIcon icon={faTrash} /></button>
                        <span className='tooltip'>Xóa</span>
                    </div>
                </p>
            </div>
            <div className="loai-content-title content-title content-item">
                <p>1</p>
                <img src={assets.proportion1} alt="" />
                <p>Example Food</p>
                <p className='btn'>
                    <div className="btn-container">
                        <button className='btn-edit' onClick={() => setShowEditLoai(true)}><FontAwesomeIcon icon={faWrench} /></button>
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

export default Loai