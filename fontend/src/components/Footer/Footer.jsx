import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt='' />
                    <p>Manwah là thiên đường ẩm thực cho những tín đồ yêu thích lẩu. Với đa dạng các loại nước lẩu đặc trưng của Đài Loan, kết hợp cùng vô vàn món nhúng tươi ngon, Manwah mang đến một trải nghiệm ẩm thực khó quên. Mỗi ngụm lẩu đều là một hành trình khám phá hương vị độc đáo, từ vị cay nồng đặc trưng của lẩu Mala đến vị thanh ngọt của lẩu nấm.</p>
                    <div className="social-media">
                        <FontAwesomeIcon icon={faFacebook} />
                        <FontAwesomeIcon icon={faInstagram} />
                        <FontAwesomeIcon icon={faTwitter} />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>Quick Links</h2>
                    <ul>
                        <li>Trang chủ</li>
                        <li>Menu</li>
                        <li>Về chúng tôi</li>
                        <li>Liên hệ</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>Liên hệ</h2>
                    <p>Trụ sở chính: Số 60 Phố Giang Văn Minh, Phường Đội Cấn,
                        Quận Ba Đình, Thành phố Hà Nội, Việt Nam</p>
                    <p>GPĐK: 0102721191 cấp ngày 09/04/2008</p>
                    <p>ĐT: 043 222 3000 Email: support.hn@ggg.com.vn</p>
                </div>
            </div>
            <hr />
            <p className='footer-copyright'>© 2011 Golden Gate ., JSC. All rights reserved</p>
        </div>
    )
}

export default Footer;
