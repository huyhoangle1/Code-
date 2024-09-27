import React, { useState, useEffect } from 'react';
import './style.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
export default function MaGiamGia() {
    const location = useLocation(); 
    const { Name, MaGiamGia } = location.state || {};
    return (
        <>
            <div className="container">
                <div className="header">
                    <img
                        style={{ marginTop: "-50px" }}
                        className="image-header"
                        src={`${process.env.PUBLIC_URL}/img/hoodi.png`}
                        alt="Hey bro,"
                    />
                    <p
                        className="welcome-text"
                        style={{ marginTop: "2rem", marginBottom: 0, wordSpacing: 5 }}
                    >
                        Chúc mừng{" "}
                    </p>
                    <p style={{ marginBottom: "0.5rem" }}>
                        {" "}
                        <span className="float-text">{Name}</span>
                    </p>
                    <p className="welcome-text">đã đăng ký thành công!</p>
                </div>
                <div className="form-container">
                    <div className="discount-text">Disscount</div>
                    <div className="water-text">{MaGiamGia=='Disscount25'?'25':'10'}%</div>
                </div>
                {/* Include your skateboard illustration here */}
                <div
                    style={{
                        marginTop: "5vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        justifyItems: "center"
                    }}
                >
                    <div
                        className="welcome-text"
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            maxWidth: "89vw"
                        }}
                    >
                        Hạn sử dụng:&nbsp;&nbsp;&nbsp; 1/10/2024
                    </div>
                    <div
                        className="welcome-text"
                        style={{ color: "#E92B62", maxWidth: "89vw", wordSpacing: 5 }}
                    >
                        * Quý khách vui lòng đưa màn hình này cho nhân viên bán hàng để được nhận
                        ưu đãi
                    </div>
                    <div
                        className="welcome-text"
                        style={{ maxWidth: "89vw", paddingTop: "1vh" }}
                    >
                        {" "}
                        <img className="image-footer" src={`${process.env.PUBLIC_URL}/img/heart.png`} alt="Hey bro," />
                    </div>
                </div>
            </div>


        </>
    );
}
