import { faPlus, faSearch, faTrash, faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./TaiKhoan.css";

const TaiKhoan = ({ setShowAddTaiKhoan, setShowEditTaiKhoan }) => {
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://restaurant-manager-be-f47n.onrender.com/api/employees');
        if (response.data.success) {
          setEmployees(response.data.result);
        } else {
          console.error('Error fetching employees:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get('https://restaurant-manager-be-f47n.onrender.com/api/roles');
        if (response.data.success) {
          setRoles(response.data.result);
        } else {
          console.error('Error fetching roles:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchEmployees();
    fetchRoles();
  }, []);

  const getRoleName = (roleId) => {
    const role = roles.find(role => role.id === roleId);
    return role ? role.name : 'Unknown';
  };

  const filteredEmployees = employees.filter(employee =>
    `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hàm chỉnh sửa nhân viên
  const handleEditEmployee = (id) => {
    setShowEditTaiKhoan(id); // Gọi setShowEditTaiKhoan để mở form chỉnh sửa
  };

  // Hàm xóa nhân viên
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa tài khoản này?")) {
      try {
        const response = await axios.delete(`https://restaurant-manager-be-f47n.onrender.com/api/employees/${id}`);
        if (response.data.success) {
          setEmployees(employees.filter(employee => employee.id !== id)); // Cập nhật lại danh sách nhân viên
          alert("Xóa tài khoản thành công.");
        } else {
          console.error('Error deleting employee:', response.data.message);
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="timkiem">
          <input
            className='input-timkiem'
            type="text"
            placeholder="Tìm kiếm tài khoản..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className="faSearch"></FontAwesomeIcon>
        </div>
        <button className='btn-them' onClick={() => setShowAddTaiKhoan(true)}>
          <FontAwesomeIcon icon={faPlus} /> Thêm
        </button>
      </div>
      <div className="taikhoan-content-title content-title title">
        <p>STT</p>
        <p>Họ tên</p>
        <p>Số điện thoại</p>
        <p>Địa chỉ</p>
        <p>Role</p>
        <p>Hành động</p>
      </div>
      <div className="content">
        {filteredEmployees.map((employee, index) => (
          <div key={employee.id} className="taikhoan-content-title content-title content-item">
            <p>{index + 1}</p>
            <p>{`${employee.firstName} ${employee.lastName}`}</p>
            <p>{employee.phone}</p>
            <p>{employee.address}</p>
            <p>{getRoleName(employee.accountDTO.role_id)}</p>
            <p className='btn'>
              <div className="btn-container">
                <button className='btn-edit' onClick={() => handleEditEmployee(employee.id)}>
                  <FontAwesomeIcon icon={faWrench} />
                </button>
                <span className='tooltip'>Chỉnh sửa</span>
              </div>
              <div className="btn-container">
                <button className='btn-remove' onClick={() => handleDelete(employee.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <span className='tooltip'>Xóa</span>
              </div>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaiKhoan;
