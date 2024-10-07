import React from "react";
import "./Cart.css";
import { assets } from "../../assets/assets";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Cart = () => {
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
          <div className="cart-items-title cart-items-item">
            <img src={assets.proportion1} alt="" />
            <p>Example Food</p>
            <p>150,000đ</p>
            <p>1</p>
            <p>150,000đ</p>
            <button><FontAwesomeIcon icon={faTrash} /></button>
          </div>
          <div className="cart-items-title cart-items-item">
            <img src={assets.proportion1} alt="" />
            <p>Example Food</p>
            <p>150,000đ</p>
            <p>1</p>
            <p>150,000đ</p>
            <button><FontAwesomeIcon icon={faTrash} /></button>
          </div>
          <div className="cart-items-title cart-items-item">
            <img src={assets.proportion1} alt="" />
            <p>Example Food</p>
            <p>150,000đ</p>
            <p>1</p>
            <p>150,000đ</p>
            <button><FontAwesomeIcon icon={faTrash} /></button>
          </div>
        </div>
        <div className="cart-checkout">
          <div className="cart-total">
            <h2>Total</h2>
            <span className="cart-total-detail">
              <p>Số sản phẩm:</p>
              <p>1</p>
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
              <p id="total-price">450.000 Vnd</p>
            </span>
            <span className="cart-total-detail">
              <Link to="/"><button>Quay lại</button></Link>
              <button id="checkout-button">Đặt hàng</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
