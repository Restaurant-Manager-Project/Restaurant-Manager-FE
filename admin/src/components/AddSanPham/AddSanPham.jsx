import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddSanPham.css";

const AddSanPham = ({ setShowAddSanPham }) => {
    const [tenMonAn, setTenMonAn] = useState("");
    const [loaiMonAn, setLoaiMonAn] = useState("");
    const [hinhAnh, setHinhAnh] = useState(null);
    const [moTa, setMoTa] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("https://restaurant-manager-be-1.onrender.com/api/categories")
            .then(response => {
                if (response.data.success) {
                    setCategories(response.data.result);
                }
            })
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

    const validateAddFormData = () => {
        let validationErrors = {};

        if (tenMonAn.trim() === "") {
            validationErrors.tenMonAn = "Vui lòng nhập tên món ăn.";
        } else {
            const addressRegex = /^[a-zA-Z\s]*$/;
            if (!addressRegex.test(tenMonAn)) {
                validationErrors.tenMonAn = "Tên món ăn không hợp lệ. Vui lòng chỉ nhập chữ.";
            }
        }

        if (loaiMonAn === "") {
            validationErrors.loaiMonAn = "Vui lòng chọn loại món ăn.";
        }

        if (!hinhAnh) {
            validationErrors.hinhAnh = "Vui lòng chọn hình ảnh cho món ăn.";
        }

        if (moTa.trim() === "") {
            validationErrors.moTa = "Vui lòng nhập mô tả cho món ăn.";
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

        if (validateAddFormData()) {
            setIsLoading(true);
            const imageUrl = await uploadImageToCloudinary(hinhAnh);

            if (imageUrl) {
                const newProduct = {
                    name: tenMonAn,
                    categoryName: loaiMonAn,
                    img: imageUrl,
                    description: moTa,
                };

                try {
                    const response = await axios.post("https://restaurant-manager-be-1.onrender.com/api/products", newProduct);
                    if (response.data.success) {
                        console.log("Thêm món ăn thành công:", response.data);
                        setShowAddSanPham(false);
                    } else {
                        console.error("Error adding product:", response.data.message);
                    }
                } catch (error) {
                    console.error("Error adding product:", error);
                }
            }

            setIsLoading(false);
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
                            <select
                                name="popup-loai"
                                id="popup-loai"
                                value={loaiMonAn}
                                onChange={(e) => setLoaiMonAn(e.target.value)}
                            >
                                <option value="">Chọn loại món ăn</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.name}>{category.name}</option>
                                ))}
                            </select>
                            <div className="error">{errors.loaiMonAn}</div>
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
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Đang thêm..." : "Thêm món ăn"}
                </button>
            </form>
        </div>
    );
};

export default AddSanPham;