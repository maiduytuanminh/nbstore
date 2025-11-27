import React, { useEffect, useState } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import { useQuery } from "@tanstack/react-query";
import * as OrderService from "../../services/OrderService";
import { useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import {
    WrapperContainer,
    WrapperContent,
    PageHeader,
    PageTitle,
    PageSubtitle,
    OrderStats,
    StatCard,
    FilterSection,
    FilterTitle,
    StatusFilter,
    StatusChip,
    WrapperListOrder,
    WrapperItemOrder,
    OrderHeader,
    OrderInfo,
    OrderId,
    WrapperStatus,
    StatusBadge,
    PaymentStatus,
    WrapperHeaderItem,
    ProductImage,
    ProductInfo,
    ProductName,
    ProductPrice,
    WrapperFooterItem,
    TotalPrice,
    ActionButtons,
    ActionButton,
    EmptyState,
} from "./style";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/Message/Message";

const MyOrderPage = () => {
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    const [statusFilter, setStatusFilter] = useState("all");
    const user = useSelector((state) => state?.user);

    // Sử dụng user từ Redux store thay vì location state
    const userId = state?.id || user?.id;
    const token = state?.token || user?.access_token;

    const fetchMyOrder = async () => {
        const res = await OrderService.getOrderByUserId(
            userId,
            token
        );
        return res.data;
    };

    const queryOrder = useQuery(["orders"], fetchMyOrder, {
        enabled: !!(userId && token),
    });
    const { isLoading, data } = queryOrder;

    const mutation = useMutationHooks((data) => {
        const { id, token, orderItems } = data;
        return OrderService.cancelOrder(id, token, orderItems);
    });

    const {
        isLoading: isLoadingCancel,
        isSuccess: isSuccessCancel,
        isError: isErrorCancle,
        data: dataCancel,
    } = mutation;

    useEffect(() => {
        if (isSuccessCancel && dataCancel?.status === "OK") {
            message.success("Hủy đơn hàng thành công");
        } else if (isSuccessCancel && dataCancel?.status === "ERR") {
            message.error(dataCancel?.message);
        } else if (isErrorCancle) {
            message.error("Có lỗi xảy ra khi hủy đơn hàng");
        }
    }, [isErrorCancle, isSuccessCancel, dataCancel?.message, dataCancel?.status]);

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

    const statusFilters = [
        { key: "all", label: "Tất cả", icon: "📋" },
        { key: "pending", label: "Chờ phê duyệt", icon: "⏳" },
        { key: "approved", label: "Đã phê duyệt", icon: "✅" },
        { key: "shipping", label: "Đang giao", icon: "🚚" },
        { key: "delivered", label: "Đã giao", icon: "📦" },
        { key: "cancelled", label: "Đã hủy", icon: "❌" },
    ];

    const handleDetailsOrder = (id) => {
        navigate(`/details-order/${id}`, {
            state: {
                token: token,
            },
        });
    };

    const handleCancelOrder = (order) => {
        mutation.mutate(
            {
                id: order._id,
                token: token,
                orderItems: order?.orderItems,
            },
            {
                onSuccess: () => {
                    queryOrder.refetch();
                },
            }
        );
    };

    const canCancelOrder = (status) => {
        return ["pending", "approved"].includes(status);
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

    // Filter orders based on status
    const filteredOrders = Array.isArray(data)
        ? data.filter((order) => {
              if (statusFilter === "all") return true;
              return order.status === statusFilter;
          })
        : [];

    // Calculate statistics
    const getOrderStats = () => {
        if (!Array.isArray(data))
            return { total: 0, delivered: 0, shipping: 0, pending: 0 };

        return {
            total: data.length,
            delivered: data.filter((order) => order.status === "delivered")
                .length,
            shipping: data.filter((order) => order.status === "shipping")
                .length,
            pending: data.filter((order) =>
                ["pending", "approved"].includes(order.status)
            ).length,
        };
    };

    const stats = getOrderStats();

    const renderProduct = (orderItems) => {
        return orderItems?.map((item, index) => (
            <WrapperHeaderItem key={index}>
                <ProductImage
                    src={item?.images?.[0] || item?.image}
                    alt={item?.name}
                />
                <ProductInfo>
                    <ProductName>{item?.name}</ProductName>
                </ProductInfo>
                <ProductPrice>{convertPrice(item?.price)}</ProductPrice>
            </WrapperHeaderItem>
        ));
    };

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
        return `TM${orderId.slice(-8).toUpperCase()}`;
    };

    if (!token) {
        return (
            <WrapperContainer>
                <WrapperContent>
                    <EmptyState>
                        <div className="empty-icon">🔒</div>
                        <div className="empty-title">Vui lòng đăng nhập</div>
                        <div className="empty-description">
                            Bạn cần đăng nhập để xem đơn hàng của mình
                        </div>
                        <ActionButton
                            className="view"
                            onClick={() => navigate("/sign-in")}
                        >
                            Đăng nhập ngay
                        </ActionButton>
                    </EmptyState>
                </WrapperContent>
            </WrapperContainer>
        );
    }

    return (
        <Loading isLoading={isLoading || isLoadingCancel}>
            <WrapperContainer>
                <WrapperContent>
                    <PageHeader>
                        <PageTitle>📋 Đơn hàng của tôi</PageTitle>
                        <PageSubtitle>
                            Quản lý và theo dõi tất cả đơn hàng của bạn tại
                            NBStore
                        </PageSubtitle>

                        <OrderStats>
                            <StatCard>
                                <div className="stat-number">{stats.total}</div>
                                <div className="stat-label">Tổng đơn hàng</div>
                            </StatCard>
                            <StatCard>
                                <div className="stat-number">
                                    {stats.pending}
                                </div>
                                <div className="stat-label">Đang xử lý</div>
                            </StatCard>
                            <StatCard>
                                <div className="stat-number">
                                    {stats.shipping}
                                </div>
                                <div className="stat-label">Đang giao</div>
                            </StatCard>
                            <StatCard>
                                <div className="stat-number">
                                    {stats.delivered}
                                </div>
                                <div className="stat-label">Đã giao</div>
                            </StatCard>
                        </OrderStats>
                    </PageHeader>

                    <FilterSection>
                        <FilterTitle>🔍 Lọc theo trạng thái</FilterTitle>
                        <StatusFilter>
                            {statusFilters.map((filter) => (
                                <StatusChip
                                    key={filter.key}
                                    active={statusFilter === filter.key}
                                    onClick={() => setStatusFilter(filter.key)}
                                >
                                    <span>{filter.icon}</span>
                                    <span>{filter.label}</span>
                                </StatusChip>
                            ))}
                        </StatusFilter>
                    </FilterSection>

                    {filteredOrders.length === 0 ? (
                        <EmptyState>
                            <div className="empty-icon">📦</div>
                            <div className="empty-title">
                                {statusFilter === "all"
                                    ? "Chưa có đơn hàng nào"
                                    : `Không có đơn hàng ${statusFilters
                                          .find((f) => f.key === statusFilter)
                                          ?.label.toLowerCase()}`}
                            </div>
                            <div className="empty-description">
                                {statusFilter === "all"
                                    ? "Hãy bắt đầu mua sắm để tạo đơn hàng đầu tiên!"
                                    : "Thử thay đổi bộ lọc để xem các đơn hàng khác"}
                            </div>
                            {statusFilter === "all" && (
                                <ActionButton
                                    className="view"
                                    onClick={() => navigate("/")}
                                >
                                    🛍️ Bắt đầu mua sắm
                                </ActionButton>
                            )}
                        </EmptyState>
                    ) : (
                        <WrapperListOrder>
                            {filteredOrders.map((order) => (
                                <WrapperItemOrder key={order?._id}>
                                    <OrderHeader>
                                        <OrderInfo>
                                            <OrderId>
                                                <span className="order-number">
                                                    Đơn hàng #
                                                    {generateOrderNumber(
                                                        order._id
                                                    )}
                                                </span>
                                                <span className="order-date">
                                                    {formatOrderDate(
                                                        order.createdAt
                                                    )}
                                                </span>
                                            </OrderId>
                                        </OrderInfo>
                                        <WrapperStatus>
                                            {getStatusBadge(order.status)}
                                            <PaymentStatus
                                                isPaid={order.isPaid}
                                            >
                                                <span className="payment-label">
                                                    Thanh toán:
                                                </span>
                                                <span className="payment-value">
                                                    {order.isPaid
                                                        ? "Đã thanh toán"
                                                        : "Chưa thanh toán"}
                                                </span>
                                            </PaymentStatus>
                                        </WrapperStatus>
                                    </OrderHeader>

                                    {renderProduct(order?.orderItems)}

                                    <WrapperFooterItem>
                                        <TotalPrice>
                                            <div className="total-label">
                                                Tổng tiền:
                                            </div>
                                            <div className="total-amount">
                                                {convertPrice(
                                                    order?.totalPrice
                                                )}
                                            </div>
                                        </TotalPrice>
                                        <ActionButtons>
                                            {canCancelOrder(order.status) && (
                                                <ActionButton
                                                    className="cancel"
                                                    onClick={() =>
                                                        handleCancelOrder(order)
                                                    }
                                                >
                                                    ❌ Hủy đơn hàng
                                                </ActionButton>
                                            )}
                                            <ActionButton
                                                className="view"
                                                onClick={() =>
                                                    handleDetailsOrder(
                                                        order?._id
                                                    )
                                                }
                                            >
                                                👁️ Xem chi tiết
                                            </ActionButton>
                                        </ActionButtons>
                                    </WrapperFooterItem>
                                </WrapperItemOrder>
                            ))}
                        </WrapperListOrder>
                    )}
                </WrapperContent>
            </WrapperContainer>
        </Loading>
    );
};

export default MyOrderPage;
