import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
            const vietnameseRegex = /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]*$/;
            if (!vietnameseRegex.test(tenLoai)) {
                validationErrors.tenLoai = "Tên loại món ăn không hợp lệ. Vui lòng chỉ nhập chữ và số.";
            }
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
            const response = await axios.post("https://api.cloudinary.com/v1_1/dwjm7jkno/image/upload", formData);
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
            let imageUrl = category.img;

            if (hinhAnh) {
                imageUrl = await uploadImageToCloudinary(hinhAnh);
            }

            const updatedCategory = {
                name: tenLoai,
                img: imageUrl
            };

            try {
                const response = await axios.put(`https://restaurant-manager-be-1.onrender.com/api/categories/${category.id}`, updatedCategory);
                if (response.data.success) {
                    console.log("Chỉnh sửa loại món ăn thành công:", response.data);
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
                        <input
                            type="text"
                            id="popup-ten"
                            placeholder={category.name}
                            value={tenLoai}
                            onChange={(e) => setTenLoai(e.target.value)}
                        />
                        <div className="error">{errors.tenLoai}</div>
                    </div>
                    <div className={`popup-input ${errors.hinhAnh ? "error" : ""}`}>
                        <label>Chọn hình:</label>
                        <input
                            type="file"
                            onChange={(e) => setHinhAnh(e.target.files[0])}
                        />
                        {hinhAnh ? (
                            <img src={URL.createObjectURL(hinhAnh)} alt="Preview" />
                        ) : (
                            <img src={category.img} alt="Hình ảnh hiện tại" />
                        )}
                        <div className="error">{errors.hinhAnh}</div>
                    </div>
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Đang chỉnh sửa..." : "Chỉnh sửa loại món ăn"}
                </button>
            </form>
        </div>
        <div className="popup-inputs">
          <div className="popup-input">
            <label htmlFor="popup-ten">Tên loại:</label>
            <input
              type="text"
              id="popup-ten"
              placeholder="Nhập tên loại..."
              disabled
            />
          </div>
          <div className={`popup-input ${errors.hinhAnh ? "error" : ""}`}>
            <label>Chọn hình:</label>
            <div>
              <input
                type="file"
                onChange={(e) => setHinhAnh(e.target.files[0])}
              />
              {hinhAnh ? (
                <img src={URL.createObjectURL(hinhAnh)} alt="Preview" />
              ) : (
                <img src={assets.proportion1} alt="Hình ảnh mặc định" />
              )}
              <div className="errorText"></div>
            </div>
            
          </div>
        </div>
        <button type="submit">Chỉnh sửa loại món ăn</button>
      </form>
    </div>
  );
};

export default EditLoai;