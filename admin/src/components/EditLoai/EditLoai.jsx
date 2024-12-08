import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./EditLoai.css";

const EditLoai = ({ setShowEditLoai, category }) => {
  const [tenLoai, setTenLoai] = useState("");
  const [hinhAnh, setHinhAnh] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setTenLoai(category.name || "");
    }
  }, [category]);

  const validateFormData = () => {
    let validationErrors = {};

    if (tenLoai.trim() === "") {
      validationErrors.tenLoai = "Vui lòng nhập tên loại món ăn.";
    } else {
      const vietnameseRegex =
        /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]*$/;
      if (!vietnameseRegex.test(tenLoai)) {
        validationErrors.tenLoai =
          "Tên loại món ăn không hợp lệ. Vui lòng chỉ nhập chữ và số.";
      }
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
      if (hinhAnh) {
        formData.append("img", hinhAnh);
      } else {
        formData.append("img", category.img);
      }

      try {
        const response = await axios.put(
          `https://restaurant-manager-be-f47n.onrender.com/api/categories/${category.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.success) {
          alert("Chỉnh sửa loại món ăn thành công");
          setShowEditLoai(false);
        } else {
          console.error("Error updating category:", response.data.message);
        }
      } catch (error) {
        console.error("Error updating category:", error);
      }

      setIsLoading(false);
    }
  };

  return (
    <div className="popup">
      <form className="popup-container" onSubmit={handleSubmit}>
        <div className="popup-title">
          <h2>Chỉnh sửa loại món ăn</h2>
          <div className="close-btn" onClick={() => setShowEditLoai(false)}>
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
                placeholder={category.name}
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
              <div className="errorText">{errors.hinhAnh}</div>
            </div>
            {hinhAnh ? (
              <img src={URL.createObjectURL(hinhAnh)} alt="Preview" />
            ) : (
              <img src={category.img} alt="Hình ảnh hiện tại" />
            )}
          </div>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Đang chỉnh sửa..." : "Chỉnh sửa loại món ăn"}
        </button>
      </form>
    </div>
  );
};

export default EditLoai;