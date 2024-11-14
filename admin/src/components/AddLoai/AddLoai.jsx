import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import axios from "axios";
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
            const vietnameseRegex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]*$/;
            if (!vietnameseRegex.test(tenLoai)) {
                validationErrors.tenLoai = "Tên loại món ăn không hợp lệ. Vui lòng chỉ nhập chữ.";
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
            const imageUrl = await uploadImageToCloudinary(hinhAnh);

            if (imageUrl) {
                const newCategory = {
                    name: tenLoai,
                    img: imageUrl
                };

                try {
                    const response = await axios.post("https://restaurant-manager-be-f47n.onrender.com/api/categories", newCategory);
                    if (response.data.success) {
                        console.log("Thêm loại món ăn thành công:", response.data);
                        setShowAddLoai(false);
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
                            
                            <div className="errorText">{errors.hinhAnh}</div>
                        </div>
                        {hinhAnh && (
                            <img src={URL.createObjectURL(hinhAnh)} alt="Preview" />
                        )}
                    </div>
                </div>
                <button type="submit">Thêm loại món ăn</button>
            </form>
        </div>
    );
};

export default AddLoai;