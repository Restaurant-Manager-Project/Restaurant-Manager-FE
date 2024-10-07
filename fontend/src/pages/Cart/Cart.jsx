import React from "react";
import "./Cart.css";
import { assets } from "../../assets/assets";
import { Link } from 'react-router-dom';


// import { StoreContext} from '../../context/StoreContext'

const Cart = () => {
  // const {cartItems,food_list,removeFromCart} = useContext(StoreContext);
  return (
    <div className="cart">
      <h1>Giỏ Hàng</h1>
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
            <button>Xoa</button>
          </div>
          <div className="cart-items-title cart-items-item">
            <img src={assets.proportion1} alt="" />
            <p>Example Food</p>
            <p>150,000đ</p>
            <p>1</p>
            <p>150,000đ</p>
            <button>Xoa</button>
          </div>
          <div className="cart-items-title cart-items-item">
            <img src={assets.proportion1} alt="" />
            <p>Example Food</p>
            <p>150,000đ</p>
            <p>1</p>
            <p>150,000đ</p>
            <button>Xoa</button>
          </div>
        </div>
        <div className="cart-checkout">
          <div className="cart-total">
            <h2>TÓM TẮT ĐƠN HÀNG</h2>
            <span className="cart-total-detail">
              <p>Số sản phẩm:</p>
              <p>1</p>
            </span>
            <span className="cart-total-detail">
              <p>Phí vận chuyển:</p>
              <p>Miễn phí</p>
            </span>
            <hr />
            <span className="cart-total-detail">
              <p id="total-cart">TỔNG CỘNG</p>
              <p id="total-price">32.000 Vnd</p>
            </span>
            <span className="cart-total-detail">
              <Link to="/"><button>Quay lại</button></Link>
              <button id="checkout-button">Tiến hành đặt hàng</button>
            </span>
            
          </div>
          {/* <div className="cart-payment">
          <p>Thanh toán qua:</p>
          <div className="cart-payment-methods">
            <img src={assets.atm} alt="" />
            <img src={assets.vietcombank} alt="" />
            <img src={assets.momo} alt="" />
          </div>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default Cart;
