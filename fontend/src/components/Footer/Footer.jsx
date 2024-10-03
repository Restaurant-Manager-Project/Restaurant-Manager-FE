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
                    <img src={assets.dodologo2} alt='' />
                    <p>Dodo Pizza is a popular pizza chain known for its innovative approach to pizza making and delivery. They are famous for their thin-crust pizzas with a wide variety of toppings and unique flavor combinations. Dodo Pizza also emphasizes transparency and customer satisfaction, providing real-time order tracking and feedback mechanisms.</p>
                    <div className="social-media">
                        <FontAwesomeIcon icon={faFacebook} />
                        <FontAwesomeIcon icon={faInstagram} />
                        <FontAwesomeIcon icon={faTwitter} />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>Quick Links</h2>
                    <ul>
                        <li>Home</li>
                        <li>Menu</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>Get in touch</h2>
                    <p>Address: 123 Main Street, New York, NY 10001</p>
                    <p>Phone: 123-456-7890</p>
                    <p>Email: feadback@dodopizza </p>
                </div>
            </div>
            <hr />
            <p className='footer-copyright'>© 2021 Dodo Pizza. All rights reserved.</p>
        </div>
    )
}

export default Footer;
