import React, { useState, useEffect } from "react";
import { Radio, Form, Input, Card, Modal } from "antd";
import {
    EnvironmentOutlined,
    UserOutlined,
    PhoneOutlined,
    HomeOutlined,
} from "@ant-design/icons";
import AddressMapPicker from "../AddressMapPicker/AddressMapPicker";

const AddressSelector = ({
    user,
    onAddressChange,
    initialValue = "current",
    showMapPicker = true,
}) => {
    const [addressType, setAddressType] = useState(initialValue);
    const [showNewAddressModal, setShowNewAddressModal] = useState(false);
    const [newAddressForm] = Form.useForm();
    const [newAddress, setNewAddress] = useState({
        fullName: user?.name || "",
        phone: user?.phone || "",
        address: "",
        street: "",
        district: "",
        city: "",
        province: "",
        coordinates: null,
    });

    // Effect để thông báo thay đổi địa chỉ cho parent component
    useEffect(() => {
        if (addressType === "current") {
            const currentData = {
                type: "current",
                data: {
                    fullName: user?.name || "",
                    phone: user?.phone || "",
                    address: user?.address || "",
                },
            };
            onAddressChange(currentData);
        } else {
            const newData = {
                type: "new",
                data: {
                    ...newAddress,
                    fullAddress: newAddress.address,
                },
            };
            onAddressChange(newData);
        }
    }, [addressType, newAddress, user?.name, user?.phone, user?.address, onAddressChange]);

    // Set form fields when modal opens
    useEffect(() => {
        if (showNewAddressModal) {
            newAddressForm.setFieldsValue(newAddress);
        }
    }, [showNewAddressModal, newAddress, newAddressForm]);

    const handleAddressTypeChange = (e) => {
        const value = e.target.value;
        setAddressType(value);

        if (value === "new") {
            setShowNewAddressModal(true);
        }
    };

    const handleNewAddressChange = (field, value) => {
        const updatedAddress = { ...newAddress, [field]: value };
        setNewAddress(updatedAddress);
        newAddressForm.setFieldsValue({ [field]: value });
    };

    const handleAddressSelect = (addressData) => {
        const updatedAddress = {
            ...newAddress,
            address: addressData.fullAddress,
            street: addressData.street,
            district: addressData.district,
            city: addressData.city,
            province: addressData.province,
            coordinates: addressData.coordinates,
            phone: addressData.phone || newAddress.phone,
        };
        setNewAddress(updatedAddress);
        newAddressForm.setFieldsValue({
            address: addressData.fullAddress,
            phone: addressData.phone || newAddress.phone,
        });
    };

    const handleSaveNewAddress = () => {
        newAddressForm
            .validateFields()
            .then((formValues) => {
                // Cập nhật state với dữ liệu từ form và thông tin địa chỉ từ map
                const updatedAddress = {
                    ...newAddress,
                    fullName: formValues.fullName,
                    phone: formValues.phone,
                };
                setNewAddress(updatedAddress);

                // Ngay lập tức gọi onAddressChange với dữ liệu mới từ form
                const newData = {
                    type: "new",
                    data: {
                        ...updatedAddress,
                        fullAddress: updatedAddress.address,
                    },
                };
                onAddressChange(newData);

                setShowNewAddressModal(false);
            })
            .catch(() => {
                // Validation failed, modal stays open
            });
    };

    const handleCancelNewAddress = () => {
        setAddressType("current");
        setShowNewAddressModal(false);
        newAddressForm.resetFields();
        setNewAddress({
            fullName: user?.name || "",
            phone: user?.phone || "",
            address: "",
            street: "",
            district: "",
            city: "",
            province: "",
            coordinates: null,
        });
    };

    const isCurrentAddressComplete =
        user?.name && user?.phone && user?.address;
    const isNewAddressComplete =
        newAddress.fullName && newAddress.phone && newAddress.address;

    return (
        <>
            <div style={{ marginBottom: "24px" }}>
                <h4 style={{ marginBottom: "16px", fontWeight: "600" }}>
                    <EnvironmentOutlined style={{ marginRight: "8px" }} />
                    Chọn địa chỉ giao hàng
                </h4>

                <Radio.Group
                    value={addressType}
                    onChange={handleAddressTypeChange}
                    style={{ width: "100%" }}
                >
                    {/* Option 1: Địa chỉ hiện tại */}
                    <div style={{ marginBottom: "16px" }}>
                        <Radio value="current" style={{ marginBottom: "8px" }}>
                            Sử dụng địa chỉ hiện tại
                        </Radio>

                        {addressType === "current" && (
                            <Card
                                size="small"
                                style={{
                                    marginLeft: "24px",
                                    backgroundColor: isCurrentAddressComplete
                                        ? "#f6ffed"
                                        : "#fff2e8",
                                    border: isCurrentAddressComplete
                                        ? "1px solid #b7eb8f"
                                        : "1px solid #ffb366",
                                }}
                            >
                                {isCurrentAddressComplete ? (
                                    <div>
                                        <p style={{ margin: "4px 0" }}>
                                            <UserOutlined
                                                style={{ marginRight: "8px" }}
                                            />
                                            <strong>{user?.name}</strong>
                                        </p>
                                        <p style={{ margin: "4px 0" }}>
                                            <PhoneOutlined
                                                style={{ marginRight: "8px" }}
                                            />
                                            {user?.phone}
                                        </p>
                                        <p style={{ margin: "4px 0" }}>
                                            <HomeOutlined
                                                style={{ marginRight: "8px" }}
                                            />
                                            {user?.address}
                                        </p>
                                    </div>
                                ) : (
                                    <div style={{ color: "#fa8c16" }}>
                                        ⚠️ Thông tin địa chỉ chưa đầy đủ. Vui
                                        lòng cập nhật trong tài khoản hoặc chọn
                                        địa chỉ mới.
                                    </div>
                                )}
                            </Card>
                        )}
                    </div>

                    {/* Option 2: Địa chỉ mới */}
                    <div>
                        <Radio value="new" style={{ marginBottom: "8px" }}>
                            Nhập địa chỉ mới cho đơn hàng này
                        </Radio>

                        {addressType === "new" && isNewAddressComplete && (
                            <Card
                                size="small"
                                style={{
                                    marginLeft: "24px",
                                    backgroundColor: "#f6ffed",
                                    border: "1px solid #b7eb8f",
                                }}
                            >
                                <div>
                                    <p style={{ margin: "4px 0" }}>
                                        <UserOutlined
                                            style={{ marginRight: "8px" }}
                                        />
                                        <strong>{newAddress.fullName}</strong>
                                    </p>
                                    <p style={{ margin: "4px 0" }}>
                                        <PhoneOutlined
                                            style={{ marginRight: "8px" }}
                                        />
                                        {newAddress.phone}
                                    </p>
                                    <p style={{ margin: "4px 0" }}>
                                        <HomeOutlined
                                            style={{ marginRight: "8px" }}
                                        />
                                        {newAddress.address}
                                    </p>
                                    <button
                                        onClick={() =>
                                            setShowNewAddressModal(true)
                                        }
                                        style={{
                                            fontSize: "12px",
                                            color: "#1890ff",
                                            background: "none",
                                            border: "none",
                                            padding: "0",
                                            cursor: "pointer",
                                            textDecoration: "underline"
                                        }}
                                    >
                                        Chỉnh sửa
                                    </button>
                                </div>
                            </Card>
                        )}
                    </div>
                </Radio.Group>
            </div>

            {/* Modal for New Address Form */}
            <Modal
                title="Nhập địa chỉ giao hàng mới"
                open={showNewAddressModal}
                onOk={handleSaveNewAddress}
                onCancel={handleCancelNewAddress}
                okText="Lưu địa chỉ"
                cancelText="Hủy"
                width="90%"
                style={{ maxWidth: "800px", top: 20 }}
                centered
                destroyOnClose
                afterOpenChange={(open) => {
                    // Trigger map resize khi modal mở/đóng
                    if (open) {
                        setTimeout(() => {
                            window.dispatchEvent(new Event('resize'));
                        }, 300);
                    }
                }}
            >
                <Form
                    form={newAddressForm}
                    layout="vertical"
                    size="middle"
                    initialValues={{
                        fullName: newAddress.fullName,
                        phone: newAddress.phone,
                        address: newAddress.address,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            gap: "16px",
                            flexWrap: "wrap",
                            marginBottom: "24px",
                        }}
                    >
                        <Form.Item
                            label="Họ và tên"
                            name="fullName"
                            style={{ flex: "1 1 300px", minWidth: "200px" }}
                            initialValue={user?.name || ""}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập họ tên!",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Nhập họ và tên người nhận"
                                prefix={<UserOutlined />}
                                onChange={(e) =>
                                    handleNewAddressChange(
                                        "fullName",
                                        e.target.value
                                    )
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            style={{ flex: "1 1 300px", minWidth: "200px" }}
                            initialValue={user?.phone || ""}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập số điện thoại!",
                                },
                                {
                                    pattern: /^[0-9]{10,11}$/,
                                    message: "Số điện thoại không hợp lệ!",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Nhập số điện thoại"
                                prefix={<PhoneOutlined />}
                                onChange={(e) =>
                                    handleNewAddressChange(
                                        "phone",
                                        e.target.value
                                    )
                                }
                            />
                        </Form.Item>
                    </div>

                    {/* AddressMapPicker Component - chỉ hiển thị khi showMapPicker = true */}
                    {showMapPicker ? (
                        <AddressMapPicker
                            onAddressSelect={handleAddressSelect}
                            currentAddress={newAddress.address}
                            isVisible={showNewAddressModal}
                        />
                    ) : (
                        /* Form nhập địa chỉ thủ công khi không dùng map */
                        <Form.Item
                            label="Địa chỉ chi tiết"
                            name="address"
                            initialValue={newAddress.address}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập địa chỉ!",
                                },
                            ]}
                        >
                            <Input.TextArea
                                placeholder="Nhập địa chỉ chi tiết (số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố)"
                                rows={3}
                                onChange={(e) =>
                                    handleNewAddressChange(
                                        "address",
                                        e.target.value
                                    )
                                }
                            />
                        </Form.Item>
                    )}
                </Form>
            </Modal>
        </>
    );
};

export default AddressSelector;
