import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faUsers, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import 'chart.js/auto';
import './TrangChu.css';

const TrangChu = () => {
  const [productCount, setProductCount] = useState(100);
  const [employeeCount, setEmployeeCount] = useState(50);
  const [revenue, setRevenue] = useState(50000000);
  const [revenueData, setRevenueData] = useState([
    { month: 'January', revenue: 5000000 },
    { month: 'February', revenue: 6000000 },
    { month: 'March', revenue: 7000000 },
    { month: 'April', revenue: 8000000 },
    { month: 'May', revenue: 9000000 },
    { month: 'June', revenue: 10000000 },
  ]);
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, customerName: 'Nguyen Van A', comment: 'Great service!', date: '2024-01-01' },
    { id: 2, customerName: 'Tran Thi B', comment: 'Delicious food!', date: '2024-02-15' },
    { id: 3, customerName: 'Le Van C', comment: 'Will come back again!', date: '2024-03-20' },
  ]);

  const revenueChartData = {
    labels: revenueData.map(data => data.month),
    datasets: [
      {
        label: 'Doanh thu',
        data: revenueData.map(data => data.revenue),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="container">
      <div className="dashboard-cards">
        <div className="dashboard-card dashboard-card-product">
          <FontAwesomeIcon icon={faBox} className="dashboard-icon" />
          <h3>Số lượng sản phẩm</h3>
          <p>{productCount}</p>
        </div>
        <div className="dashboard-card dashboard-card-employee">
          <FontAwesomeIcon icon={faUsers} className="dashboard-icon" />
          <h3>Số lượng nhân viên</h3>
          <p>{employeeCount}</p>
        </div>
        <div className="dashboard-card dashboard-card-revenue">
          <FontAwesomeIcon icon={faDollarSign} className="dashboard-icon" />
          <h3>Doanh thu</h3>
          <p>{revenue.toLocaleString()}đ</p>
        </div>
      </div>
      <div className="dashboard-chart">
        <h3>Doanh thu hàng tháng</h3>
        <Line data={revenueChartData} />
      </div>
      <div className="dashboard-feedback">
        <h3>Feedback của khách hàng</h3>
        <table>
          <thead>
            <tr>
              <th>Khách hàng</th>
              <th>Feedback</th>
              <th>Ngày</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map(feedback => (
              <tr key={feedback.id}>
                <td>{feedback.customerName}</td>
                <td>{feedback.comment}</td>
                <td>{new Date(feedback.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrangChu;