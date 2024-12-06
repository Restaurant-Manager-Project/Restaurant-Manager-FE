import './Ban.css'
import '../../dungchung.css'
import { faPlus, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import EditTableStatusPopup from '../../components/EditTableStatusPopup/EditTableStatusPopup'

const Ban = ({ setShowAddBan }) => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [refresh, setRefresh] = useState(false); // State để theo dõi các thay đổi

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('https://restaurant-manager-be-f47n.onrender.com/api/tables');
        if (response.data.success) {
          setTables(response.data.result.sort((a, b) => a.id - b.id)); // Sắp xếp theo id bàn
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };

    fetchTables();
  }, [refresh]); // Gọi lại API khi refresh thay đổi

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

  const handleTableClick = (table) => {
    setSelectedTable(table);
  };

  const handleClosePopup = () => {
    setSelectedTable(null);
  };

  const handleUpdateTableStatus = (tableId, newStatusId) => {
    setTables(prevTables =>
      prevTables.map(table =>
        table.id === tableId ? { ...table, statusId: newStatusId } : table
      )
    );
    setRefresh(!refresh); // Cập nhật state để load lại API
  };

  return (
    <div className="container">
      <div className="header">
        <ul className="table-options">
          <NavLink to='/Ban'>
            <li className='open'>Quản lý bàn</li>
          </NavLink>
          <NavLink to='/Ban/LichDatBan'>
            <li>Lịch đặt bàn</li>
          </NavLink>
        </ul>
        <button className="btn-them" onClick={() => setShowAddBan(true)}>
          <FontAwesomeIcon icon={faPlus} /> Thêm bàn mới
        </button>
      </div>
      <div className="content">
        <div className="table-grid">
          {tables.map((table) => (
            <div key={table.id} className={`table-item ${getStatusClass(table.statusId)}`} onClick={() => handleTableClick(table)}>
              <h3>{table.name}</h3>
              <p><FontAwesomeIcon icon={faUsers} /> 4</p> {/* Giả sử mỗi bàn có 4 chỗ ngồi */}
              <p>{table.statusName}</p>
            </div>
          ))}
        </div>
      </div>
      {selectedTable && (
        <EditTableStatusPopup
          table={selectedTable}
          onClose={handleClosePopup}
          onUpdate={handleUpdateTableStatus}
        />
      )}
    </div>
  )
}

export default Ban