import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './EditTableStatusPopup.css';

const EditTableStatusPopup = ({ table, onClose, onUpdate }) => {
  const [newStatusId, setNewStatusId] = useState(table.statusId);
  const [orderDetails, setOrderDetails] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [phone, setPhone] = useState('');
  const [clientId, setClientId] = useState(null);
  const [rankId, setRankId] = useState(null);
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [discountText, setDiscountText] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`https://restaurant-manager-be-f47n.onrender.com/api/table/${table.direction}/details-orders`);
        if (response.data.success) {
          setOrderDetails(response.data.result);
          const total = response.data.result.reduce((sum, item) => sum + item.price * item.quantity, 0);
          setTotalAmount(total);
          if (response.data.result.length > 0) {
            setNewStatusId('2'); // Chuyển trạng thái sang "Đang sử dụng" nếu có đơn hàng
          }
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [table.direction]);

  const handleStatusChange = (event) => {
    setNewStatusId(event.target.value);
  };

  const handleConfirmChange = async () => {
    try {
      const response = await axios.put(`https://restaurant-manager-be-f47n.onrender.com/api/table/${table.id}/status`, null, {
        params: { statusID: newStatusId }
      });
      if (response.data.success) {
        alert('Cập nhật trạng thái bàn thành công');
        onUpdate(table.id, newStatusId);
        onClose();
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error updating table status:', error);
    }
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handlePhoneConfirm = async () => {
    try {
      const response = await axios.get(`https://restaurant-manager-be-f47n.onrender.com/api/clients/search?phone=${phone}`);
      if (response.data.success) {
        const client = response.data.result;
        console.log(client); // Kiểm tra cấu trúc của đối tượng client
        setClientId(client.id);
        setRankId(parseInt(client.rank_id, 10)); // Đảm bảo rằng rank_id là số nguyên
        calculateDiscountedAmount(parseInt(client.rank_id, 10));
        setDiscountText(getDiscountText(parseInt(client.rank_id, 10)));
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching client data:', error);
    }
  };

  const calculateDiscountedAmount = (rankId) => {
    const total = orderDetails.reduce((total, order) => total + order.price * order.quantity, 0);
    let discount = 0;
    if (rankId === 1) {
      discount = total * 0.05; // Giảm 5% cho rank_id = 1
    } else if (rankId === 2) {
      discount = total * 0.08; // Giảm 8% cho rank_id = 2
    } else if (rankId === 3) {
      discount = total * 0.1; // Giảm 10% cho rank_id = 3
    } else if (rankId === 4) {
      discount = total * 0.15; // Giảm 15% cho rank_id = 4
    }
    setDiscountedAmount(total - discount);
  };

  const getDiscountText = (rankId) => {
    if (rankId === 1) {
      return 'Bạn được giảm 5% với Hạng đồng';
    } else if (rankId === 2) {
      return 'Bạn được giảm 8% với Hạng bạc';
    } else if (rankId === 3) {
      return 'Bạn được giảm 10% với Hạng vàng';
    } else if (rankId === 4) {
      return 'Bạn được giảm 15% với Hạng kim cương';
    } else {
      return 'Không có mã giảm giá';
    }
  };

  const handlePaymentConfirm = async () => {
    try {
      const invoiceData = {
        clientId,
        timeCreate: new Date().toISOString(),
        total: discountedAmount
      };

      console.log('Invoice Data:', invoiceData); // Kiểm tra dữ liệu trước khi gửi

      const response = await axios.post(`https://restaurant-manager-be-f47n.onrender.com/api/invoices`, invoiceData);
      if (response.data.success) {
        alert('Thanh toán thành công');
        onClose();
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-container">
        <div className="popup-title">
          <h2>Chỉnh sửa trạng thái bàn</h2>
          <div className="close-btn" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className="popup-inputs">
          <div className="popup-input">
            <label htmlFor="popup-tableName">Tên bàn:</label>
            <input type="text" id="popup-tableName" value={table.name} disabled />
          </div>
          <div className="popup-input">
            <label htmlFor="popup-status">Trạng thái:</label>
            <select id="popup-status" value={newStatusId} onChange={handleStatusChange}>
              <option value="1">Còn trống</option>
              <option value="2">Đang sử dụng</option>
              <option value="3">Đã đặt trước</option>
            </select>
          </div>
          <div className="popup-input">
            <label htmlFor="popup-phone">Số điện thoại khách hàng:</label>
            <input type="text" id="popup-phone" value={phone} onChange={handlePhoneChange} />
            <button type="button" onClick={handlePhoneConfirm}>Xác nhận</button>
          </div>
        </div>
        {orderDetails.length > 0 && (
          <div className="order-details">
            <h3>Chi tiết đơn hàng:</h3>
            <table>
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                  <th>Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((item, index) => (
                  <tr key={index}>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price.toLocaleString()} VND</td>
                    <td>{(item.price * item.quantity).toLocaleString()} VND</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3>Tổng tiền: {totalAmount.toLocaleString()} VND</h3>
            {discountText && <h3>{discountText}</h3>}
            {discountedAmount > 0 && <h3>Tiền sau khi giảm: {discountedAmount.toLocaleString()} VND</h3>}
          </div>
        )}
        <div className="btn-group">
          <button type="button" onClick={handleConfirmChange}>Xác nhận</button>
          <button type="button" onClick={handlePaymentConfirm}>Xác nhận thanh toán</button>
        </div>
      </div>
    </div>
  );
};

export default EditTableStatusPopup;