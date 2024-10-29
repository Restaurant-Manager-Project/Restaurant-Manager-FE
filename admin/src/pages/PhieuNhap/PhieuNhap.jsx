import { faPlus, faTrash, faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../../dungchung.css";
import "./PhieuNhap.css";

const PhieuNhap = ({ setShowAddPhieuNhap }) => {
return (
    <div className="container">
    <div className="header">
        <div className="timkiem">
        <input
            className="input-timkiem"
            type="text"
            placeholder="Tìm kiếm phiếu nhập..."
        />
        <button className="btn-timkiem">Tìm kiếm</button>
        </div>
        <button className="btn-them" onClick={() => setShowAddPhieuNhap(true)}>
        <FontAwesomeIcon icon={faPlus} /> Thêm
        </button>
    </div>
    <div className="phieunhap-content-title content-title title">
        <p>STT</p>
        <p>Nhà cung cấp</p>
        <p>Món ăn</p>
        <p>Số lượng</p>
        <p>Giá nhập</p>
        <p>Giá bán</p>
        <p>Hành động</p>
    </div>

    <div className="content">
        <div className="phieunhap-content-title content-title content-item">
            <p>1</p>
            <p>Nhà cung cấp 1</p>
            <p>Món 1</p>
            <p>1</p>
            <p>100000</p>
            <p>150000</p>
        <p className="btn">
            <div className="btn-container">
            <button
                className="btn-edit"
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
        <div className="phieunhap-content-title content-title content-item">
            <p>1</p>
            <p>Nhà cung cấp 1</p>
            <p>Món 1</p>
            <p>1</p>
            <p>100000</p>
            <p>150000</p>
            <p className="btn">
                <div className="btn-container">
                <button
                    className="btn-edit"
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

export default PhieuNhap;
