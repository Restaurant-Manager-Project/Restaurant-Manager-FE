import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { assets } from "../../assets/assets";
import "./AddSanPham.css";

function AddSanPham({ setShowAddSanPham }) {
  return (
    <div className="popup">
      <form className="popup-container">
        <div className="popup-title">
          <h2>Thêm món ăn</h2>
          <div className="close-btn" onClick={() => setShowAddSanPham(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className="popup-inputs">
          <div className="popup-input">
            <label htmlFor="popup-ten">Tên món ăn:</label>
            <input
              type="text"
              id="popup-ten"
              placeholder="Nhập tên món ăn..."
              required
            />
          </div>
          <div className="popup-input">
            <label htmlFor="popup-loai">Loại:</label>
            <select name="popup-loai" id="popup-loai">
              <option value="">Chọn loại món ăn</option>
              <option value="1">Món ��n</option>
              <option value="2">Thức uống</option>
              <option value="3">Thức ��n ngon</option>
              <option value="4">món ăn khác</option>
            </select>
          </div>
          <label>Chọn hình:</label>
          <input type="file" />
          <img src={assets.proportion1} alt="" />
          <label htmlFor="popup-mota">Mô tả:</label>
          <textarea name="popup-mota" id="popup-mota"></textarea>
        </div>
        <button>Thêm món ăn</button>
      </form>
    </div>
  );
}

export default AddSanPham;
