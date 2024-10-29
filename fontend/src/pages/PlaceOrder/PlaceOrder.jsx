import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'lottie-react';
import './PlaceOrder.css';
import { useCart } from '../../components/CartContext/CartContext';
import { useOrderStatus } from '../../components/OrderStatusContext/OrderStatusContext';
import API_URLS from '../../../config';

const PlaceOrder = () => {
  const { qr_code } = useParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { setHasOrderData } = useOrderStatus();
  const [orderDetails, setOrderDetails] = useState([]); // State to hold order details
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Fetch order details based on directionTable
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(API_URLS.GET_ORDER_DETAILS(qr_code));
        if (response.data.success) {
          setOrderDetails(response.data.result);
          const hasOrderData = response.data.result.some(order => order.detailList && order.detailList.length > 0);
          setHasOrderData(hasOrderData);
        } else {
          console.error('Error fetching order details:', response.data.message);
          setHasOrderData(false);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
        setHasOrderData(false);
      }
    };

    fetchOrderDetails();
  }, [qr_code, setHasOrderData]);

  useEffect(() => {
    // Fetch animation data
    const fetchAnimationData = async () => {
      try {
        const response = await axios.get('https://lottie.host/3fab5488-ca7c-45c7-bba7-ecce760f05ee/3r7aLdND3m.json');
        setAnimationData(response.data);
      } catch (error) {
        console.error('Error fetching animation data:', error);
      }
    };

    fetchAnimationData();
  }, []);

  const handleOrderMore = () => {
    clearCart();
    navigate(`/${qr_code}/menu`);
  };

  const handlePayment = async () => {
    const totalAmount = calculateTotalAmount();
    const paymentData = {
      directionTable: qr_code,
      amount: totalAmount
    };
    console.log('Payment data:', paymentData);
    try {
      const response = await axios.post(API_URLS.POST_VNPAY, paymentData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      } else {
        console.error('Failed to get payment URL');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  const calculateTotalAmount = () => {
    return orderDetails.reduce((total, order) => total + order.total, 0);
  };

  if (!orderDetails.length) {
    return <div>Không có dữ liệu đơn hàng.</div>;
  }

  return (
    <div className="place-order">
      <div className="place-order-left">
        <h2>Chi tiết đơn hàng:</h2>
        <div className="order-details">
          {orderDetails.map((order, index) => (
            <div key={index} className="order-section">
              <h3>Đơn hàng số: {order.orderId} - Trạng thái: </h3>
              <div className="table-container">
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
                    {order.detailList ? (
                      order.detailList.map((item, itemIndex) => (
                        <tr key={itemIndex}>
                          <td>{item.productName}</td>
                          <td>{item.quantity}</td>
                          <td>{item.price.toLocaleString()} VND</td>
                          <td>{(item.price * item.quantity).toLocaleString()} VND</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">Không có chi tiết đơn hàng</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="place-order-right">
        <h2 id='total-title'>Total</h2>
        {animationData && <Lottie id="animation" animationData={animationData} style={{ width: 100, height: 100 }} />}
        <h3 className='totalPrice'>Tổng tiền: {calculateTotalAmount().toLocaleString()} VND</h3>
        <div className="cart-promo">
          <h3>Áp mã khuyến mãi</h3>
          <input type="text" placeholder="Nhập mã khuyến mãi" />
          <button>Áp dụng</button>
        </div>
        <hr />
        <h3 id='total2'>Thành tiền: </h3>
        <div className="methodContainer">
          <h3 id='paymentMethod'>Chọn phương thức thanh toán: </h3>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="card">Thẻ ngân hàng</option>
            <option value="cash">Tiền mặt</option>
          </select>
        </div>
        <div className="order-actions">
          <button onClick={handleOrderMore}>Đặt thêm món</button>
          <button onClick={handlePayment}>Thanh toán</button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;