import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import "./ChiTietDonHang.css";

const ChiTietDonHang = ({ setShowChiTietDonHang, orderId }) => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`https://restaurant-manager-be-f47n.onrender.com/api/orders/${orderId}`);
                if (response.data.success) {
                    setOrderDetails(response.data.result);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Error fetching order details');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    const handleProcessChange = async (event) => {
        const newProcessId = event.target.value;
        try {
            const response = await axios.put(`https://restaurant-manager-be-f47n.onrender.com/api/orders/${orderId}`, {
                processId: newProcessId
            });
            if (response.data.success) {
                setOrderDetails(prevDetails => ({
                    ...prevDetails,
                    processId: newProcessId,
                    processName: response.data.result.processName
                }));
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Error updating order status');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

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
                            <input type="text" id="popup-idDon" value={orderDetails.orderId} disabled />
                        </div>
                        <div className="popup-input">
                            <label htmlFor="popup-nameTable">Bàn:</label>
                            <input type="text" id="popup-nameTable" value={orderDetails.nameTable} disabled />
                        </div>
                        <div className="popup-input">
                            <label htmlFor="popup-total">Tổng tiền:</label>
                            <input type="text" id="popup-total" value={orderDetails.total.toLocaleString()} disabled />
                        </div>
                        <div className="popup-input">
                            <label htmlFor="popup-dateCreate">Ngày giờ đặt:</label>
                            <input type="text" id="popup-dateCreate" value={formatDate(orderDetails.dateCreate)} disabled />
                        </div>
                        <div className="popup-input">
                            <label htmlFor="popup-processName">Trạng thái:</label>
                            <select id="popup-processName" value={orderDetails.processId} onChange={handleProcessChange}>
                                <option value="1">Đã tiếp nhận</option>
                                <option value="2">Đã chế biến</option>
                                <option value="3">Đã phục vụ</option>
                            </select>
                        </div>
                    </div>
                    <div className="popup-inputs">
                        <h3>Chi tiết món ăn</h3>
                        <ul id="popup-dsMonAn">
                            {orderDetails.detailList.map(detail => (
                                <li key={detail.id}>
                                    {detail.productName} - Số lượng: {detail.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ChiTietDonHang;