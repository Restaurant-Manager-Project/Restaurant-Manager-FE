import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./AddSanPham.css";

const AddSanPham = ({ setShowAddSanPham }) => {
    // Khai báo state cho các trường
    const [tenMonAn, setTenMonAn] = useState("");
    const [loaiMonAn, setLoaiMonAn] = useState("");
    const [hinhAnh, setHinhAnh] = useState(null);
    const [moTa, setMoTa] = useState("");
    const [errors, setErrors] = useState({});

    // Hàm kiểm tra dữ liệu đầu vào
    const validateAddFormData = () => {
        let validationErrors = {};

        // Kiểm tra tên món ăn
        if (tenMonAn.trim() === "") {
            validationErrors.tenMonAn = "Vui lòng nhập tên món ăn.";
        } else {
            const addressRegex = /^[a-zA-Z\s]*$/;
            if (!addressRegex.test(tenMonAn)) {
                validationErrors.tenMonAn =
                    "Tên món ăn không hợp lệ. Vui lòng chỉ nhập chữ.";
            }
        }

        // Kiểm tra loại món ăn
        if (loaiMonAn === "") {
            validationErrors.loaiMonAn = "Vui lòng chọn loại món ăn.";
        }

        // Kiểm tra hình ảnh
        if (!hinhAnh) {
            validationErrors.hinhAnh = "Vui lòng chọn hình ảnh cho món ăn.";
        }

        // Kiểm tra mô tả
        if (moTa.trim() === "") {
            validationErrors.moTa = "Vui lòng nhập mô tả cho món ăn.";
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    // Hàm xử lý submit form
    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateAddFormData()) {
            console.log("Dữ liệu hợp lệ, tiến hành thêm món ăn...");
            // Thực hiện các hành động khác nếu cần, ví dụ: gọi API thêm món ăn
        }
    };

    return (
        <div className="popup">
            <form className="popup-container" onSubmit={handleSubmit}>
                <div className="popup-title">
                    <h2>Thêm món ăn</h2>
                    <div className="close-btn" onClick={() => setShowAddSanPham(false)}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </div>
                <div className="popup-table">
                    <div className="popup-inputs">
                        <div className={`popup-input ${errors.tenMonAn ? "error" : ""}`}>
                            <label htmlFor="popup-ten">Tên món ăn:</label>
                            <div>
                                <input
                                type="text"
                                id="popup-ten"
                                placeholder="Nhập tên món ăn..."
                                value={tenMonAn}
                                onChange={(e) => setTenMonAn(e.target.value)}
                                />
                                <div className="errorText">{errors.tenMonAn}</div>
                            </div>
                            
                        </div>
                        <div className={`popup-input ${errors.loaiMonAn ? "error" : ""}`}>
                            <label htmlFor="popup-loai">Loại:</label>
                            <div>
                                <select
                                    name="popup-loai"
                                    id="popup-loai"
                                    value={loaiMonAn}
                                    onChange={(e) => setLoaiMonAn(e.target.value)}
                                >
                                    <option value="">Chọn loại món ăn</option>
                                    <option value="1">Món ăn</option>
                                    <option value="2">Thức uống</option>
                                    <option value="3">Thức ăn ngon</option>
                                    <option value="4">Món ăn khác</option>
                                </select>
                            <div className="errorText">{errors.loaiMonAn}</div>
                            </div>
                            
                        </div>
                        <div className={`popup-input ${errors.hinhAnh ? "error" : ""}`}>
                            <label>Chọn hình:</label>
                            <div>
                                <input
                                    type="file"
                                    onChange={(e) => setHinhAnh(e.target.files[0])} multiple
                                />
                                {hinhAnh && <img src={URL.createObjectURL(hinhAnh)} alt="Preview" />}
                                <div className="errorText">{errors.hinhAnh}</div>
                            </div>
                            
                        </div>
                        
                    </div>
                    <div className={`popup-inputs ${errors.moTa ? "error" : ""}`}>
                        <label htmlFor="popup-mota">Mô tả:</label>
                        <textarea
                            name="popup-mota"
                            id="popup-mota"
                            placeholder="Nhập mô tả cho món ăn..."
                            value={moTa}
                            onChange={(e) => setMoTa(e.target.value)}
                        ></textarea>
                        <div className="errorText">{errors.moTa}</div>
                    </div>
                </div>
                    
                <button type="submit">Thêm món ăn</button>
            </form>
        </div>
    );
};

export default AddSanPham;
