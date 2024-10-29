import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { assets } from "../../assets/assets";
import "./EditLoai.css";

const EditLoai = ({ setShowEditLoai }) => {
    const [hinhAnh, setHinhAnh] = useState(null);
    const [errors, setErrors] = useState({});

    // Hàm kiểm tra dữ liệu đầu vào
    const validateFormData = () => {
        let validationErrors = {};

        // if (!hinhAnh) {
        //     validationErrors.hinhAnh = "Vui lòng chọn hình ảnh cho loại món ăn.";
        // }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    // Hàm xử lý submit form
    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateFormData()) {
            console.log("Dữ liệu hợp lệ, tiến hành chỉnh sửa loại món ăn...");
            // Thực hiện các hành động khác khi dữ liệu hợp lệ, ví dụ: gọi API để cập nhật loại món ăn
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
                        <input
                            type="file"
                            onChange={(e) => setHinhAnh(e.target.files[0])}
                        />
                        {hinhAnh ? (
                            <img src={URL.createObjectURL(hinhAnh)} alt="Preview" />
                        ) : (
                            <img src={assets.proportion1} alt="Hình ảnh mặc định" />
                        )}
                        <div className="error">{errors.hinhAnh}</div>
                    </div>
                </div>
                <button type="submit">Chỉnh sửa loại món ăn</button>
            </form>
        </div>
    );
};

export default EditLoai;
