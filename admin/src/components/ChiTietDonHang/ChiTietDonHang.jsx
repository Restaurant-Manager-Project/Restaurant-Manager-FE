import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import "./ChiTietDonHang.css";

const ChiTietDonHang = ({ setShowChiTietDonHang, orderId }) => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newProcessId, setNewProcessId] = useState('');

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`https://restaurant-manager-be-f47n.onrender.com/api/orders/${orderId}`);
                if (response.data.success) {
                    setOrderDetails(response.data.result);
                    setNewProcessId(response.data.result.processId);
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

    const handleProcessChange = (event) => {
        setNewProcessId(event.target.value);
    };
    
    const handleConfirmChange = async () => {
        const token = localStorage.getItem('token'); 
    
        if (!token) {
            setError('Token không tồn tại. Vui lòng đăng nhập lại.');
            return;
        }
    
        try {
            const response = await axios.put(`https://restaurant-manager-be-f47n.onrender.com/api/orders/${orderId}`, {
                processId: newProcessId
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (response.data.success) {
                setOrderDetails(prevDetails => ({
                    ...prevDetails,
                    processId: newProcessId
                }));
                alert('Trạng thái đơn hàng đã được cập nhật thành công!');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setError('Bạn không có quyền thực hiện hành động này.');
            } else {
                setError('Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng.');
            }
        }
    };

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
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toISOString().split('T').join(' ').split('.')[0];
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
                            <input type="text" id="popup-idDon" value={orderDetails?.orderId || ''} disabled />
                        </div>
                        <div className="popup-input">
                            <label htmlFor="popup-nameTable">Bàn:</label>
                            <input type="text" id="popup-nameTable" value={orderDetails?.nameTable || ''} disabled />
                        </div>
                        <div className="popup-input">
                            <label htmlFor="popup-total">Tổng tiền:</label>
                            <input type="text" id="popup-total" value={orderDetails?.total?.toLocaleString() || ''} disabled />
                        </div>
                        <div className="popup-input">
                            <label htmlFor="popup-dateCreate">Ngày giờ đặt:</label>
                            <input type="text" id="popup-dateCreate" value={formatDate(orderDetails.dateCreate)} disabled />
                        </div>
                        <div className="popup-input">
                            <label htmlFor="popup-processName">Trạng thái:</label>
                            <select id="popup-processName" value={newProcessId} onChange={handleProcessChange}>
                                <option value="1">Đã tiếp nhận</option>
                                <option value="2">Đã chế biến</option>
                                <option value="3">Đã phục vụ</option>
                            </select>
                        </div>
                    </div>
                    <div className="popup-inputs">
                        <h3>Chi tiết món ăn</h3>
                        <ul id="popup-dsMonAn">
                            {orderDetails?.detailList?.map(detail => (
                                <li key={detail.id}>
                                    {detail.productName} - Số lượng: {detail.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="btn-group">
                        <button type="button" onClick={handleConfirmChange}>
                            Xác nhận
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ChiTietDonHang;