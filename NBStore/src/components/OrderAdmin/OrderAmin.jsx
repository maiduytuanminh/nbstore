import {
    Button,
    Form,
    Space,
    Descriptions,
    Select,
    Tag,
    Popconfirm,
} from "antd";
import React, { useState, useRef, useMemo } from "react";
import {
    WrapperHeader,
    StatsGrid,
    StatsCard,
    ChartContainer,
    TableWrapper,
    ActionButtons,
    StatusTag,
    DrawerContent,
    OrderProducts,
    ProductItem,
    DrawerFooter,
    ActionButton,
} from "./style";
import {
    DeleteOutlined,
    EyeOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
    DollarOutlined,
    UserOutlined,
    RiseOutlined,
} from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import * as OrderService from "../../services/OrderService";
import * as message from "../../components/Message/Message";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import Loading from "../LoadingComponent/Loading";
import ModalComponent from "../ModalComponent/ModalComponent";
import RevenueChart from "./RevenueChart";
import { orderContants } from "../../contant";
import { convertPrice } from "../../utils";

const OrderAdmin = () => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [rowSelected, setRowSelected] = useState("");
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const user = useSelector((state) => state?.user);
    const searchInput = useRef(null);
    const queryClient = useQueryClient();

    // Lấy dữ liệu đơn hàng từ cache của react-query
    const cachedOrders = queryClient.getQueryData(["dashboard"]);
    console.log("=== Cached Orders from Dashboard ===", cachedOrders);

    const getAllOrder = async () => {
        const res = await OrderService.getAllOrder(user?.access_token);
        console.log("=== API Response getAllOrder ===", res);
        return res;
    };

    const { data: ordersData, isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: getAllOrder,
        enabled: !!user?.access_token,
    });

    // Đảm bảo ordersData.data tồn tại và là một mảng
    const orderData = useMemo(() => {
        return ordersData?.data || [];
    }, [ordersData]);

    console.log("=== Orders Data From useQuery ===", ordersData);
    console.log("=== Order Data Array ===", orderData);

    // Tính toán thống kê đơn hàng và phần trăm
    const orderStats = useMemo(() => {
        if (!Array.isArray(orderData)) return {};

        const totalOrders = orderData.length;
        const stats = orderData.reduce((stats, order) => {
            const status = order.status?.toUpperCase();
            if (status) {
                stats[status] = (stats[status] || 0) + 1;
            }
            return stats;
        }, {});

        // Tính phần trăm cho mỗi trạng thái
        const statsWithPercentage = {};
        Object.keys(stats).forEach((status) => {
            statsWithPercentage[status] = {
                count: stats[status],
                percentage: ((stats[status] / totalOrders) * 100).toFixed(1),
            };
        });

        return statsWithPercentage;
    }, [orderData]);

    console.log("=== Order Stats ===", orderStats);

    // Xử lý dữ liệu cho biểu đồ doanh thu theo thời gian
    const chartData = useMemo(() => {
        if (!Array.isArray(orderData) || orderData.length === 0) {
            return [];
        }

        console.log("=== Processing chart data from orders ===", orderData);

        // Nhóm đơn hàng theo ngày và tính tổng doanh thu
        const revenueByDate = orderData.reduce((acc, order) => {
            if (order.createdAt && order.totalPrice && order.totalPrice > 0) {
                // Chỉ tính đơn hàng đã giao hoặc đã xác nhận và có doanh thu > 0
                const status = order.status?.toUpperCase();
                if (status === 'DELIVERED' || status === 'CONFIRMED' || status === 'APPROVED') {
                    const date = new Date(order.createdAt);
                    const dateKey = date.toLocaleDateString('vi-VN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    });

                    acc[dateKey] = (acc[dateKey] || 0) + (order.totalPrice || 0);
                }
            }
            return acc;
        }, {});

        console.log("=== Revenue by date ===", revenueByDate);

        // Chuyển đổi thành mảng và sắp xếp theo thời gian
        const chartArray = Object.entries(revenueByDate)
            .filter(([date, revenue]) => revenue > 0) // Chỉ lấy ngày có doanh thu > 0
            .map(([date, revenue]) => ({
                name: date,
                value: revenue
            }))
            .sort((a, b) => {
                // Sắp xếp theo ngày
                const dateA = new Date(a.name.split('/').reverse().join('-'));
                const dateB = new Date(b.name.split('/').reverse().join('-'));
                return dateA - dateB;
            });

        console.log("=== Final Chart Data ===", chartArray);
        return chartArray;
    }, [orderData]);    const totalOrders = orderData.length;
    const totalRevenue = orderData.reduce(
        (sum, order) => sum + (order.totalPrice || 0),
        0
    );
    const totalCustomers = new Set(orderData.map((order) => order.userId)).size;
    const monthlyGrowth = 15; // Giả sử tăng trưởng 15% so với tháng trước

    const renderAction = (orderId) => {
        // Sử dụng orderData đã được kiểm tra là mảng
        const orderSelected = orderData.find((order) => order._id === orderId);

        return (
            <ActionButtons>
                <EyeOutlined
                    className="view-button"
                    onClick={() => {
                        setRowSelected(orderId);
                        setIsOpenDrawer(true);
                    }}
                />
                <Select
                    value={orderSelected?.status?.toUpperCase()}
                    style={{ width: 140, marginLeft: 10 }}
                    onChange={(value) => handleUpdateStatus(orderId, value)}
                >
                    <Select.Option value="PENDING">Chờ xác nhận</Select.Option>
                    <Select.Option value="CONFIRMED">Đã xác nhận</Select.Option>
                    <Select.Option value="SHIPPING">Đang giao</Select.Option>
                    <Select.Option value="DELIVERED">Đã giao</Select.Option>
                    <Select.Option value="CANCELLED">Đã hủy</Select.Option>
                </Select>
            </ActionButtons>
        );
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
    };

    const handleReset = (clearFilters) => {
        clearFilters();
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <InputComponent
                    ref={searchInput}
                    placeholder={`Tìm kiếm ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Tìm
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{ color: filtered ? "#1890ff" : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ?.toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

    const columns = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Tên người nhận",
            dataIndex: "userName",
            key: "userName",
            sorter: (a, b) => a.userName?.length - b.userName?.length,
            ...getColumnSearchProps("userName"),
            render: (text, record) =>
                record.shippingAddress?.fullName || record.user?.name,
        },
        {
            title: "Số điện thoại người nhận",
            dataIndex: "phone",
            key: "phone",
            sorter: (a, b) => a.phone?.length - b.phone?.length,
            ...getColumnSearchProps("phone"),
            render: (text, record) =>
                record.shippingAddress?.phone || record.user?.phone,
        },
        {
            title: "Địa chỉ",
            dataIndex: "shippingAddress",
            key: "address",
            width: 200,
            ellipsis: true,
            sorter: (a, b) =>
                a.shippingAddress?.address?.length -
                b.shippingAddress?.address?.length,
            ...getColumnSearchProps("shippingAddress"),
            render: (text, record) => record.shippingAddress?.address,
        },
        {
            title: "Tổng tiền",
            dataIndex: "totalPrice",
            key: "totalPrice",
            sorter: (a, b) => a.totalPrice - b.totalPrice,
            render: (text) => convertPrice(text),
        },
        {
            title: "Phương thức thanh toán",
            dataIndex: "paymentMethod",
            key: "paymentMethod",
            render: (text) => {
                switch (text) {
                    case "cash":
                    case "later_money":
                        return "Tiền mặt";
                    case "paypal":
                        return "PayPal";
                    case "fast":
                        return "Giao hàng nhanh";
                    case "gojek":
                        return "GoJek";
                    default:
                        return text || "N/A";
                }
            },
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (text, record) => {
                const status = text?.toUpperCase();
                let color;
                let displayText;

                switch (status) {
                    case "PENDING":
                        color = "#f5c842";
                        displayText = "Chờ xác nhận";
                        break;
                    case "CONFIRMED":
                    case "APPROVED":
                        color = "#4CAF50";
                        displayText = "Đã xác nhận";
                        break;
                    case "SHIPPING":
                        color = "#2196F3";
                        displayText = "Đang giao";
                        break;
                    case "DELIVERED":
                        color = "#008000";
                        displayText = "Đã giao";
                        break;
                    case "CANCELLED":
                    case "REJECTED":
                        color = "#FF0000";
                        displayText = "Đã hủy";
                        break;
                    default:
                        color = "#000000";
                        displayText = text;
                }

                return <Tag color={color}>{displayText}</Tag>;
            },
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, record) => {
                const currentStatus = record.status?.toUpperCase();
                return (
                    <Space size="middle">
                        {currentStatus === "PENDING" && (
                            <>
                                <Button
                                    type="primary"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdateStatus(
                                            record._id,
                                            "CONFIRMED"
                                        );
                                    }}
                                >
                                    Xác nhận
                                </Button>
                                <Popconfirm
                                    title="Bạn có chắc muốn hủy đơn hàng này?"
                                    onConfirm={(e) => {
                                        e.stopPropagation();
                                        handleUpdateStatus(
                                            record._id,
                                            "CANCELLED"
                                        );
                                    }}
                                    okText="Có"
                                    cancelText="Không"
                                >
                                    <Button
                                        danger
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Hủy đơn
                                    </Button>
                                </Popconfirm>
                            </>
                        )}
                        {currentStatus === "CONFIRMED" && (
                            <Button
                                type="primary"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdateStatus(record._id, "SHIPPING");
                                }}
                            >
                                Giao hàng
                            </Button>
                        )}
                        {currentStatus === "SHIPPING" && (
                            <Button
                                type="primary"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdateStatus(record._id, "DELIVERED");
                                }}
                            >
                                Đã giao
                            </Button>
                        )}
                        <Button
                            type="default"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDetailsOrder(record._id);
                            }}
                        >
                            Chi tiết
                        </Button>
                    </Space>
                );
            },
        },
    ];

    const mutationDeleted = useMutationHooks((data) => {
        const { id, token, orderItems } = data;
        const res = OrderService.cancelOrder(id, token, orderItems);
        return res;
    });

    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, status } = data;
        let res;
        switch (status) {
            case "CONFIRMED":
                res = OrderService.approveOrder(id, token);
                break;
            case "SHIPPING":
                res = OrderService.updateOrderShipping(id, token);
                break;
            case "DELIVERED":
                res = OrderService.updateOrderDelivered(id, token);
                break;
            case "CANCELLED":
                res = OrderService.cancelOrder(id, token);
                break;
            default:
                res = Promise.reject(new Error("Invalid status"));
        }
        return res;
    });

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };

    const handleDeleteOrder = () => {
        const orderSelected = ordersData?.data?.find(
            (order) => order._id === rowSelected
        );

        if (!orderSelected) {
            message.error("Không tìm thấy thông tin đơn hàng");
            return;
        }

        mutationDeleted.mutate(
            {
                id: rowSelected,
                token: user?.access_token,
                orderItems: orderSelected.orderItems,
            },
            {
                onSuccess: () => {
                    message.success("Hủy đơn hàng thành công");
                    handleCancelDelete();
                    queryClient.invalidateQueries(["orders"]);
                },
                onError: () => {
                    message.error("Hủy đơn hàng thất bại");
                },
            }
        );
    };

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setRowSelected("");
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            let res;
            switch (newStatus) {
                case "CONFIRMED":
                    res = await OrderService.approveOrder(
                        orderId,
                        user?.access_token
                    );
                    break;
                case "SHIPPING":
                    res = await OrderService.updateOrderShipping(
                        orderId,
                        user?.access_token
                    );
                    break;
                case "DELIVERED":
                    res = await OrderService.updateOrderDelivered(
                        orderId,
                        user?.access_token
                    );
                    break;
                case "CANCELLED":
                    res = await OrderService.rejectOrder(
                        orderId,
                        "Đơn hàng bị hủy bởi admin",
                        user?.access_token
                    );
                    break;
                default:
                    message.error("Trạng thái không hợp lệ");
                    return;
            }

            if (res?.status === "OK") {
                message.success("Cập nhật trạng thái thành công");
                queryClient.invalidateQueries(["orders"]);
            } else {
                message.error("Cập nhật trạng thái thất bại");
            }
        } catch (error) {
            console.error("Error updating order status:", error);
            message.error("Có lỗi xảy ra khi cập nhật trạng thái");
        }
    };

    // Tính phần trăm cho mỗi trạng thái
    const calculatePercentage = (count) => {
        return totalOrders > 0
            ? ((count / totalOrders) * 100).toFixed(1)
            : "0.0";
    };

    const handleDetailsOrder = (orderId) => {
        setIsOpenDrawer(true);
        setRowSelected(orderId);
    };

    const renderOrderDetail = () => {
        const orderSelected = orderData.find(
            (order) => order._id === rowSelected
        );
        console.log("Selected Order:", orderSelected);
        console.log("Row Selected:", rowSelected);
        console.log("Order Data Length:", orderData.length);

        if (!orderSelected) {
            return <div>Không tìm thấy thông tin đơn hàng</div>;
        }

        return (
            <Loading isLoading={isLoading}>
                <DrawerContent>
                    <Descriptions
                        title="Thông tin đơn hàng"
                        bordered
                        column={1}
                    >
                        <Descriptions.Item label="ID Đơn hàng">
                            {orderSelected._id}
                        </Descriptions.Item>
                        <Descriptions.Item label="ID Người dùng">
                            {orderSelected.user?._id}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tên người đặt">
                            {orderSelected.user?.name ||
                                orderSelected.shippingAddress?.fullName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">
                            {orderSelected.user?.phone ||
                                orderSelected.shippingAddress?.phone}
                        </Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ">
                            {orderSelected.shippingAddress?.address}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tổng tiền">
                            {convertPrice(orderSelected.totalPrice)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phương thức thanh toán">
                            {(() => {
                                switch (orderSelected.paymentMethod) {
                                    case "cash":
                                    case "later_money":
                                        return "Tiền mặt";
                                    case "paypal":
                                        return "PayPal";
                                    case "fast":
                                        return "Giao hàng nhanh";
                                    case "gojek":
                                        return "GoJek";
                                    default:
                                        return orderSelected.paymentMethod || "N/A";
                                }
                            })()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày đặt hàng">
                            {orderSelected.createdAt
                                ? new Date(
                                      orderSelected.createdAt
                                  ).toLocaleString("vi-VN")
                                : ""}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            <Space>
                                <Select
                                    value={orderSelected.status?.toUpperCase()}
                                    style={{ width: 200 }}
                                    onChange={(value) =>
                                        handleUpdateStatus(rowSelected, value)
                                    }
                                >
                                    <Select.Option value="PENDING">
                                        Chờ xác nhận
                                    </Select.Option>
                                    <Select.Option value="CONFIRMED">
                                        Đã xác nhận
                                    </Select.Option>
                                    <Select.Option value="SHIPPING">
                                        Đang giao
                                    </Select.Option>
                                    <Select.Option value="DELIVERED">
                                        Đã giao
                                    </Select.Option>
                                    <Select.Option value="CANCELLED">
                                        Đã hủy
                                    </Select.Option>
                                </Select>
                            </Space>
                        </Descriptions.Item>
                    </Descriptions>

                    {orderSelected.orderItems &&
                        orderSelected.orderItems.length > 0 && (
                            <div style={{ marginTop: "20px" }}>
                                <h3>Sản phẩm đặt mua</h3>
                                <table
                                    style={{ width: "100%", marginTop: "10px" }}
                                >
                                    <thead>
                                        <tr>
                                            <th>Tên sản phẩm</th>
                                            <th>Số lượng</th>
                                            <th>Đơn giá</th>
                                            <th>Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderSelected.orderItems.map(
                                            (item, index) => (
                                                <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td>{item.amount}</td>
                                                    <td>
                                                        {convertPrice(item.price)}
                                                    </td>
                                                    <td>
                                                        {convertPrice(
                                                            item.price * item.amount
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                </DrawerContent>
            </Loading>
        );
    };

    return (
        <div style={{ padding: 24 }}>
            <WrapperHeader>QUẢN LÝ ĐƠN HÀNG</WrapperHeader>

            <div style={{ marginBottom: 20, display: "flex", gap: "16px" }}>
                <div
                    style={{
                        padding: "20px",
                        borderRadius: "8px",
                        backgroundColor: "#1890ff",
                        color: "white",
                        flex: 1,
                    }}
                >
                    <div>Chờ xác nhận</div>
                    <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                        {orderStats["PENDING"]?.count || 0}
                    </div>
                    <div>{orderStats["PENDING"]?.percentage || 0}%</div>
                </div>

                <div
                    style={{
                        padding: "20px",
                        borderRadius: "8px",
                        backgroundColor: "#52c41a",
                        color: "white",
                        flex: 1,
                    }}
                >
                    <div>Đã xác nhận</div>
                    <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                        {(orderStats["CONFIRMED"]?.count || 0) +
                            (orderStats["APPROVED"]?.count || 0)}
                    </div>
                    <div>
                        {(
                            Number(orderStats["CONFIRMED"]?.percentage || 0) +
                            Number(orderStats["APPROVED"]?.percentage || 0)
                        ).toFixed(1)}
                        %
                    </div>
                </div>

                <div
                    style={{
                        padding: "20px",
                        borderRadius: "8px",
                        backgroundColor: "#faad14",
                        color: "white",
                        flex: 1,
                    }}
                >
                    <div>Đang giao</div>
                    <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                        {orderStats["SHIPPING"]?.count || 0}
                    </div>
                    <div>{orderStats["SHIPPING"]?.percentage || 0}%</div>
                </div>

                <div
                    style={{
                        padding: "20px",
                        borderRadius: "8px",
                        backgroundColor: "#13c2c2",
                        color: "white",
                        flex: 1,
                    }}
                >
                    <div>Đã giao</div>
                    <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                        {orderStats["DELIVERED"]?.count || 0}
                    </div>
                    <div>{orderStats["DELIVERED"]?.percentage || 0}%</div>
                </div>

                <div
                    style={{
                        padding: "20px",
                        borderRadius: "8px",
                        backgroundColor: "#ff4d4f",
                        color: "white",
                        flex: 1,
                    }}
                >
                    <div>Đã hủy</div>
                    <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                        {(orderStats["CANCELLED"]?.count || 0) +
                            (orderStats["REJECTED"]?.count || 0)}
                    </div>
                    <div>
                        {(
                            Number(orderStats["CANCELLED"]?.percentage || 0) +
                            Number(orderStats["REJECTED"]?.percentage || 0)
                        ).toFixed(1)}
                        %
                    </div>
                </div>
            </div>

            <StatsGrid>
                <StatsCard>
                    <div
                        className="icon"
                        style={{ background: "rgb(24, 144, 255)" }}
                    >
                        <ShoppingCartOutlined />
                    </div>
                    <div className="content">
                        <div className="title">Tổng đơn hàng</div>
                        <div className="value">{totalOrders}</div>
                    </div>
                </StatsCard>

                <StatsCard>
                    <div
                        className="icon"
                        style={{ background: "rgb(82, 196, 26)" }}
                    >
                        <DollarOutlined />
                    </div>
                    <div className="content">
                        <div className="title">Doanh thu</div>
                        <div className="value">
                            {convertPrice(totalRevenue)}
                        </div>
                    </div>
                </StatsCard>

                <StatsCard>
                    <div
                        className="icon"
                        style={{ background: "rgb(250, 173, 20)" }}
                    >
                        <UserOutlined />
                    </div>
                    <div className="content">
                        <div className="title">Khách hàng</div>
                        <div className="value">{totalCustomers}</div>
                    </div>
                </StatsCard>

                <StatsCard>
                    <div
                        className="icon"
                        style={{ background: "rgb(47, 84, 235)" }}
                    >
                        <RiseOutlined />
                    </div>
                    <div className="content">
                        <div className="title">Tăng trưởng</div>
                        <div className="value">+{monthlyGrowth}%</div>
                    </div>
                </StatsCard>
            </StatsGrid>

            <ChartContainer>
                <div className="chart-title">Biểu đồ doanh thu</div>
                <RevenueChart data={chartData} />
            </ChartContainer>

            <TableWrapper>
                <Loading isLoading={isLoading}>
                    <TableComponent
                        columns={columns}
                        dataSource={orderData}
                        rowKey="_id"
                        exportConfig={{
                            fileName: "Danh-sach-don-hang",
                            sheetName: "Danh sách đơn hàng"
                        }}
                    />
                </Loading>
            </TableWrapper>

            <DrawerComponent
                title="Chi tiết đơn hàng"
                isOpen={isOpenDrawer}
                onClose={handleCloseDrawer}
                width="50%"
            >
                {renderOrderDetail()}
            </DrawerComponent>

            <ModalComponent
                title="Xóa đơn hàng"
                open={isModalOpenDelete}
                onCancel={handleCancelDelete}
                onOk={handleDeleteOrder}
            >
                <Loading isLoading={mutationDeleted.isLoading}>
                    <div>Bạn có chắc xóa đơn hàng này không?</div>
                </Loading>
            </ModalComponent>
        </div>
    );
};

export default OrderAdmin;
