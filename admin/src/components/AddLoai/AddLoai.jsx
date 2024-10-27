import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { assets } from "../../assets/assets";
import "./AddLoai.css";

const AddLoai = ({ setShowAddLoai }) => {
  return (
    <div className="popup">
      <form className="popup-container">
        <div className="popup-title">
          <h2>Thêm loại món ăn</h2>
          <div className="close-btn" onClick={() => setShowAddLoai(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className="popup-inputs">
          <div className="popup-input">
            <label htmlFor="popup-ten">Tên loại:</label>
            <input
              type="text"
              id="popup-ten"
              placeholder="Nhập tên loại..."
              required
            />
          </div>
          <label>Chọn hình:</label>
          <input type="file" />
          <img src={assets.proportion1} alt="" />
        </div>
        <button>Thêm loại món ăn</button>
      </form>
    </div>
  );
};

export default AddLoai;
