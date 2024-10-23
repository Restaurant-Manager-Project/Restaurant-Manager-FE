import React, { useContext, useEffect, useState } from 'react';
import "./Cart.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../components/CartContext/CartContext';
import axios from 'axios';

// Hàm để thêm món mới vào đơn hàng hiện tại
// export const addNewItemToOrder = async (newItem) => {
//   const orderId = localStorage.getItem('orderId'); // Fetch orderId từ localStorage
//   if (!orderId) {
//     console.error('No orderId found. Please place an order first.');
//     return;
//   }

//   const newItemData = {
//     order_id: orderId,
//     product_id: newItem.id,
//     price: newItem.price,
//     quantity: newItem.quantity
//   };

//   try {
//     const response = await axios.post('https://restaurant-manager-be-1.onrender.com/api/order/add-item', newItemData);
//     console.log('Item added successfully to the order');
//     console.log('Response:', response);
//   } catch (error) {
//     console.error('Error adding item to order:', error);
//     if (error.response) {
//       console.error('Response data:', error.response.data);
//       console.error('Response status:', error.response.status);
//       console.error('Response headers:', error.response.headers);
//     }
//   }
// };

const Cart = ({ tableId }) => {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useContext(CartContext);
  const navigate = useNavigate();
  const { qr_code } = useParams();
  const [orderId, setOrderId] = useState(localStorage.getItem('orderId')); // Fetch orderId từ localStorage
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const formatDate = (date) => {
    // get data of datetime
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let millisecond = date.getMilliseconds();

    // day < 10 => add 0 before day
    let dayStr = day < 10 ? `0${day}` : day;
    let monthStr = month < 10 ? `0${month}` : month;
    let hourStr = hour < 10 ? `0${hour}` : hour;
    let minuteStr = minute < 10 ? `0${minute}` : minute;
    let secondStr = second < 10 ? `0${second}` : second;
    let millisecondStr = millisecond < 10 ? `00${millisecond}` : millisecond < 100 ? `0${millisecond}` : millisecond;

    return `${year}-${monthStr}-${dayStr}T${hourStr}:${minuteStr}:${secondStr}.${millisecondStr}Z`;
  }

  const handleCheckout = async () => {
    console.log('Placing order...');
    console.log('Table ID:', tableId);
    const orderData = {
      tableId: tableId,
      dateCreate: formatDate(new Date()),
      total: totalPrice,
      directionTable: qr_code,
      detailList: cartItems.map(item => ({
        productId: item.id,
        price: item.price,
        quantity: item.quantity
      }))
    };


    console.log(orderData);

    try {
      const response = await axios.post('https://restaurant-manager-be-1.onrender.com/api/order', orderData);
      console.log('Order placed successfully');
      console.log('Response:', response);
      // const newOrderId = response.data.order_id; // Lấy order_id từ phản hồi của API
      // setOrderId(newOrderId);
      // console.log("OrderId:", newOrderId)
      // localStorage.setItem('orderId', newOrderId); // Lưu trữ orderId vào localStorage
      navigate(`/${qr_code}/place-order`, { state: { cartItems, totalPrice, orderData } });
    } catch (error) {
      console.error('Error placing order:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    }
  };

  return (
    <div className="cart">
      <div className="cart-container">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Sản phẩm</p>
            <p>Tên sản phẩm</p>
            <p>Giá</p>
            <p>Số lượng</p>
            <p>Tổng tiền</p>
            <p>Xóa</p>
          </div>
          <hr />
          {cartItems.map(item => (
            <div key={item.id} className="cart-items-title cart-items-item">
              <div className="cart-item-image">
                <img src={item.img} alt={item.name} />
              </div>
              <p>{item.name}</p>
              <p>{item.price.toLocaleString()} VND</p>
              <div className="quantity-controls">
                <button onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}><FontAwesomeIcon icon={faMinus} /></button>
                <input
                  className='quantity-input'
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value);
                    if (!isNaN(newQuantity) && newQuantity > 0) {
                      updateCartItemQuantity(item.id, newQuantity);
                    } else if (e.target.value === '') {
                      updateCartItemQuantity(item.id, 1);
                    }
                  }}
                />
                <button onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}><FontAwesomeIcon icon={faPlus} /></button>
              </div>
              <p>{(item.price * item.quantity).toLocaleString()} VND</p>
              <p>
                <button onClick={() => removeFromCart(item.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </p>
            </div>
          ))}
        </div>
        <div className="cart-checkout">
          <div className="cart-total">
            <h2>Total</h2>
            <span className="cart-total-detail">
              <p>Số sản phẩm:</p>
              <p>{totalItems}</p>
            </span>
            <span className="cart-total-detail">
              <p>Phí vận chuyển:</p>
              <p>Miễn phí</p>
            </span>
            <div className="cart-promo">
              <h3>Áp mã khuyến mãi</h3>
              <input type="text" placeholder="Nhập mã khuyến mãi" />
              <button>Áp dụng</button>
            </div>
            <hr />
            <span className="cart-total-detail">
              <p id="total-cart">TỔNG CỘNG</p>
              <p id="total-price">{totalPrice.toLocaleString()} VND</p>
            </span>
            <span className="cart-total-detail">
              <Link to="/"><button>Quay lại</button></Link>
              <button id="checkout-button" onClick={() => handleCheckout()}>Đặt hàng</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;