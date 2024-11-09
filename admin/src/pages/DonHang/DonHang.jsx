import React from "react";
import "../../dungchung.css";
import "./DonHang.css";
import axios from "axios";
import { useState, useEffect } from "react";

const DonHang = ({ setShowChiTietDonHang }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://restaurant-manager-be-1.onrender.com/api/orders/');
        if (response.data.success) {
          setOrders(response.data.result);
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

  if (isLoading) {
    return <div>Loading...</div>;
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
          />
          <button className="btn-timkiem">Tìm kiếm</button>
        </div>
        <div className="donhang-loc">
          <p>Từ ngày </p>
          <input type="date" />
          <p>Dến ngày </p>
          <input type="date" />
          <button>Lọc</button>
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
      {orders.map((order, index) => (
                    <div key={order.orderId} className="donhang-content-title content-title content-item">
                        <p>{index + 1}</p>
                        <p>{order.orderId}</p>
                        <p>{order.nameTable}</p>
                        <p>{order.total.toLocaleString()}đ</p>
                        <p>{order.processName}</p>
                        <button>Chi tiết</button>
                    </div>
                ))}
      </div>
    </div>
  );
};

export default DonHang;
