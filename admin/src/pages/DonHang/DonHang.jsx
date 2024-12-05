import React, { useState, useEffect } from "react";
import "../../dungchung.css";
import "./DonHang.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const DonHang = ({ setShowChiTietDonHang, setSelectedOrderId }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://restaurant-manager-be-f47n.onrender.com/api/orders/');
        if (response.data.success) {
          setOrders(response.data.result);
          setFilteredOrders(response.data.result);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError('Error fetching orders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    filterOrders(event.target.value, startDate, endDate);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    filterOrders(searchTerm, event.target.value, endDate);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    filterOrders(searchTerm, startDate, event.target.value);
  };

  const filterOrders = (searchTerm, startDate, endDate) => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.nameTable.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (startDate) {
      filtered = filtered.filter(order =>
        new Date(order.dateCreate) >= new Date(startDate)
      );
    }

    if (endDate) {
      filtered = filtered.filter(order =>
        new Date(order.dateCreate) <= new Date(endDate)
      );
    }

    setFilteredOrders(filtered);
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
            placeholder="Tìm kiếm đơn hàng..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <FontAwesomeIcon icon={faSearch} className="faSearch"></FontAwesomeIcon>
        </div>
        <div className="donhang-loc">
          <p>Từ ngày </p>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
          <p>Đến ngày </p>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
          />
          <button onClick={() => filterOrders(searchTerm, startDate, endDate)}>Lọc</button>
        </div>
      </div>
      <div className="donhang-content-title content-title title">
        <p>STT</p>
        <p>ID Đơn</p>
        <p>Bàn</p>
        <p>Tổng tiền</p>
        <p>Trạng thái</p>
        <p>Hành động</p>
      </div>
      <div className="content">
        {filteredOrders.map((order, index) => (
          <div key={order.orderId} className="donhang-content-title content-title content-item">
            <p>{index + 1}</p>
            <p>{order.orderId}</p>
            <p>{order.nameTable}</p>
            <p>{order.total.toLocaleString()}đ</p>
            <p>{order.processName}</p>
            <button onClick={() => { setSelectedOrderId(order.orderId); setShowChiTietDonHang(true); }}>Chi tiết</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonHang;