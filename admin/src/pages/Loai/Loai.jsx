import { faPlus, faSearch, faTrash, faWrench } from "@fortawesome/free-solid-svg-icons";
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  useEffect(() => {
      const fetchCategories = async () => {
      try {
          const response = await axios.get('https://restaurant-manager-be-f47n.onrender.com/api/categories');
          if (response.data.success) {
          setCategories(response.data.result.content);
          setFilteredCategories(response.data.result.content);
          } else {
          setError(response.data.message);
          }
      } catch (error) {
          setError('Error fetching Categories');
      } finally {
          setIsLoading(false);
      }
      };
  
      fetchCategories();
  }, []);
  
    useEffect(() => {
      setFilteredCategories(
        categories.filter(categorie =>
          categorie.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
  }, [searchTerm, categories]);
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
      )
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
            placeholder="Tìm kiếm loại món ăn..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className="faSearch"></FontAwesomeIcon>
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
        {filteredCategories.length === 0 && searchTerm !== "" && (
          <div className="thongbao">Không tìm thấy &quot;{searchTerm}&quot;</div>
        )}
      </div>
    </div>
  );
};

export default Loai;