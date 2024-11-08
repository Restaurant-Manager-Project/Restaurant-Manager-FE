import React from "react";
import "./SanPham.css";
//
import {
    faLock,
    faLockOpen,
    faPenToSquare,
faPlus,
faSort,
faTrash,
faWrench
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { assets } from "../../assets/assets";

const SanPham = ({ setShowAddSanPham, setShowEditSanPham }) => {
return (
    <div className="container">
    <div className="header">
        <div className="timkiem">
        <input
            className="input-timkiem"
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
        />
        <button className="btn-timkiem">Tìm kiếm</button>
        </div>
        <button className="btn-them" onClick={() => setShowAddSanPham(true)}>
        <FontAwesomeIcon icon={faPlus} /> Thêm
        </button>
    </div>
    <div className="sanpham-content-title content-title title">
        <p>
        STT <FontAwesomeIcon icon={faSort} />
        </p>
        <p>Hình ảnh</p>
        <p>
        Tên sản phẩm <FontAwesomeIcon icon={faSort} />
        </p>
        <p>
        Loại <FontAwesomeIcon icon={faSort} />
        </p>
        <p>
        Giá <FontAwesomeIcon icon={faSort} />
        </p>
        <p>
        Số lượng <FontAwesomeIcon icon={faSort} />
        </p>
        <p>Mô tả</p>
        <p>Trạng thái <FontAwesomeIcon icon={faSort} /></p>
        <p>Hành động</p>
    </div>

    <div className="content">
        <div className="sanpham-content-title content-title content-item">
        <p>1</p>
        <img src={assets.proportion1} alt="" />
        <p>Example Food</p>
        <p>Ca rot</p>
        <p>150,000đ</p>
        <p>1</p>
        <p className="moTa">Xúc xích kết hợp với nấm, thơm và hấp dẫn.Xúc xích kết hợp với nấm, thơm và hấp dẫn.Xúc xích kết hợp với nấm, thơm và hấp dẫn.Xúc xích kết hợp với nấm, thơm và hấp dẫn.Xúc xích kết hợp với nấm, thơm và hấp dẫn.Xúc xích kết hợp với nấm, thơm và hấp dẫn.Xúc xích kết hợp với nấm, thơm và hấp dẫn.</p>
        <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>
        </label>
        <p className="btn">
            <div className="btn-container">
            <button
                className="btn-edit"
                onClick={() => setShowEditSanPham(true)}
            >
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <span className="tooltip">Chỉnh sửa</span>
            </div>
            <div className="btn-container">
            <button
                className="btn-remove"
                onClick={() => confirm("Xác nhận khóa sản phẩm?")}
            >
                <FontAwesomeIcon icon={faLockOpen} />
            </button>
            <span className="tooltip">Khóa</span>
            </div>
        </p>
        </div>
        <div className="sanpham-content-title content-title content-item">
        <p>1</p>
        <img src={assets.proportion1} alt="" />
        <p>Example Food</p>
        <p>150,000đ</p>
        <p>1</p>
        <p className="btn">
            <div className="btn-container">
            <button
                className="btn-edit"
                onClick={() => setShowEditSanPham(true)}
            >
                <FontAwesomeIcon icon={faWrench} />
            </button>
            <span className="tooltip">Chỉnh sửa</span>
            </div>
            <div className="btn-container">
            <button
                className="btn-remove"
                onClick={() => confirm("Xóa sản phẩm")}
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>
            <span className="tooltip">Xóa</span>
            </div>
        </p>
        </div>
        <div className="sanpham-content-title content-title content-item">
        <p>1</p>
        <img src={assets.proportion1} alt="" />
        <p>Example Food</p>
        <p>150,000đ</p>
        <p>1</p>
        <p className="btn">
            <div className="btn-container">
            <button
                className="btn-edit"
                onClick={() => setShowEditSanPham(true)}
            >
                <FontAwesomeIcon icon={faWrench} />
            </button>
            <span className="tooltip">Chỉnh sửa</span>
            </div>
            <div className="btn-container">
            <button
                className="btn-remove"
                onClick={() => confirm("Xóa sản phẩm")}
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>
            <span className="tooltip">Xóa</span>
            </div>
        </p>
        </div>
        <div className="sanpham-content-title content-title content-item">
        <p>1</p>
        <img src={assets.proportion1} alt="" />
        <p>Example Food</p>
        <p>150,000đ</p>
        <p>1</p>
        <p className="btn">
            <div className="btn-container">
            <button
                className="btn-edit"
                onClick={() => setShowEditSanPham(true)}
            >
                <FontAwesomeIcon icon={faWrench} />
            </button>
            <span className="tooltip">Chỉnh sửa</span>
            </div>
            <div className="btn-container">
            <button
                className="btn-remove"
                onClick={() => confirm("Xóa sản phẩm")}
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>
            <span className="tooltip">Xóa</span>
            </div>
        </p>
        </div>
        <div className="sanpham-content-title content-title content-item">
        <p>1</p>
        <img src={assets.proportion1} alt="" />
        <p>Example Food</p>
        <p>150,000đ</p>
        <p>1</p>
        <p className="btn">
            <div className="btn-container">
            <button
                className="btn-edit"
                onClick={() => setShowEditSanPham(true)}
            >
                <FontAwesomeIcon icon={faWrench} />
            </button>
            <span className="tooltip">Chỉnh sửa</span>
            </div>
            <div className="btn-container">
            <button
                className="btn-remove"
                onClick={() => confirm("Xóa sản phẩm")}
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>
            <span className="tooltip">Xóa</span>
            </div>
        </p>
        </div>
        <div className="sanpham-content-title content-title content-item">
        <p>1</p>
        <img src={assets.proportion1} alt="" />
        <p>Example Food</p>
        <p>150,000đ</p>
        <p>1</p>
        <p className="btn">
            <div className="btn-container">
            <button
                className="btn-edit"
                onClick={() => setShowEditSanPham(true)}
            >
                <FontAwesomeIcon icon={faWrench} />
            </button>
            <span className="tooltip">Chỉnh sửa</span>
            </div>
            <div className="btn-container">
            <button
                className="btn-remove"
                onClick={() => confirm("Xóa sản phẩm")}
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>
            <span className="tooltip">Xóa</span>
            </div>
        </p>
        </div>
    </div>
    </div>
);
};

export default SanPham;
