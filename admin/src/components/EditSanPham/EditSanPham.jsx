import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { assets } from "../../assets/assets";
import "./EditSanPham.css";

function EditSanPham({ setShowEditSanPham }) {
  return (
    <div className="popup">
      <form className="popup-container">
        <div className="popup-title">
          <h2>Chỉnh sửa món ăn</h2>
          <div className="close-btn" onClick={() => setShowEditSanPham(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className="popup-inputs">
          <div className="popup-input">
            <label htmlFor="popup-ten">Tên món ăn:</label>
            <input type="text" id="popup-ten" value={"An ba to com"} disabled />
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
          <textarea
            name="popup-mota"
            id="popup-mota"
            disabled
            value={"AN BA TO COMMMMMMMM"}
          ></textarea>
          <div className="popup-input">
            <label htmlFor="popup-trangThai">Trạng thái:</label>
            <select name="popup-trangThai" id="popup-trangThai">
              <option value="1">Số lượng còn</option>
              <option value="2">Hết hàng</option>
            </select>
          </div>
        </div>
        <button>Chỉnh sửa món ăn</button>
      </form>
    </div>
  );
}

export default EditSanPham;
