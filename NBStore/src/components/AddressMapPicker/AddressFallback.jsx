import React, { useState } from 'react';
import { Input, Card, Space, Select } from 'antd';
import { EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';

const { Option } = Select;

// Danh sách tỉnh thành Việt Nam
const vietnamProvinces = [
  'Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ',
  'An Giang', 'Bà Rịa - Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu',
  'Bắc Ninh', 'Bến Tre', 'Bình Định', 'Bình Dương', 'Bình Phước',
  'Bình Thuận', 'Cà Mau', 'Cao Bằng', 'Đắk Lắk', 'Đắk Nông',
  'Điện Biên', 'Đồng Nai', 'Đồng Tháp', 'Gia Lai', 'Hà Giang',
  'Hà Nam', 'Hà Tĩnh', 'Hải Dương', 'Hậu Giang', 'Hòa Bình',
  'Hưng Yên', 'Khánh Hòa', 'Kiên Giang', 'Kon Tum', 'Lai Châu',
  'Lâm Đồng', 'Lạng Sơn', 'Lào Cai', 'Long An', 'Nam Định',
  'Nghệ An', 'Ninh Bình', 'Ninh Thuận', 'Phú Thọ', 'Quảng Bình',
  'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị', 'Sóc Trăng',
  'Sơn La', 'Tây Ninh', 'Thái Bình', 'Thái Nguyên', 'Thanh Hóa',
  'Thừa Thiên Huế', 'Tiền Giang', 'Trà Vinh', 'Tuyên Quang', 'Vĩnh Long',
  'Vĩnh Phúc', 'Yên Bái'
];

const AddressFallback = ({ onAddressSelect, currentAddress = '', currentPhone = '' }) => {
  const [addressData, setAddressData] = useState({
    fullName: '',
    phone: currentPhone,
    street: '',
    district: '',
    city: '',
    province: '',
    fullAddress: currentAddress
  });

  const handleInputChange = (field, value) => {
    const newData = {
      ...addressData,
      [field]: value
    };

    // Auto-generate full address
    if (['street', 'district', 'city', 'province'].includes(field)) {
      const parts = [newData.street, newData.district, newData.city, newData.province].filter(Boolean);
      newData.fullAddress = parts.join(', ');
    }

    setAddressData(newData);

    if (onAddressSelect) {
      onAddressSelect(newData);
    }
  };

  const validatePhone = (phone) => {
    return /^[0-9]{10,11}$/.test(phone);
  };

  return (
    <Card title="📍 Nhập địa chỉ giao hàng" style={{ maxWidth: 600 }}>
      <Space direction="vertical" style={{ width: '100%' }} size="middle">

        {/* Phone Input */}
        <div>
          <label style={{ fontWeight: 'bold', marginBottom: 8, display: 'block' }}>
            📞 Số điện thoại liên hệ: <span style={{ color: 'red' }}>*</span>
          </label>
          <Input
            placeholder="Nhập số điện thoại (10-11 số)"
            value={addressData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            prefix={<PhoneOutlined />}
            status={addressData.phone && !validatePhone(addressData.phone) ? 'error' : ''}
            addonBefore="+84"
          />
          {addressData.phone && !validatePhone(addressData.phone) && (
            <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
              Số điện thoại phải có 10-11 chữ số
            </div>
          )}
        </div>

        {/* Street Input */}
        <div>
          <label style={{ fontWeight: 'bold', marginBottom: 8, display: 'block' }}>
            🏠 Số nhà, tên đường: <span style={{ color: 'red' }}>*</span>
          </label>
          <Input
            placeholder="Ví dụ: 123 Nguyễn Văn A"
            value={addressData.street}
            onChange={(e) => handleInputChange('street', e.target.value)}
            prefix={<EnvironmentOutlined />}
          />
        </div>

        {/* District Input */}
        <div>
          <label style={{ fontWeight: 'bold', marginBottom: 8, display: 'block' }}>
            🏘️ Phường/Xã, Quận/Huyện:
          </label>
          <Input
            placeholder="Ví dụ: Phường 1, Quận 1"
            value={addressData.district}
            onChange={(e) => handleInputChange('district', e.target.value)}
          />
        </div>

        {/* City Input */}
        <div>
          <label style={{ fontWeight: 'bold', marginBottom: 8, display: 'block' }}>
            🏙️ Thành phố/Tỉnh: <span style={{ color: 'red' }}>*</span>
          </label>
          <Select
            showSearch
            placeholder="Chọn tỉnh/thành phố"
            value={addressData.province}
            onChange={(value) => handleInputChange('province', value)}
            style={{ width: '100%' }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {vietnamProvinces.map(province => (
              <Option key={province} value={province}>{province}</Option>
            ))}
          </Select>
        </div>

        {/* Full Address Preview */}
        {addressData.fullAddress && (
          <div style={{
            padding: 12,
            backgroundColor: '#f6ffed',
            border: '1px solid #b7eb8f',
            borderRadius: 6
          }}>
            <div style={{ fontWeight: 'bold', color: '#52c41a' }}>✅ Địa chỉ đầy đủ:</div>
            <div>{addressData.fullAddress}</div>
            {addressData.phone && validatePhone(addressData.phone) && (
              <div>📞 SĐT: +84{addressData.phone}</div>
            )}
          </div>
        )}



      </Space>
    </Card>
  );
};

export default AddressFallback;
