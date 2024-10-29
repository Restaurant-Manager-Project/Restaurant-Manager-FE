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
                            <input type="text" id="popup-idDon" value="D001" disabled />
                        </div>
                        <div className="popup-input">
                            <label htmlFor="popup-idBan">ID Bàn:</label>
                            <input type="text" id="popup-idBan" value="B12" disabled />
                        </div>
                        <div className="popup-input">
                            <label htmlFor="popup-ngayTao">Ngày tạo:</label>
                            <input
                                type="text"
                                id="popup-ngayTao"
                                value="2022-01-01"
                                disabled
                            />
                        </div>
                        <div className="popup-input">
                            <label htmlFor="popup-tongTien">Tổng tiền:</label>
                            <input type="text" id="popup-tongTien" value="100000" disabled />
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
                        <ul id="popup-dsMonAn" className="order-list">
                            <li>Son hao hai vi x1</li>
                            <li>Kimchi han quoc x1</li>
                            <li>Mi tocc ccccccccc ccccccccccccc cccccccccccccccccccccc ccccccc ccccc ccccccc ccccccc ccccccc ccc ccccm x1</li>
                            <li>Mi tocc x2</li>
                            <li>Mi tocc x3</li>
                            <li>Mi tocc x4</li>
                            <li>Mi tocc x5</li>
                            <li>Mi tocc x6</li>
                            <li>Mi tocc x7</li>
                            <li>Mi tocc x8</li>
                            <li>Mi tocc x9</li>
                            <li>Mi tocc x10</li>
                            <li>Mi tocc x11</li>
                            <li>Mi tocc x12</li>
                            <li>Mi tocc x13</li>
                            <li>Mi tocc x14</li>
                            <li>Mi tocc x15</li>
                            <li>Mi tocc x16</li>
                        </ul>
                    </div>
                </div>
                <button type="button" onClick={() => alert("Đã lưu thay đổi")}>Lưu</button>
            </form>
        </div>
    );
};

export default ChiTietDonHang;
