import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'lottie-react';
import './PlaceOrder.css';
import { useCart } from '../../components/CartContext/CartContext';

const PlaceOrder = () => {
  const location = useLocation();
  const { qr_code } = useParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [orderStatus, setOrderStatus] = useState('confirming'); // Initial order status
  const [animationData, setAnimationData] = useState(null); // State to hold Lottie animation data
  const [orderDetails, setOrderDetails] = useState([]); // State to hold order details

  useEffect(() => {
    // Fetch order details based on directionTable
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`https://restaurant-manager-be-1.onrender.com/api/orders?direction=${qr_code}`);
        if (response.data.success) {
          setOrderDetails(response.data.result);
        } else {
          console.error('Error fetching order details:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [qr_code]);

  const handleOrderMore = () => {
    clearCart();
    navigate(`/${qr_code}/menu`);
  };

  const handlePayment = () => {
    // Logic to handle payment
    console.log('Thanh toán');
  };

  useEffect(() => {
    // Simulate updating order status over time
    const statusSequence = ['confirming', 'cooking', 'delivering', 'enjoy'];
    let currentStatusIndex = 0;

    const interval = setInterval(() => {
      currentStatusIndex = (currentStatusIndex + 1) % statusSequence.length;
      setOrderStatus(statusSequence[currentStatusIndex]);
    }, 5000); // Update status every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch Lottie animation data based on order status
    const fetchAnimationData = async (status) => {
      let url = '';
      switch (status) {
        case 'confirming':
          url = 'https://lottie.host/4ca8ac85-7ac6-4c30-b829-70bd6ca3da70/wYEQlgbalg.json';
          break;
        case 'cooking':
          url = 'https://lottie.host/8c283d14-03ee-47dc-9b74-72d68b22b633/9hhg1kQ0H9.json';
          break;
        case 'delivering':
          url = 'https://lottie.host/10829fc1-e743-4646-a8b8-9c825ffe10e4/EbxSimdyUy.json';
          break;
        case 'enjoy':
          url = 'https://lottie.host/d0ed001d-0bce-4e09-9fa7-4be79670f3d5/hbKobyLEtL.json';
          break;
        default:
          return;
      }

      try {
        const response = await axios.get(url);
        setAnimationData(response.data);
      } catch (error) {
        console.error('Error fetching animation data:', error);
      }
    };

    fetchAnimationData(orderStatus);
  }, [orderStatus]);

  if (!orderDetails.length) {
    return <div>Không có dữ liệu đơn hàng.</div>;
  }

  return (
    <div className="place-order">
      <h2>Trạng thái đơn hàng</h2>
      <div className="order-status">
        {animationData ? (
          <div className="lottie-container">
            <Lottie animationData={animationData} style={{ width: 300, height: 300 }} />
          </div>
        ) : (
          <p>Loading animation...</p>
        )}
        <p>
          {orderStatus === 'confirming' && 'Xác nhận đơn hàng'}
          {orderStatus === 'cooking' && 'Bếp đang nấu'}
          {orderStatus === 'delivering' && 'Nhân viên đang mang đến'}
          {orderStatus === 'enjoy' && 'Mời quý khách ăn ngon miệng'}
        </p>
      </div>
      <div className="order-details">
        <h2>Chi tiết đơn hàng:</h2>
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
        </div>
      </div>
      <div className="order-actions">
        <button onClick={handleOrderMore}>Đặt thêm món</button>
        <button onClick={handlePayment}>Thanh toán</button>
      </div>
    </div>
  );
};

export default PlaceOrder;