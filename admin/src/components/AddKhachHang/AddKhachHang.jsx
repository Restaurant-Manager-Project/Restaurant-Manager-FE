import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import axios from "axios";
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateFormData()) {
            setIsLoading(true);

            const newClient = {
                firstName,
                lastName,
                phone
            };

            try {
                const response = await axios.post("https://restaurant-manager-be-1.onrender.com/api/clients", newClient);
                if (response.data.success) {
                    console.log("Thêm khách hàng thành công:", response.data);
                    setShowAddKhachHang(false);
                } else {
                    console.error("Error adding client:", response.data.message);
                }
            } catch (error) {
                console.error("Error adding client:", error);
            }

            setIsLoading(false);
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
                    <div className={`popup-input ${errors.firstName ? "error" : ""}`}>
                        <label htmlFor="popup-firstName">Tên:</label>
                        <input
                            type="text"
                            id="popup-firstName"
                            placeholder="Nhập tên..."
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <div className="error">{errors.firstName}</div>
                    </div>
                    <div className={`popup-input ${errors.lastName ? "error" : ""}`}>
                        <label htmlFor="popup-lastName">Họ:</label>
                        <input
                            type="text"
                            id="popup-lastName"
                            placeholder="Nhập họ..."
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <div className="error">{errors.lastName}</div>
                    </div>
                    <div className={`popup-input ${errors.phone ? "error" : ""}`}>
                        <label htmlFor="popup-phone">Số điện thoại:</label>
                        <input
                            type="text"
                            id="popup-phone"
                            placeholder="Nhập số điện thoại..."
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <div className="error">{errors.phone}</div>
                    </div>
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Đang thêm..." : "Thêm khách hàng"}
                </button>
            </form>
        </div>
        <button type="submit">Thêm khách hàng</button>
    </form>
    </div>
);
};

export default AddKhachHang;