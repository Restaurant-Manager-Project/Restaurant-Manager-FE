import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./AddLoai.css";

const AddLoai = ({ setShowAddLoai }) => {
  // Khai báo state cho các input
  const [tenLoai, setTenLoai] = useState("");
  const [hinhAnh, setHinhAnh] = useState(null);
  const [errors, setErrors] = useState({});

  // Hàm kiểm tra dữ liệu đầu vào
  const validateFormData = () => {
    let validationErrors = {};

    if (tenLoai.trim() === "") {
      validationErrors.tenLoai = "Vui lòng nhập tên loại món ăn.";
    } else {
      const addressRegex = /^[a-zA-Z\s]*$/;
      if (!addressRegex.test(tenLoai)) {
        validationErrors.tenLoai =
          "Tên loại món ăn không hợp lệ. Vui lòng chỉ nhập chữ.";
      }
    }

    if (!hinhAnh) {
      validationErrors.hinhAnh = "Vui lòng chọn hình ảnh cho loại món ăn.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Hàm xử lý submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateFormData()) {
      console.log("Dữ liệu hợp lệ, tiến hành thêm loại món ăn...");
      // Thực hiện các hành động khác nếu cần, ví dụ: gọi API để thêm loại món ăn
    }
  };

  return (
    <div className="popup">
      <form className="popup-container" onSubmit={handleSubmit}>
        <div className="popup-title">
          <h2>Thêm loại món ăn</h2>
          <div className="close-btn" onClick={() => setShowAddLoai(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className="popup-inputs">
          <div className={`popup-input ${errors.tenLoai ? "error" : ""}`}>
            <label htmlFor="popup-ten">Tên loại:</label>
            <div>
              <input
                type="text"
                id="popup-ten"
                placeholder="Nhập tên loại..."
                value={tenLoai}
                onChange={(e) => setTenLoai(e.target.value)}
              />
              <div className="errorText">{errors.tenLoai}</div>
            </div>
            
          </div>
          <div className={`popup-input ${errors.hinhAnh ? "error" : ""}`}>
            <label>Chọn hình:</label>
            <div>
              <input
                type="file"
                onChange={(e) => setHinhAnh(e.target.files[0])}
              />
              {hinhAnh && (
                <img src={URL.createObjectURL(hinhAnh)} alt="Preview" />
              )}
              <div className="errorText">{errors.hinhAnh}</div>
            </div>
            
          </div>
        </div>
        <button type="submit">Thêm loại món ăn</button>
      </form>
    </div>
  );
};

export default AddLoai;
