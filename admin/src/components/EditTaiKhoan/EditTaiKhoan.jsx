import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditTaiKhoan.css";

const EditTaiKhoan = ({ setShowEditTaiKhoan }) => {
  const [quyen, setQuyen] = useState("");
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});

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

    fetchRoles();
  }, []);

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
          role_id: parseInt(quyen),
        };

        const response = await axios.put(
          "https://restaurant-manager-be-f47n.onrender.com/api/users/role",
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
        </div>
        <button type="submit">Chỉnh sửa</button>
      </form>
    </div>
  );
};

export default EditTaiKhoan;
