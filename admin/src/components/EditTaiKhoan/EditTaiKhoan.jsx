import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./EditTaiKhoan.css";

const EditTaiKhoan = ({ setShowEditTaiKhoan }) => {
  const [quyen, setQuyen] = useState("");
  const [trangThai, setTrangThai] = useState("");
  const [errors, setErrors] = useState({});

  // Hàm kiểm tra dữ liệu đầu vào
  const validateFormData = () => {
    let validationErrors = {};

    if (quyen === "") {
      validationErrors.quyen = "Vui lòng chọn quyền.";
    }

    if (trangThai === "") {
      validationErrors.trangThai = "Vui lòng chọn trạng thái.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Hàm xử lý submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateFormData()) {
      console.log("Dữ liệu hợp lệ, tiến hành chỉnh sửa tài khoản...");
      // Thực hiện các hành động khác nếu cần, ví dụ: gọi API để cập nhật tài khoản
    }
  };

  return (
    <div className="popup">
      <form className="popup-container" onSubmit={handleSubmit}>
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
          <div className={`popup-input ${errors.quyen ? "error" : ""}`}>
            <label htmlFor="popup-quyen">Quyền:</label>
            <select
              name="popup-quyen"
              id="popup-quyen"
              value={quyen}
              onChange={(e) => setQuyen(e.target.value)}
            >
              <option value="">Chọn quyền</option>
              <option value="1">Quản lý</option>
              <option value="2">Nhân viên</option>
            </select>
            <div className="errorText">{errors.quyen}</div>
          </div>
          <div className={`popup-input ${errors.trangThai ? "error" : ""}`}>
            <label htmlFor="popup-trangThai">Trạng thái:</label>
            <select
              name="popup-trangThai"
              id="popup-trangThai"
              value={trangThai}
              onChange={(e) => setTrangThai(e.target.value)}
            >
              <option value="">Chọn trạng thái</option>
              <option value="1">Hoạt động</option>
              <option value="2">Bị khóa</option>
            </select>
            <div className="errorText">{errors.trangThai}</div>
          </div>
        </div>
        <button type="submit">Chỉnh sửa tài khoản</button>
      </form>
    </div>
  );
};

export default EditTaiKhoan;
