import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./AddKhachHang.css";

const AddKhachHang = ({ setShowAddKhachHang }) => {
// Khai báo state cho từng input
const [tenKhachHang, setTenKhachHang] = useState("");
const [soDienThoai, setSoDienThoai] = useState("");
const [maKhuyenMai, setMaKhuyenMai] = useState("");
const [errors, setErrors] = useState({});

// Hàm kiểm tra dữ liệu đầu vào
const validateFormData = () => {
    let validationErrors = {};

    if (tenKhachHang.trim() === "") {
    validationErrors.tenKhachHang = "Vui lòng nhập tên khách hàng.";
    } else {
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (!nameRegex.test(tenKhachHang)) {
        validationErrors.tenKhachHang =
        "Tên khách hàng không hợp lệ. Vui lòng chỉ nhập chữ.";
    }
    }

    if (soDienThoai.trim() === "") {
    validationErrors.soDienThoai = "Vui lòng nhập số điện thoại.";
    } else {
    const phoneRegex = /^(0|84|\+84)(\d{9})$/;
    if (!phoneRegex.test(soDienThoai)) {
        validationErrors.soDienThoai =
        "Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng 10 chữ số.";
    }
    }

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
    console.log("Dữ liệu hợp lệ, tiến hành thêm khách hàng...");
    // Thực hiện các hành động khác nếu cần, ví dụ: gọi API để thêm khách hàng
    }
};

return (
    <div className="popup">
    <form className="popup-container" onSubmit={handleSubmit}>
        <div className="popup-title">
        <h2>Thêm khách hàng</h2>
        <div className="close-btn" onClick={() => setShowAddKhachHang(false)}>
            <FontAwesomeIcon icon={faXmark} />
        </div>
        </div>
        <div className="popup-inputs">
        <div className={`popup-input ${errors.tenKhachHang ? "error" : ""}`}>
            <label htmlFor="popup-ten">Tên khách hàng:</label>
            <div className="asd">
                <input
                    type="text"
                    id="popup-ten"
                    placeholder="Nhập tên khách hàng..."
                    value={tenKhachHang}
                    onChange={(e) => setTenKhachHang(e.target.value)}
                />
                <div className="errorText">{errors.tenKhachHang}</div>
            </div>
            
        </div>
        <div className={`popup-input ${errors.soDienThoai ? "error" : ""}`}>
            <label htmlFor="popup-sodienthoai">Số điện thoại:</label>
            <div className="asd">
                <input
                    type="tel"
                    id="popup-sodienthoai"
                    placeholder="Nhập số điện thoại..."
                    value={soDienThoai}
                    onChange={(e) => setSoDienThoai(e.target.value)}
                />
                <div className="errorText">{errors.soDienThoai}</div>
            </div>
            
        </div>
        <div className={`popup-input ${errors.maKhuyenMai ? "error" : ""}`}>
            <label htmlFor="popup-maKhuyenMai">
            Mã khuyến mãi có thể sử dụng:
            </label>
            <div className="asd">
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
                <div className="errorText">{errors.maKhuyenMai}</div>
            </div>
            
        </div>
        </div>
        <button type="submit">Thêm khách hàng</button>
    </form>
    </div>
);
};

export default AddKhachHang;
