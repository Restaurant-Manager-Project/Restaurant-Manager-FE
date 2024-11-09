import {
  faPlus,
  faTrash,
  faWrench,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./AddPhieuNhap.css";

const AddPhieuNhap = ({ setShowAddPhieuNhap }) => {
  const [tenNhaCungCap, setTenNhaCungCap] = useState("");
  const [tenMon, setTenMon] = useState("");
  const [soLuong, setSoLuong] = useState("");
  const [giaNhap, setGiaNhap] = useState("");
  const [giaBan, setGiaBan] = useState("");
  const [content, setContent] = useState([]);
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("https://restaurant-manager-be-1.onrender.com/api/categories")
            .then(response => {
                if (response.data.success) {
                    setCategories(response.data.result);
                }
            })
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

  // Hàm kiểm tra dữ liệu đầu vào
  const validateFormData = () => {
    let validationErrors = {};

    if (!tenNhaCungCap)
      validationErrors.tenNhaCungCap = "Vui lòng chọn nhà cung cấp.";
    if (!tenMon) validationErrors.tenMon = "Vui lòng chọn món ăn.";
    if (!soLuong || isNaN(soLuong))
      validationErrors.soLuong = "Vui lòng nhập số lượng hợp lệ.";
    if (!giaNhap || isNaN(giaNhap))
      validationErrors.giaNhap = "Vui lòng nhập giá nhập hợp lệ.";
    if (!giaBan || isNaN(giaBan))
      validationErrors.giaBan = "Vui lòng nhập giá bán hợp lệ.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Hàm xử lý thêm dòng mới vào bảng
  const handleAddRow = () => {
    if (validateFormData()) {
      const newRow = { tenNhaCungCap, tenMon, soLuong, giaNhap, giaBan };
      setContent([...content, newRow]);
      // Reset các trường sau khi thêm
      setTenNhaCungCap("");
      setTenMon("");
      setSoLuong("");
      setGiaNhap("");
      setGiaBan("");
      setErrors({});
    }
  };

  // Hàm xử lý gửi dữ liệu lên API
  const handleSubmitToAPI = () => {
    if (content.length === 0) {
      alert("Vui lòng thêm ít nhất một phiếu nhập trước khi gửi!");
      return;
    }
    console.log("Dữ liệu đã gửi lên API:", content);
    alert("Dữ liệu đã gửi lên API thành công!");
    setContent([]);
  };

  // Hàm xử lý xóa một dòng trong bảng
  const handleDeleteRow = (index) => {
    if (window.confirm("Bạn có muốn xóa dòng thứ " + (index + 1) + "?")) {
      const updatedContent = content.filter((_, i) => i !== index);
      setContent(updatedContent);
    }
  };

  return (
    <div className="popup">
      <form className="popup-container" onSubmit={(e) => e.preventDefault()}>
        <div className="popup-title">
          <h2>Thêm phiếu nhập</h2>
          <div className="close-btn" onClick={() => setShowAddPhieuNhap(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className="popup-table">
          <div className="popup-inputs">
            <div
              className={`popup-input ${errors.tenNhaCungCap ? "error" : ""}`}
            >
              <label htmlFor="popup-tenNhaCungCap">Tên nhà cung cấp:</label>
              <div>
                <select
                  name="popup-tenNhaCungCap"
                  id="popup-tenNhaCungCap"
                  value={tenNhaCungCap}
                  onChange={(e) => setTenNhaCungCap(e.target.value)}
                >
                  <option value="">Chọn nhà cung cấp</option>
                  <option value="Nhà cung cấp A">Nhà cung cấp A</option>
                  <option value="Nhà cung cấp B">Nhà cung cấp B</option>
                </select>
                <div className="errorText">{errors.tenNhaCungCap}</div>
              </div>
              
            </div>
            <div className={`popup-input ${errors.tenMon ? "error" : ""}`}>
              <label htmlFor="popup-tenMon">Món ăn:</label>
              <div>
                <select
                  name="popup-tenMon"
                  id="popup-tenMon"
                  value={tenMon}
                  onChange={(e) => setTenMon(e.target.value)}
                >
                  <option value="">Chọn loại món ăn</option>
                  {categories.map(category => (
                      <option key={category.id} value={category.name}>{category.name}</option>
                  ))}
                </select>
                <div className="errorText">{errors.tenMon}</div>
              </div>
              
            </div>
            <div className={`popup-input ${errors.soLuong ? "error" : ""}`}>
              <label htmlFor="popup-soLuong">Số lượng:</label>
              <div>
                <input
                  type="tel"
                  id="popup-soLuong"
                  value={soLuong}
                  onChange={(e) => setSoLuong(e.target.value)}
                  placeholder="Nhập số lượng..."
                />
                <div className="errorText">{errors.soLuong}</div>
              </div>
              
            </div>
            <div className={`popup-input ${errors.giaNhap ? "error" : ""}`}>
              <label htmlFor="popup-giaNhap">Giá nhập:</label>
              <div>
                <input
                  type="tel"
                  id="popup-giaNhap"
                  value={giaNhap}
                  onChange={(e) => setGiaNhap(e.target.value)}
                  placeholder="Nhập giá nhập..."
                />
                <div className="errorText">{errors.giaNhap}</div>
              </div>
              
            </div>
            <div className={`popup-input ${errors.giaBan ? "error" : ""}`}>
              <label htmlFor="popup-giaBan">Giá bán:</label>
              <div>
                <input
                  type="tel"
                  id="popup-giaBan"
                  value={giaBan}
                  onChange={(e) => setGiaBan(e.target.value)}
                  placeholder="Nhập giá bán..."
                />
                <div className="errorText">{errors.giaBan}</div>
              </div>
              
            </div>
            <div className="btn-group">
              <button type="button" onClick={handleAddRow}>
                <FontAwesomeIcon icon={faPlus} /> Thêm
              </button>
            </div>
          </div>
          <div className="container">
            <div className="phieunhap-content-title content-title title">
              <p>STT</p>
              <p>Nhà cung cấp</p>
              <p>Món ăn</p>
              <p>Số lượng</p>
              <p>Giá nhập</p>
              <p>Giá bán</p>
              <p>Hành động</p>
            </div>
            <div className="content content-1">
              {content.map((row, index) => (
                <div
                  key={index}
                  className="phieunhap-content-title content-title content-item"
                >
                  <p>{index + 1}</p>
                  <p>{row.tenNhaCungCap}</p>
                  <p>{row.tenMon}</p>
                  <p>{row.soLuong}</p>
                  <p>{row.giaNhap}</p>
                  <p>{row.giaBan}</p>
                  <p className="btn">
                    <div className="btn-container">
                      <button className="btn-edit">
                        <FontAwesomeIcon icon={faWrench} />
                      </button>
                      <span className="tooltip">Chỉnh sửa</span>
                    </div>
                    <div className="btn-container">
                      <button
                        className="btn-remove"
                        onClick={() => handleDeleteRow(index)}
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
        </div>
        <hr />
        <div className="btn-group">
          <button type="button" onClick={handleSubmitToAPI}>
            <FontAwesomeIcon icon={faPlus} /> Thêm phiếu nhập
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPhieuNhap;
