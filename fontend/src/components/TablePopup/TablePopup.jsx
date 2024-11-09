import React from 'react';
import "./TablePopup.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTablet } from '@fortawesome/free-solid-svg-icons';

const TablePopup = () => {
  const tables = [
    { id: 1, name: 'Bàn 1', status: 'available' },
    { id: 2, name: 'Bàn 2', status: 'occupied' },
    { id: 3, name: 'Bàn 3', status: 'available' },
    { id: 4, name: 'Bàn 4', status: 'occupied' },
    { id: 5, name: 'Bàn 5', status: 'available' },
    { id: 6, name: 'Bàn 6', status: 'occupied' },
    { id: 7, name: 'Bàn 7', status: 'available' },
    { id: 8, name: 'Bàn 8', status: 'available' },
    { id: 9, name: 'Bàn 9', status: 'available' },
    { id: 10, name: 'Bàn 10', status: 'available' },
    { id: 11, name: 'Bàn 11', status: 'available' },
    { id: 12, name: 'Bàn 12', status: 'available' },
    { id: 13, name: 'Bàn 13', status: 'available' },
    { id: 14, name: 'Bàn 14', status: 'available' },
    { id: 15, name: 'Bàn 15', status: 'available' },
    { id: 16, name: 'Bàn 16', status: 'available' },
    { id: 17, name: 'Bàn 17', status: 'available' },
    { id: 18, name: 'Bàn 18', status: 'available' },
    { id: 19, name: 'Bàn 19', status: 'available' },
    { id: 20, name: 'Bàn 20', status: 'available' }
  ];

  return (
    <div className="table-popup">
      <h2>Sơ đồ nhà hàng</h2>
      <p>Chọn bàn để thêm đơn hàng (bàn xanh là bàn trống)</p>
      <div className="table-layout">
        {tables.map((table) => (
          <div key={table.id} className={`table ${table.status}`}>
            <FontAwesomeIcon icon={faTablet} />
            <p>{table.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablePopup;