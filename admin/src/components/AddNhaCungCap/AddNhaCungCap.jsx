import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./AddNhaCungCap.css";

const AddNhaCungCap = ({ setShowAddNhaCungCap }) => {
    // Khai báo state cho các trường
    const [tenNhaCungCap, setTenNhaCungCap] = useState("");
    const [soDienThoai, setSoDienThoai] = useState("");
    const [diaChi, setDiaChi] = useState("");
    const [errors, setErrors] = useState({});

    // Hàm kiểm tra dữ liệu đầu vào
    const validateFormData = () => {
        let validationErrors = {};

        // Kiểm tra tên nhà cung cấp không có ký tự đặc biệt
        if (tenNhaCungCap.trim() === "") {
            validationErrors.tenNhaCungCap = "Vui lòng nhập tên nhà cung cấp.";
        } else {
            const nameRegex = /^[a-zA-Z\s]*$/;
            if (!nameRegex.test(tenNhaCungCap)) {
                validationErrors.tenNhaCungCap =
                    "Tên nhà cung cấp không hợp lệ. Vui lòng chỉ nhập chữ.";
            }
        }

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

        // Kiểm tra địa chỉ không có ký tự đặc biệt, trừ '/' và '-'
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

        // Kiểm tra dữ liệu đầu vào trước khi submit
        if (validateFormData()) {
            console.log("Dữ liệu hợp lệ, tiến hành thêm nhà cung cấp...");
            // Thực hiện các hành động khác nếu cần, ví dụ: gọi API để thêm nhà cung cấp
        }
    };

    return (
        <div className="popup">
            <form className="popup-container" onSubmit={handleSubmit}>
                <div className="popup-title">
                    <h2>Thêm nhà cung cấp</h2>
                    <div
                        className="close-btn"
                        onClick={() => setShowAddNhaCungCap(false)}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </div>
                <div className="popup-inputs">
                    <div className={`popup-input ${errors.tenNhaCungCap ? "error" : ""}`}>
                        <label htmlFor="popup-ten">Tên nhà cung cấp:</label>
                        <input
                            type="text"
                            id="popup-ten"
                            placeholder="Nhập tên nhà cung cấp..."
                            value={tenNhaCungCap}
                            onChange={(e) => setTenNhaCungCap(e.target.value)}
                        />
                        <div className="error">{errors.tenNhaCungCap}</div>
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
                        <div className="error">{errors.soDienThoai}</div>
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
                        <div className="error">{errors.diaChi}</div>
                    </div>
                </div>
                <button type="submit">Thêm nhà cung cấp</button>
            </form>
        </div>
    );
};

export default AddNhaCungCap;
