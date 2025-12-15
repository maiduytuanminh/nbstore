import React from "react";
import {
    UserOutlined,
    AppstoreOutlined,
    ShoppingCartOutlined,
    DollarOutlined,
    LineChartOutlined,
    RiseOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import RevenueChart from "../../../components/OrderAdmin/RevenueChart";
import { convertPrice } from "../../../utils";

const DashboardContainer = styled.div`
    padding: 24px;
    background: var(--dark-bg-primary);
    min-height: 100vh;
    color: var(--dark-text-primary);
`;

const StatsContainer = styled.div`
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    margin-bottom: 32px;
`;

const StatCard = styled.div`
    flex: 1;
    min-width: 200px;
    background: var(--dark-bg-secondary);
    padding: 24px;
    border-radius: 12px;
    border: 1px solid var(--dark-border);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
        background: var(--dark-bg-tertiary);
    }

    .stat-icon {
        font-size: 32px;
        margin-bottom: 16px;
        color: ${(props) => props.color};
    }

    .stat-title {
        color: var(--dark-text-secondary);
        font-size: 14px;
        margin-bottom: 8px;
    }

    .stat-value {
        color: ${(props) => props.color};
        font-size: 24px;
        font-weight: bold;
    }
`;

const ChartSection = styled.div`
    background: var(--dark-bg-secondary);
    padding: 24px;
    border-radius: 12px;
    border: 1px solid var(--dark-border);
    margin-bottom: 24px;

    h3 {
        color: var(--dark-text-primary);
        margin-bottom: 16px;
    }
`;

const OrderStatusSection = styled.div`
    background: var(--dark-bg-secondary);
    padding: 24px;
    border-radius: 12px;
    border: 1px solid var(--dark-border);
    margin-bottom: 24px;

    h3 {
        color: var(--dark-text-primary);
        margin-bottom: 16px;
    }

    .status-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 16px;
    }

    .status-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;

        .status-label {
            color: var(--dark-text-secondary);
        }

        .status-value {
            color: var(--dark-text-primary);
            font-weight: bold;
        }

        .status-percent {
            color: var(--dark-text-tertiary);
            font-size: 12px;
        }
    }
`;

const TopProductsSection = styled.div`
    background: var(--dark-bg-secondary);
    padding: 24px;
    border-radius: 12px;
    border: 1px solid var(--dark-border);

    h3 {
        color: var(--dark-text-primary);
        margin-bottom: 16px;
    }

    .product-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 16px;
    }

    .product-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;

        img {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 4px;
        }

        .product-info {
            flex: 1;

            .product-name {
                color: var(--dark-text-primary);
                font-weight: 500;
                margin-bottom: 4px;
            }

            .product-stats {
                display: flex;
                gap: 16px;
                color: var(--dark-text-tertiary);
                font-size: 12px;

                .stat {
                    display: flex;
                    align-items: center;
                    gap: 4px;

                    .label {
                        color: var(--dark-text-tertiary);
                    }

                    .value {
                        color: #10b981;
                    }
                }
            }
        }
    }
`;

export default function CustomizedContent({ data }) {
    const stats = [
        {
            title: "Tổng sản phẩm",
            value: data?.products || 0,
            icon: <AppstoreOutlined />,
            color: "#F59E0B",
        },
        {
            title: "Tổng người dùng",
            value: data?.users || 0,
            icon: <UserOutlined />,
            color: "#8B5CF6",
        },
        {
            title: "Tổng đơn hàng",
            value: data?.orders || 0,
            icon: <ShoppingCartOutlined />,
            color: "#4F46E5",
        },
        {
            title: "Tổng doanh thu",
            value: convertPrice(data?.totalRevenue || 0),
            icon: <DollarOutlined />,
            color: "#10B981",
        },
        {
            title: "Giá trị đơn TB",
            value: convertPrice(data?.averageOrderValue || 0),
            icon: <LineChartOutlined />,
            color: "#06B6D4",
        },
        {
            title: "Tỷ lệ hoàn thành",
            value: `${data?.completionRate || 0}%`,
            icon: <RiseOutlined />,
            color: "#EC4899",
        },
    ];

    const orderStatus = [
        {
            label: "Chờ xác nhận",
            value: data?.orderStatusCounts?.PENDING || 0,
            percent:
                (
                    ((data?.orderStatusCounts?.PENDING || 0) /
                        (data?.orders || 1)) *
                    100
                ).toFixed(1) + "%",
            color: "#F59E0B",
        },
        {
            label: "Đã xác nhận",
            value: data?.orderStatusCounts?.CONFIRMED || 0,
            percent:
                (
                    ((data?.orderStatusCounts?.CONFIRMED || 0) /
                        (data?.orders || 1)) *
                    100
                ).toFixed(1) + "%",
            color: "#10B981",
        },
        {
            label: "Đang giao",
            value: data?.orderStatusCounts?.SHIPPING || 0,
            percent:
                (
                    ((data?.orderStatusCounts?.SHIPPING || 0) /
                        (data?.orders || 1)) *
                    100
                ).toFixed(1) + "%",
            color: "#3B82F6",
        },
        {
            label: "Đã giao",
            value: data?.orderStatusCounts?.DELIVERED || 0,
            percent:
                (
                    ((data?.orderStatusCounts?.DELIVERED || 0) /
                        (data?.orders || 1)) *
                    100
                ).toFixed(1) + "%",
            color: "#059669",
        },
        {
            label: "Đã hủy",
            value: data?.orderStatusCounts?.CANCELLED || 0,
            percent:
                (
                    ((data?.orderStatusCounts?.CANCELLED || 0) /
                        (data?.orders || 1)) *
                    100
                ).toFixed(1) + "%",
            color: "#EF4444",
        },
    ];

    return (
        <DashboardContainer>
            <h2
                style={{
                    color: "var(--dark-text-primary)",
                    marginBottom: "24px",
                }}
            >
                Tổng quan hệ thống
            </h2>
            <p
                style={{
                    color: "var(--dark-text-secondary)",
                    marginBottom: "32px",
                }}
            >
                Thông tin tổng quan về hoạt động kinh doanh
            </p>

            <StatsContainer>
                {stats.map((stat, index) => (
                    <StatCard key={index} color={stat.color}>
                        <div className="stat-icon">{stat.icon}</div>
                        <div className="stat-title">{stat.title}</div>
                        <div className="stat-value">{stat.value}</div>
                    </StatCard>
                ))}
            </StatsContainer>

            <ChartSection>
                <h3>Doanh thu theo thời gian</h3>
                <div style={{ height: "400px", marginTop: "20px" }}>
                    <RevenueChart data={data?.revenueData || []} />
                </div>
            </ChartSection>

            <OrderStatusSection>
                <h3>Trạng thái đơn hàng</h3>
                <div className="status-grid">
                    {orderStatus.map((status, index) => (
                        <div
                            key={index}
                            className="status-item"
                            style={{
                                borderLeft: `4px solid ${status.color}`,
                                backgroundColor: `${status.color}10`,
                            }}
                        >
                            <div>
                                <div className="status-label">
                                    {status.label}
                                </div>
                                <div className="status-percent">
                                    {status.percent}
                                </div>
                            </div>
                            <div className="status-value">{status.value}</div>
                        </div>
                    ))}
                </div>
            </OrderStatusSection>

            <TopProductsSection>
                <h3>Sản phẩm bán chạy</h3>
                <div className="product-list">
                    {data?.topProducts?.map((product, index) => (
                        <div key={index} className="product-item">
                            <img src={product.image} alt={product.name} />
                            <div className="product-info">
                                <div className="product-name">
                                    {product.name}
                                </div>
                                <div className="product-stats">
                                    <div className="stat">
                                        <span className="label">Đã bán:</span>
                                        <span className="value">
                                            {product.sold}
                                        </span>
                                    </div>
                                    <div className="stat">
                                        <span className="label">
                                            Doanh thu:
                                        </span>
                                        <span className="value">
                                            {convertPrice(product.revenue)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </TopProductsSection>
        </DashboardContainer>
    );
}
