import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import "./AddBan.css";

const AddBan = ({ setShowAddBan }) => {
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

  const uploadImageToCloudinary = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "Demo-upload");
    formData.append("cloud_name", "dwjm7jkno");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dwjm7jkno/image/upload",
        formData
      );
      return response.data.url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateFormData()) {
      setIsLoading(true);
      const imageUrl = await uploadImageToCloudinary(hinhAnh);

      if (imageUrl) {
        const newCategory = {
          name: tenLoai,
          img: imageUrl
        };

        try {
          const response = await axios.post(
            "https://restaurant-manager-be-1.onrender.com/api/categories",
            newCategory
          );
          if (response.data.success) {
            console.log("Thêm loại món ăn thành công:", response.data);
            setShowAddBan(false);
          } else {
            console.error("Error adding category:", response.data.message);
          }
        } catch (error) {
          console.error("Error adding category:", error);
        }
      }

      setIsLoading(false);
    }
  };

  return (
    <div className="popup">
      <form className="popup-container" onSubmit={handleSubmit}>
        <div className="popup-title">
          <h2>Thêm Bàn</h2>
          <div className="close-btn" onClick={() => setShowAddBan(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className="popup-inputs">
          <div className={`popup-input ${errors.tenLoai ? "errorClass" : ""}`}>
            <label htmlFor="popup-ten">Số lượng người:</label>
            <div>
              <select
                name="popup-tenNhaCungCap"
                id="popup-tenNhaCungCap"
                value={tenLoai}
                onChange={(e) => setTenLoai(e.target.value)}
              >
                <option value="">Chọn số lượng người:</option>
                <option value="4">4</option>
                <option value="6">6</option>
              </select>
              <div className="errorText">{errors.tenLoai}</div>
            </div>
          </div>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Đang thêm..." : "Thêm bàn"}
        </button>
      </form>
    </div>
  );
};

export default AddBan;
