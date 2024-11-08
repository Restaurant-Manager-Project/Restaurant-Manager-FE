import React from "react";
import "../../dungchung.css";
import "./DonHang.css";

const DonHang = ({ setShowChiTietDonHang }) => {
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
        <div className="donhang-content-title content-title content-item">
          <p>1</p>
          <p>DH001</p>
          <p>B01</p>
          <p>150,000đ</p>
          <p>Đã xác nhận</p>
          <button onClick={() => setShowChiTietDonHang(true)}>Chi tiết</button>
        </div>
        <div className="donhang-content-title content-title content-item">
          <p>2</p>
          <p>DH002</p>
          <p>B02</p>
          <p>200,000đ</p>
          <p>Đã xác nhận</p>
          <button>Chi tiết</button>
        </div>
        <div className="donhang-content-title content-title content-item">
          <p>2</p>
          <p>DH002</p>
          <p>B02</p>
          <p>200,000đ</p>
          <p>Đã xác nhận</p>
          <button>Chi tiết</button>
        </div>
      </div>
    </div>
  );
};

export default DonHang;
