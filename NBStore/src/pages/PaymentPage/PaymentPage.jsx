import { Form, Radio } from "antd";
import React, { useEffect, useState } from "react";
import {
    WrapperContainer,
    WrapperContent,
    PageTitle,
    WrapperMain,
    WrapperLeft,
    WrapperRight,
    PaymentSection,
    SectionTitle,
    WrapperRadio,
    DeliveryOption,
    PaymentOption,
    ShippingInfo,
    ShippingHeader,
    ShippingDetails,
    OrderSummary,
    WrapperInfo,
    WrapperTotal,
    CheckoutButton,
    PayPalWrapper,
} from "./style";

import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import { useMemo } from "react";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import AddressMapPicker from "../../components/AddressMapPicker/AddressMapPicker";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import * as OrderService from "../../services/OrderService";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { useNavigate } from "react-router-dom";
import { removeAllOrderProduct } from "../../redux/slides/orderSlide";
import { PayPalButton } from "react-paypal-button-v2";
import * as PaymentService from "../../services/PaymentService";

const PaymentPage = () => {
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);

    const [delivery, setDelivery] = useState("fast");
    const [payment, setPayment] = useState("later_money");
    const navigate = useNavigate();
    const [sdkReady, setSdkReady] = useState(false);

    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
    const [stateUserDetails, setStateUserDetails] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
    });
    const [shippingAddress, setShippingAddress] = useState({
        fullName: "", // Thêm fullName để lưu họ tên từ form địa chỉ mới
        fullAddress: "",
        street: "",
        district: "",
        city: "",
        province: "",
        phone: "",
        coordinates: null,
    });
    const [form] = Form.useForm();

    const dispatch = useDispatch();

    // Mutation hooks
    const mutationAddOrder = useMutationHooks((data) => {
        const { token, ...rests } = data;
        return OrderService.createOrder({ ...rests }, token);
    });

    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        return UserService.updateUser(id, { ...rests }, token);
    });

    const { isLoading, data } = mutationAddOrder;
    const { isLoading: isLoadingUpdate, data: dataUpdated } = mutationUpdate;
    const { isLoading: isLoadingAddOrder } = mutationAddOrder;

    // Đọc thông tin địa chỉ từ localStorage khi component mount
    useEffect(() => {
        const savedAddress = localStorage.getItem("selectedShippingAddress");
        if (savedAddress) {
            try {
                const addressInfo = JSON.parse(savedAddress);

                if (addressInfo.type === "current") {
                    setStateUserDetails({
                        name: addressInfo.data.fullName,
                        phone: addressInfo.data.phone,
                        address: addressInfo.data.address,
                        city: addressInfo.data.city,
                    });
                    setShippingAddress({
                        fullName: addressInfo.data.fullName, // Lưu fullName từ user current
                        fullAddress: `${addressInfo.data.address}, ${addressInfo.data.city}`,
                        phone: addressInfo.data.phone,
                        city: addressInfo.data.city,
                        street: "",
                        district: "",
                        province: "",
                        coordinates: null,
                    });
                } else if (addressInfo.type === "new") {
                    setStateUserDetails({
                        name: addressInfo.data.fullName,
                        phone: addressInfo.data.phone,
                        address: addressInfo.data.address,
                        city: "",
                    });

                    setShippingAddress({
                        fullName: addressInfo.data.fullName, // Lưu fullName từ form địa chỉ mới
                        fullAddress:
                            addressInfo.data.fullAddress ||
                            addressInfo.data.address,
                        street: addressInfo.data.street || "",
                        district: addressInfo.data.district || "",
                        city: addressInfo.data.city || "",
                        province: addressInfo.data.province || "",
                        phone: addressInfo.data.phone,
                        coordinates: addressInfo.data.coordinates,
                    });
                }
            } catch (error) {
                console.error("Error parsing saved address:", error);
            }
        }
    }, []);

    useEffect(() => {
        form.setFieldsValue(stateUserDetails);
    }, [form, stateUserDetails]);

    useEffect(() => {
        if (isOpenModalUpdateInfo) {
            setStateUserDetails({
                city: user?.city,
                name: user?.name,
                address: user?.address,
                phone: user?.phone,
            });
            setShippingAddress({
                fullAddress: `${user?.address || ""} ${
                    user?.city || ""
                }`.trim(),
                phone: user?.phone || "",
                city: user?.city || "",
                street: "",
                district: "",
                province: "",
                coordinates: null,
            });
        }
    }, [isOpenModalUpdateInfo, user]);

    // Price calculations
    const priceMemo = useMemo(() => {
        const result = order?.orderItemsSlected?.reduce((total, cur) => {
            return total + cur.price * cur.amount;
        }, 0);
        return result;
    }, [order]);

    const priceDiscountMemo = useMemo(() => {
        const result = order?.orderItemsSlected?.reduce((total, cur) => {
            const totalDiscount = cur.discount ? cur.discount : 0;
            return total + (priceMemo * (totalDiscount * cur.amount)) / 100;
        }, 0);
        if (Number(result)) {
            return result;
        }
        return 0;
    }, [order]);

    const diliveryPriceMemo = useMemo(() => {
        if (priceMemo >= 20000 && priceMemo < 500000) {
            return 10000;
        } else if (priceMemo >= 500000 || order?.orderItemsSlected?.length === 0) {
            return 0; // Free ship cho đơn hàng từ 500k trở lên hoặc giỏ hàng trống
        } else {
            return 20000;
        }
    }, [priceMemo]);

    const totalPriceMemo = useMemo(() => {
        return (
            Number(priceMemo) -
            Number(priceDiscountMemo) +
            Number(diliveryPriceMemo)
        );
    }, [priceMemo, priceDiscountMemo, diliveryPriceMemo]);

    // Event handlers
    const handleAddOrder = () => {
        // Ưu tiên thông tin từ địa chỉ giao hàng đã chọn
        const orderFullName = shippingAddress.fullName || stateUserDetails.name || user?.name;
        const orderPhone =
            shippingAddress.phone || stateUserDetails.phone || user?.phone;
        const orderAddress =
            shippingAddress.fullAddress ||
            stateUserDetails.address ||
            user?.address;

        if (
            user?.access_token &&
            order?.orderItemsSlected &&
            orderFullName &&
            orderAddress &&
            orderPhone &&
            priceMemo &&
            user?.id
        ) {
            mutationAddOrder.mutate({
                token: user?.access_token,
                orderItems: order?.orderItemsSlected,
                fullName: orderFullName,
                address: orderAddress,
                phone: orderPhone,
                city: stateUserDetails.city || user?.city,
                paymentMethod: payment,
                itemsPrice: priceMemo,
                shippingPrice: diliveryPriceMemo,
                totalPrice: totalPriceMemo,
                user: user?.id,
                email: user?.email,
                shippingAddress: {
                    fullName: orderFullName,
                    address: orderAddress, // Thêm field address (required)
                    phone: orderPhone,
                    city: shippingAddress.city || stateUserDetails.city || user?.city,
                    fullAddress: orderAddress,
                    street: shippingAddress.street,
                    district: shippingAddress.district,
                    province: shippingAddress.province,
                    coordinates: shippingAddress.coordinates,
                },
            });
        } else {
            message.error(
                "Thông tin đặt hàng chưa đầy đủ. Vui lòng quay lại trang đặt hàng để kiểm tra."
            );
        }
    };

    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true);
    };

    const handleCancleUpdate = () => {
        setStateUserDetails({
            name: "",
            email: "",
            phone: "",
            isAdmin: false,
        });
        form.resetFields();
        setIsOpenModalUpdateInfo(false);
    };

    const onSuccessPaypal = (details, data) => {
        // Ưu tiên thông tin từ địa chỉ giao hàng đã chọn
        const orderFullName = shippingAddress.fullName || stateUserDetails.name || user?.name;
        const orderPhone =
            shippingAddress.phone || stateUserDetails.phone || user?.phone;
        const orderAddress =
            shippingAddress.fullAddress ||
            stateUserDetails.address ||
            user?.address;

        mutationAddOrder.mutate({
            token: user?.access_token,
            orderItems: order?.orderItemsSlected,
            fullName: orderFullName,
            address: orderAddress,
            phone: orderPhone,
            city: stateUserDetails.city || user?.city,
            paymentMethod: payment,
            itemsPrice: priceMemo,
            shippingPrice: diliveryPriceMemo,
            totalPrice: totalPriceMemo,
            user: user?.id,
            email: user?.email,
            isPaid: false, // Thay đổi từ true thành false để giữ trạng thái "chờ xử lý"
            paidAt: details.update_time, // Vẫn lưu thời gian thanh toán PayPal
            shippingAddress: {
                fullName: orderFullName,
                address: orderAddress, // Thêm field address (required)
                phone: orderPhone,
                city: shippingAddress.city || stateUserDetails.city || user?.city,
                fullAddress: orderAddress,
                street: shippingAddress.street,
                district: shippingAddress.district,
                province: shippingAddress.province,
                coordinates: shippingAddress.coordinates,
            },
        });
    };

    const handleUpdateInforUser = () => {
        const { name, address, city, phone } = stateUserDetails;
        if (name && address && city && phone) {
            mutationUpdate.mutate(
                {
                    id: user?.id,
                    token: user?.access_token,
                    ...stateUserDetails,
                },
                {
                    onSuccess: () => {
                        dispatch(updateUser({ name, address, city, phone }));
                        setIsOpenModalUpdateInfo(false);
                    },
                }
            );
        }
    };

    const handleOnchangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleDilivery = (e) => {
        setDelivery(e.target.value);
    };

    const handlePayment = (e) => {
        setPayment(e.target.value);
    };

    const addPaypalScript = async () => {
        const { data } = await PaymentService.getConfig();
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        };
        document.body.appendChild(script);
    };

    const handleAddressSelect = (addressData) => {
        setShippingAddress({
            fullAddress: addressData.fullAddress,
            street: addressData.street,
            district: addressData.district,
            city: addressData.city,
            province: addressData.province,
            phone: addressData.phone,
            coordinates: addressData.coordinates,
        });

        setStateUserDetails((prev) => ({
            ...prev,
            address: addressData.fullAddress,
            phone: addressData.phone,
        }));
    };

    // Effects
    useEffect(() => {
        if (data?.status === "OK") {
            const arrayOrdered = [];
            order?.orderItemsSlected?.forEach((element) => {
                arrayOrdered.push(element.product);
            });
            dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }));
            message.success("Đặt hàng thành công");
            navigate("/orderSuccess", {
                state: {
                    delivery,
                    payment,
                    orders: order?.orderItemsSlected,
                    totalPriceMemo: totalPriceMemo,
                },
            });
        } else if (data?.status === "ERR") {
            message.error();
        }
    }, [data]);

    useEffect(() => {
        if (dataUpdated?.status === "OK") {
            message.success();
            handleGetDetailsUser(user?.id, user?.access_token);
        } else if (dataUpdated?.status === "ERR") {
            message.error();
        }
    }, [dataUpdated]);

    const handleGetDetailsUser = async (id, token) => {
        const storage = localStorage.getItem("refresh_token");
        const refreshToken = JSON.parse(storage);
        const res = await UserService.getDetailsUser(id, token);
        dispatch(
            updateUser({
                ...res?.data,
                access_token: token,
                refreshToken: refreshToken,
            })
        );
    };

    useEffect(() => {
        if (!window.paypal) {
            addPaypalScript();
        } else {
            setSdkReady(true);
        }
    }, []);

    return (
        <WrapperContainer>
            <Loading isLoading={isLoadingAddOrder}>
                <WrapperContent>
                    <PageTitle>💳 Thanh toán đơn hàng</PageTitle>

                    <WrapperMain>
                        <WrapperLeft>
                            <PaymentSection>
                                <SectionTitle>
                                    🚚 Phương thức giao hàng
                                </SectionTitle>
                                <WrapperRadio
                                    onChange={handleDilivery}
                                    value={delivery}
                                >
                                    <Radio value="fast">
                                        <DeliveryOption>
                                            <div>
                                                <div className="delivery-logo">
                                                    ⚡ FAST
                                                </div>
                                                <div className="delivery-description">
                                                    Giao hàng nhanh - Nhận hàng
                                                    trong 1-2 ngày
                                                </div>
                                            </div>
                                        </DeliveryOption>
                                    </Radio>
                                    <Radio value="gojek">
                                        <DeliveryOption>
                                            <div>
                                                <div className="delivery-logo">
                                                    🛵 GO_JEK
                                                </div>
                                                <div className="delivery-description">
                                                    Giao hàng tiết kiệm - Nhận
                                                    hàng trong 3-5 ngày
                                                </div>
                                            </div>
                                        </DeliveryOption>
                                    </Radio>
                                </WrapperRadio>
                            </PaymentSection>

                            <PaymentSection>
                                <SectionTitle>
                                    💰 Phương thức thanh toán
                                </SectionTitle>
                                <WrapperRadio
                                    onChange={handlePayment}
                                    value={payment}
                                >
                                    <Radio value="later_money">
                                        <PaymentOption>
                                            <div>
                                                <div className="payment-icon">
                                                    💵
                                                </div>
                                                <div>
                                                    Thanh toán tiền mặt khi nhận
                                                    hàng
                                                </div>
                                                <div className="payment-description">
                                                    Thanh toán trực tiếp cho
                                                    nhân viên giao hàng
                                                </div>
                                            </div>
                                        </PaymentOption>
                                    </Radio>
                                    <Radio value="paypal">
                                        <PaymentOption>
                                            <div>
                                                <div className="payment-icon">
                                                    🌐
                                                </div>
                                                <div>
                                                    Thanh toán bằng PayPal
                                                </div>
                                                <div className="payment-description">
                                                    Thanh toán an toàn qua
                                                    PayPal
                                                </div>
                                            </div>
                                        </PaymentOption>
                                    </Radio>
                                </WrapperRadio>
                            </PaymentSection>
                        </WrapperLeft>

                        <WrapperRight>
                            <ShippingInfo>
                                <ShippingHeader>
                                    <div className="title">
                                        📦 Thông tin giao hàng
                                    </div>
                                </ShippingHeader>
                                <ShippingDetails>
                                    <div className="detail-row">
                                        <div className="label">
                                            👤 Người nhận:
                                        </div>
                                        <div className="value">
                                            {stateUserDetails.name ||
                                                user?.name}
                                        </div>
                                    </div>
                                    <div className="detail-row">
                                        <div className="label">
                                            📞 Số điện thoại:
                                        </div>
                                        <div className="value">
                                            {shippingAddress.phone ||
                                                stateUserDetails.phone ||
                                                user?.phone}
                                        </div>
                                    </div>
                                    <div className="detail-row">
                                        <div className="label">📍 Địa chỉ:</div>
                                        <div className="value">
                                            {shippingAddress.fullAddress ||
                                                `${
                                                    stateUserDetails.address ||
                                                    user?.address
                                                } ${
                                                    stateUserDetails.city ||
                                                    user?.city
                                                }`}
                                        </div>
                                    </div>
                                    <div
                                        className="edit-link"
                                        onClick={() => navigate("/order")}
                                    >
                                        <span>📝</span>
                                        <span>
                                            Chỉnh sửa thông tin giao hàng
                                        </span>
                                    </div>
                                </ShippingDetails>
                            </ShippingInfo>

                            <OrderSummary>
                                <WrapperInfo>
                                    <div className="summary-row">
                                        <div className="label">Tạm tính:</div>
                                        <div className="value">
                                            {convertPrice(priceMemo)}
                                        </div>
                                    </div>
                                    <div className="summary-row">
                                        <div className="label">Giảm giá:</div>
                                        <div className="value">
                                            -{convertPrice(priceDiscountMemo)}
                                        </div>
                                    </div>
                                    <div className="summary-row">
                                        <div className="label">
                                            Phí vận chuyển:
                                        </div>
                                        <div className="value">
                                            {convertPrice(diliveryPriceMemo)}
                                        </div>
                                    </div>
                                </WrapperInfo>

                                <WrapperTotal>
                                    <div className="total-label">
                                        Tổng cộng:
                                    </div>
                                    <div className="total-amount">
                                        <div className="amount">
                                            {convertPrice(totalPriceMemo)}
                                        </div>
                                        <div className="vat-note">
                                            (Đã bao gồm VAT nếu có)
                                        </div>
                                    </div>
                                </WrapperTotal>
                            </OrderSummary>

                            {payment === "paypal" && sdkReady ? (
                                <PayPalWrapper>
                                    <PayPalButton
                                        amount={Math.round(
                                            totalPriceMemo / 30000
                                        )}
                                        onSuccess={onSuccessPaypal}
                                        onError={(error) => {
                                            console.error(
                                                "PayPal Error:",
                                                error
                                            );
                                            message.error(
                                                "Lỗi thanh toán PayPal. Vui lòng thử lại."
                                            );
                                        }}
                                        onCancel={() => {
                                            message.info(
                                                "Bạn đã hủy thanh toán PayPal"
                                            );
                                        }}
                                    />
                                </PayPalWrapper>
                            ) : payment === "paypal" && !sdkReady ? (
                                <PayPalWrapper>
                                    <div className="paypal-loading">
                                        <div className="loading-text">
                                            🔄 Đang tải PayPal...
                                        </div>
                                    </div>
                                </PayPalWrapper>
                            ) : (
                                <CheckoutButton
                                    onClick={() => handleAddOrder()}
                                >
                                    <span>🛒 Đặt hàng ngay</span>
                                </CheckoutButton>
                            )}
                        </WrapperRight>
                    </WrapperMain>
                </WrapperContent>

                <ModalComponent
                    title="🗺️ Cập nhật thông tin giao hàng"
                    open={isOpenModalUpdateInfo}
                    onCancel={handleCancleUpdate}
                    onOk={handleUpdateInforUser}
                    width={800}
                >
                    <Loading isLoading={isLoading}>
                        <AddressMapPicker
                            onAddressSelect={handleAddressSelect}
                            currentAddress={`${stateUserDetails.address} ${stateUserDetails.city}`}
                            currentPhone={stateUserDetails.phone}
                        />
                        <Form
                            name="basic"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                            autoComplete="off"
                            form={form}
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your name!",
                                    },
                                ]}
                            >
                                <InputComponent
                                    value={stateUserDetails["name"]}
                                    onChange={handleOnchangeDetails}
                                    name="name"
                                />
                            </Form.Item>
                            <Form.Item
                                label="City"
                                name="city"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your city!",
                                    },
                                ]}
                            >
                                <InputComponent
                                    value={stateUserDetails["city"]}
                                    onChange={handleOnchangeDetails}
                                    name="city"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your phone!",
                                    },
                                ]}
                            >
                                <InputComponent
                                    value={stateUserDetails.phone}
                                    onChange={handleOnchangeDetails}
                                    name="phone"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Address"
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your address!",
                                    },
                                ]}
                            >
                                <InputComponent
                                    value={stateUserDetails.address}
                                    onChange={handleOnchangeDetails}
                                    name="address"
                                />
                            </Form.Item>
                        </Form>
                    </Loading>
                </ModalComponent>
            </Loading>
        </WrapperContainer>
    );
};

export default PaymentPage;
