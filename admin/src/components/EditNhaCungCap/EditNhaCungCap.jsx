import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditNhaCungCap.css";

const EditNhaCungCap = ({ setShowEditNhaCungCap, supplier }) => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (supplier) {
            setName(supplier.name || "");
            setAddress(supplier.address || "");
            setPhone(supplier.phone || "");
        }
    }, [supplier]);

    const validateFormData = () => {
        let validationErrors = {};

        if (name.trim() === "") {
            validationErrors.name = "Vui lòng nhập tên nhà cung cấp.";
        }

        if (address.trim() === "") {
            validationErrors.address = "Vui lòng nhập địa chỉ.";
        }

        if (phone.trim() === "") {
            validationErrors.phone = "Vui lòng nhập số điện thoại.";
        } else {
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone)) {
                validationErrors.phone = "Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số.";
            }
        }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateFormData()) {
            setIsLoading(true);

            const updatedSupplier = {
                name,
                address,
                phone
            };

            try {
                const response = await axios.put(`https://restaurant-manager-be-1.onrender.com/api/supplier/${supplier.id}`, updatedSupplier);
                if (response.data.success) {
                    console.log("Chỉnh sửa nhà cung cấp thành công:", response.data);
                    setShowEditNhaCungCap(false);
                } else {
                    console.error("Error updating supplier:", response.data.message);
                }
            } catch (error) {
                console.error("Error updating supplier:", error);
            }

            setIsLoading(false);
        }
    };

    return (
        <div className="popup">
            <form className="popup-container" onSubmit={handleSubmit}>
                <div className="popup-title">
                    <h2>Chỉnh sửa nhà cung cấp</h2>
                    <div className="close-btn" onClick={() => setShowEditNhaCungCap(false)}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </div>
                <div className="popup-inputs">
                    <div className={`popup-input ${errors.name ? "error" : ""}`}>
                        <label htmlFor="popup-name">Tên nhà cung cấp:</label>
                        <input
                            type="text"
                            id="popup-name"
                            placeholder="Nhập tên nhà cung cấp..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className="error">{errors.name}</div>
                    </div>
                    <div className={`popup-input ${errors.address ? "error" : ""}`}>
                        <label htmlFor="popup-address">Địa chỉ:</label>
                        <input
                            type="text"
                            id="popup-address"
                            placeholder="Nhập địa chỉ..."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <div className="error">{errors.address}</div>
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
                    {isLoading ? "Đang chỉnh sửa..." : "Chỉnh sửa nhà cung cấp"}
                </button>
            </form>
        </div>
        <div className="popup-inputs">
          <div className="popup-input">
            <label htmlFor="popup-ten">Tên nhà cung cấp:</label>
            <input
              type="text"
              id="popup-ten"
              placeholder="Tên nhà cung cấp..."
              disabled
            />
            <div className="errorText"></div>
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
            <div className="errorText">{errors.soDienThoai}</div>
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
            <div className="errorText">{errors.diaChi}</div>
          </div>
        </div>
        <button type="submit">Chỉnh sửa nhà cung cấp</button>
      </form>
    </div>
  );
};

export default EditNhaCungCap;