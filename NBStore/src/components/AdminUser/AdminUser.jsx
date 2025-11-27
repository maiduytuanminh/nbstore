import { Button, Form, Space } from "antd";
import React, { useState, useEffect, useRef } from "react";
import {
    WrapperHeader,
    WrapperUploadFile,
    WrapperActions,
    ActionButton,
    TableWrapper,
    ActionButtons,
    DrawerContent,
    DrawerFooter,
} from "./style";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import Loading from "../LoadingComponent/Loading";
import ModalComponent from "../ModalComponent/ModalComponent";
import { getBase64 } from "../../utils";
import * as message from "../../components/Message/Message";
import { useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
    DeleteOutlined,
    EditOutlined,
    SearchOutlined,
    UserAddOutlined,
} from "@ant-design/icons";

const AdminUser = () => {
    const [form] = Form.useForm();
    const [rowSelected, setRowSelected] = useState(null);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const user = useSelector((state) => state?.user);
    const searchInput = useRef(null);
    const [fileList, setFileList] = useState([]);
    const queryClient = useQueryClient();

    const [stateUser, setStateUser] = useState({
        name: "",
        email: "",
        phone: "",
        isAdmin: false,
        avatar: "",
        address: "",
        password: "",
    });

    const mutation = useMutationHooks((data) => {
        console.log("Creating user with data:", data);
        const res = UserService.signupUser(data);
        return res;
    });

    const { data, isLoading, isSuccess, isError } = mutation;

    const { data: users, isLoading: isLoadingUsers } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            try {
                const res = await UserService.getAllUser(user?.access_token);
                console.log("getAllUser API response:", res);
                return res;
            } catch (error) {
                console.error("Error in getAllUser:", error);
                throw error;
            }
        },
        enabled: !!user?.access_token,
    });

    const [stateUserDetails, setStateUserDetails] = useState({
        name: "",
        email: "",
        phone: "",
        isAdmin: false,
        avatar: "",
        address: "",
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
    };

    const handleReset = (clearFilters) => {
        clearFilters();
    };

    const handleDetailsProduct = () => {
        setIsOpenDrawer(true);
    };

    const handleDetailsUser = (record) => {
        console.log("handleDetailsUser - Received record:", record);
        setIsEditMode(true);
        setRowSelected(record);
        setIsModalOpen(true);
    };

    const handleAddUser = () => {
        setIsEditMode(false);
        setRowSelected(null);
        setIsModalOpen(true);
        form.resetFields();
    };

    const renderAction = (record) => {
        return (
            <Space>
                <EditOutlined
                    style={{
                        color: "orange",
                        fontSize: "20px",
                        cursor: "pointer",
                    }}
                    onClick={() => handleDetailsUser(record)}
                />
                <DeleteOutlined
                    style={{
                        color: "red",
                        fontSize: "20px",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        console.log("Selected record for deletion:", record);
                        setRowSelected(record);
                        setIsModalOpenDelete(true);
                    }}
                />
            </Space>
        );
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
            title: "Tên",
            dataIndex: "name",
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps("name"),
        },
        {
            title: "Email",
            dataIndex: "email",
            sorter: (a, b) => a.email.length - b.email.length,
            ...getColumnSearchProps("email"),
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            sorter: (a, b) => a.address.length - b.address.length,
            ...getColumnSearchProps("address"),
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            sorter: (a, b) => a.phone - b.phone,
            ...getColumnSearchProps("phone"),
        },
        {
            title: "Admin",
            dataIndex: "isAdmin",
            render: (isAdmin) => (isAdmin ? "Có" : "Không"),
        },
        {
            title: "Hành động",
            dataIndex: "action",
            render: (_, record) => renderAction(record),
        },
    ];

    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        const res = UserService.updateUser(id, { ...rests }, token);
        return res;
    });

    const mutationDeletedMany = useMutationHooks((data) => {
        const { token, ...ids } = data;
        const res = UserService.deleteManyUser(ids, token);
        return res;
    });

    const handleDelteManyUsers = (ids) => {
        mutationDeletedMany.mutate(
            { ids: ids, token: user?.access_token },
            {
                onSettled: () => {
                    queryClient.invalidateQueries(["users"]);
                },
            }
        );
    };

    const mutationDeleted = useMutationHooks((data) => {
        console.log("Deleting user with data:", data);
        const { id, token } = data;
        const res = UserService.deleteUser(id, token);
        return res;
    });

    const fetchGetDetailsUser = async (rowSelected) => {
        const res = await UserService.getDetailsUser(rowSelected);
        if (res?.data) {
            setStateUserDetails({
                name: res?.data?.name,
                email: res?.data?.email,
                phone: res?.data?.phone,
                isAdmin: res?.data?.isAdmin,
                address: res?.data?.address,
                avatar: res.data?.avatar,
            });
        }
        setIsLoadingUpdate(false);
    };

    useEffect(() => {
        if (form.__INTERNAL__.name) {
            form.setFieldsValue(stateUserDetails);
        }
    }, [form, stateUserDetails]);

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true);
            fetchGetDetailsUser(rowSelected);
        }
    }, [rowSelected, isOpenDrawer]);

    useEffect(() => {
        if (isEditMode && rowSelected) {
            console.log("useEffect - Setting form values with:", rowSelected);
            form.setFieldsValue({
                name: rowSelected?.name,
                email: rowSelected?.email,
                phone: rowSelected?.phone,
                address: rowSelected?.address,
                isAdmin: rowSelected?.isAdmin,
            });
        }
    }, [rowSelected, isEditMode, form]);

    const {
        data: dataUpdated,
        isLoading: isLoadingUpdated,
        isSuccess: isSuccessUpdated,
        isError: isErrorUpdated,
    } = mutationUpdate;
    const {
        data: dataDeleted,
        isLoading: isLoadingDeleted,
        isSuccess: isSuccessDelected,
        isError: isErrorDeleted,
    } = mutationDeleted;
    const {
        data: dataDeletedMany,
        isLoading: isLoadingDeletedMany,
        isSuccess: isSuccessDelectedMany,
        isError: isErrorDeletedMany,
    } = mutationDeletedMany;

    useEffect(() => {
        if (isSuccess && data?.status === "OK") {
            message.success("Thêm người dùng thành công");
            handleCancel();
            queryClient.invalidateQueries(["users"]);
        } else if (isError) {
            message.error("Thêm người dùng thất bại");
        }
    }, [isSuccess, isError]);

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateUserDetails({
            name: "",
            email: "",
            phone: "",
            isAdmin: false,
        });
        form.resetFields();
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
        setRowSelected(null);
    };

    const handleDeleteUser = () => {
        console.log("Deleting user with ID:", rowSelected?._id);
        mutationDeleted.mutate(
            { id: rowSelected?._id, token: user?.access_token },
            {
                onSettled: (data) => {
                    console.log("Delete response:", data);
                    queryClient.invalidateQueries(["users"]);
                    if (data?.status === "OK") {
                        message.success("Xóa người dùng thành công");
                        setIsModalOpenDelete(false);
                        setRowSelected(null);
                    } else {
                        message.error(
                            data?.message || "Xóa người dùng thất bại"
                        );
                    }
                },
            }
        );
    };

    const handleOnchangeDetails = (e) => {
        const { name, value } = e.target;
        setStateUserDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleOnchangeAvatarDetails = async ({ fileList: newFileList }) => {
        setFileList(newFileList);

        if (newFileList.length > 0) {
            const file = newFileList[0];
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            setStateUserDetails((prev) => ({
                ...prev,
                image: file.preview,
            }));
        } else {
            setStateUserDetails((prev) => ({
                ...prev,
                image: "",
            }));
        }
    };

    const onUpdateUser = () => {
        mutationUpdate.mutate(
            { id: rowSelected, token: user?.access_token, ...stateUserDetails },
            {
                onSettled: () => {
                    queryClient.invalidateQueries(["users"]);
                },
            }
        );
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setRowSelected(null);
        setIsEditMode(false);
        form.resetFields();
    };

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setStateUser({
            ...stateUser,
            [name]: value,
        });
    };

    const onFinish = (values) => {
        console.log("Form values:", values);
        if (isEditMode && rowSelected?._id) {
            // Cập nhật user
            const { confirm, ...rest } = values;
            mutationUpdate.mutate(
                { id: rowSelected._id, token: user?.access_token, ...rest },
                {
                    onSettled: (data) => {
                        console.log("Update response:", data);
                        queryClient.invalidateQueries(["users"]);
                        if (data?.status === "OK") {
                            message.success("Cập nhật người dùng thành công");
                            setIsModalOpen(false);
                            setRowSelected(null);
                            setIsEditMode(false);
                            form.resetFields();
                        } else {
                            message.error(
                                data?.message || "Cập nhật người dùng thất bại"
                            );
                        }
                    },
                }
            );
        } else {
            // Tạo mới user
            const { confirm, ...rest } = values;
            const userData = {
                ...rest,
                confirmPassword: values.confirm,
                isAdmin: false,
            };
            console.log("Creating user with:", userData);
            mutation.mutate(userData, {
                onSettled: (data) => {
                    console.log("Create response:", data);
                    queryClient.invalidateQueries(["users"]);
                    if (data?.status === "OK") {
                        message.success("Thêm người dùng thành công");
                        setIsModalOpen(false);
                        setRowSelected(null);
                        setIsEditMode(false);
                        form.resetFields();
                    } else {
                        message.error(
                            data?.message || "Thêm người dùng thất bại"
                        );
                    }
                },
            });
        }
    };

    // Log when data changes
    useEffect(() => {
        console.log("Current users data:", users?.data);
    }, [users]);

    return (
        <div style={{ padding: 24 }}>
            <WrapperHeader>Quản lý người dùng</WrapperHeader>
            <WrapperActions>
                <ActionButton
                    type="primary"
                    icon={<UserAddOutlined />}
                    onClick={handleAddUser}
                >
                    Thêm người dùng
                </ActionButton>
            </WrapperActions>

            <TableWrapper>
                <Loading isLoading={isLoadingUsers}>
                    <TableComponent
                        columns={columns}
                        dataSource={users?.data}
                        handleDelteMany={handleDelteManyUsers}
                        exportConfig={{
                            fileName: "Danh-sach-nguoi-dung",
                            sheetName: "Danh sách người dùng"
                        }}
                        pagination={{
                            pageSize: 10,
                            total: users?.data?.length,
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} của ${total} người dùng`,
                        }}
                    />
                </Loading>
            </TableWrapper>

            <DrawerComponent
                title="Chi tiết người dùng"
                isOpen={isOpenDrawer}
                onClose={handleCloseDrawer}
                width="50%"
            >
                <Loading isLoading={isLoadingUpdate}>
                    <DrawerContent>
                        <Form
                            name="basic"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                            onFinish={onUpdateUser}
                            autoComplete="on"
                            form={form}
                        >
                            <Form.Item
                                label="Tên"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập tên!",
                                    },
                                ]}
                            >
                                <InputComponent
                                    value={stateUserDetails.name}
                                    onChange={handleOnchangeDetails}
                                    name="name"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập email!",
                                    },
                                ]}
                            >
                                <InputComponent
                                    value={stateUserDetails.email}
                                    onChange={handleOnchangeDetails}
                                    name="email"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập số điện thoại!",
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
                                label="Địa chỉ"
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập địa chỉ!",
                                    },
                                ]}
                            >
                                <InputComponent
                                    value={stateUserDetails.address}
                                    onChange={handleOnchangeDetails}
                                    name="address"
                                />
                            </Form.Item>

                            <Form.Item label="Avatar" name="avatar">
                                <WrapperUploadFile
                                    onChange={handleOnchangeAvatarDetails}
                                    maxCount={1}
                                >
                                    <Button>Chọn ảnh</Button>
                                </WrapperUploadFile>
                            </Form.Item>

                            <DrawerFooter>
                                <Button onClick={handleCloseDrawer}>Hủy</Button>
                                <Button type="primary" htmlType="submit">
                                    Cập nhật
                                </Button>
                            </DrawerFooter>
                        </Form>
                    </DrawerContent>
                </Loading>
            </DrawerComponent>

            <ModalComponent
                title={isEditMode ? "Chỉnh sửa người dùng" : "Thêm người dùng"}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Loading isLoading={isLoading || isLoadingUpdated}>
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={onFinish}
                        autoComplete="off"
                        form={form}
                    >
                        <Form.Item
                            label="Tên"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên!",
                                },
                            ]}
                        >
                            <InputComponent name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập email!",
                                },
                                {
                                    type: "email",
                                    message: "Email không hợp lệ!",
                                },
                            ]}
                        >
                            <InputComponent name="email" />
                        </Form.Item>

                        {!isEditMode && (
                            <>
                                <Form.Item
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập mật khẩu!",
                                        },
                                        {
                                            min: 6,
                                            message:
                                                "Mật khẩu phải có ít nhất 6 ký tự!",
                                        },
                                    ]}
                                >
                                    <InputComponent
                                        name="password"
                                        type="password"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Xác nhận"
                                    name="confirm"
                                    dependencies={["password"]}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Vui lòng xác nhận mật khẩu!",
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (
                                                    !value ||
                                                    getFieldValue(
                                                        "password"
                                                    ) === value
                                                ) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error(
                                                        "Mật khẩu xác nhận không khớp!"
                                                    )
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <InputComponent
                                        name="confirm"
                                        type="password"
                                    />
                                </Form.Item>
                            </>
                        )}

                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
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
                            <InputComponent name="phone" />
                        </Form.Item>

                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập địa chỉ!",
                                },
                            ]}
                        >
                            <InputComponent name="address" />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 6,
                                span: 18,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                {isEditMode ? "Cập nhật" : "Thêm"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </ModalComponent>

            <ModalComponent
                title="Xóa người dùng"
                open={isModalOpenDelete}
                onCancel={handleCancelDelete}
                onOk={handleDeleteUser}
            >
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa người dùng này không?</div>
                </Loading>
            </ModalComponent>
        </div>
    );
};

export default AdminUser;
