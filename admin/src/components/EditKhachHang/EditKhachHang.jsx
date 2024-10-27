import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./EditKhachHang.css";

const EditKhachHang = ({ setShowEditKhachHang }) => {
  return (
    <div className="popup">
      <form className="popup-container">
        <div className="popup-title">
          <h2>Chỉnh sửa khách hàng</h2>
          <div
            className="close-btn"
            onClick={() => setShowEditKhachHang(false)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className="popup-inputs">
          <div className="popup-input">
            <label htmlFor="popup-ten">Tên khách hàng:</label>
            <input
              type="text"
              id="popup-ten"
              placeholder="Nhập tên khách hàng..."
              disabled
            />
          </div>
          <div className="popup-input">
            <label htmlFor="popup-sodienthoai">Số điện thoại:</label>
            <input
              type="tel"
              id="popup-sodienthoai"
              placeholder="Nhập số điện thoại..."
              disabled
            />
          </div>
          <div className="popup-input">
            <label htmlFor="popup-maKhuyenMai">
              Mã khuyến mãi có thể sử dụng:
            </label>
            <select name="popup-maKhuyenMai" id="popup-maKhuyenMai">
              <option value="">Chọn mã khuyến mãi</option>
              <option value="1">Mã 1</option>
              <option value="2">Mã 2</option>
              <option value="3">Mã 3</option>
              <option value="4">Mã 4</option>
              <option value="5">Mã 5</option>
              <option value="6">Mã 6</option>
              <option value="7">Mã 7</option>
              <option value="8">Mã 8</option>
              <option value="9">Mã 9</option>
              <option value="10">Mã 10</option>
            </select>
          </div>
        </div>
        <button>Chỉnh sửa khách hàng</button>
      </form>
    </div>
  );
};

export default EditKhachHang;
