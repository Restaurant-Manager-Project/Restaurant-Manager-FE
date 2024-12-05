import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faWrench, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import './PhieuNhap.css';

const PhieuNhap = ({ setShowAddPhieuNhap }) => {
    const [imports, setImports] = useState([]);
    const [filteredImports, setFilteredImports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchImports = async () => {
            try {
                const response = await axios.get('https://restaurant-manager-be-f47n.onrender.com/api/imports');
                if (response.data.success) {
                    setImports(response.data.result);
                    setFilteredImports(response.data.result);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Error fetching imports');
            } finally {
                setIsLoading(false);
            }
        };

        fetchImports();
    }, []);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('vi-VN', {
            timeZone: 'Asia/Ho_Chi_Minh',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        filterImports(event.target.value, startDate, endDate);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
        filterImports(searchTerm, event.target.value, endDate);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
        filterImports(searchTerm, startDate, event.target.value);
    };

    const filterImports = (searchTerm, startDate, endDate) => {
        let filtered = imports;

        if (searchTerm) {
            filtered = filtered.filter(importItem =>
                importItem.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (startDate) {
            filtered = filtered.filter(importItem =>
                new Date(importItem.dateCreate) >= new Date(startDate)
            );
        }

        if (endDate) {
            filtered = filtered.filter(importItem =>
                new Date(importItem.dateCreate) <= new Date(endDate)
            );
        }

        setFilteredImports(filtered);
    };

    if (isLoading) {
        return (
            <div className="loader">
                <div id="page">
                    <div id="container">
                        <div id="ring"></div>
                        <div id="ring"></div>
                        <div id="ring"></div>
                        <div id="ring"></div>
                        <div id="h3"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container">
            <div className="header">
                <div className="timkiem">
                    <input
                        className="input-timkiem"
                        type="text"
                        placeholder="Tìm kiếm phiếu nhập..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <FontAwesomeIcon icon={faSearch} className="faSearch"></FontAwesomeIcon>
                </div>
                <div className="loc-ngay">
                    <label>Từ ngày: </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                    <label>Đến ngày: </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                </div>
                <button className="btn-them" onClick={() => setShowAddPhieuNhap(true)}>
                    <FontAwesomeIcon icon={faPlus} /> Thêm
                </button>
            </div>
            <div className="phieunhap-content-title content-title title">
                <p>STT</p>
                <p>Nhà cung cấp</p>
                <p>Ngày tạo</p>
                <p>Tổng tiền</p>
                <p>Hành động</p>
            </div>
            <div className="content">
                {filteredImports.map((importItem, index) => (
                    <div key={importItem.id} className="phieunhap-content-title content-title content-item">
                        <p>{index + 1}</p>
                        <p>{importItem.supplierName}</p>
                        <p>{formatDate(importItem.dateCreate)}</p>
                        <p>{importItem.total.toLocaleString()}đ</p>
                        <p className="btn">
                            <div className="btn-container">
                                <button
                                    className="btn-edit"
                                >
                                    <FontAwesomeIcon icon={faWrench} />
                                </button>
                                <span className="tooltip">Chỉnh sửa</span>
                            </div>
                            <div className="btn-container">
                                <button
                                    className="btn-remove"
                                    onClick={() => confirm("Xóa sản phẩm")}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                <span className="tooltip">Xóa</span>
                            </div>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhieuNhap;