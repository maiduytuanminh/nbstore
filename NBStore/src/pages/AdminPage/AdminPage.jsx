import { Menu, Layout, Typography, Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { getItem } from "../../utils";
import {
    UserOutlined,
    AppstoreOutlined,
    ShoppingCartOutlined,
    TagsOutlined,
    DashboardOutlined,
    BarChartOutlined,
    ThunderboltOutlined,
} from "@ant-design/icons";
import HeaderComponent from "../../components/HeaderCompoent/HeaderComponent";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import AdminProductType from "../../components/AdminProductType/AdminProductType";
import OrderAdmin from "../../components/OrderAdmin/OrderAmin";
import * as OrderService from "../../services/OrderService";
import * as ProductService from "../../services/ProductService";
import * as UserService from "../../services/UserService";
import CustomizedContent from "./components/CustomizedContent";

import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/LoadingComponent/Loading";
import {
    AdminContainer,
    AdminSidebar,
    AdminContent,
    AdminHeader,
    SidebarLogo,
    AdminMain,
} from "./style";

const { Title, Text } = Typography;

const AdminPage = () => {
    const user = useSelector((state) => state?.user);
    const [keySelected, setKeySelected] = useState("dashboard");
    const [collapsed, setCollapsed] = useState(false);

    // Chỉ fetch dữ liệu dashboard khi cần
    const { data: dashboardData, isLoading: isDashboardLoading } = useQuery({
        queryKey: ["dashboard"],
        queryFn: async () => {
            const [products, users, orders] = await Promise.all([
                ProductService.getAllProduct(),
                UserService.getAllUser(user?.access_token),
                OrderService.getAllOrder(user?.access_token),
            ]);

            console.log(
                "=== Orders Raw Data ===",
                orders?.data?.map((order) => ({
                    id: order._id,
                    status: order.status,
                    totalPrice: order.totalPrice,
                }))
            );

            // Tính toán các chỉ số cơ bản
            const totalRevenue = orders?.data?.reduce(
                (sum, order) => sum + (order.totalPrice || 0),
                0
            );
            const averageOrderValue = orders?.data?.length
                ? totalRevenue / orders.data.length
                : 0;

            // Đếm số lượng đơn hàng theo trạng thái
            const orderStatusCounts = orders?.data?.reduce((acc, order) => {
                // Chuyển đổi trạng thái từ database sang trạng thái hiển thị
                let displayStatus = order.status.toUpperCase();
                console.log("=== Display Status ===", displayStatus);
                if (displayStatus === "APPROVED") {
                    displayStatus = "CONFIRMED"; // Map 'approved' thành 'CONFIRMED'
                }
                acc[displayStatus] = (acc[displayStatus] || 0) + 1;
                return acc;
            }, {});

            console.log(
                "=== Order Status Counts After Mapping ===",
                orderStatusCounts
            );

            // Tạo dữ liệu doanh thu theo thời gian
            const revenueByDate = orders?.data?.reduce((acc, order) => {
                if (!order.createdAt) return acc;
                const date = new Date(order.createdAt).toLocaleDateString(
                    "vi-VN"
                );
                acc[date] = (acc[date] || 0) + (order.totalPrice || 0);
                return acc;
            }, {});

            // Chuyển đổi dữ liệu doanh thu thành mảng cho biểu đồ
            const revenueData = Object.entries(revenueByDate || {})
                .map(([date, value]) => ({
                    name: date,
                    value: value,
                }))
                .sort((a, b) => new Date(a.name) - new Date(b.name));

            console.log("Processed data:", {
                orderStatusCounts,
                revenueData,
            });

            // Tính toán sản phẩm bán chạy
            const productSales = {};
            orders?.data?.forEach((order) => {
                order.orderItems?.forEach((item) => {
                    const productId = item.product;
                    if (!productSales[productId]) {
                        productSales[productId] = {
                            name: item.name,
                            image: item.image,
                            sold: 0,
                            revenue: 0,
                            price: item.price,
                        };
                    }
                    productSales[productId].sold += item.amount || 0;
                    productSales[productId].revenue +=
                        (item.price || 0) * (item.amount || 0);
                });
            });

            // Lấy top 5 sản phẩm bán chạy nhất
            const topProducts = Object.values(productSales)
                .sort((a, b) => b.sold - a.sold)
                .slice(0, 5);

            console.log("Top products:", topProducts);

            return {
                products: products?.data?.length || 0,
                users: users?.data?.length || 0,
                orders: orders?.data?.length || 0,
                totalRevenue,
                averageOrderValue,
                completionRate: (
                    ((orderStatusCounts?.DELIVERED || 0) /
                        (orders?.data?.length || 1)) *
                    100
                ).toFixed(1),
                orderStatusCounts,
                revenueData,
                topProducts,
            };
        },
        enabled: keySelected === "dashboard" && !!user?.access_token,
        staleTime: 1000 * 60 * 5, // 5 phút
        cacheTime: 1000 * 60 * 10, // 10 phút
        refetchOnWindowFocus: false,
    });

    const items = [
        getItem("Thống kê", "dashboard", <DashboardOutlined />),
        getItem("Người dùng", "users", <UserOutlined />),
        getItem("Sản phẩm", "products", <AppstoreOutlined />),
        getItem("Loại sản phẩm", "product-types", <TagsOutlined />),
        getItem("Đơn hàng", "orders", <ShoppingCartOutlined />),
    ];

    const renderPage = (key) => {
        switch (key) {
            case "dashboard":
                return isDashboardLoading ? (
                    <Loading isLoading={true} />
                ) : (
                    <CustomizedContent
                        data={dashboardData}
                        setKeySelected={setKeySelected}
                    />
                );
            case "users":
                return <AdminUser />;
            case "products":
                return <AdminProduct />;
            case "product-types":
                return <AdminProductType />;
            case "orders":
                return <OrderAdmin />;
            default:
                return <></>;
        }
    };

    const handleOnClick = ({ key }) => {
        setKeySelected(key);
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <AdminContainer>
            <HeaderComponent isHiddenSearch isHiddenCart />
            <Layout style={{ height: "calc(100vh - 72px)" }}>
                <AdminSidebar
                    collapsible
                    collapsed={collapsed}
                    onCollapse={setCollapsed}
                    width={280}
                    collapsedWidth={80}
                >
                    <SidebarLogo collapsed={collapsed}>
                        <div className="logo-icon">
                            <ThunderboltOutlined />
                        </div>
                        {!collapsed && (
                            <div className="logo-text">
                                <Title
                                    level={4}
                                    style={{ color: "var(--dark-text-primary)", margin: 0 }}
                                >
                                    NBStore Admin
                                </Title>
                                <Text
                                    style={{
                                        color: "var(--dark-text-secondary)",
                                        fontSize: "12px",
                                    }}
                                >
                                    Quản trị hệ thống
                                </Text>
                            </div>
                        )}
                    </SidebarLogo>

                    <div
                        style={{
                            padding: collapsed ? "8px" : "16px",
                            borderBottom: "1px solid var(--dark-border)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "12px",
                                background: "rgba(255, 255, 255, 0.05)",
                                borderRadius: "var(--radius-lg)",
                                justifyContent: collapsed
                                    ? "center"
                                    : "flex-start",
                            }}
                        >
                            <Avatar
                                size={collapsed ? 32 : 40}
                                src={user?.avatar}
                                icon={<UserOutlined />}
                                style={{
                                    background: "var(--primary-color)",
                                    flexShrink: 0,
                                }}
                            />
                            {!collapsed && (
                                <div style={{ overflow: "hidden" }}>
                                    <div
                                        style={{
                                            color: "var(--dark-text-primary)",
                                            fontWeight: "600",
                                            fontSize: "14px",
                                            marginBottom: "2px",
                                        }}
                                    >
                                        {user?.name}
                                    </div>
                                    <div
                                        style={{
                                            color: "var(--dark-text-secondary)",
                                            fontSize: "12px",
                                        }}
                                    >
                                        {user?.email}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <Menu
                        theme="light"
                        mode="inline"
                        items={items}
                        onClick={handleOnClick}
                        selectedKeys={[keySelected]}
                    />
                </AdminSidebar>
                <AdminContent>
                    <AdminMain>{renderPage(keySelected)}</AdminMain>
                </AdminContent>
            </Layout>
        </AdminContainer>
    );
};

export default AdminPage;
