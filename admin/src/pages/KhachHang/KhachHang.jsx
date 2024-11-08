import { faPlus, faTrash, faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../../dungchung.css";
import "./KhachHang.css";

const KhachHang = ({ setShowAddKhachHang, setShowEditKhachHang }) => {
  return (
    <div className="container">
      <div className="header">
        <div className="timkiem">
          <input
            className="input-timkiem"
            type="text"
            placeholder="Tìm kiếm khách hàng..."
          />
          <button className="btn-timkiem">Tìm kiếm</button>
        </div>
        <button className="btn-them" onClick={() => setShowAddKhachHang(true)}>
          <FontAwesomeIcon icon={faPlus} /> Thêm
        </button>
      </div>
      <div className="khachhang-content-title content-title title">
        <p>STT</p>
        <p>Tên khách hàng</p>
        <p>Số điện thoại</p>
        <p>Khuyến mãi có thể sử dụng</p>
        <p>Hành động</p>
      </div>

      <div className="content">
        <div className="khachhang-content-title content-title content-item">
          <p>1</p>
          <p>Customer 1</p>
          <p>0987654321</p>
          <p>Khuyến mãi 1</p>
          <p className="btn">
            <div className="btn-container">
              <button
                className="btn-edit"
                onClick={() => setShowEditKhachHang(true)}
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
        <div className="khachhang-content-title content-title content-item">
          <p>2</p>
          <p>Customer 2</p>
          <p>0987654321</p>
          <p>Khuyến mãi 2</p>
          <p className="btn">
            <div className="btn-container">
              <button
                className="btn-edit"
                onClick={() => setShowEditKhachHang(true)}
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

export default KhachHang;
