import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SanPham.css";
import { faLockOpen, faPenToSquare, faPlus, faSearch, faSort, faTrash, faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SanPham = ({ setShowAddSanPham, setShowEditSanPham }) => {
const [products, setProducts] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [filteredProducts, setFilteredProducts] = useState([]);

useEffect(() => {
    axios.get("https://restaurant-manager-be-1.onrender.com/api/products")
    .then(response => {
        if (response.data.success) {
            setProducts(response.data.result);
            setFilteredProducts(response.data.result);
        }
    })
    .catch(error => console.error("Error fetching products:", error));
}, []);

useEffect(() => {
    setFilteredProducts(
    products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    );
}, [searchTerm, products]);

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
        <p>STT <FontAwesomeIcon icon={faSort} /></p>
        <p>Hình ảnh</p>
        <p>Tên sản phẩm <FontAwesomeIcon icon={faSort} /></p>
        <p>Loại <FontAwesomeIcon icon={faSort} /></p>
        <p>Giá <FontAwesomeIcon icon={faSort} /></p>
        <p>Số lượng <FontAwesomeIcon icon={faSort} /></p>
        <p>Trạng thái <FontAwesomeIcon icon={faSort} /></p>
        <p>Hành động</p>
    </div>

    <div className="content">
        {filteredProducts.map((product, index) => (
        <div key={product.id} className="sanpham-content-title content-title content-item">
            <p>{index + 1}</p>
            <img src={product.img} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.categoryName}</p>
            <p>{product.price.toLocaleString()} đ</p>
            <p>1</p>
            <p className="mo">Đang bán</p>
            <p className="btn">
                <div className="btn-container">
                    <button
                        className="btn-edit"
                        onClick={() => setShowEditSanPham(true)}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <span className="tooltip">Chỉnh sửa</span>
                </div>
                <div className="btn-container">
                    <button
                        className="btn-remove"
                        onClick={() => confirm("Xác nhận khóa sản phẩm?")}
                    >
                        <FontAwesomeIcon icon={faLockOpen} />
                    </button>
                    <span className="tooltip">Khóa</span>
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