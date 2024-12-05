import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './EditTableStatusPopup.css';

const EditTableStatusPopup = ({ table, onClose, onUpdate }) => {
  const [newStatusId, setNewStatusId] = useState(table.statusId);

  const handleStatusChange = (event) => {
    setNewStatusId(event.target.value);
  };

  const handleConfirmChange = async () => {
    try {
      const response = await axios.put(`https://restaurant-manager-be-f47n.onrender.com/api/table/${table.id}/status`, null, {
        params: { statusID: newStatusId }
      });
      if (response.data.success) {
        onUpdate(table.id, newStatusId);
        onClose();
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error updating table status:', error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-container">
        <div className="popup-title">
          <h2>Chỉnh sửa trạng thái bàn</h2>
          <div className="close-btn" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className="popup-inputs">
          <div className="popup-input">
            <label htmlFor="popup-tableName">Tên bàn:</label>
            <input type="text" id="popup-tableName" value={table.name} disabled />
          </div>
          <div className="popup-input">
            <label htmlFor="popup-status">Trạng thái:</label>
            <select id="popup-status" value={newStatusId} onChange={handleStatusChange}>
              <option value="1">Còn trống</option>
              <option value="2">Đang sử dụng</option>
              <option value="3">Đã đặt trước</option>
            </select>
          </div>
        </div>
        <div className="btn-group">
          <button type="button" onClick={handleConfirmChange}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTableStatusPopup;