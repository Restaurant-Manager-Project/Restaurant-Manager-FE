import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./AddTaiKhoan.css";

const AddTaiKhoan = ({ setShowAddTaiKhoan }) => {
  // Khai báo state cho các trường
  const [idNhanVien, setIdNhanVien] = useState("");
  const [quyen, setQuyen] = useState("");
  const [trangThai, setTrangThai] = useState("");
  const [errors, setErrors] = useState({});

  // Hàm kiểm tra dữ liệu đầu vào
  const validateFormData = () => {
    let validationErrors = {};

    if (idNhanVien.trim() === "") {
      validationErrors.idNhanVien = "Vui lòng nhập ID Nhân viên.";
    } else {
      const nameRegex = /^[a-zA-Z0-9\s]*$/;
      if (!nameRegex.test(idNhanVien)) {
        validationErrors.idNhanVien =
          "ID nhân viên không hợp lệ. Vui lòng chỉ nhập chữ và số.";
      }
    }

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
      console.log("Dữ liệu hợp lệ, tiến hành thêm tài khoản...");
      // Thực hiện các hành động khác nếu cần, ví dụ: gọi API để thêm tài khoản
    }
  };

  return (
    <div className="popup">
      <form className="popup-container" onSubmit={handleSubmit}>
        <div className="popup-title">
          <h2>Thêm tài khoản</h2>
          <div className="close-btn" onClick={() => setShowAddTaiKhoan(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className="popup-inputs">
          <div className={`popup-input ${errors.idNhanVien ? "error" : ""}`}>
            <label htmlFor="popup-ten">ID Nhân viên:</label>
            <input
              type="text"
              id="popup-ten"
              placeholder="Nhập ID Nhân viên..."
              value={idNhanVien}
              onChange={(e) => setIdNhanVien(e.target.value)}
            />
            <div className="errorText">{errors.idNhanVien}</div>
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
        <button type="submit">Thêm tài khoản</button>
      </form>
    </div>
  );
};

export default AddTaiKhoan;
