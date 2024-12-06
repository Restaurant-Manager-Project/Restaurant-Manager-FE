import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import "./AddLoai.css";

const AddLoai = ({ setShowAddLoai }) => {
  const [tenLoai, setTenLoai] = useState("");
  const [hinhAnh, setHinhAnh] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateFormData = () => {
    let validationErrors = {};

    if (tenLoai.trim() === "") {
      validationErrors.tenLoai = "Vui lòng nhập tên loại món ăn.";
    } else {
      const vietnameseRegex =
        /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]*$/;
      if (!vietnameseRegex.test(tenLoai)) {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateFormData()) {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("name", tenLoai);
      formData.append("img", hinhAnh);

      try {
        const response = await axios.post(
          "https://restaurant-manager-be-f47n.onrender.com/api/categories",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
        if (response.data.success) {
          alert("Thêm loại món ăn thành công");
          setShowAddLoai(false);
        } else {
          console.error("Error adding category:", response.data.message);
        }
      } catch (error) {
        console.error("Error adding category:", error);
      }

      setIsLoading(false);
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
        <div className="popup-table">
          <div className="popup-inputs">
            <div
              className={`popup-input ${errors.tenLoai ? "errorClass" : ""}`}
            >
              <label htmlFor="popup-ten">Tên loại món ăn:</label>
              <div>
                <input
                  type="text"
                  id="popup-ten"
                  placeholder="Nhập tên loại món ăn..."
                  value={tenLoai}
                  onChange={(e) => setTenLoai(e.target.value)}
                />
                <div className="errorText">{errors.tenLoai}</div>
              </div>
            </div>
            <div
              className={`popup-input ${errors.hinhAnh ? "errorClass" : ""}`}
            >
              <label>Chọn hình:</label>
              <div>
                <input
                  type="file"
                  onChange={(e) => setHinhAnh(e.target.files[0])}
                />
                <div className="errorText">{errors.hinhAnh}</div>
              </div>
              {hinhAnh && (
                <img src={URL.createObjectURL(hinhAnh)} alt="Preview" />
              )}
            </div>
          </div>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Đang thêm..." : "Thêm loại món ăn"}
        </button>
      </form>
    </div>
  );
};

export default AddLoai;
