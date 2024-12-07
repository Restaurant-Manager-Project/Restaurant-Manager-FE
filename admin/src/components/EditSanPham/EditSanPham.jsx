import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./EditSanPham.css";

const EditSanPham = ({ setShowEditSanPham, product }) => {
  const [tenMonAn, setTenMonAn] = useState("");
  const [loaiMonAn, setLoaiMonAn] = useState("");
  const [hinhAnh, setHinhAnh] = useState(null);
  const [moTa, setMoTa] = useState("");
  const [trangThai, setTrangThai] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (product) {
      setTenMonAn(product.name);
      setLoaiMonAn(product.categoryName);
      setMoTa(product.description);
      setTrangThai(product.status);
    }
  }, [product]);

  useEffect(() => {
    const fetchCategories = async () => {
    try {
        const response = await axios.get('https://restaurant-manager-be-f47n.onrender.com/api/categories');
        if (response.data.success) {
        setCategories(response.data.result.content);
        setFilteredCategories(response.data.result.content);
        } else {
        setError(response.data.message);
        }
    } catch (error) {
        setError('Error fetching Categories');
    } finally {
        setIsLoading(false);
    }
    };

    fetchCategories();
}, []);

  const validateEditFormData = () => {
    let validationErrors = {};

    if (tenMonAn.trim() === "") {
      validationErrors.tenMonAn = "Vui lòng nhập tên món ăn.";
    }

    if (loaiMonAn === "") {
      validationErrors.loaiMonAn = "Vui lòng chọn loại món ăn.";
    }

    if (trangThai === "") {
      validationErrors.trangThai = "Vui lòng chọn trạng thái cho món ăn.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateEditFormData()) {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("name", tenMonAn);
      formData.append("categoryName", loaiMonAn);
      formData.append("description", moTa);
      formData.append("status", trangThai);
      formData.append("price", product.price); // Giữ nguyên giá nếu không có thay đổi

      if (hinhAnh) {
        formData.append("img", hinhAnh);
      }

      try {
        const response = await axios.put(
          `https://restaurant-manager-be-f47n.onrender.com/api/products/${product.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.success) {
          alert("Chỉnh sửa món ăn thành công");
          setShowEditSanPham(false);
        } else {
          console.error("Error updating product:", response.data.message);
        }
      } catch (error) {
        console.error("Error updating product:", error);
      }

      setIsLoading(false);
    }
  };

  return (
    <div className="popup">
      <form className="popup-container" onSubmit={handleSubmit}>
        <div className="popup-title">
          <h2>Chỉnh sửa món ăn</h2>
          <div className="close-btn" onClick={() => setShowEditSanPham(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className="popup-table">
          <div className="popup-inputs">
            <div className={`popup-input ${errors.tenMonAn ? "error" : ""}`}>
              <label htmlFor="popup-ten">Tên món ăn:</label>
              <div>
                <input
                  type="text"
                  id="popup-ten"
                  placeholder={product.name}
                  value={tenMonAn}
                  onChange={(e) => setTenMonAn(e.target.value)}
                />
                <div className="errorText">{errors.tenMonAn}</div>
              </div>
            </div>
            <div className={`popup-input ${errors.loaiMonAn ? "error" : ""}`}>
              <label htmlFor="popup-loai">Loại:</label>
              <div>
                <select
                  name="popup-loai"
                  id="popup-loai"
                  value={loaiMonAn}
                  onChange={(e) => setLoaiMonAn(e.target.value)}
                >
                  <option value="">{product.categoryName}</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="errorText">{errors.loaiMonAn}</div>
              </div>
            </div>
            <div className={`popup-input ${errors.hinhAnh ? "error" : ""}`}>
              <label>Chọn hình:</label>
              <div>
                <input
                  type="file"
                  onChange={(e) => setHinhAnh(e.target.files[0])}
                />
                <div className="errorText">{errors.hinhAnh}</div>
              </div>
              {hinhAnh ? (
                <img src={URL.createObjectURL(hinhAnh)} alt="Preview" />
              ) : (
                <img src={product.img} alt="Hình ảnh hiện tại" />
              )}
            </div>
            <div className={`popup-input ${errors.trangThai ? "error" : ""}`}>
              <label htmlFor="popup-trangThai">Trạng thái:</label>
              <div>
                <select
                  name="popup-trangThai"
                  id="popup-trangThai"
                  value={trangThai}
                  onChange={(e) => setTrangThai(e.target.value)}
                >
                  <option value="">{product.status}</option>
                  <option value="1">Số lượng còn</option>
                  <option value="2">Hết hàng</option>
                </select>
                <div className="errorText">{errors.trangThai}</div>
              </div>
            </div>
          </div>
          <div className={`popup-inputs ${errors.moTa ? "error" : ""}`}>
            <label htmlFor="popup-mota">Mô tả:</label>
            <textarea
              name="popup-mota"
              id="popup-mota"
              placeholder={product.description}
              value={moTa}
              onChange={(e) => setMoTa(e.target.value)}
            ></textarea>
            <div className="errorText">{errors.moTa}</div>
          </div>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Đang chỉnh sửa..." : "Chỉnh sửa món ăn"}
        </button>
      </form>
    </div>
  );
};

export default EditSanPham;