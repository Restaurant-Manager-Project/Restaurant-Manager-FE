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

  useEffect(() => {
    axios.get("https://restaurant-manager-be-f47n.onrender.com/api/clients")
      .then(response => {
        if (response.data.success) {
          setClients(response.data.result);
          setFilteredClients(response.data.result);
        }
      })
      .catch(error => console.error("Error fetching clients:", error));
  }, []);

  useEffect(() => {
    setFilteredClients(
      clients.filter(client =>
        `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, clients]);

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
        <p>Số lần mua hàng</p>
        <p>Hành động</p>
      </div>

      <div className="content">
        {filteredClients.map((client, index) => (
          <div key={client.id} className="khachhang-content-title content-title content-item">
            <p>{index + 1}</p>
            <p>{client.firstName} {client.lastName}</p>
            <p>{client.phone}</p>
            <p>{client.purchase_count}</p>
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
      </div>
    </div>
  );
};

export default KhachHang;