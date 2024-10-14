import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Food.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { menu_list } from '../../assets/assets';
import '../Category/Category.css';

const Food = () => {
    const [foodList, setFoodList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("default");
    const itemsPerPage = 9;

    useEffect(() => {
        let isMounted = true; // Biến cờ để kiểm tra component có còn được gắn kết hay không

        axios.get('https://restaurant-manager-be-1.onrender.com/api/products/')
            .then(response => {
                if (isMounted) {
                    setFoodList(response.data);
                }
            })
            .catch(error => {
                if (isMounted) {
                    console.error('Error fetching data:', error);
                }
            });

        return () => {
            isMounted = false; // Hủy bỏ biến cờ khi component bị hủy bỏ
        };
    }, []);

    const handleAddClick = (product) => {
        setSelectedProduct(product);
        setQuantity(1);
        setIsModalOpen(true);
    };

    const handleQuantityChange = (amount) => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity + amount));
    };

    const handleAddToCart = () => {
        console.log('Added to cart:', selectedProduct, 'Quantity:', quantity);
        setIsModalOpen(false);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const filteredFoodList = foodList.filter(item => {
        const matchesCategory = selectedCategory === "All" || item.category_name === selectedCategory;
        const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearchTerm;
    });

    const sortedFoodList = [...filteredFoodList].sort((a, b) => {
        if (sortOrder === "asc") {
            return a.price - b.price;
        } else if (sortOrder === "desc") {
            return b.price - a.price;
        } else {
            return 0;
        }
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedFoodList.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(sortedFoodList.length / itemsPerPage);

    return (
        <div>
            <div className='category' id='category'>
                <div className="menu-list">
                    {menu_list.map((item, index) => {
                        return (
                            <div className={`menu-list-item ${selectedCategory === item.menu_name ? 'active' : ''}`}
                                key={index}
                                onClick={() => handleCategoryClick(item.menu_name)}>
                                <img src={item.menu_image} />
                                <p>{item.menu_name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="food-function">
                <div className='search'>
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className='sort'>
                    <label htmlFor="sortOrder">Sắp xếp theo giá: </label>
                    <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
                        <option value="default">Mặc định</option>
                        <option value="asc">Tăng dần</option>
                        <option value="desc">Giảm dần</option>
                    </select>
                </div>
            </div>
            <div className='food'>
                <h1>{selectedCategory}:</h1>
                <div className="food-list">
                    {currentItems.map((item, index) => {
                        return (
                            <div className="food-list-item" key={index}>
                                <div className="img-container">
                                    <img src={item.img} alt={item.name} />
                                    <button className='add' onClick={() => handleAddClick(item)}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                                <h3>{item.name}</h3>
                                <p>{item.price.toLocaleString('vi-VN')} VND</p>
                            </div>
                        )
                    })}
                </div>
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
            {isModalOpen && selectedProduct && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                        <div className="modal-body">
                            <div className="modal-img-container">
                                <img src={selectedProduct.img} alt={selectedProduct.name} className="modal-img" />
                            </div>
                            <div className="modal-details">
                                <h2>{selectedProduct.name}</h2>
                                <p>{selectedProduct.description}</p>
                                <p>Giá: {selectedProduct.price.toLocaleString('vi-VN')} VND</p>
                                <div className="button-container">
                                    <div className="quantity-control">
                                        <button onClick={() => handleQuantityChange(-1)}>
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                        <span>{quantity}</span>
                                        <button onClick={() => handleQuantityChange(1)}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                    <button className="add-to-cart" onClick={handleAddToCart}>
                                        <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Food;