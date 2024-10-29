import React, { useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { assets } from "../../assets/assets";
import "./EditSanPham.css";

const EditSanPham = ({ setShowEditSanPham }) => {
    // Khai báo state để quản lý các giá trị của form
    const [loaiMonAn, setLoaiMonAn] = useState("");
    const [hinhAnh, setHinhAnh] = useState(null);
    const [trangThai, setTrangThai] = useState("");
    const [errors, setErrors] = useState({});

    // Hàm kiểm tra dữ liệu đầu vào
    const validateEditFormData = () => {
        let validationErrors = {};

        if (loaiMonAn === "") {
            validationErrors.loaiMonAn = "Vui lòng chọn loại món ăn.";
        }

        if (trangThai === "") {
            validationErrors.trangThai = "Vui lòng chọn trạng thái cho món ăn.";
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    // Hàm xử lý submit form
    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateEditFormData()) {
            console.log("Dữ liệu hợp lệ, tiến hành chỉnh sửa món ăn...");
            // Thực hiện các hành động khác khi dữ liệu hợp lệ (ví dụ: gọi API để cập nhật dữ liệu)
        }
    };

    return (
        <div className="popup">
            <form className="popup-container" onSubmit={handleSubmit}>
                <div className="popup-title">
                    <h2>Chỉnh sửa món ăn</h2>
                    <div className="close-btn" onClick={() => setShowEditSanPham(false)}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </div>
                <div className="popup-table">
                    <div className="popup-inputs">
                        <div className="popup-input">
                            <label htmlFor="popup-ten">Tên món ăn:</label>
                            <input type="text" id="popup-ten" value={"An ba to com"} disabled />
                        </div>
                        <div className={`popup-input ${errors.loaiMonAn ? "error" : ""}`}>
                            <label htmlFor="popup-loai">Loại:</label>
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
                            <div className="error">{errors.loaiMonAn}</div>
                        </div>
                        <div className="popup-input">
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
                            <div className="error"></div>
                        </div>
                        <div className={`popup-input ${errors.trangThai ? "error" : ""}`}>
                            <label htmlFor="popup-trangThai">Trạng thái:</label>
                            <select
                                name="popup-trangThai"
                                id="popup-trangThai"
                                value={trangThai}
                                onChange={(e) => setTrangThai(e.target.value)}
                            >
                                <option value="">Chọn trạng thái</option>
                                <option value="1">Số lượng còn</option>
                                <option value="2">Hết hàng</option>
                            </select>
                            <div className="error">{errors.trangThai}</div>
                        </div>
                    </div>
                    <div className="popup-input">
                        <label htmlFor="popup-mota">Mô tả:</label>
                        <textarea
                            name="popup-mota"
                            id="popup-mota"
                            disabled
                            value={"AN BA TO COMMMMMMMM"}
                        ></textarea>
                    </div>
                </div>
                
                <button type="submit">Chỉnh sửa món ăn</button>
            </form>
        </div>
    );
};

export default EditSanPham;
