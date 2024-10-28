import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./ChiTietDonHang.css";

const ChiTietDonHang = ({ setShowChiTietDonHang }) => {
    return (
        <div className="popup">
        <form className="popup-container">
            <div className="popup-title">
            <h2>Chi tiết đơn hàng</h2>
            <div
                className="close-btn"
                onClick={() => setShowChiTietDonHang(false)}
            >
                <FontAwesomeIcon icon={faXmark} />
            </div>
            </div>
            <div className="popup-table">
                <div className="popup-inputs">
                    <div className="popup-input">
                        <label htmlFor="popup-idDon">ID Đơn:</label>
                        <input type="text" id="popup-idDon" value={"D001"} disabled />
                    </div>
                    <div className="popup-input">
                        <label htmlFor="popup-idBan">ID Bàn:</label>
                        <input type="text" id="popup-idBan" value={"B12"} disabled />
                    </div>
                    <div className="popup-input">
                        <label htmlFor="popup-ngayTao">Ngày tạo:</label>
                        <input
                        type="text"
                        id="popup-ngayTao"
                        value={"2022-01-01"}
                        disabled
                        />
                    </div>
                    
                    <div className="popup-input">
                        <label htmlFor="popup-tongTien">Tổng tiền:</label>
                        <input type="text" id="popup-tongTien" value={"100000"} disabled />
                    </div>
                    <div className="popup-input">
                        <label htmlFor="popup-trangThai">Trạng thái:</label>
                        <select name="popup-trangThai" id="popup-trangThai">
                        <option value="1">Chưa xác nhận</option>
                        <option value="2">Đã xác nhận</option>
                        <option value="3">Đã thanh toán</option>
                        <option value="4">Đã giao hàng</option>
                        <option value="5">Đã nhận hàng</option>
                        <option value="6">Đã hủy</option>
                        </select>
                    </div>
                </div>
                <div className="popup-inputs">
                    <label htmlFor="popup-dsMonAn">Danh sách món ăn:</label>
                    <ul id="popup-dsMonAn">
                    <li>Son hao hai vi x1</li>
                    <li>Kimchi han xen x1</li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    </ul>
                </div>
            </div>
            
            <button>Lưu</button>
        </form>
        </div>
    );
};

export default ChiTietDonHang;
