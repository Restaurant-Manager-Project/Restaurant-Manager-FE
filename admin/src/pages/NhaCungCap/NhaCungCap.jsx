import React from "react";
import "./NhaCungCap.css";

import {
  faPlus,
  faSort,
  faTrash,
  faWrench
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NhaCungCap = ({ setShowAddNhaCungCap, setShowEditNhaCungCap }) => {
  return (
    <div className="container">
      <div className="header">
        <div className="timkiem">
          <input
            className="input-timkiem"
            type="text"
            placeholder="Tìm kiếm nhà cung cấp..."
          />
          <button className="btn-timkiem">Tìm kiếm</button>
        </div>
        <button className="btn-them" onClick={() => setShowAddNhaCungCap(true)}>
          <FontAwesomeIcon icon={faPlus} /> Thêm
        </button>
      </div>
      <div className="nhacungcap-content-title content-title title">
        <p>
          STT <FontAwesomeIcon icon={faSort} />
        </p>
        <p>
          Tên nhà cung cấp <FontAwesomeIcon icon={faSort} />
        </p>
        <p>
          Số điện thoại <FontAwesomeIcon icon={faSort} />
        </p>
        <p>Địa chỉ</p>
        <p>Hành động</p>
      </div>

      <div className="content">
        <div className="nhacungcap-content-title content-title content-item">
          <p>1</p>
          <p>Nhà Cung Cấp 1</p>
          <p>0123456789</p>
          <p>
            273 An Dương Vương, Phường 3, Quận 5 Ho Chi Minh City, Vietnam 70000
            Ho Chi Minh City
          </p>
          <p className="btn">
            <div className="btn-container">
              <button
                className="btn-edit"
                onClick={() => setShowEditNhaCungCap(true)}
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

export default NhaCungCap;
