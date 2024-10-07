import React from 'react'
import './Proportion.css'
import { assets } from '../../assets/assets'

const Proportion = () => {
    return (
        <div className='proportion'>
            <h1>Special Offers</h1>
            <div className="proportion-content">
                <div className="proportion__left">
                    <h2>Lẩu Đài Loan</h2>
                    <p>Sau hàng trăm năm tồn tại trong cuộc sống người Đài, lẩu Đài Loan không chỉ đơn thuần là sự kết hợp của các nguyên liệu quen thuộc, mà liên tục được cải tiến và hoàn thiện, từ thế hệ này sang thế hệ khác. Thực khách đến Manwah sẽ được tự mình khám phá hành trình ẩm thực đặc sắc với nước lẩu ngọt vị tự nhiên, kết hợp hầm cùng các loại gia vị dậy mùi thơm đặc trưng của Đài Loan. Nét đặc sắc không chỉ đến từ nước lẩu, mà còn đến từ cả những món nhúng kiểu Đài – bạn sẽ tìm thấy nhiều hơn là chỉ thịt bò và các loại rau thơm. Chính sự kết hợp các nguyên liệu, món ăn hài hoà sẽ tạo nên hương vị lẩu Đài Loan tỉ mỉ và tinh tế.</p>
                </div>
                <div className="proportion__right proportion__right--two-images">
                    <img src={assets.proportion1} alt='' />
                    <img src={assets.proportion2} alt='' />
                </div>
            </div>
            <div className="proportion-content">
                <div className="proportion__left">
                    <h2>Hành trình vạn dặm – Manwah đến Lê Thái Tổ</h2>
                    <p>Đặt phép tương phản trong mọi yếu tố thiết kế - từ màu sắc tới họa tiết hay ánh sáng... Manwah Lê Thái Tổ mang đậm âm hưởng Đài Loan truyền thống nhưng cũng thật phóng khoáng, vừa trang nhã lại không kém phần mỹ lệ, thân thuộc và cũng đầy khác biệt.</p>
                </div>
                <div className="proportion__right proportion__right--one-image">
                    <img src={assets.proportion3} alt='' />
                </div>
            </div>
            <div className="proportion-content">
                <div className="proportion__left">
                    <h2>The New Manwah - New Identity</h2>
                    <p>🎴Là lẩu Đài nguyên bản, nhưng không kém phần trẻ trung và hội nhập! Không tự giới hạn mình trong phạm vi ẩm thực, Manwah luôn muốn đan cài các yếu tố văn hóa vào thương hiệu. Lần “dịch chuyển” này, Manwah xích lại gần đời sống của khách hàng hơn! Bạn có thể thấy những màu sắc, hoa văn, nguồn cảm hứng rất gần gũi, mà bạn đã gặp ở đâu đó trong các bộ phim Đài Loan tuổi thơ hay những hình ảnh đặc trưng của đất nước này. Một hành trình mới nhưng tâm ý không đổi, hi vọng rằng bạn sẽ luôn cảm thấy mình trong Manwah nhé!</p>
                </div>
                <div className="proportion__right">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/tsvpW_-oxm8" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
        </div>
    )
}

export default Proportion
