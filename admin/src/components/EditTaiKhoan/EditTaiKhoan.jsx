import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./EditTaiKhoan.css";

const EditTaiKhoan = ({ setShowEditTaiKhoan }) => {
  return (
    <div className="popup">
      <form className="popup-container">
        <div className="popup-title">
          <h2>Chỉnh sửa tài khoản</h2>
          <div className="close-btn" onClick={() => setShowEditTaiKhoan(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className="popup-inputs">
          <div className="popup-input">
            <label htmlFor="popup-ten">ID Nhân viên:</label>
            <input
              type="text"
              id="popup-ten"
              placeholder="Nhập ID Nhân viên..."
              disabled
            />
          </div>
          <div className="popup-input">
            <label htmlFor="popup-quyen">Quyền:</label>
            <select name="popup-quyen" id="popup-quyen">
              <option value="">Chọn quyền</option>
              <option value="1">Quản lý</option>
              <option value="2">Nhân viên</option>
            </select>
          </div>
          <div className="popup-input">
            <label htmlFor="popup-trangThai">Trạng thái:</label>
            <select name="popup-trangThai" id="popup-trangThai">
              <option value="">Chọn trạng thái</option>
              <option value="1">Hoạt động</option>
              <option value="2">Bị khóa</option>
            </select>
          </div>
        </div>
        <button>Chỉnh sửa tài khoản</button>
      </form>
    </div>
  );
};

export default EditTaiKhoan;
