import React, { useState, useEffect } from 'react';
import "./TablePopup.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTablet, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const TablePopup = () => {
  const [tables, setTables] = useState([]);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('https://restaurant-manager-be-f47n.onrender.com/api/tables');
        if (response.data.success) {
          // Sắp xếp bàn theo id tăng dần
          const sortedTables = response.data.result.sort((a, b) => a.id - b.id);
          setTables(sortedTables);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };

    fetchTables();
  }, []);

  const getStatusClass = (statusId) => {
    switch (statusId) {
      case '1':
        return 'trống';
      case '2':
        return 'đang-sử';
      case '3':
        return 'đã-đặt';
      default:
        return '';
    }
  };

  const handleTableClick = async (tableId) => {
    try {
      const response = await axios.get(`https://restaurant-manager-be-f47n.onrender.com/api/tables/${tableId}/qrcode`);
      if (response.data.success) {
        setQrCodeUrl(response.data.result);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching QR code:', error);
    }
  };

  const handleCloseQrCode = () => {
    setQrCodeUrl('');
  };

  return (
    <div className="table-popup">
      <h2>Sơ đồ nhà hàng</h2>
      <p>Chọn bàn để thêm đơn hàng (bàn xanh là bàn trống)</p>
      <div className="table-layout">
        {tables.map((table) => (
          <div key={table.id} className={`table ${getStatusClass(table.statusId)}`} onClick={() => handleTableClick(table.id)}>
            <FontAwesomeIcon icon={faTablet} />
            <p>{table.name}</p>
            <p>{table.statusName}</p>
          </div>
        ))}
        {qrCodeUrl && (
        <div className="qr-code">
          <FontAwesomeIcon icon={faXmark} className="close-btn" onClick={handleCloseQrCode} />
          <h3>Mã QR của bàn</h3>
          <img src={qrCodeUrl} alt="QR Code" />
        </div>
      )}
      </div>
    </div>
  );
};

export default TablePopup;