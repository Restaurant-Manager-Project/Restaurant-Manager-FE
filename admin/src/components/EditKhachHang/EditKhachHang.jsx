import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./EditKhachHang.css";

const EditKhachHang = ({ setShowEditKhachHang }) => {
    // Khai báo state cho trường mã khuyến mãi
    const [maKhuyenMai, setMaKhuyenMai] = useState("");
    const [errors, setErrors] = useState({});

    // Hàm kiểm tra dữ liệu đầu vào
    const validateFormData = () => {
        let validationErrors = {};

        if (maKhuyenMai === "") {
            validationErrors.maKhuyenMai = "Vui lòng chọn mã khuyến mãi.";
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    // Hàm xử lý submit form
    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateFormData()) {
            console.log("Dữ liệu hợp lệ, tiến hành chỉnh sửa khách hàng...");
            // Thực hiện các hành động khác nếu cần, ví dụ: gọi API để cập nhật thông tin khách hàng
        }
    };

    return (
        <div className="popup">
            <form className="popup-container" onSubmit={handleSubmit}>
                <div className="popup-title">
                    <h2>Chỉnh sửa khách hàng</h2>
                    <div
                        className="close-btn"
                        onClick={() => setShowEditKhachHang(false)}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </div>
                <div className="popup-inputs">
                    <div className="popup-input">
                        <label htmlFor="popup-ten">Tên khách hàng:</label>
                        <input
                            type="text"
                            id="popup-ten"
                            placeholder="Nhập tên khách hàng..."
                            disabled
                        />
                    </div>
                    <div className="popup-input">
                        <label htmlFor="popup-sodienthoai">Số điện thoại:</label>
                        <input
                            type="tel"
                            id="popup-sodienthoai"
                            placeholder="Nhập số điện thoại..."
                            disabled
                        />
                    </div>
                    <div className={`popup-input ${errors.maKhuyenMai ? "error" : ""}`}>
                        <label htmlFor="popup-maKhuyenMai">Mã khuyến mãi có thể sử dụng:</label>
                        <select
                            name="popup-maKhuyenMai"
                            id="popup-maKhuyenMai"
                            value={maKhuyenMai}
                            onChange={(e) => setMaKhuyenMai(e.target.value)}
                        >
                            <option value="">Chọn mã khuyến mãi</option>
                            <option value="1">Mã 1</option>
                            <option value="2">Mã 2</option>
                            <option value="3">Mã 3</option>
                            <option value="4">Mã 4</option>
                            <option value="5">Mã 5</option>
                            <option value="6">Mã 6</option>
                            <option value="7">Mã 7</option>
                            <option value="8">Mã 8</option>
                            <option value="9">Mã 9</option>
                            <option value="10">Mã 10</option>
                        </select>
                        <div className="error">{errors.maKhuyenMai}</div>
                    </div>
                </div>
                <button type="submit">Chỉnh sửa khách hàng</button>
            </form>
        </div>
    );
};

export default EditKhachHang;
