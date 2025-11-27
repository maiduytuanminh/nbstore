import {
    Button,
    Form,
    Space,
    Descriptions,
    Select,
    Input,
    InputNumber,
    Upload,
    Switch,
    Modal,
} from "antd";
import {
    PlusOutlined,
    DeleteOutlined,
    EditOutlined,
    SearchOutlined,
    LoadingOutlined,
    FireOutlined,
} from "@ant-design/icons";
import React, { useRef, useState, useEffect } from "react";
import {
    WrapperHeader,
    WrapperUploadFile,
    WrapperActions,
    ActionButton,
    TableWrapper,
    ActionButtons,
    DrawerContent,
    DrawerFooter,
    ProductImage,
    StatusTag,
} from "./style";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import {
    getBase64,
    renderOptions,
    renderProductTypeOptions,
    convertPrice,
} from "../../utils";
import * as ProductService from "../../services/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";
import Loading from "../../components/LoadingComponent/Loading";

const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [rowSelected, setRowSelected] = useState("");
    const user = useSelector((state) => state?.user);
    const searchInput = useRef(null);
    const [fileList, setFileList] = useState([]);
    const inittial = () => ({
        name: "",
        price: "",
        description: "",
        image: null,
        imageList: [],
        type: "",
        countInStock: "",
        discount: 0, // Mặc định là 0 (không giảm giá)
    });
    const [stateProduct, setStateProduct] = useState(inittial());
    const [stateProductDetails, setStateProductDetails] = useState(inittial());

    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");

    //fetch API để lấy dữ liệu sản phẩm
    const getAllProducts = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    };

    //fetch API để lấy danh mục sản phẩm
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllProductTypes();
        console.log("Product types response:", res);
        return res;
    };

    // Query để lấy danh sách loại sản phẩm
    const queryProductTypes = useQuery({
        queryKey: ["product-types"],
        queryFn: fetchAllTypeProduct,
    });

    console.log("queryProductTypes:", queryProductTypes.data);

    // Query để lấy danh sách sản phẩm
    const queryProduct = useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
    });

    const { data: products, isLoading: isLoadingProducts } = queryProduct;

    const mutation = useMutationHooks((data) => {
        const { token, ...rest } = data;
        console.log("CREATE - Mutation data:", rest);
        console.log("CREATE - Images array:", rest.images);
        console.log("CREATE - Images length:", rest.images?.length);
        const res = ProductService.createProduct(rest, token);
        return res;
    });
    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rest } = data;
        console.log("Update mutation data:", rest);
        const res = ProductService.updateProduct(id, token, rest);
        return res;
    });

    const mutationDeleted = useMutationHooks((data) => {
        const { id, token } = data;
        const res = ProductService.deleteProduct(id, token);
        return res;
    });

    const mutationDeletedMany = useMutationHooks((data) => {
        const { token, ...ids } = data;
        const res = ProductService.deleteManyProduct(ids, token);
        return res;
    });

    const fetchGetDetailsProduct = async (rowSelected) => {
        const res = await ProductService.getDetailsProduct(rowSelected);
        if (res?.data) {
            setStateProductDetails({
                name: res?.data?.name,
                price: res?.data?.price,
                description: res?.data?.description,
                images: res?.data?.images,
                type: res?.data?.type,
                countInStock: res?.data?.countInStock,
                discount: res?.data?.discount,
            });
        }
    };

    useEffect(() => {
        if (rowSelected && isModalOpen) {
            // Đang edit sản phẩm - không reset form
            console.log("Editing product, keeping current values");
        } else if (isModalOpen) {
            // Tạo mới sản phẩm - reset form
            console.log("Creating new product, resetting form");
            form.setFieldsValue(inittial());
        }
    }, [form, isModalOpen, rowSelected]);

    useEffect(() => {
        if (rowSelected && isModalOpen) {
            if (stateProduct?.images?.length > 0) {
                setFileList(
                    stateProduct.images.map((image, index) => ({
                        uid: index.toString(),
                        name: `image${index + 1}.png`,
                        status: "done",
                        url: image,
                    }))
                );
            } else {
                setFileList([]);
            }
            form.setFieldsValue({
                name: stateProduct.name,
                price: stateProduct.price,
                description: stateProduct.description,
                type: stateProduct.type,
                countInStock: stateProduct.countInStock,
                discount: stateProduct.discount,
            });
        }
    }, [form, stateProduct, rowSelected, isModalOpen]);

    useEffect(() => {
        if (stateProductDetails?.images?.length > 0) {
            setFileList(
                stateProductDetails.images.map((image, index) => ({
                    uid: index.toString(),
                    name: `image${index + 1}.png`,
                    status: "done",
                    url: image,
                }))
            );
        } else {
            setFileList([]);
        }
    }, [stateProductDetails.images]);

    const handleEditProduct = (record) => {
        console.log("Opening edit modal for record:", record);
        if (record?._id) {
            setRowSelected(record._id);
            setStateProduct({
                name: record.name,
                price: record.price,
                description: record.description,
                type: record.type,
                countInStock: record.countInStock,
                discount: record.discount,
            });

            // Xử lý hiển thị ảnh trong form edit
            const images = record.images || [];
            setFileList(
                images.map((image, index) => ({
                    uid: index.toString(),
                    name: `image${index + 1}.png`,
                    status: "done",
                    url: image,
                    thumbUrl: image,
                }))
            );

            setIsModalOpen(true);
            form.setFieldsValue({
                name: record.name,
                price: record.price,
                description: record.description,
                type: record.type,
                countInStock: record.countInStock,
                discount: record.discount,
            });
        }
    };

    const handleAddProduct = () => {
        setIsModalOpen(true);
        setRowSelected("");
        form.resetFields();
        setStateProduct(inittial());
    };

    const handleDelteManyProducts = (ids) => {
        mutationDeletedMany.mutate(
            { ids: ids, token: user?.access_token },
            {
                onSuccess: () => {
                    message.success("Xóa các sản phẩm thành công");
                    queryProduct.refetch();
                },
                onError: (error) => {
                    message.error("Xóa các sản phẩm thất bại");
                    console.error("Delete many error:", error);
                },
            }
        );
    };

    const { data, isLoading, isSuccess, isError } = mutation;
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

    const renderAction = (record) => {
        return (
            <Space>
                <EditOutlined
                    style={{
                        color: "orange",
                        fontSize: "20px",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        console.log("Edit button clicked for record:", record);
                        const newState = {
                            name: record.name,
                            price: record.price,
                            description: record.description,
                            images: record.images,
                            type: record.type,
                            countInStock: record.countInStock,
                            discount: record.discount,
                        };
                        console.log("Setting state to:", newState);
                        setStateProduct(newState);
                        setRowSelected(record._id);
                        setIsModalOpen(true);
                    }}
                />
                <DeleteOutlined
                    style={{
                        color: "red",
                        fontSize: "20px",
                        cursor: "pointer",
                        marginLeft: "12px",
                    }}
                    onClick={() => {
                        setIsModalOpenDelete(true);
                        setRowSelected(record._id);
                    }}
                />
            </Space>
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
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: "Loại",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            sorter: (a, b) => a.price - b.price,
            render: (price) => convertPrice(price),
        },
        {
            title: "Nổi bật",
            dataIndex: "isBestSeller",
            render: (isBestSeller, record) => (
                <Switch
                    checked={isBestSeller}
                    onChange={(checked) => {
                        handleUpdateProduct({
                            id: record._id,
                            isBestSeller: checked,
                        });
                    }}
                    checkedChildren={<FireOutlined />}
                    unCheckedChildren={<FireOutlined />}
                />
            ),
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, record) => (
                <Space>
                    <EditOutlined
                        style={{
                            color: "orange",
                            fontSize: "20px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            console.log(
                                "Edit button clicked for record:",
                                record
                            );
                            const newState = {
                                name: record.name,
                                price: record.price,
                                description: record.description,
                                images: record.images,
                                type: record.type,
                                countInStock: record.countInStock,
                                discount: record.discount,
                            };
                            console.log("Setting state to:", newState);
                            setStateProduct(newState);
                            setRowSelected(record._id);
                            setIsModalOpen(true);
                        }}
                    />
                    <DeleteOutlined
                        style={{
                            color: "red",
                            fontSize: "20px",
                            cursor: "pointer",
                            marginLeft: "12px",
                        }}
                        onClick={() => {
                            setIsModalOpenDelete(true);
                            setRowSelected(record._id);
                        }}
                    />
                </Space>
            ),
        },
    ];

    useEffect(() => {
        if (isSuccess && data?.status === "OK") {
            message.success();
            handleCancel();
        } else if (isError) {
            message.error();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isSuccessDelectedMany && dataDeletedMany?.status === "OK") {
            message.success();
        } else if (isErrorDeletedMany) {
            message.error();
        }
    }, [isSuccessDelectedMany]);

    useEffect(() => {
        if (isSuccessDelected && dataDeleted?.status === "OK") {
            message.success();
            handleCancelDelete();
        } else if (isErrorDeleted) {
            message.error();
        }
    }, [isSuccessDelected]);

    const handleCloseDrawer = () => {
        setIsModalOpen(false);
        form.resetFields();
        setFileList([]);
        setRowSelected(""); // Reset selected row khi đóng drawer
    };

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === "OK") {
            message.success();
            handleCloseDrawer();
        } else if (isErrorUpdated) {
            message.error();
        }
    }, [isSuccessUpdated]);

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };

    const handleDeleteProduct = () => {
        mutationDeleted.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSuccess: () => {
                    message.success("Xóa sản phẩm thành công");
                    handleCancelDelete();
                    queryProduct.refetch();
                },
                onError: (error) => {
                    message.error("Xóa sản phẩm thất bại");
                    console.error("Delete error:", error);
                },
            }
        );
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setRowSelected("");
        form.resetFields();
        setStateProduct(inittial());
        setFileList([]);
    };

    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnchangeDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnchangeAvatar = async ({ fileList: newFileList }) => {
        setUploadLoading(true);
        try {
            // Xử lý từng file mới được thêm vào
            const newFiles = newFileList.filter(
                (file) => !file.url && !file.thumbUrl
            );
            for (let file of newFiles) {
                if (!file.url && !file.thumbUrl && file.originFileObj) {
                    const base64 = await getBase64(file.originFileObj);
                    file.thumbUrl = base64;
                }
            }
            setFileList(newFileList);

            // Cập nhật form field với danh sách ảnh
            const imageUrls = newFileList.map(
                (file) => file.thumbUrl || file.url
            );
            form.setFieldValue("images", imageUrls);
        } catch (error) {
            console.error("Error processing images:", error);
            message.error("Có lỗi xảy ra khi xử lý ảnh");
        } finally {
            setUploadLoading(false);
        }
    };

    const handleOnchangeAvatarDetails = async ({ fileList: newFileList }) => {
        setFileList(newFileList);
        if (newFileList.length > 0) {
            setUploadLoading(true);
            try {
                const imageUrls = await Promise.all(
                    newFileList.map(async (file) => {
                        if (file.originFileObj) {
                            const imgBase64 = await getBase64(
                                file.originFileObj
                            );
                            return imgBase64;
                        }
                        return file.url;
                    })
                );
                setStateProductDetails({
                    ...stateProductDetails,
                    images: imageUrls,
                });
            } catch (error) {
                message.error("Lỗi khi xử lý ảnh");
            }
            setUploadLoading(false);
        } else {
            setStateProductDetails({
                ...stateProductDetails,
                images: [],
            });
        }
    };

    const handleChangeSelect = (value) => {
        console.log("Selected type:", value);
        setStateProduct({
            ...stateProduct,
            type: value,
        });
    };

    const onFinish = async (values) => {
        setIsSubmitting(true);
        console.log("Form values before processing:", values);
        console.log("FileList:", fileList);
        console.log("Is editing product:", !!rowSelected); // Log để kiểm tra có đang edit không

        try {
            console.log("Form values before validation:", values);

            // Validate required fields
            if (
                !values.name ||
                !values.type ||
                !values.price ||
                values.countInStock === undefined || values.countInStock === null
            ) {
                console.log("Validation failed for:", {
                    name: values.name,
                    type: values.type,
                    price: values.price,
                    countInStock: values.countInStock
                });
                message.error("Vui lòng điền đầy đủ thông tin sản phẩm!");
                setIsSubmitting(false);
                return;
            }

            // Validate images
            if (!fileList || fileList.length === 0) {
                message.error("Vui lòng tải lên ít nhất 1 ảnh sản phẩm!");
                setIsSubmitting(false);
                return;
            }

            // Lấy danh sách ảnh từ fileList và form
            const imageUrls = fileList.map((file) => file.thumbUrl || file.url);
            console.log("FileList:", fileList);
            console.log("Image URLs:", imageUrls);

            if (!imageUrls || imageUrls.length === 0) {
                message.error("Có lỗi khi xử lý ảnh, vui lòng thử lại!");
                setIsSubmitting(false);
                return;
            }

            const data = {
                name: values.name,
                images: imageUrls,
                type: values.type,
                price: Number(values.price),
                countInStock: Number(values.countInStock),
                description: values.description || "",
                discount: Number(values.discount) || 0, // Default to 0 if not provided
            };

            console.log("Final product data to submit:", data);

            if (rowSelected) {
                // Đang trong chế độ cập nhật
                mutationUpdate.mutate(
                    {
                        id: rowSelected,
                        token: user?.access_token,
                        ...data,
                    },
                    {
                        onSuccess: () => {
                            message.success("Cập nhật sản phẩm thành công");
                            handleCloseDrawer();
                            // Reset form và fileList
                            form.resetFields();
                            setFileList([]);
                            setRowSelected(""); // Reset selected row
                            // Refresh data
                            queryProduct.refetch();
                        },
                        onError: (error) => {
                            console.error("Update mutation error:", error);
                            message.error(
                                error?.message ||
                                    "Có lỗi xảy ra khi cập nhật sản phẩm"
                            );
                        },
                    }
                );
            } else {
                // Đang trong chế độ tạo mới
                mutation.mutate(
                    { ...data, token: user?.access_token },
                    {
                        onSuccess: () => {
                            message.success("Thêm sản phẩm thành công");
                            handleCloseDrawer();
                            // Reset form và fileList
                            form.resetFields();
                            setFileList([]);
                            // Refresh data
                            queryProduct.refetch();
                        },
                        onError: (error) => {
                            console.error("Create mutation error:", error);
                            message.error(
                                error?.message ||
                                    "Có lỗi xảy ra khi thêm sản phẩm"
                            );
                        },
                    }
                );
            }
        } catch (error) {
            console.error("Form submission error:", error);
            message.error("Có lỗi xảy ra khi xử lý form");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateProduct = async (data) => {
        setIsSubmitting(true);
        try {
            let updatedData = {};

            // Nếu là cập nhật isBestSeller
            if ("isBestSeller" in data) {
                updatedData = {
                    isBestSeller: data.isBestSeller,
                };
            } else {
                // Xử lý cập nhật thông tin sản phẩm thông thường
                const images = fileList.map(
                    (file) => file.thumbUrl || file.url
                );
                updatedData = {
                    ...data,
                    images,
                    price: Number(data.price),
                    countInStock: Number(data.countInStock),
                    discount: Number(data.discount),
                };
            }

            mutationUpdate.mutate(
                {
                    id: data.id || rowSelected,
                    token: user?.access_token,
                    ...updatedData,
                },
                {
                    onSuccess: () => {
                        message.success("Cập nhật sản phẩm thành công");
                        if (!("isBestSeller" in data)) {
                            handleCloseDrawer();
                        }
                        // Refresh data
                        queryProduct.refetch();
                    },
                    onError: (error) => {
                        message.error(error?.message || "Có lỗi xảy ra");
                    },
                }
            );
        } catch (error) {
            message.error("Có lỗi xảy ra khi xử lý ảnh");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(
            file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
        );
    };

    const handleCancelPreview = () => setPreviewOpen(false);

    return (
        <div style={{ padding: 24 }}>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>

            <Button
                style={{ marginBottom: 24 }}
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddProduct}
            >
                Thêm sản phẩm
            </Button>

            <TableWrapper>
                <Loading isLoading={isLoadingProducts}>
                    <TableComponent
                        columns={columns}
                        data={products?.data}
                        handleDelteMany={handleDelteManyProducts}
                        exportConfig={{
                            fileName: "Danh-sach-san-pham",
                            sheetName: "Danh sách sản phẩm"
                        }}
                        pagination={{
                            pageSize: 10,
                            total: products?.data?.length,
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} của ${total} sản phẩm`,
                        }}
                    />
                </Loading>
            </TableWrapper>

            <ModalComponent
                forceRender
                title={rowSelected ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Loading isLoading={isLoading}>
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={onFinish}
                        autoComplete="off"
                        form={form}
                    >
                        <Form.Item
                            label="Tên sản phẩm"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên sản phẩm!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProduct.name}
                                onChange={handleOnchange}
                                name="name"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Loại sản phẩm"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn loại sản phẩm!",
                                },
                            ]}
                        >
                            <Select
                                onChange={handleChangeSelect}
                                placeholder="Chọn loại sản phẩm"
                                value={stateProduct.type}
                                loading={queryProductTypes.isLoading}
                            >
                                {queryProductTypes?.data?.data?.map((type) => {
                                    console.log("Rendering type:", type);
                                    return (
                                        <Select.Option
                                            key={type._id}
                                            value={type.name}
                                        >
                                            {type.name}
                                        </Select.Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Giá"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập giá sản phẩm!",
                                },
                            ]}
                        >
                            <InputNumber
                                style={{ width: "100%" }}
                                formatter={(value) =>
                                    `${value}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ","
                                    )
                                }
                                parser={(value) =>
                                    value.replace(/\$\s?|(,*)/g, "")
                                }
                                onChange={(value) =>
                                    setStateProduct({
                                        ...stateProduct,
                                        price: value,
                                    })
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            label="Số lượng"
                            name="countInStock"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập số lượng sản phẩm!",
                                },
                            ]}
                        >
                            <InputNumber
                                style={{ width: "100%" }}
                                min={0}
                                onChange={(value) =>
                                    setStateProduct({
                                        ...stateProduct,
                                        countInStock: value,
                                    })
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            label="Giảm giá (%)"
                            name="discount"
                            initialValue={0}
                        >
                            <InputNumber
                                style={{ width: "100%" }}
                                min={0}
                                max={100}
                                defaultValue={0}
                                formatter={(value) => `${value}%`}
                                parser={(value) => value.replace("%", "")}
                                onChange={(value) =>
                                    setStateProduct({
                                        ...stateProduct,
                                        discount: value,
                                    })
                                }
                            />
                        </Form.Item>

                        <Form.Item label="Mô tả" name="description">
                            <Input.TextArea
                                rows={4}
                                onChange={(e) =>
                                    setStateProduct({
                                        ...stateProduct,
                                        description: e.target.value,
                                    })
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            name="images"
                            label="Hình ảnh sản phẩm"
                            rules={[
                                {
                                    required: true,
                                    validator: async () => {
                                        if (
                                            !fileList ||
                                            fileList.length === 0
                                        ) {
                                            throw new Error(
                                                "Vui lòng chọn ít nhất 1 ảnh!"
                                            );
                                        }
                                    },
                                },
                            ]}
                            valuePropName="fileList"
                            getValueFromEvent={(e) => {
                                if (Array.isArray(e)) {
                                    return e;
                                }
                                return e && e.fileList;
                            }}
                        >
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleOnchangeAvatar}
                                beforeUpload={() => false}
                                multiple={true}
                                maxCount={5}
                            >
                                {fileList.length < 5 && (
                                    <div>
                                        {uploadLoading ? (
                                            <LoadingOutlined />
                                        ) : (
                                            <PlusOutlined />
                                        )}
                                        <div style={{ marginTop: 8 }}>
                                            Tải ảnh
                                        </div>
                                    </div>
                                )}
                            </Upload>
                            {fileList.length > 0 && (
                                <div style={{ marginTop: 8 }}>
                                    Ảnh đầu tiên sẽ được sử dụng làm ảnh chính
                                    của sản phẩm
                                </div>
                            )}
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isSubmitting}
                                disabled={uploadLoading}
                            >
                                {rowSelected ? "Cập nhật" : "Thêm sản phẩm"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </ModalComponent>

            <ModalComponent
                title="Xóa sản phẩm"
                open={isModalOpenDelete}
                onCancel={handleCancelDelete}
                onOk={handleDeleteProduct}
            >
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa sản phẩm này không?</div>
                </Loading>
            </ModalComponent>

            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancelPreview}
            >
                <img
                    alt="preview"
                    style={{ width: "100%" }}
                    src={previewImage}
                />
            </Modal>
        </div>
    );
};

export default AdminProduct;
