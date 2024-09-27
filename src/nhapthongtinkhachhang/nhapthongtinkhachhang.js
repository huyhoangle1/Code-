import React, { useState } from 'react';
import './style.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
export default function NhapThongTinKhachHang() {
    const [formData, setFormData] = useState({ name: '', phone: '' });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/save-to-excel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        navigate('/magiamgia', { state: { Name: formData.name, MaGiamGia: await response.text() } });
    };

    return (
        <div className="container">
            <div className="header">
                <img className="image-header" src={`${process.env.PUBLIC_URL}/img/hoodi.png`} alt="Hey bro," />
                <p className="welcome-text">
                    Đăng ký để nhận ưu đãi <span className="float-text">25%</span><br />
                    <span style={{ marginTop: "1rem" }}>dành riêng cho khách hàng mới</span>
                </p>
            </div>
            <div className="form-container">
                <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
                    <label className="phone-text" htmlFor="name">Họ và tên:</label>
                    <br />
                    <input
                        className="text-input"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <label className="phone-text" htmlFor="name"></label>
                    <br />
                    <label className="phone-text-2" htmlFor="phone">Số điện thoại:</label>
                    <br />
                    <input
                        className="text-input"
                        type="number"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <div style={{width:'100%',textAlign:'center',marginTop:'1rem'}}>
                        <button type="submit" className="submit-button" style={{marginTop:'1rem'}}>Submit</button>
                        {/* <a className="submit-button">Submit</a> */}
                    </div>
                </form>
            </div>
            <img className="skeleton-image" src={`${process.env.PUBLIC_URL}/img/smoke.png`} alt="Skull on Skateboard" />
        </div>
    );
}
