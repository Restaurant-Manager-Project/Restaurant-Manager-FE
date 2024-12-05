import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'lottie-react';
import './PaymentCallback.css';
import API_URLS from '../../../config';

const PaymentCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [animationData, setAnimationData] = useState(null);
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const queryParams = location.search; // Lấy phần sau của URL hiện tại
        const response = await axios.get(API_URLS.GET_VNPAY_CALLBACK(queryParams));
  
        if (response.data && response.data.code === '00') {
          setPaymentStatus('success');
          const animationResponse = await axios.get('https://lottie.host/b4c85de0-7105-4f4e-9143-085a0af97cce/cbdWM6j3Qr.json');
          setAnimationData(animationResponse.data);
          const urlParams = new URLSearchParams(queryParams);
          const amount = urlParams.get('vnp_Amount');
          const payDate = urlParams.get('vnp_PayDate');
          const clientId = localStorage.getItem('client_id');
  
          if (amount && payDate && clientId) {
            const total = parseInt(amount, 10) / 100; // Convert amount to number and divide by 100
            const timeCreate = new Date(
              `${payDate.slice(0, 4)}-${payDate.slice(4, 6)}-${payDate.slice(6, 8)}T${payDate.slice(8, 10)}:${payDate.slice(10, 12)}:${payDate.slice(12, 14)}`
            ).toISOString(); // Convert payDate to ISO string
  
            const invoiceData = clientId ? { // Use a ternary operator for cleaner conditional logic
              clientId,
              timeCreate,
              total,
            } : {
              timeCreate,
              total,
            };
  
            try {
              const apiResponse = await axios.post("https://restaurant-manager-be-f47n.onrender.com/api/invoices", invoiceData);
              console.log('API response:', apiResponse.data); // Log API response for debugging
            } catch (error) {
              console.error('Error sending invoice data to API:', error);
            }
          } else {
            console.warn('Missing data for invoice creation:', { amount, payDate, clientId });
          }
        } else {
          setPaymentStatus('failed');
          const animationResponse = await axios.get('https://lottie.host/147bc821-3bb6-496c-ac9b-0461f01f1c78/f4rNvv6uCo.json');
          setAnimationData(animationResponse.data);
        }
  
        const urlParams = new URLSearchParams(queryParams);
        const orderInfoValue = urlParams.get('vnp_OrderInfo');
        setOrderInfo(orderInfoValue); // Lưu giá trị OrderInfo vào state
        console.log('OrderInfo:', orderInfoValue); // In ra giá trị OrderInfo để kiểm tra
  
      } catch (error) {
        console.error('Error fetching payment status:', error);
        setPaymentStatus('failed');
        const animationResponse = await axios.get('https://lottie.host/147bc821-3bb6-496c-ac9b-0461f01f1c78/f4rNvv6uCo.json');
        setAnimationData(animationResponse.data);
      }
    };
  
    fetchPaymentStatus();
  }, [location.search]);

  const handleBackToHome = () => {
    navigate(`/`);
    localStorage.removeItem('rank_id');
  };

  const handleBackToPlaceOrder = () => {
    navigate(`/${orderInfo}/place-order`);
  }

  return (
    <div className="payment-callback">
      {paymentStatus === 'success' ? (
        <div>
          {animationData && <Lottie animationData={animationData} style={{ width: 300, height: 300 }} />}
          <h2>Thanh toán thành công!</h2>
          <p>Xin cảm ơn quý khách</p>
          <button onClick={handleBackToHome}>Quay lại trang chủ</button>
        </div>
      ) : paymentStatus === 'failed' ? (
        <div>
          {animationData && <Lottie animationData={animationData} style={{ width: 300, height: 300 }} />}
          <h2>Thanh toán thất bại hoặc bị hủy!</h2>
          <p>Vui lòng thử lại hoặc liên hệ nhân viên để được hỗ trợ</p>
          <button onClick={handleBackToPlaceOrder}>Quay lại trang thanh toán</button>
        </div>
      ) : (
        <div>
          <h2>Đang kiểm tra trạng thái thanh toán...</h2>
        </div>
      )}
    </div>
  );
};

export default PaymentCallback;