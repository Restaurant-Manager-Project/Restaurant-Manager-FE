import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./EditKhachHang.css";

const EditKhachHang = ({ setShowEditKhachHang, client }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (client) {
            setFirstName(client.firstName || "");
            setLastName(client.lastName || "");
            setPhone(client.phone || "");
        }
    }, [client]);

    const validateFormData = () => {
        let validationErrors = {};

        if (firstName.trim() === "") {
            validationErrors.firstName = "Vui lòng nhập tên.";
        }

        if (lastName.trim() === "") {
            validationErrors.lastName = "Vui lòng nhập họ.";
        }

        if (phone.trim() === "") {
            validationErrors.phone = "Vui lòng nhập số điện thoại.";
        } else {
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone)) {
                validationErrors.phone =
                    "Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số.";
            }
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateFormData()) {
            setIsLoading(true);

            const updatedClient = {
                firstName,
                lastName,
                phone
            };

            try {
                const response = await axios.put(
                    `https://restaurant-manager-be-f47n.onrender.com/api/clients/${client.id}`,
                    updatedClient
                );
                if (response.data.success) {
                    alert("Chỉnh sửa khách hàng thành công");
                    setShowEditKhachHang(false);
                } else {
                    console.error("Error updating client:", response.data.message);
                }
            } catch (error) {
                console.error("Error updating client:", error);
            }

            setIsLoading(false);
        }
    };

    return (
        <div className="popup">
            <form className="popup-container" onSubmit={handleSubmit}>
                <div className="popup-title">
                    <h2>Chỉnh sửa khách hàng</h2>
                    <div
                        className="close-btn"
                        onClick={() => setShowEditKhachHang(false)}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </div>
                <div className="popup-inputs">
                    <div className={`popup-input ${errors.firstName ? "error" : ""}`}>
                        <label htmlFor="popup-firstName">Tên:</label>
                        <div>
                            <input
                                type="text"
                                id="popup-firstName"
                                placeholder="Nhập tên..."
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <div className="errorText">{errors.firstName}</div>
                        </div>
                    </div>
                    <div className={`popup-input ${errors.lastName ? "error" : ""}`}>
                        <label htmlFor="popup-lastName">Họ:</label>
                        <div>
                            <input
                                type="text"
                                id="popup-lastName"
                                placeholder="Nhập họ..."
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <div className="errorText">{errors.lastName}</div>
                        </div>
                    </div>
                    <div className={`popup-input ${errors.phone ? "error" : ""}`}>
                        <label htmlFor="popup-phone">Số điện thoại:</label>
                        <div>
                            <input
                                type="text"
                                id="popup-phone"
                                placeholder="Nhập số điện thoại..."
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <div className="errorText">{errors.phone}</div>
                        </div>

                    </div>
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Đang chỉnh sửa..." : "Chỉnh sửa khách hàng"}
                </button>
            </form>
        </div>
    );
};

export default EditKhachHang;
