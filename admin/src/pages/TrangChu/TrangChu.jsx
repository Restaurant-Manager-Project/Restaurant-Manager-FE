import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faUsers, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import 'chart.js/auto';
import './TrangChu.css';

const TrangChu = () => {
  const [productCount, setProductCount] = useState(0); // Tổng số sản phẩm
  const [employeeCount, setEmployeeCount] = useState(0); // Tổng số nhân viên
  const [revenue, setRevenue] = useState(0); // Tổng doanh thu
  const [revenueData, setRevenueData] = useState([]); // Dữ liệu doanh thu hàng tháng
  const [topProducts, setTopProducts] = useState([]); // Sản phẩm bán chạy
  const [topRank, setTopRank] = useState(5); // Lưu top sản phẩm bán chạy
  const [filterYear, setFilterYear] = useState(new Date().getFullYear()); // Năm hiện tại

  // Lấy tổng số sản phẩm
  const fetchProductCount = async () => {
    try {
      const response = await axios.get('https://restaurant-manager-be-f47n.onrender.com/api/products');
      if (response.data.success) {
        setProductCount(response.data.result.length);
      }
    } catch (error) {
      console.error('Error fetching product count:', error);
    }
  };

  // Lấy tổng số nhân viên
  const fetchEmployeeCount = async () => {
    try {
      const response = await axios.get('https://restaurant-manager-be-f47n.onrender.com/api/employees');
      if (response.data.success) {
        setEmployeeCount(response.data.result.length);
      }
    } catch (error) {
      console.error('Error fetching employee count:', error);
    }
  };

  // Lấy thống kê doanh thu theo năm
  const fetchRevenueData = async (year) => {
    try {
      const response = await axios.get(`https://restaurant-manager-be-f47n.onrender.com/api/statistic/revenue/${year}`);
      if (response.data.success) {
        const formattedData = response.data.result.map((item) => ({
          month: `Tháng ${item.months}`,
          revenue: item.revenue,
        }));
        setRevenueData(formattedData);
        const totalRevenue = formattedData.reduce((sum, item) => sum + item.revenue, 0);
        setRevenue(totalRevenue);
      }
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    }
  };

  // Lấy sản phẩm bán chạy nhất
  const fetchTopProducts = async (rank) => {
    try {
      const response = await axios.get(`https://restaurant-manager-be-f47n.onrender.com/api/statistic/products/all?topRank=${rank}`);
      if (response.data.success) {
        setTopProducts(response.data.result);
      }
    } catch (error) {
      console.error('Error fetching top products:', error);
    }
  };

  useEffect(() => {
    fetchProductCount(); // Lấy tổng số sản phẩm
    fetchEmployeeCount(); // Lấy tổng số nhân viên
    fetchRevenueData(filterYear); // Lấy doanh thu theo năm mặc định
    fetchTopProducts(topRank); // Lấy top sản phẩm mặc định
  }, []);

  // Biểu đồ doanh thu dạng cột
  const revenueChartData = {
    labels: revenueData.map((data) => data.month), // Tháng
    datasets: [
      {
        label: 'Doanh thu (VND)', // Nhãn của biểu đồ
        data: revenueData.map((data) => data.revenue), // Dữ liệu doanh thu
        backgroundColor: 'rgba(75,192,192,0.6)', // Màu của cột
        borderColor: 'rgba(75,192,192,1)', // Màu viền của cột
        borderWidth: 1, // Độ rộng viền
      },
    ],
  };

  return (
    <div className="container">
      <div className="dashboard-cards">
        <div className="dashboard-card dashboard-card-product">
          <FontAwesomeIcon icon={faBox} className="dashboard-icon" />
          <h3>Tổng số sản phẩm</h3>
          <p>{productCount}</p>
        </div>
        <div className="dashboard-card dashboard-card-employee">
          <FontAwesomeIcon icon={faUsers} className="dashboard-icon" />
          <h3>Số lượng nhân viên</h3>
          <p>{employeeCount}</p>
        </div>
        <div className="dashboard-card dashboard-card-revenue">
          <FontAwesomeIcon icon={faDollarSign} className="dashboard-icon" />
          <h3>Tổng doanh thu</h3>
          <p>{revenue.toLocaleString()}đ</p>
        </div>
      </div>

      <div className="dashboard-chart">
        <h3>Doanh thu hàng tháng</h3>
        <label>
          Năm:
          <input
            type="number"
            value={filterYear}
            onChange={(e) => setFilterYear(Number(e.target.value))}
            min={2000}
            max={new Date().getFullYear()}
            className="year-input"
          />
        </label>
        <button onClick={() => fetchRevenueData(filterYear)}>Lọc doanh thu</button>
        <Bar data={revenueChartData} /> {/* Thay thế Line bằng Bar */}
      </div>

      {/* Bảng sản phẩm bán chạy */}
      <div className="dashboard-top-products">
        <h3>Sản phẩm bán chạy</h3>
        <label>
          Top sản phẩm:
          <input
            type="number"
            value={topRank}
            onChange={(e) => setTopRank(Number(e.target.value))}
            min={1}
            max={50}
            className="top-rank-input"
          />
        </label>
        <button onClick={() => fetchTopProducts(topRank)}>Lọc sản phẩm</button>
        {topProducts.length > 0 ? (
          <table className="top-products-table">
            <thead>
              <tr>
                <th>Hạng</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng bán</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.rank}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity_sold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Không có sản phẩm nào được tìm thấy.</p>
        )}
      </div>
    </div>
  );
};

export default TrangChu;
