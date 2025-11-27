import React from "react";
import {
    WrapperContainer,
    WrapperContent,
    SuccessHeader,
    SuccessIcon,
    SuccessTitle,
    SuccessSubtitle,
    OrderNumber,
    ContentGrid,
    OrderDetailsSection,
    SectionTitle,
    InfoCard,
    OrderItemsList,
    OrderItem,
    ItemImage,
    ItemInfo,
    ItemName,
    ItemDetails,
    OrderSummary,
    SummaryHeader,
    SummaryTitle,
    SummarySubtitle,
    SummaryContent,
    SummaryRow,
    TotalRow,
    TrackingSection,
    TrackingSteps,
    TrackingStep,
    ActionButtons,
    ActionButton,
    ContactInfo,
} from "./style";
import Loading from "../../components/LoadingComponent/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import { orderContant } from "../../contant";
import { convertPrice } from "../../utils";

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;

    // Generate order number (in real app, this would come from backend)
    const orderNumber = `TM${Date.now().toString().slice(-8).toUpperCase()}`;
    const estimatedDelivery = new Date(
        Date.now() + 3 * 24 * 60 * 60 * 1000
    ).toLocaleDateString("vi-VN");

    const trackingSteps = [
        {
            id: 1,
            title: "Đơn hàng đã được xác nhận",
            description: "Chúng tôi đã nhận được đơn hàng của bạn",
            status: "completed",
            icon: "✓",
        },
        {
            id: 2,
            title: "Đang chuẩn bị hàng",
            description: "Đội ngũ của chúng tôi đang đóng gói sản phẩm",
            status: "active",
            icon: "📦",
        },
        {
            id: 3,
            title: "Đang vận chuyển",
            description: "Sản phẩm đang trên đường đến với bạn",
            status: "pending",
            icon: "🚚",
        },
        {
            id: 4,
            title: "Đã giao hàng",
            description: "Sản phẩm đã được giao thành công",
            status: "pending",
            icon: "🎉",
        },
    ];

    const handleContinueShopping = () => {
        navigate("/");
    };

    const handleViewOrders = () => {
        navigate("/my-order");
    };

    const calculateSubtotal = () => {
        return (
            state.orders?.reduce((total, order) => {
                return total + order.price * order.amount;
            }, 0) || 0
        );
    };

    const calculateDiscount = () => {
        return (
            state.orders?.reduce((total, order) => {
                const discount = order.discount || 0;
                return total + (order.price * order.amount * discount) / 100;
            }, 0) || 0
        );
    };

    const getShippingCost = () => {
        const subtotal = calculateSubtotal();
        if (subtotal >= 500000) return 0; // Miễn phí vận chuyển cho đơn hàng từ 500k trở lên
        if (subtotal === 0) return 0;
        return 10000; // Phí vận chuyển cho đơn hàng dưới 500k
    };

    if (!state) {
        return (
            <WrapperContainer>
                <WrapperContent>
                    <div style={{ textAlign: "center", padding: "48px 0" }}>
                        <h2>Không tìm thấy thông tin đơn hàng</h2>
                        <ActionButton
                            className="primary"
                            onClick={handleContinueShopping}
                        >
                            Về trang chủ
                        </ActionButton>
                    </div>
                </WrapperContent>
            </WrapperContainer>
        );
    }

    return (
        <WrapperContainer>
            <Loading isLoading={false}>
                <WrapperContent>
                    <SuccessHeader>
                        <SuccessIcon>✓</SuccessIcon>
                        <SuccessTitle>🎉 Đặt hàng thành công!</SuccessTitle>
                        <SuccessSubtitle>
                            Cảm ơn bạn đã tin tương và mua sắm tại NBStore. Đơn
                            hàng của bạn đã được xác nhận và đang được xử lý.
                        </SuccessSubtitle>
                        <OrderNumber>
                            📋 Mã đơn hàng: <strong>{orderNumber}</strong>
                        </OrderNumber>
                    </SuccessHeader>

                    <ContentGrid>
                        <div>
                            <OrderDetailsSection>
                                <SectionTitle>
                                    📦 Chi tiết đơn hàng
                                </SectionTitle>

                                <div
                                    style={{
                                        display: "grid",
                                        gap: "16px",
                                        gridTemplateColumns:
                                            "repeat(auto-fit, minmax(300px, 1fr))",
                                        marginBottom: "24px",
                                    }}
                                >
                                    <InfoCard>
                                        <div className="label">
                                            🚚 Phương thức giao hàng
                                        </div>
                                        <div className="value">
                                            {
                                                orderContant.delivery[
                                                    state?.delivery
                                                ]
                                            }{" "}
                                            - Giao hàng tiết kiệm
                                        </div>
                                    </InfoCard>

                                    <InfoCard>
                                        <div className="label">
                                            💰 Phương thức thanh toán
                                        </div>
                                        <div className="value">
                                            {
                                                orderContant.payment[
                                                    state?.payment
                                                ]
                                            }
                                        </div>
                                    </InfoCard>

                                    <InfoCard>
                                        <div className="label">
                                            📅 Dự kiến giao hàng
                                        </div>
                                        <div className="value">
                                            {estimatedDelivery}
                                        </div>
                                    </InfoCard>

                                    <InfoCard>
                                        <div className="label">
                                            📞 Hotline hỗ trợ
                                        </div>
                                        <div className="value">
                                            1900 9999 (24/7)
                                        </div>
                                    </InfoCard>
                                </div>

                                <SectionTitle>🛍️ Sản phẩm đã đặt</SectionTitle>

                                <OrderItemsList>
                                    {state.orders?.map((order, index) => (
                                        <OrderItem key={index}>
                                            <ItemImage
                                                src={
                                                    order.images?.[0] ||
                                                    order.image
                                                }
                                                alt={order.name}
                                            />
                                            <ItemInfo>
                                                <ItemName>
                                                    {order.name}
                                                </ItemName>
                                                <ItemDetails>
                                                    <div className="detail-item">
                                                        <span className="label">
                                                            Giá:
                                                        </span>
                                                        <span className="value">
                                                            {convertPrice(
                                                                order.price
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="detail-item">
                                                        <span className="label">
                                                            Số lượng:
                                                        </span>
                                                        <span className="value">
                                                            {order.amount}
                                                        </span>
                                                    </div>
                                                    <div className="detail-item">
                                                        <span className="label">
                                                            Thành tiền:
                                                        </span>
                                                        <span
                                                            className="value"
                                                            style={{
                                                                fontWeight:
                                                                    "600",
                                                                color: "#3b82f6",
                                                            }}
                                                        >
                                                            {convertPrice(
                                                                order.price *
                                                                    order.amount
                                                            )}
                                                        </span>
                                                    </div>
                                                </ItemDetails>
                                            </ItemInfo>
                                        </OrderItem>
                                    ))}
                                </OrderItemsList>
                            </OrderDetailsSection>

                            <TrackingSection>
                                <SectionTitle>
                                    🚛 Theo dõi đơn hàng
                                </SectionTitle>
                                <TrackingSteps>
                                    {trackingSteps.map((step) => (
                                        <TrackingStep key={step.id}>
                                            <div
                                                className={`step-icon ${step.status}`}
                                            >
                                                {step.icon}
                                            </div>
                                            <div className="step-content">
                                                <div className="step-title">
                                                    {step.title}
                                                </div>
                                                <div className="step-description">
                                                    {step.description}
                                                </div>
                                            </div>
                                        </TrackingStep>
                                    ))}
                                </TrackingSteps>
                            </TrackingSection>
                        </div>

                        <div>
                            <OrderSummary>
                                <SummaryHeader>
                                    <SummaryTitle>
                                        💳 Tóm tắt đơn hàng
                                    </SummaryTitle>
                                    <SummarySubtitle>
                                        Mã đơn: {orderNumber}
                                    </SummarySubtitle>
                                </SummaryHeader>

                                <SummaryContent>
                                    <SummaryRow>
                                        <span className="label">
                                            Tạm tính ({state.orders?.length} sản
                                            phẩm):
                                        </span>
                                        <span className="value">
                                            {convertPrice(calculateSubtotal())}
                                        </span>
                                    </SummaryRow>

                                    <SummaryRow>
                                        <span className="label">Giảm giá:</span>
                                        <span className="value">
                                            -{convertPrice(calculateDiscount())}
                                        </span>
                                    </SummaryRow>

                                    <SummaryRow>
                                        <span className="label">
                                            Phí vận chuyển:
                                        </span>
                                        <span className="value">
                                            {convertPrice(getShippingCost())}
                                        </span>
                                    </SummaryRow>

                                    <TotalRow>
                                        <span className="label">
                                            Tổng cộng:
                                        </span>
                                        <span className="value">
                                            {convertPrice(
                                                state?.totalPriceMemo
                                            )}
                                        </span>
                                    </TotalRow>
                                </SummaryContent>
                            </OrderSummary>

                            <ActionButtons>
                                <ActionButton
                                    className="primary"
                                    onClick={handleViewOrders}
                                >
                                    📋 Xem đơn hàng của tôi
                                </ActionButton>
                                <ActionButton
                                    className="secondary"
                                    onClick={handleContinueShopping}
                                >
                                    🛍️ Tiếp tục mua sắm
                                </ActionButton>
                            </ActionButtons>

                            <ContactInfo>
                                <div className="title">📞 Cần hỗ trợ?</div>
                                <div className="content">
                                    Liên hệ hotline <strong>1900 9999</strong>{" "}
                                    hoặc email{" "}
                                    <strong>support@nbstore.vn</strong> để được
                                    hỗ trợ 24/7.
                                </div>
                            </ContactInfo>
                        </div>
                    </ContentGrid>
                </WrapperContent>
            </Loading>
        </WrapperContainer>
    );
};

export default OrderSuccess;
