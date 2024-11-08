import React, { useState, useEffect } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
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
        axios.get("https://restaurant-manager-be-1.onrender.com/api/categories")
            .then(response => {
                if (response.data.success) {
                    setCategories(response.data.result);
                }
            })
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

    const validateEditFormData = () => {
        let validationErrors = {};

        if (tenMonAn.trim() === "") {
            validationErrors.tenMonAn = "Vui lòng nhập tên món ăn.";
        } 
        // else {
        //     const vietnameseRegex = /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]*$/;
        //     if (!vietnameseRegex.test(tenMonAn)) {
        //         validationErrors.tenMonAn = "Tên món ăn không hợp lệ. Vui lòng chỉ nhập chữ.";
        //     }
        // }

        if (loaiMonAn === "") {
            validationErrors.loaiMonAn = "Vui lòng chọn loại món ăn.";
        }

    if (trangThai === "") {
      validationErrors.trangThai = "Vui lòng chọn trạng thái cho món ăn.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

    const uploadImageToCloudinary = async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "Demo-upload");
        formData.append("cloud_name", "dwjm7jkno");

        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/dwjm7jkno/image/upload", formData);
            return response.data.url;
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
            return null;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateEditFormData()) {
            setIsLoading(true);
            let imageUrl = product.img;

            if (hinhAnh) {
                imageUrl = await uploadImageToCloudinary(hinhAnh);
            }

            const updatedProduct = {
                name: tenMonAn,
                categoryName: loaiMonAn,
                img: imageUrl,
                description: moTa,
                status: trangThai,
                price: product.price // Giữ nguyên giá nếu không có thay đổi
            };

            try {
                const response = await axios.put(`https://restaurant-manager-be-1.onrender.com/api/products/${product.id}`, updatedProduct);
                if (response.data.success) {
                    console.log("Chỉnh sửa món ăn thành công:", response.data);
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
                            <input
                                type="text"
                                id="popup-ten"
                                placeholder={product.name}
                                value={tenMonAn}
                                onChange={(e) => setTenMonAn(e.target.value)}
                            />
                            <div className="error">{errors.tenMonAn}</div>
                        </div>
                        <div className={`popup-input ${errors.loaiMonAn ? "error" : ""}`}>
                            <label htmlFor="popup-loai">Loại:</label>
                            <select
                                name="popup-loai"
                                id="popup-loai"
                                value={loaiMonAn}
                                onChange={(e) => setLoaiMonAn(e.target.value)}
                            >
                                <option value="">{product.categoryName}</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.name}>{category.name}</option>
                                ))}
                            </select>
                            <div className="error">{errors.loaiMonAn}</div>
                        </div>
                        <div className={`popup-input ${errors.hinhAnh ? "error" : ""}`}>
                            <label>Chọn hình:</label>
                            <input
                                type="file"
                                onChange={(e) => setHinhAnh(e.target.files[0])}
                            />
                            {hinhAnh ? (
                                <img src={URL.createObjectURL(hinhAnh)} alt="Preview" />
                            ) : (
                                <img src={product.img} alt="Hình ảnh hiện tại" />
                            )}
                            <div className="error">{errors.hinhAnh}</div>
                        </div>
                        <div className={`popup-input ${errors.trangThai ? "error" : ""}`}>
                            <label htmlFor="popup-trangThai">Trạng thái:</label>
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
                            <div className="error">{errors.trangThai}</div>
                        </div>
                    </div>
                    <div className={`popup-input ${errors.moTa ? "error" : ""}`}>
                        <label htmlFor="popup-mota">Mô tả:</label>
                        <textarea
                            name="popup-mota"
                            id="popup-mota"
                            placeholder={product.description}
                            value={moTa}
                            onChange={(e) => setMoTa(e.target.value)}
                        ></textarea>
                        <div className="error">{errors.moTa}</div>
                    </div>
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Đang chỉnh sửa..." : "Chỉnh sửa món ăn"}
                </button>
            </form>
        </div>
        <div className="popup-table">
          <div className="popup-inputs">
            <div className="popup-input">
              <label htmlFor="popup-ten">Tên món ăn:</label>
              <div>
                <input
                  type="text"
                  id="popup-ten"
                  value={"An ba to com"}
                  disabled
                />
                <div className="errorText"></div>
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
                  <option value="">Chọn loại món ăn</option>
                  <option value="1">Món ăn</option>
                  <option value="2">Thức uống</option>
                  <option value="3">Thức ăn ngon</option>
                  <option value="4">Món ăn khác</option>
                </select>
                <div className="errorText">{errors.loaiMonAn}</div>
              </div>
            </div>
            <div className="popup-input">
              <label>Chọn hình:</label>
              <div>
                <input
                  type="file"
                  onChange={(e) => setHinhAnh(e.target.files[0])}
                />
                {hinhAnh ? (
                  <img src={URL.createObjectURL(hinhAnh)} alt="Preview" />
                ) : (
                  <img src={assets.proportion1} alt="Hình ảnh mặc định" />
                )}
                <div className="errorText"></div>
              </div>
              
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
                  <option value="">Chọn trạng thái</option>
                  <option value="1">Số lượng còn</option>
                  <option value="2">Hết hàng</option>
                </select>
                <div className="errorText">{errors.trangThai}</div>
              </div>
              
            </div>
          </div>
          <div className="popup-inputs">
            <label htmlFor="popup-mota">Mô tả:</label>
            <textarea
              name="popup-mota"
              id="popup-mota"
              value={"AN BA TO COMMMMMMMM"}
            ></textarea>
          </div>
        </div>

        <button type="submit">Chỉnh sửa món ăn</button>
      </form>
    </div>
  );
};

export default EditSanPham;