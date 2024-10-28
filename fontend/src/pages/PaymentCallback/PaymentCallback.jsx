import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'lottie-react';
import './PaymentCallback.css';
import API_URLS from '../../../config';

const PaymentCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { qr_code } = useParams();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [qrCode, setQrCode] = useState('');
  const [tableId, setTableId] = useState('');
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const queryParams = location.search; // Lấy phần sau của URL hiện tại
        const response = await axios.get(API_URLS.GET_VNPAY_CALLBACK(qr_code, queryParams));
        if (response.data && response.data.code === '00') {
          setPaymentStatus('success');
          const direction = response.data.direction;
          // Lấy tableId từ qr_code
          const tableResponse = await axios.get(API_URLS.GET_TABLE(qr_code));
          if (tableResponse.data && tableResponse.data.result && tableResponse.data.result.id) {
            const tableId = tableResponse.data.result.id;
            setTableId(tableId);
            console.log('Table ID:', tableId);
            // Tạo mã QR mới
            const qrResponse = await axios.get(API_URLS.GENERATE_QR_CODE(tableId));
            if (qrResponse.data && qrResponse.data.qrCode) {
              setQrCode(qrResponse.data.qrCode);
            }

            const animationResponse = await axios.get('https://lottie.host/b4c85de0-7105-4f4e-9143-085a0af97cce/cbdWM6j3Qr.json');
            setAnimationData(animationResponse.data);
          } else {
            setPaymentStatus('failed');
            const animationResponse = await axios.get('https://lottie.host/147bc821-3bb6-496c-ac9b-0461f01f1c78/f4rNvv6uCo.json');
            setAnimationData(animationResponse.data);
          }
        } else {
          setPaymentStatus('failed');
          const animationResponse = await axios.get('https://lottie.host/147bc821-3bb6-496c-ac9b-0461f01f1c78/f4rNvv6uCo.json');
          setAnimationData(animationResponse.data);
        }
      } catch (error) {
        console.error('Error fetching payment status:', error);
        setPaymentStatus('failed');
        const animationResponse = await axios.get('https://lottie.host/147bc821-3bb6-496c-ac9b-0461f01f1c78/f4rNvv6uCo.json');
        setAnimationData(animationResponse.data);
      }
    };

    fetchPaymentStatus();
  }, [location.search, qr_code]);

  const handleBackToHome = () => {
    navigate(`/`);
  };

  const handleBackToPlaceOrder = () => {
    navigate(`/${qr_code}/place-order`);
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