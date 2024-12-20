import { faPlus, faSearch, faTrash, faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../dungchung.css";
import "./KhachHang.css";

const KhachHang = ({ setShowAddKhachHang, setShowEditKhachHang }) => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  useEffect(() => {
      const fetchClients = async () => {
      try {
          const response = await axios.get('https://restaurant-manager-be-f47n.onrender.com/api/clients');
          if (response.data.success) {
          setClients(response.data.result);
          setFilteredClients(response.data.result);
          } else {
          setError(response.data.message);
          }
      } catch (error) {
          setError('Error fetching Clients');
      } finally {
          setIsLoading(false);
      }
      };
  
      fetchClients();
  }, []);

  useEffect(() => {
    setFilteredClients(
      clients.filter(client =>
        `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, clients]);

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
            placeholder="Tìm kiếm khách hàng..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className="faSearch"></FontAwesomeIcon>
        </div>
        <button className="btn-them" onClick={() => setShowAddKhachHang(true)}>
          <FontAwesomeIcon icon={faPlus} /> Thêm
        </button>
      </div>
      <div className="khachhang-content-title content-title title">
        <p>STT</p>
        <p>Tên khách hàng</p>
        <p>Số điện thoại</p>
        <p>Điểm tích lũy</p>
        <p>Hành động</p>
      </div>

      <div className="content">
        {filteredClients.map((client, index) => (
          <div key={client.id} className="khachhang-content-title content-title content-item">
            <p>{index + 1}</p>
            <p>{client.firstName} {client.lastName}</p>
            <p>{client.phone}</p>
            <p>{client.paid}</p>
            <p className="btn">
              <div className="btn-container">
                <button
                  className="btn-edit"
                  onClick={() => setShowEditKhachHang(client)}
                >
                  <FontAwesomeIcon icon={faWrench} />
                </button>
                <span className="tooltip">Chỉnh sửa</span>
              </div>
              <div className="btn-container">
                <button
                  className="btn-remove"
                  onClick={() => confirm("Xóa khách hàng")}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <span className="tooltip">Xóa</span>
              </div>
            </p>
          </div>
        ))}
        {filteredClients.length === 0 && searchTerm !== "" && (
          <div className="thongbao">Không tìm thấy &quot;{searchTerm}&quot;</div>
        )}
      </div>
    </div>
  );
};

export default KhachHang;