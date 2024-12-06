import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AddNhaCungCap.css";

const AddNhaCungCap = ({ setShowAddNhaCungCap }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [suppliers, setSuppliers] = useState([]);

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

      const newSupplier = {
        name,
        address,
        phone
      };

      try {
        const response = await axios.post(
          "https://restaurant-manager-be-f47n.onrender.com/api/suppliers",
          newSupplier
        );
        if (response.data.success) {
          alert("Thêm nhà cung cấp thành công:");
          setShowAddNhaCungCap(false);
          setRefresh((prev) => !prev);
        } else {
          console.error("Error adding supplier:", response.data.message);
        }
      } catch (error) {
        console.error("Error adding supplier:", error);
      }

      setIsLoading(false);
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
          {isLoading ? "Đang thêm..." : "Thêm nhà cung cấp"}
        </button>
      </form>
    </div>
  );
};

export default AddNhaCungCap;
