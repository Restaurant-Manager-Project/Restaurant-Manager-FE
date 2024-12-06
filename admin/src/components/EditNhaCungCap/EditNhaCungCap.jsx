import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./EditNhaCungCap.css";

const EditNhaCungCap = ({ setShowEditNhaCungCap, supplier }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

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
        validationErrors.phone =
          "Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số.";
      }
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(
          "https://restaurant-manager-be-f47n.onrender.com/api/suppliers"
        );
        if (response.data.success) {
          setSuppliers(response.data.result);
        } else {
          setErrors("Error fetching suppliers");
        }
      } catch (error) {
        setErrors("Error fetching suppliers");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuppliers();
  }, [refresh]);

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
        const response = await axios.put(
          `https://restaurant-manager-be-f47n.onrender.com/api/supplier/${supplier.id}`,
          updatedSupplier
        );
        if (response.data.success) {
          alert("Chỉnh sửa nhà cung cấp thành công");
          setRefresh((prev) => !prev);
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
          <div
            className="close-btn"
            onClick={() => setShowEditNhaCungCap(false)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className="popup-inputs">
          <div className={`popup-input ${errors.name ? "errorClass" : ""}`}>
            <label htmlFor="popup-name">Tên nhà cung cấp:</label>
            <div>
              <input
                type="text"
                id="popup-name"
                placeholder="Nhập tên nhà cung cấp..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="errorText">{errors.name}</div>
            </div>
          </div>
          <div className={`popup-input ${errors.address ? "errorClass" : ""}`}>
            <label htmlFor="popup-address">Địa chỉ:</label>
            <div>
              <input
                type="text"
                id="popup-address"
                placeholder="Nhập địa chỉ..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <div className="errorText">{errors.address}</div>
            </div>
          </div>
          <div className={`popup-input ${errors.phone ? "errorClass" : ""}`}>
            <label htmlFor="popup-phone">Số điện thoại:</label>
            <div>
              <input
                type="text"
                id="popup-phone"
                placeholder="Nhập số điện thoại..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div className="errorText">{errors.phone}</div>
            </div>
          </div>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Đang chỉnh sửa..." : "Chỉnh sửa nhà cung cấp"}
        </button>
      </form>
    </div>
  );
};

export default EditNhaCungCap;
