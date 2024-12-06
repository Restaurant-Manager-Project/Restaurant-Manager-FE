import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SanPham.css";
import {
  faPlus,
  faSearch,
  faSort,
  faTrash,
  faWrench
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SanPham = ({ setShowAddSanPham, setShowEditSanPham }) => {
const [products, setProducts] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [filteredProducts, setFilteredProducts] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);


useEffect(() => {
    const fetchProducts = async () => {
    try {
        const response = await axios.get('https://restaurant-manager-be-f47n.onrender.com/api/products');
        if (response.data.success) {
          console.log("yeah");
        setProducts(response.data.result);
        setFilteredProducts(response.data.result);
        } else {
        setError(response.data.message);
        }
    } catch (error) {
        setError('Error fetching Products');
    } finally {
        setIsLoading(false);
    }
    };

    fetchProducts();
}, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
}, [searchTerm, products]);
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
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className="faSearch"></FontAwesomeIcon>
        </div>
        <button className="btn-them" onClick={() => setShowAddSanPham(true)}>
          <FontAwesomeIcon icon={faPlus} /> Thêm
        </button>
      </div>
      <div className="sanpham-content-title content-title title">
        <p>
          STT <FontAwesomeIcon icon={faSort} />
        </p>
        <p>Sản phẩm</p>
        <p>
          Tên sản phẩm <FontAwesomeIcon icon={faSort} />
        </p>
        <p>
          Giá <FontAwesomeIcon icon={faSort} />
        </p>
        <p>
          Số lượng <FontAwesomeIcon icon={faSort} />
        </p>
        <p>Hành động</p>
      </div>

      <div className="content">
        {filteredProducts.map((product, index) => (
          <div key={product.id} className="sanpham-content-title content-title content-item">
            <p>{index + 1}</p>
            <img src={product.img} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.price ? product.price.toLocaleString() : 'N/A'}đ</p>
            <p>{product.quantity}</p>
            <p className="btn">
              <div className="btn-container">
                <button
                  className="btn-edit"
                  onClick={() => setShowEditSanPham(product)}
                >
                  <FontAwesomeIcon icon={faWrench} />
                </button>
                <span className="tooltip">Chỉnh sửa</span>
              </div>
              <div className="btn-container">
                <button
                  className="btn-remove"
                  onClick={() => confirm("Xóa sản phẩm")}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <span className="tooltip">Xóa</span>
              </div>
            </p>
          </div>
        ))}
        {filteredProducts.length === 0 && searchTerm !== "" && (
          <div className="thongbao">Không tìm thấy &quot;{searchTerm}&quot;</div>
        )}
      </div>
    </div>
  );
};

export default SanPham;