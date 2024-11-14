import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import "./AddLichDatBan.css";

const AddLichDatBan = ({ setShowAddLichDatBan }) => {
const [tenLoai, setTenLoai] = useState("");
const [errors, setErrors] = useState({});
const [isLoading, setIsLoading] = useState(false);

const validateFormData = () => {
    let validationErrors = {};

    if (tenLoai.trim() === "") {
    validationErrors.tenLoai = "Vui lòng nhập tên loại món ăn.";
    } else {
        const vietnameseRegex =
            /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]*$/;
        if (!vietnameseRegex.test(tenLoai)) {
            validationErrors.tenLoai =
            "Tên loại món ăn không hợp lệ. Vui lòng chỉ nhập chữ.";
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
    const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dwjm7jkno/image/upload",
        formData
    );
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
        const response = await axios.post(
            "https://restaurant-manager-be-1.onrender.com/api/categories",
            newCategory
        );
        if (response.data.success) {
            console.log("Thêm loại món ăn thành công:", response.data);
            setShowAddLichDatBan(false);
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
        <h2>Thêm Lịch Đặt Bàn</h2>
        <div className="close-btn" onClick={() => setShowAddLichDatBan(false)}>
            <FontAwesomeIcon icon={faXmark} />
        </div>
        </div>
        <div className="popup-inputs">
            <div className={`popup-input ${errors.tenLoai ? "error" : ""}`}>
                <label htmlFor="popup-ten">Số bàn:</label>
                <div>
                    <select
                        name="popup-tenNhaCungCap"
                        id="popup-tenNhaCungCap"
                        value={tenLoai}
                        onChange={(e) => setTenLoai(e.target.value)}
                        >
                        <option value="">Chọn bàn:</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                    </select>
                    <div className="errorText">{errors.tenLoai}</div>
                </div>
                
            </div>
            <div className={`popup-input ${errors.tenLoai ? "error" : ""}`}>
                <label htmlFor="popup-ten">Thời gian:</label>
                <div>
                    <div className="donhang-loc">
                        <input type="time" name="" id="" />
                        <input type="time" name="" id="" />
                    </div>
                    
                    <div className="errorText">{errors.tenLoai}</div>
                </div>
                
            </div>
        </div>
        <button type="submit" disabled={isLoading}>
        {isLoading ? "Đang thêm..." : "Thêm lịch đặt bàn"}
        </button>
    </form>
    </div>
);
};

export default AddLichDatBan;
