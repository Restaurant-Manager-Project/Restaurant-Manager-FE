import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./EditNhaCungCap.css";

const EditNhaCungCap = ({ setShowEditNhaCungCap }) => {
  // Khai báo state cho các trường
  const [soDienThoai, setSoDienThoai] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [errors, setErrors] = useState({});

  // Hàm kiểm tra dữ liệu đầu vào
  const validateFormData = () => {
    let validationErrors = {};

    // Kiểm tra số điện thoại
    if (soDienThoai.trim() === "") {
      validationErrors.soDienThoai = "Vui lòng nhập số điện thoại.";
    } else {
      const phoneRegex = /^(0|84|\+84)(\d{9})$/;
      if (!phoneRegex.test(soDienThoai)) {
        validationErrors.soDienThoai =
          "Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng 10 chữ số.";
      }
    }

    // Kiểm tra địa chỉ
    if (diaChi.trim() === "") {
      validationErrors.diaChi = "Vui lòng nhập địa chỉ.";
    } else {
      const addressRegex = /^[a-zA-Z0-9\s/-]*$/;
      if (!addressRegex.test(diaChi)) {
        validationErrors.diaChi =
          "Địa chỉ không hợp lệ. Vui lòng chỉ nhập chữ, số, dấu '/' và '-'.";
      }
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Hàm xử lý submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateFormData()) {
      console.log("Dữ liệu hợp lệ, tiến hành chỉnh sửa nhà cung cấp...");
      // Thực hiện các hành động khác nếu cần, ví dụ: gọi API để cập nhật thông tin nhà cung cấp
    }
  };

  return (
    <div className="popup">
      <form className="popup-container" onSubmit={handleSubmit}>
        <div className="popup-title">
          <h2>Chỉnh sửa nhà cung cấp</h2>
          <div
            className="close-btn"
            onClick={() => setShowEditNhaCungCap(false)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className="popup-inputs">
          <div className="popup-input">
            <label htmlFor="popup-ten">Tên nhà cung cấp:</label>
            <input
              type="text"
              id="popup-ten"
              placeholder="Tên nhà cung cấp..."
              disabled
            />
            <div className="errorText"></div>
          </div>
          <div className={`popup-input ${errors.soDienThoai ? "error" : ""}`}>
            <label htmlFor="popup-sodienthoai">Số điện thoại:</label>
            <input
              type="tel"
              id="popup-sodienthoai"
              placeholder="Nhập số điện thoại..."
              value={soDienThoai}
              onChange={(e) => setSoDienThoai(e.target.value)}
            />
            <div className="errorText">{errors.soDienThoai}</div>
          </div>
          <div className={`popup-input ${errors.diaChi ? "error" : ""}`}>
            <label htmlFor="popup-diachi">Địa chỉ:</label>
            <input
              type="text"
              id="popup-diachi"
              placeholder="Nhập địa chỉ..."
              value={diaChi}
              onChange={(e) => setDiaChi(e.target.value)}
            />
            <div className="errorText">{errors.diaChi}</div>
          </div>
        </div>
        <button type="submit">Chỉnh sửa nhà cung cấp</button>
      </form>
    </div>
  );
};

export default EditNhaCungCap;
