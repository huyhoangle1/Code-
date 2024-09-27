import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import * as XLSX from 'xlsx';
import "../style.css"
export default function DanhSachKhachHang() {
    const [customers, setCustomers] = useState([]);
    const filePath = process.env.PUBLIC_URL + '/data/DataHoodi.xlsx';
    const [valueSearch, setvalueSearch] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/read-excel', {
                    method: 'GET',
                    // Nếu API yêu cầu body như file upload, thêm formData vào đây.
                });
                const result = await response.json(); // Lấy kết quả dưới dạng chuỗi
                setCustomers(result)
                setFilteredCustomers(result)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Gọi hàm để thực hiện API call
    }, []);
    const searchData = (e) => {
        setvalueSearch(e.target.value)
        if (e.target.value == "") {
            setFilteredCustomers(customers);
        }
        else {
            const filteredData = customers.filter(customer =>
                customer.HoVaTen.toLowerCase().includes(e.target.value.toLowerCase()) ||
                customer.SDT.toLowerCase().includes(e.target.value.toLowerCase()) ||
                customer.MaKhuyenMai.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setFilteredCustomers(filteredData);
        }

    }
    const exportToExcel = () => {
        // Chuẩn bị dữ liệu để xuất
        const worksheetData = [
            // Định nghĩa hàng tiêu đề
            // {
            //     STT: "STT",
            //     HoVaTen: "Họ và Tên",
            //     SDT: "Số điện thoại",
            //     MaKhuyenMai: "Mã khuyến mãi",
            //     NgayNhapMa: "Ngày nhập mã"
            // },
            // Duyệt qua dữ liệu khách hàng đã lọc
            ...filteredCustomers.map((customer, index) => ({
                STT: index + 1,
                HoVaTen: customer.HoVaTen,
                SDT: customer.SDT,
                MaKhuyenMai: customer.MaKhuyenMai,
                NgayNhapMa: customer.NgayNhapMa
            }))
        ];
        // Tạo worksheet từ dữ liệu
        const worksheet = XLSX.utils.json_to_sheet(worksheetData, { header: ["STT", "HoVaTen", "SDT", "MaKhuyenMai", "NgayNhapMa"] });
    
        // Định nghĩa kiểu cho tiêu đề
        const headerCellStyle = {
            font: { bold: true }, // Đặt tiêu đề là in đậm
            alignment: { horizontal: 'center' } // Căn giữa
        };
    
        // Áp dụng kiểu cho hàng tiêu đề (hàng đầu tiên)
        for (let col = 0; col < 5; col++) { // 5 cột trong tiêu đề
            const cellAddress = XLSX.utils.encode_cell({ c: col, r: 0 }); // Lấy địa chỉ ô
            worksheet[cellAddress].s = headerCellStyle; // Áp dụng kiểu
        }
    
        // Định nghĩa kiểu viền cho tất cả ô
        const borderStyle = {
            border: {
                top: { style: 'thin', color: { rgb: '000000' } },
                left: { style: 'thin', color: { rgb: '000000' } },
                bottom: { style: 'thin', color: { rgb: '000000' } },
                right: { style: 'thin', color: { rgb: '000000' } },
            }
        };
    
        // Áp dụng kiểu viền cho tất cả các ô, bao gồm tiêu đề và dữ liệu
        for (let cell in worksheet) {
            if (cell[0] === '!') continue; // Bỏ qua metadata
            worksheet[cell].s = { ...worksheet[cell].s, ...borderStyle }; // Áp dụng kiểu viền
        }
    
        // Tạo một workbook mới và thêm worksheet vào đó
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'KhachHang');
    
        // Tạo một Blob và kích hoạt tải xuống
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'khach_hang.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8";
    return (
        <>
            <div>
                <h1>Danh sách thông tin khách hàng</h1>
            </div>
            <div className="chuc-nang card d-flex flex-row-reverse">
                <div className='p-2 xuat-excel'><Button onClick={() => exportToExcel()} className='button-excel' label="Xuất excel" icon="pi pi-check" /></div>
                <div className='p-2 tim-kiem'><InputText value={valueSearch} placeholder="Tìm kiếm" onChange={(e) => { searchData(e) }} /></div>
            </div>
            <div className="card">
                <DataTable value={filteredCustomers} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="STT" header="STT" style={{ width: '5%' }}></Column>
                    <Column field="HoVaTen" header="Họ và Tên" style={{ width: '25%' }}></Column>
                    <Column field="SDT" header="Số điện thoại" style={{ width: '25%' }}></Column>
                    <Column field="MaKhuyenMai" header="Mã khuyến mãi" style={{ width: '25%' }}></Column>
                    <Column field="NgayNhapMa" header="Ngày nhập mã" style={{ width: '25%' }}></Column>
                </DataTable>
            </div>
        </>
    );
}
