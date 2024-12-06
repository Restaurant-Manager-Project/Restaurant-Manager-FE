import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditTaiKhoan.css";

const EditTaiKhoan = ({ setShowEditTaiKhoan, id }) => {
  const [quyen, setQuyen] = useState("");
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Lấy danh sách quyền từ API
    const fetchRoles = async () => {
      try {
        const response = await axios.get("https://restaurant-manager-be-f47n.onrender.com/api/roles");
        if (response.data.success) {
          setRoles(response.data.result);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    // Lấy danh sách nhân viên và tìm nhân viên theo ID
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get("https://restaurant-manager-be-f47n.onrender.com/api/employees");
        if (response.data.success) {
          const employees = response.data.result;
          const employee = employees.find((emp) => emp.id === id);
          if (employee) {
            setFirstName(employee.firstName);
            setLastName(employee.lastName);
            setPhone(employee.phone);
            setAddress(employee.address);
            setGender(employee.gender);
            setUsername(employee.accountDTO.username);
            setPassword(employee.accountDTO.password);
            setQuyen(employee.accountDTO.role_id.toString());
          } else {
            console.error("Employee not found with ID:", id);
          }
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchRoles();
    fetchEmployeeDetails();
  }, [id]);


  // Hàm kiểm tra dữ liệu đầu vào
  const validateFormData = () => {
    let validationErrors = {};

    if (quyen === "") {
      validationErrors.quyen = "Vui lòng chọn quyền.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Hàm xử lý submit form
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateFormData()) {
      try {
        const dataToSubmit = {
          firstName,
          lastName,
          phone,
          address,
          gender,
          accountDTO: {
            username,
            password,
            role_id: parseInt(quyen),
          },
        };

        const response = await axios.put(
          `https://restaurant-manager-be-f47n.onrender.com/api/employee/${id}`,
          dataToSubmit
        );

        if (response.data.success) {
          alert("Cập nhật quyền thành công!");
          setShowEditTaiKhoan(false);
        } else {
          alert("Đã có lỗi xảy ra khi cập nhật quyền.");
        }
      } catch (error) {
        console.error("Error submitting data:", error);
        alert("Không thể cập nhật quyền. Vui lòng thử lại sau.");
      }
    }
  };

  return (
    <div className="popup">
      <form className="popup-container" onSubmit={handleSubmit}>
        <div className="popup-title">
          <h2>Chỉnh sửa quyền của nhân viên</h2>
          <div className="close-btn" onClick={() => setShowEditTaiKhoan(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className="popup-inputs">
          <div className={`popup-input ${errors.quyen ? "error" : ""}`}>
            <label htmlFor="popup-quyen">Quyền:</label>
            <div>
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
          <div className="popup-input">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="popup-input">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="popup-input">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="popup-input">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="popup-input">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value === "true")}
            >
              <option value="true">Male</option>
              <option value="false">Female</option>
            </select>
          </div>
          <div className="popup-input">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="popup-input">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Chỉnh sửa</button>
      </form>
    </div>
  );
};

export default EditTaiKhoan;