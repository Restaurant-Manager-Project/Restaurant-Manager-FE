import { faPlus, faTrash, faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import "../../dungchung.css";
import "./Loai.css";

const Loai = ({ setShowAddLoai, setShowEditLoai }) => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    axios.get("https://restaurant-manager-be-1.onrender.com/api/categories")
      .then(response => {
        if (response.data.success) {
          setCategories(response.data.result);
          setFilteredCategories(response.data.result);
        }
      })
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    setFilteredCategories(
      categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, categories]);

  return (
    <div className="container">
      <div className="header">
        <div className="timkiem">
          <input
            className="input-timkiem"
            type="text"
            placeholder="Tìm kiếm loại món ăn..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button className="btn-timkiem">Tìm kiếm</button>
        </div>
        <button className="btn-them" onClick={() => setShowAddLoai(true)}>
          <FontAwesomeIcon icon={faPlus} /> Thêm
        </button>
      </div>
      <div className="loai-content-title content-title title">
        <p>STT</p>
        <p>Hình ảnh</p>
        <p>Tên loại</p>
        <p>Hành động</p>
      </div>

      <div className="content">
        {filteredCategories.map((category, index) => (
          <div key={category.id} className="loai-content-title content-title content-item">
            <p>{index + 1}</p>
            <img src={category.img} alt={category.name} />
            <p>{category.name}</p>
            <p className="btn">
              <div className="btn-container">
                <button
                  className="btn-edit"
                  onClick={() => setShowEditLoai(category)}
                >
                  <FontAwesomeIcon icon={faWrench} />
                </button>
                <span className="tooltip">Chỉnh sửa</span>
              </div>
              <div className="btn-container">
                <button
                  className="btn-remove"
                  onClick={() => confirm("Xóa loại món ăn")}
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

export default Loai;