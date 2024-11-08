import './Ban.css'
import '../../dungchung.css'
import { faPlus, faEdit, faTrash, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Routes, Route } from'react-router-dom'
import LichDatBan from '../../components/LichDatBan/LichDatBan'

const Ban = () => {
    const [tables, setTables] = useState([
        { id: 1, name: 'Bàn 1', quanlity: '4', status: 'Trống' },
        { id: 2, name: 'Bàn 2', quanlity: '4', status: 'Đang sử dụng' },
        { id: 3, name: 'Bàn 3', quanlity: '4', status: 'Đã đặt trước' },
        { id: 4, name: 'Bàn 4', quanlity: '4', status: 'Trống' },
        { id: 5, name: 'Bàn 5', quanlity: '4', status: 'Đang sử dụng' },
        { id: 6, name: 'Bàn 6', quanlity: '4', status: 'Trống' },
        { id: 7, name: 'Bàn 7', quanlity: '4', status: 'Trống' },
        { id: 8, name: 'Bàn 8', quanlity: '4', status: 'Đang sử dụng' },
        // Thêm các bàn khác nếu cần
    ]);

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
                <button className="btn-them">
                    <FontAwesomeIcon icon={faPlus} /> Thêm bàn mới
                </button>
            </div>
            <div className="content">
                <div className="table-grid">
                    {tables.map((table) => (
                        <div key={table.id} className={`table-item ${table.status.toLowerCase().replace(' ', '-')}`}>
                            <h3>{table.name}</h3>
                            <p><FontAwesomeIcon icon={faUsers} /> {table.quanlity}</p>
                            <p>{table.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Ban
