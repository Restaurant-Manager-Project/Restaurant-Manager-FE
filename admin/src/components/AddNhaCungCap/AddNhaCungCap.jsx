import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./AddNhaCungCap.css";

const AddNhaCungCap = ({ setShowAddNhaCungCap }) => {
  return (
    <div className="popup">
      <form className="popup-container">
        <div className="popup-title">
          <h2>Thêm nhà cung cấp</h2>
          <div
            className="close-btn"
            onClick={() => setShowAddNhaCungCap(false)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className="popup-inputs">
          <div className="popup-input">
            <label htmlFor="popup-ten">Tên nhà cung cấp:</label>
            <input
              type="text"
              id="popup-ten"
              placeholder="Nhập tên nhà cung cấp..."
              required
            />
          </div>
          <div className="popup-input">
            <label htmlFor="popup-sodienthoai">Số điện thoại:</label>
            <input
              type="tel"
              id="popup-sodienthoai"
              placeholder="Nhập số điện thoại..."
              required
            />
          </div>
        </div>
        <button>Thêm nhà cung cấp</button>
      </form>
    </div>
  );
};

export default AddNhaCungCap;
