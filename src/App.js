import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DanhSachKhachHang from './admin/danhsachthongtinkhachhang';
import NhapThongTinKhachHang from './nhapthongtinkhachhang/nhapthongtinkhachhang';
import MaGiamGia from './magiamgia/magiamgia';
function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/danhsachkhachang" element={<DanhSachKhachHang />} />
                    <Route path="/nhapthongtin" element={<NhapThongTinKhachHang />} />
                    <Route path="/magiamgia" element={<MaGiamGia />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;