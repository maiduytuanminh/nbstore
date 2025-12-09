import React, { useMemo } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { message } from "antd";

import * as OrderService from "../../services/OrderService";
import { orderContant } from "../../contant";
import { convertPrice } from "../../utils";
import Loading from "../../components/LoadingComponent/Loading";

import {
    WrapperContainer,
    WrapperContent,
    PageHeader,
    PageTitle,
    OrderSummary,
    SummaryCard,
    StatusSection,
    StatusGrid,
    StatusCard,
    StatusTitle,
    StatusBadge,
    PaymentStatus,
    InfoSection,
    ProductSection,
    ProductHeader,
    ProductTitle,
    ProductTable,
    TableHeader,
    TableRow,
    ProductInfo,
    ProductImage,
    ProductName,
    ProductPrice,
    ProductQuantity,
    ProductDiscount,
    PricingSection,
    PricingGrid,
    PricingRow,
    PricingLabel,
    PricingValue,
    ActionSection,
    ActionButton,
} from "./style";

const DetailsOrderPage = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const { id } = params;
    const queryClient = useQueryClient();

    const fetchDetailsOrder = async () => {
        const res = await OrderService.getDetailsOrder(id, state?.token);
        return res.data;
    };

    const queryOrder = useQuery(["orders-details", id], fetchDetailsOrder, {
        enabled: !!id,
    });
    const { isLoading, data } = queryOrder;

    // Mutation để hủy đơn hàng
    const cancelOrderMutation = useMutation({
        mutationFn: () =>
            OrderService.cancelOrder(id, state?.token, data?.orderItems),
        onSuccess: () => {
            message.success("Đơn hàng đã được hủy thành công");
            queryClient.invalidateQueries(["orders-details"]);
            queryClient.invalidateQueries(["orders"]);
        },
        onError: () => {
            message.error("Có lỗi xảy ra khi hủy đơn hàng");
        },
    });

    // Status configurations
    const statusConfig = {
        pending: { color: "pending", text: "Chờ phê duyệt", icon: "⏳" },
        approved: { color: "approved", text: "Đã phê duyệt", icon: "✅" },
        paid: { color: "paid", text: "Đã thanh toán", icon: "💳" },
        shipping: { color: "shipping", text: "Đang giao", icon: "🚚" },
        delivered: { color: "delivered", text: "Đã giao", icon: "📦" },
        cancelled: { color: "cancelled", text: "Đã hủy", icon: "❌" },
        rejected: { color: "rejected", text: "Đã từ chối", icon: "🚫" },
    };

    const getStatusBadge = (status) => {
        const config = statusConfig[status] || {
            color: "pending",
            text: status,
            icon: "❓",
        };
        return (
            <StatusBadge className={config.color}>
                <span>{config.icon}</span>
                <span>{config.text}</span>
            </StatusBadge>
        );
    };

    const canCancelOrder = (status) => {
        return ["pending", "approved"].includes(status);
    };

    const handleCancelOrder = () => {
        if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) {
            cancelOrderMutation.mutate();
        }
    };

    const priceMemo = useMemo(() => {
        const result = data?.orderItems?.reduce((total, cur) => {
            return total + cur.price * cur.amount;
        }, 0);
        return result;
    }, [data]);

    // Tính toán phí vận chuyển theo quy tắc mới: miễn phí cho đơn hàng từ 500k trở lên
    const calculatedShippingPrice = useMemo(() => {
        if (priceMemo >= 500000) {
            return 0; // Miễn phí vận chuyển cho đơn hàng từ 500k trở lên
        }
        if (priceMemo === 0) {
            return 0;
        }
        return 10000; // Phí vận chuyển cho đơn hàng dưới 500k
    }, [priceMemo]);

    // Tính toán lại tổng giá trị đơn hàng với phí vận chuyển mới
    const calculatedTotalPrice = useMemo(() => {
        return priceMemo + calculatedShippingPrice;
    }, [priceMemo, calculatedShippingPrice]);

    const formatOrderDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const generateOrderNumber = (orderId) => {
        return `TM${orderId?.slice(-8).toUpperCase()}`;
    };

    if (isLoading) {
        return <Loading isLoading={true} />;
    }

    if (!data) {
        return (
            <WrapperContainer>
                <WrapperContent>
                    <PageHeader>
                        <PageTitle>❌ Không tìm thấy đơn hàng</PageTitle>
                        <ActionButton
                            className="back"
                            onClick={() => navigate("/my-order")}
                        >
                            ← Quay lại danh sách đơn hàng
                        </ActionButton>
                    </PageHeader>
                </WrapperContent>
            </WrapperContainer>
        );
    }

    return (
        <WrapperContainer>
            <WrapperContent>
                <PageHeader>
                    <PageTitle>
                        📋 Chi tiết đơn hàng #{generateOrderNumber(data._id)}
                    </PageTitle>

                    <OrderSummary>
                        <SummaryCard>
                            <div className="summary-label">Ngày đặt hàng</div>
                            <div className="summary-value">
                                {formatOrderDate(data.createdAt)}
                            </div>
                        </SummaryCard>
                        <SummaryCard>
                            <div className="summary-label">Tổng tiền</div>
                            <div className="summary-value">
                                {convertPrice(data.totalPrice)}
                            </div>
                        </SummaryCard>
                        <SummaryCard>
                            <div className="summary-label">
                                Phương thức thanh toán
                            </div>
                            <div className="summary-value">
                                {orderContant.payment[data.paymentMethod]}
                            </div>
                        </SummaryCard>
                        <SummaryCard>
                            <div className="summary-label">
                                Số lượng sản phẩm
                            </div>
                            <div className="summary-value">
                                {data.orderItems?.length || 0}
                            </div>
                        </SummaryCard>
                    </OrderSummary>
                </PageHeader>

                <StatusSection>
                    <StatusGrid>
                        <StatusCard>
                            <StatusTitle>🎯 Trạng thái đơn hàng</StatusTitle>
                            {getStatusBadge(data.status)}
                            <PaymentStatus isPaid={data.isPaid}>
                                <span className="payment-label">
                                    Thanh toán:
                                </span>
                                <span className="payment-value">
                                    {data.isPaid
                                        ? "Đã thanh toán"
                                        : "Chưa thanh toán"}
                                </span>
                            </PaymentStatus>
                        </StatusCard>

                        <StatusCard>
                            <StatusTitle>🏠 Địa chỉ giao hàng</StatusTitle>
                            <InfoSection>
                                <div className="info-value">
                                    {data.shippingAddress?.fullName}
                                </div>
                                <div className="info-sub">
                                    📍 {data.shippingAddress?.address},{" "}
                                    {data.shippingAddress?.city}
                                </div>
                                <div className="info-sub">
                                    📞 {data.shippingAddress?.phone}
                                </div>
                            </InfoSection>
                        </StatusCard>

                        <StatusCard>
                            <StatusTitle>🚚 Thông tin giao hàng</StatusTitle>
                            <InfoSection>
                                <div className="info-value">
                                    <span
                                        style={{
                                            color: "#f59e0b",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        FAST
                                    </span>{" "}
                                    Giao hàng tiết kiệm
                                </div>
                                <div className="info-sub">
                                    Phí giao hàng:{" "}
                                    {convertPrice(calculatedShippingPrice)}
                                    {calculatedShippingPrice === 0 && priceMemo >= 500000 && (
                                        <span style={{ color: '#52c41a', marginLeft: '8px', fontSize: '12px' }}>
                                            (Miễn phí)
                                        </span>
                                    )}
                                </div>
                            </InfoSection>
                        </StatusCard>

                        <StatusCard>
                            <StatusTitle>💳 Phương thức thanh toán</StatusTitle>
                            <InfoSection>
                                <div className="info-value">
                                    {orderContant.payment[data.paymentMethod]}
                                </div>
                                <div className="info-sub">
                                    Trạng thái:{" "}
                                    {data.isPaid
                                        ? "Đã thanh toán"
                                        : "Chưa thanh toán"}
                                </div>
                            </InfoSection>
                        </StatusCard>
                    </StatusGrid>
                </StatusSection>

                <ProductSection>
                    <ProductHeader>
                        <ProductTitle>🛍️ Sản phẩm đã đặt</ProductTitle>
                    </ProductHeader>

                    <ProductTable>
                        <TableHeader>
                            <div className="product-col">Sản phẩm</div>
                            <div className="price-col">Đơn giá</div>
                            <div className="quantity-col">Số lượng</div>
                            <div className="discount-col">Giảm giá</div>
                            <div className="total-col">Thành tiền</div>
                        </TableHeader>

                        {data.orderItems?.map((item, index) => (
                            <TableRow key={index}>
                                <ProductInfo>
                                    <ProductImage
                                        src={item.images?.[0] || item.image}
                                        alt={item.name}
                                    />
                                    <ProductName>{item.name}</ProductName>
                                </ProductInfo>
                                <ProductPrice>
                                    {convertPrice(item.price)}
                                </ProductPrice>
                                <ProductQuantity>
                                    x{item.amount}
                                </ProductQuantity>
                                <ProductDiscount>
                                    {item.discount ? `${item.discount}%` : "-"}
                                </ProductDiscount>
                                <ProductPrice>
                                    {convertPrice(item.price * item.amount)}
                                </ProductPrice>
                            </TableRow>
                        ))}
                    </ProductTable>
                </ProductSection>

                <PricingSection>
                    <PricingGrid>
                        <PricingRow>
                            <PricingLabel>Tạm tính</PricingLabel>
                            <PricingValue>
                                {convertPrice(priceMemo)}
                            </PricingValue>
                        </PricingRow>
                        <PricingRow>
                            <PricingLabel>Phí vận chuyển</PricingLabel>
                            <PricingValue>
                                {convertPrice(calculatedShippingPrice)}
                                {calculatedShippingPrice === 0 && priceMemo >= 500000 && (
                                    <span style={{ color: '#52c41a', marginLeft: '8px', fontSize: '12px' }}>
                                        (Miễn phí)
                                    </span>
                                )}
                            </PricingValue>
                        </PricingRow>
                        <PricingRow className="total">
                            <PricingLabel className="total">
                                Tổng cộng
                            </PricingLabel>
                            <PricingValue className="total">
                                {convertPrice(calculatedTotalPrice)}
                            </PricingValue>
                        </PricingRow>
                    </PricingGrid>
                </PricingSection>

                <ActionSection>
                    <ActionButton
                        className="back"
                        onClick={() => navigate("/my-order")}
                    >
                        ← Quay lại danh sách đơn hàng
                    </ActionButton>

                    {canCancelOrder(data.status) && (
                        <ActionButton
                            className="cancel"
                            onClick={handleCancelOrder}
                            disabled={cancelOrderMutation.isLoading}
                        >
                            {cancelOrderMutation.isLoading
                                ? "Đang hủy..."
                                : "❌ Hủy đơn hàng"}
                        </ActionButton>
                    )}
                </ActionSection>
            </WrapperContent>
        </WrapperContainer>
    );
};

export default DetailsOrderPage;
