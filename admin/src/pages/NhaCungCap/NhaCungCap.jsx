import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NhaCungCap.css";
import {
  faPlus,
  faSearch,
  faSort,
  faTrash,
  faWrench
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NhaCungCap = ({ setShowAddNhaCungCap, setShowEditNhaCungCap }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  useEffect(() => {
      const fetchSuppliers = async () => {
      try {
          const response = await axios.get('https://restaurant-manager-be-f47n.onrender.com/api/suppliers');
          if (response.data.success) {
          setSuppliers(response.data.result);
          setFilteredSuppliers(response.data.result);
          } else {
          setError(response.data.message);
          }
      } catch (error) {
          setError('Error fetching Suppliers');
      } finally {
          setIsLoading(false);
      }
      };
  
      fetchSuppliers();
  }, []);

  useEffect(() => {
    setFilteredSuppliers(
      suppliers.filter(supplier =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, suppliers]);

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
            placeholder="Tìm kiếm nhà cung cấp..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className="faSearch"></FontAwesomeIcon>
        </div>
        <button className="btn-them" onClick={() => setShowAddNhaCungCap(true)}>
          <FontAwesomeIcon icon={faPlus} /> Thêm
        </button>
      </div>
      <div className="nhacungcap-content-title content-title title">
        <p>
          STT <FontAwesomeIcon icon={faSort} />
        </p>
        <p>
          Tên nhà cung cấp <FontAwesomeIcon icon={faSort} />
        </p>
        <p>
          Số điện thoại <FontAwesomeIcon icon={faSort} />
        </p>
        <p>Địa chỉ</p>
        <p>Hành động</p>
      </div>

      <div className="content">
        {filteredSuppliers.map((supplier, index) => (
          <div key={supplier.id} className="nhacungcap-content-title content-title content-item">
            <p>{index + 1}</p>
            <p>{supplier.name}</p>
            <p>{supplier.phone}</p>
            <p>{supplier.address}</p>
            <p className="btn">
              <div className="btn-container">
                <button
                  className="btn-edit"
                  onClick={() => setShowEditNhaCungCap(supplier)}
                >
                  <FontAwesomeIcon icon={faWrench} />
                </button>
                <span className="tooltip">Chỉnh sửa</span>
              </div>
              <div className="btn-container">
                <button
                  className="btn-remove"
                  onClick={() => confirm("Xóa nhà cung cấp")}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <span className="tooltip">Xóa</span>
              </div>
            </p>
          </div>
        ))}
        {filteredSuppliers.length === 0 && searchTerm !== "" && (
          <div className="thongbao">Không tìm thấy &quot;{searchTerm}&quot;</div>
        )}
      </div>
    </div>
  );
};

export default NhaCungCap;