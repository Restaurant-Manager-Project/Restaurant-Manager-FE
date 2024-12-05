import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddTaiKhoan.css";

const AddTaiKhoan = ({ setShowAddTaiKhoan }) => {
  // Khai báo state cho các trường
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [quyen, setQuyen] = useState("");
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    gender: true,
  });

  useEffect(() => {
    // Lấy danh sách quyền từ API
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          "https://restaurant-manager-be-f47n.onrender.com/api/roles"
        );
        if (response.data.success) {
          setRoles(response.data.result);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  // Hàm kiểm tra dữ liệu đầu vào
  const validateFormData = () => {
    let validationErrors = {};

    if (username.trim() === "") {
      validationErrors.username = "Vui lòng nhập tên đăng nhập.";
    }

    if (password.trim() === "") {
      validationErrors.password = "Vui lòng nhập mật khẩu.";
    }

    if (quyen === "") {
      validationErrors.quyen = "Vui lòng chọn quyền.";
    }

    Object.entries(employeeData).forEach(([key, value]) => {
      if (value === "" || value === null) {
        validationErrors[key] = `Vui lòng nhập ${key}.`;
      }
    });

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Hàm xử lý submit form
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateFormData()) {
      try {
        const dataToSubmit = {
          ...employeeData,
          accountDTO: {
            username,
            password,
            role_id: parseInt(quyen),
          },
        };

        const response = await axios.post(
          "https://restaurant-manager-be-f47n.onrender.com/api/employees",
          dataToSubmit
        );

        if (response.data.success) {
          alert("Thêm tài khoản thành công!");
          setShowAddTaiKhoan(false);
        } else {
          alert("Đã có lỗi xảy ra khi thêm tài khoản.");
        }
      } catch (error) {
        console.error("Error submitting data:", error);
        alert("Không thể thêm tài khoản. Vui lòng thử lại sau.");
      }
    }
  };

  const handleEmployeeDataChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="popup">
      <form className="popup-container" onSubmit={handleSubmit}>
        <div className="popup-title">
          <h2>Thêm tài khoản</h2>
          <div className="close-btn" onClick={() => setShowAddTaiKhoan(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className="popup-inputs">
          <div className={`popup-input ${errors.firstName ? "error" : ""}`}>
            <label htmlFor="popup-firstName">Họ:</label>
            <input
              type="text"
              id="popup-firstName"
              name="firstName"
              placeholder="Nhập họ..."
              value={employeeData.firstName}
              onChange={handleEmployeeDataChange}
            />
            <div className="errorText">{errors.firstName}</div>
          </div>
          <div className={`popup-input ${errors.lastName ? "error" : ""}`}>
            <label htmlFor="popup-lastName">Tên:</label>
            <input
              type="text"
              id="popup-lastName"
              name="lastName"
              placeholder="Nhập tên..."
              value={employeeData.lastName}
              onChange={handleEmployeeDataChange}
            />
            <div className="errorText">{errors.lastName}</div>
          </div>
          <div className={`popup-input ${errors.phone ? "error" : ""}`}>
            <label htmlFor="popup-phone">Số điện thoại:</label>
            <input
              type="text"
              id="popup-phone"
              name="phone"
              placeholder="Nhập số điện thoại..."
              value={employeeData.phone}
              onChange={handleEmployeeDataChange}
            />
            <div className="errorText">{errors.phone}</div>
          </div>
          <div className={`popup-input ${errors.address ? "error" : ""}`}>
            <label htmlFor="popup-address">Địa chỉ:</label>
            <input
              type="text"
              id="popup-address"
              name="address"
              placeholder="Nhập địa chỉ..."
              value={employeeData.address}
              onChange={handleEmployeeDataChange}
            />
            <div className="errorText">{errors.address}</div>
          </div>
          <div className="popup-input">
            <label htmlFor="popup-gender">Giới tính:</label>
            <select
              name="gender"
              id="popup-gender"
              value={employeeData.gender}
              onChange={(e) =>
                setEmployeeData((prev) => ({
                  ...prev,
                  gender: e.target.value === "true",
                }))
              }
            >
              <option value="true">Nam</option>
              <option value="false">Nữ</option>
            </select>
          </div>
          <div className={`popup-input ${errors.username ? "error" : ""}`}>
            <label htmlFor="popup-username">Tên đăng nhập:</label>
            <input
              type="text"
              id="popup-username"
              placeholder="Nhập tên đăng nhập..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="errorText">{errors.username}</div>
          </div>
          <div className={`popup-input ${errors.password ? "error" : ""}`}>
            <label htmlFor="popup-password">Mật khẩu:</label>
            <input
              type="password"
              id="popup-password"
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="errorText">{errors.password}</div>
          </div>
          <div className={`popup-input ${errors.quyen ? "error" : ""}`}>
            <label htmlFor="popup-quyen">Quyền:</label>
            <select
              name="popup-quyen"
              id="popup-quyen"
              value={quyen}
              onChange={(e) => setQuyen(e.target.value)}
            >
              <option value="">Chọn quyền</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            <div className="errorText">{errors.quyen}</div>
          </div>
        </div>
        <button type="submit">Thêm tài khoản</button>
      </form>
    </div>
  );
};

export default AddTaiKhoan;
