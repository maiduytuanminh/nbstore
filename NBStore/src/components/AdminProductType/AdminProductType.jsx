import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Input, Space } from "antd";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as ProductService from "../../services/ProductService";
import * as message from "../../components/Message/Message";
import Loading from "../LoadingComponent/Loading";
import { useSelector } from "react-redux";
import InputComponent from "../InputComponent/InputComponent";
import {
    WrapperHeader,
    WrapperButton,
    ActionButton,
    TableWrapper,
    StyledModal,
    ActionButtons,
    DrawerContent,
    DrawerFooter,
} from "./style";
import TableComponent from "../TableComponent/TableComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import ModalComponent from "../ModalComponent/ModalComponent";

const AdminProductType = () => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isOpenDrawerCreate, setIsOpenDrawerCreate] = useState(false);
    const [rowSelected, setRowSelected] = useState("");
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const user = useSelector((state) => state?.user);
    const searchInput = useRef(null);
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const [stateProductType, setStateProductType] = useState({
        name: "",
    });

    const getAllProductTypes = async () => {
        const res = await ProductService.getAllProductTypes();
        console.log("API Response:", res);
        return res;
    };

    const { data: productTypes, isLoading: isLoadingProductTypes } = useQuery({
        queryKey: ["productTypes"],
        queryFn: getAllProductTypes,
    });

    console.log("Product Types from useQuery:", productTypes);

    const renderAction = (typeId) => {
        console.log("Rendering action for typeId:", typeId);
        return (
            <ActionButtons>
                <EditOutlined
                    className="edit-button"
                    onClick={() => {
                        console.log("Clicking edit for typeId:", typeId);
                        setRowSelected(typeId);
                        setIsOpenDrawer(true);
                    }}
                />
                <DeleteOutlined
                    className="delete-button"
                    onClick={() => {
                        setRowSelected(typeId);
                        setIsModalOpenDelete(true);
                    }}
                />
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
            title: "Tên loại sản phẩm",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name?.length - b.name?.length,
            ...getColumnSearchProps("name"),
            render: (text) => <span>{text}</span>,
        },
        {
            title: "Hành động",
            dataIndex: "_id",
            key: "action",
            render: (id) => renderAction(id),
        },
    ];

    const mutationDelete = useMutationHooks((data) => {
        const { id, token } = data;
        const res = ProductService.deleteProductType(id, token);
        return res;
    });

    const mutationCreate = useMutationHooks((data) => {
        const res = ProductService.createProductType(data);
        return res;
    });

    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        const res = ProductService.updateProductType(id, token, rests);
        return res;
    });

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };

    const handleDeleteProductType = () => {
        mutationDelete.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSuccess: () => {
                    message.success("Xóa loại sản phẩm thành công");
                    handleCancelDelete();
                    queryClient.invalidateQueries(["productTypes"]);
                },
                onError: () => {
                    message.error("Xóa loại sản phẩm thất bại");
                },
            }
        );
    };

    const handleDetailsProductType = () => {
        const productTypeSelected = productTypes?.data?.find(
            (type) => type._id === rowSelected
        );
        if (productTypeSelected) {
            setStateProductType({
                name: productTypeSelected.name,
            });
            form.setFieldsValue({
                name: productTypeSelected.name,
            });
        }
    };

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            handleDetailsProductType();
        }
    }, [rowSelected, isOpenDrawer]);

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setIsOpenDrawerCreate(false);
        setRowSelected("");
        form.resetFields();
        setStateProductType({
            name: "",
        });
    };

    const handleCreateProductType = (values) => {
        mutationCreate.mutate(
            {
                ...values,
                token: user?.access_token,
            },
            {
                onSuccess: () => {
                    message.success("Thêm loại sản phẩm thành công");
                    handleCloseDrawer();
                    queryClient.invalidateQueries(["productTypes"]);
                },
                onError: () => {
                    message.error("Thêm loại sản phẩm thất bại");
                },
            }
        );
    };

    const handleUpdateProductType = (values) => {
        mutationUpdate.mutate(
            {
                id: rowSelected,
                token: user?.access_token,
                ...values,
            },
            {
                onSuccess: () => {
                    message.success("Cập nhật loại sản phẩm thành công");
                    handleCloseDrawer();
                    queryClient.invalidateQueries(["productTypes"]);
                },
                onError: () => {
                    message.error("Cập nhật loại sản phẩm thất bại");
                },
            }
        );
    };

    return (
        <div style={{ padding: 24 }}>
            <WrapperHeader>Quản lý loại sản phẩm</WrapperHeader>

            <Button
                style={{ marginBottom: 24 }}
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsOpenDrawerCreate(true)}
            >
                Thêm loại sản phẩm
            </Button>

            <TableWrapper>
                <Loading isLoading={isLoadingProductTypes}>
                    <TableComponent
                        columns={columns}
                        dataSource={productTypes?.data?.map((item) => ({
                            key: item._id,
                            _id: item._id,
                            name: item.name,
                        }))}
                        exportConfig={{
                            fileName: "Danh-sach-loai-san-pham",
                            sheetName: "Danh sách loại sản phẩm"
                        }}
                        pagination={{
                            pageSize: 10,
                            total: productTypes?.data?.length,
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} của ${total} loại sản phẩm`,
                        }}
                    />
                </Loading>
            </TableWrapper>

            <DrawerComponent
                title={
                    isOpenDrawerCreate
                        ? "Thêm loại sản phẩm"
                        : "Chi tiết loại sản phẩm"
                }
                isOpen={isOpenDrawer || isOpenDrawerCreate}
                onClose={handleCloseDrawer}
                width="50%"
            >
                <Loading
                    isLoading={
                        mutationCreate.isLoading || mutationUpdate.isLoading
                    }
                >
                    <DrawerContent>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={
                                isOpenDrawerCreate
                                    ? handleCreateProductType
                                    : handleUpdateProductType
                            }
                            initialValues={stateProductType}
                        >
                            <Form.Item
                                label="Tên loại sản phẩm"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Vui lòng nhập tên loại sản phẩm",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <DrawerFooter>
                                <Button onClick={handleCloseDrawer}>Hủy</Button>
                                <ActionButton
                                    type="primary"
                                    htmlType="submit"
                                    loading={
                                        isOpenDrawerCreate
                                            ? mutationCreate.isLoading
                                            : mutationUpdate.isLoading
                                    }
                                >
                                    {isOpenDrawerCreate ? "Thêm" : "Cập nhật"}
                                </ActionButton>
                            </DrawerFooter>
                        </Form>
                    </DrawerContent>
                </Loading>
            </DrawerComponent>

            <ModalComponent
                title="Xóa loại sản phẩm"
                open={isModalOpenDelete}
                onCancel={handleCancelDelete}
                onOk={handleDeleteProductType}
            >
                <Loading isLoading={mutationDelete.isLoading}>
                    <div>Bạn có chắc xóa loại sản phẩm này không?</div>
                </Loading>
            </ModalComponent>
        </div>
    );
};

export default AdminProductType;
