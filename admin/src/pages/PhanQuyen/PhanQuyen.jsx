import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faWrench, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './PhanQuyen.css';

const PhanQuyen = () => {
  const [showAddQuyen, setShowAddQuyen] = useState(false);
  const [showEditQuyen, setShowEditQuyen] = useState(false);
  const [quyenData, setQuyenData] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [newQuyen, setNewQuyen] = useState({ name: '', permissions: [] });
  const [editQuyen, setEditQuyen] = useState({ id: '', name: '', permissions: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [refresh, setRefresh] = useState(false); // State to trigger refresh
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchQuyenData = async () => {
      try {
        const response = await axios.get('https://restaurant-manager-be-f47n.onrender.com/api/roles');
        if (response.data.success) {
          setQuyenData(response.data.result);
        }
      } catch (error) {
        console.error('Error fetching quyen data:', error);
      }
    };

    const fetchPermissions = async () => {
      try {
        const response = await axios.get('https://restaurant-manager-be-f47n.onrender.com/api/permission');
        if (response.data.success) {
          setPermissions(response.data.result);
        }
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

    fetchQuyenData();
    fetchPermissions();
  }, [refresh]); // Add refresh as a dependency

  const validateQuyenData = (quyen) => {
    let validationErrors = {};

    if (quyen.name.trim() === "") {
      validationErrors.name = "Tên quyền không được để trống.";
    }

    if (quyen.permissions.length === 0) {
      validationErrors.permissions = "Phải chọn ít nhất một chức năng.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleAddQuyen = async () => {
    if (!validateQuyenData(newQuyen)) {
      return;
    }

    const newQuyenData = {
      name: newQuyen.name,
      permissions: newQuyen.permissions
    };

    try {
      const response = await axios.post('https://restaurant-manager-be-f47n.onrender.com/api/roles', newQuyenData);
      if (response.data.success) {
        alert('Thêm quyền thành công');
        setShowAddQuyen(false);
        setNewQuyen({ name: '', permissions: [] });
        setRefresh(prev => !prev); // Trigger refresh
      } else {
        console.error('Error adding quyen:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding quyen:', error);
    }
  };

  const handleEditQuyen = async () => {
    if (!validateQuyenData(editQuyen)) {
      return;
    }

    const editQuyenData = {
      name: editQuyen.name,
      permissions: editQuyen.permissions
    };

    try {
      const response = await axios.put(`https://restaurant-manager-be-f47n.onrender.com/api/roles/${editQuyen.id}`, editQuyenData);
      if (response.data.success) {
        alert('Chỉnh sửa quyền thành công');
        setShowEditQuyen(false);
        setEditQuyen({ id: '', name: '', permissions: [] });
        setRefresh(prev => !prev); // Trigger refresh
      } else {
        console.error('Error editing quyen:', response.data.message);
      }
    } catch (error) {
      console.error('Error editing quyen:', error);
    }
  };

  const handlePermissionChange = (event, isEdit = false) => {
    const { value, checked } = event.target;
    if (isEdit) {
      setEditQuyen(prevState => {
        if (checked) {
          return { ...prevState, permissions: [...prevState.permissions, value] };
        } else {
          return { ...prevState, permissions: prevState.permissions.filter(permission => permission !== value) };
        }
      });
    } else {
      setNewQuyen(prevState => {
        if (checked) {
          return { ...prevState, permissions: [...prevState.permissions, value] };
        } else {
          return { ...prevState, permissions: prevState.permissions.filter(permission => permission !== value) };
        }
      });
    }
  };

  const filteredQuyenData = quyenData.filter(quyen =>
    quyen && quyen.name && quyen.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="header">
        <div className="timkiem">
          <input
            className='input-timkiem'
            type="text"
            placeholder="Tìm kiếm quyền..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className="faSearch" />
        </div>
        <button className='btn-them' onClick={() => setShowAddQuyen(true)}>
          <FontAwesomeIcon icon={faPlus} /> Thêm
        </button>
      </div>
      <div className="quyen-content-title content-title title">
        <p>ID</p>
        <p>Tên quyền</p>
        <p>Hành động</p>
      </div>
      <div className="content">
        {filteredQuyenData.map((quyen, index) => (
          <div key={quyen.id} className="quyen-content-title content-title content-item">
            <p>{index + 1}</p>
            <p>{quyen.name}</p>
            <p className='btn'>
              <div className="btn-container">
                <button className='btn-edit' onClick={() => {
                  setEditQuyen(quyen);
                  setShowEditQuyen(true);
                }}>
                  <FontAwesomeIcon icon={faWrench} />
                </button>
                <span className='tooltip'>Chỉnh sửa</span>
              </div>
              <div className="btn-container">
                <button className='btn-remove' onClick={() => handleDelete(quyen.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <span className='tooltip'>Xóa</span>
              </div>
            </p>
          </div>
        ))}
      </div>

      {showAddQuyen && (
        <div className="modal-permission" onClick={() => setShowAddQuyen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setShowAddQuyen(false)}>&times;</span>
            <h2>Thêm quyền</h2>
            <div className="form-group">
              <label htmlFor="quyen-name">Tên quyền:</label>
              <input
                type="text"
                id="quyen-name"
                value={newQuyen.name}
                onChange={(e) => setNewQuyen({ ...newQuyen, name: e.target.value })}
              />
              {errors.name && <div className="errorText">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label>Các chức năng:</label>
              <div className="form-checks">
                {permissions.map(permission => (
                  <div key={permission.id} className="form-check">
                    <input
                      type="checkbox"
                      id={permission.key}
                      value={permission.key}
                      checked={newQuyen.permissions.includes(permission.key)}
                      onChange={(e) => handlePermissionChange(e)}
                    />
                    <label htmlFor={permission.key}>{permission.name}</label>
                  </div>
                ))}
              </div>
              {errors.permissions && <div className="errorText">{errors.permissions}</div>}
            </div>
            <button className="btn-submit" onClick={handleAddQuyen}>Thêm</button>
          </div>
        </div>
      )}

      {showEditQuyen && (
        <div className="modal-permission" onClick={() => setShowEditQuyen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setShowEditQuyen(false)}>&times;</span>
            <h2>Chỉnh sửa quyền</h2>
            <div className="form-group">
              <label htmlFor="edit-quyen-name">Tên quyền:</label>
              <input
                type="text"
                id="edit-quyen-name"
                value={editQuyen.name}
                onChange={(e) => setEditQuyen({ ...editQuyen, name: e.target.value })}
              />
              {errors.name && <div className="errorText">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label>Các chức năng:</label>
              <div className="form-checks">
                {permissions.map(permission => (
                  <div key={permission.id} className="form-check">
                    <input
                      type="checkbox"
                      id={`edit-${permission.key}`}
                      value={permission.key}
                      checked={editQuyen.permissions.includes(permission.key)}
                      onChange={(e) => handlePermissionChange(e, true)}
                    />
                    <label htmlFor={`edit-${permission.key}`}>{permission.name}</label>
                  </div>
                ))}
              </div>
              {errors.permissions && <div className="errorText">{errors.permissions}</div>}
            </div>
            <button className="btn-submit" onClick={handleEditQuyen}>Lưu</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhanQuyen;