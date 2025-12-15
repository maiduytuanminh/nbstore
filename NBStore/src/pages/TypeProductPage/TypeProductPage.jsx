import React from "react";
import NavBarComponent from "../../components/NavbarComponent/NavBarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import FilterSummary from "../../components/FilterSummary/FilterSummary";
import SortFilter from "../../components/SortFilter/SortFilter";
import { Breadcrumb, Empty, Button, Pagination } from "antd";
import {
    HomeOutlined,
    ShoppingOutlined,
    FolderOutlined,
} from "@ant-design/icons";
import {
    PageContainer,
    MainContainer,
    BreadcrumbContainer,
    ContentWrapper,
    WrapperNavbar,
    MainContent,
    FilterSection,
    WrapperProducts,
    EmptyState,
    PaginationWrapper,
    CategoryTitle,
    CategoryDescription,
} from "./style";
import { useLocation, useNavigate } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

const TypeProductPage = () => {
    const navigate = useNavigate();
    const searchProduct = useSelector((state) => state?.product?.search);
    const searchDebounce = useDebounce(searchProduct, 500);

    const { state } = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [priceFilter, setPriceFilter] = useState([]);
    const [sortType, setSortType] = useState("default");
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 10,
        total: 1,
    });

    // Mapping category names
    const categoryMap = {
        Laptop: "Laptop",
        Tablet: "Tablet",
        "Điện thoại": "Điện thoại",
        "Phụ kiện": "Phụ kiện",
        "Đồng hồ thông minh": "Đồng hồ thông minh",
        "Tai nghe": "Tai nghe",
    };

    const categoryDescriptions = {
        Laptop: "Khám phá bộ sưu tập laptop đa dạng từ gaming đến văn phòng, đáp ứng mọi nhu cầu công việc và giải trí.",
        Tablet: "Máy tính bảng hiện đại với thiết kế mỏng nhẹ, hiệu suất cao cho công việc và giải trí di động.",
        "Điện thoại":
            "Điện thoại thông minh với công nghệ tiên tiến, camera sắc nét và pin bền bỉ.",
        "Phụ kiện":
            "Phụ kiện công nghệ chính hãng giúp tối ưu hóa trải nghiệm sử dụng thiết bị của bạn.",
        "Đồng hồ thông minh":
            "Đồng hồ thông minh theo dõi sức khỏe và kết nối liền mạch với smartphone.",
        "Tai nghe":
            "Tai nghe chất lượng cao với âm thanh sống động và tính năng chống ồn hiện đại.",
    };

    const fetchProductType = async (type, page, limit) => {
        setLoading(true);
        const res = await ProductService.getProductType(type, page, limit);
        if (res?.status == "OK") {
            setLoading(false);
            setProducts(res?.data);
            setPanigate({ ...panigate, total: res?.totalPage });
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (state) {
            fetchProductType(state, panigate.page, panigate.limit);
        }
    }, [state, panigate.page, panigate.limit]);

    const onChange = (current, pageSize) => {
        setPanigate({ ...panigate, page: current - 1, limit: pageSize });
    };

    const handleSortChange = (value) => {
        setSortType(value);
    };

    const sortProducts = (products) => {
        if (!products) return [];

        const sortedProducts = [...products];

        switch (sortType) {
            case "price-asc":
                return sortedProducts.sort((a, b) => a.price - b.price);
            case "price-desc":
                return sortedProducts.sort((a, b) => b.price - a.price);
            case "name-asc":
                return sortedProducts.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
            case "name-desc":
                return sortedProducts.sort((a, b) =>
                    b.name.localeCompare(a.name)
                );
            case "rating-desc":
                return sortedProducts.sort(
                    (a, b) => (b.rating || 0) - (a.rating || 0)
                );
            case "selled-desc":
                return sortedProducts.sort(
                    (a, b) => (b.selled || 0) - (a.selled || 0)
                );
            default:
                return sortedProducts;
        }
    };

    const handlePriceFilterChange = (selectedRanges) => {
        setPriceFilter(selectedRanges);
    };

    const handleRemovePriceFilter = () => {
        setPriceFilter([]);
    };

    const filterProducts = (products) => {
        return products?.filter((product) => {
            const matchSearch =
                searchDebounce === "" ||
                product?.name
                    ?.toLowerCase()
                    ?.includes(searchDebounce?.toLowerCase());

            let matchPrice = true;
            if (priceFilter.length > 0) {
                matchPrice = priceFilter.some(
                    (range) =>
                        product.price >= range.min && product.price <= range.max
                );
            }

            return matchSearch && matchPrice;
        });
    };

    const filteredProducts = filterProducts(products);
    const sortedAndFilteredProducts = sortProducts(filteredProducts);

    const currentCategory = categoryMap[state] || state;
    const currentDescription =
        categoryDescriptions[state] ||
        "Sản phẩm chất lượng cao với giá cả cạnh tranh.";

    return (
        <Loading isLoading={loading}>
            <PageContainer>
                <MainContainer>
                    {/* Breadcrumb */}
                    <BreadcrumbContainer>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">
                                <HomeOutlined />
                                <span>Trang chủ</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="/products">
                                <ShoppingOutlined />
                                <span>Sản phẩm</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <FolderOutlined />
                                <span>{currentCategory}</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </BreadcrumbContainer>

                    {/* Category Header */}
                    <FilterSection>
                        <div className="filter-header">
                            <div>
                                <CategoryTitle>{currentCategory}</CategoryTitle>
                                <CategoryDescription>
                                    {currentDescription}
                                </CategoryDescription>
                            </div>
                        </div>
                        <SortFilter onSortChange={handleSortChange} />
                        <FilterSummary
                            priceFilter={priceFilter}
                            onRemovePriceFilter={handleRemovePriceFilter}
                            totalProducts={
                                sortedAndFilteredProducts?.length || 0
                            }
                        />
                    </FilterSection>

                    {/* Main Content */}
                    <ContentWrapper>
                        <WrapperNavbar>
                            <NavBarComponent
                                onPriceFilterChange={handlePriceFilterChange}
                            />
                        </WrapperNavbar>

                        <MainContent>
                            {sortedAndFilteredProducts?.length > 0 ? (
                                <WrapperProducts>
                                    {sortedAndFilteredProducts?.map(
                                        (product) => {
                                            return (
                                                <CardComponent
                                                    key={product._id}
                                                    countInStock={
                                                        product.countInStock
                                                    }
                                                    description={
                                                        product.description
                                                    }
                                                    images={product.images}
                                                    name={product.name}
                                                    price={product.price}
                                                    rating={product.rating}
                                                    type={product.type}
                                                    selled={product.selled}
                                                    discount={product.discount}
                                                    id={product._id}
                                                    isBestSeller={product.isBestSeller}
                                                />
                                            );
                                        }
                                    )}
                                </WrapperProducts>
                            ) : (
                                <EmptyState>
                                    <div className="empty-icon">📦</div>
                                    <div className="empty-title">
                                        Không tìm thấy sản phẩm
                                    </div>
                                    <div className="empty-description">
                                        Rất tiếc, chúng tôi không tìm thấy sản
                                        phẩm nào phù hợp với tiêu chí tìm kiếm
                                        của bạn.
                                    </div>
                                    <Button
                                        type="primary"
                                        onClick={() => navigate("/")}
                                    >
                                        Quay về trang chủ
                                    </Button>
                                </EmptyState>
                            )}

                            {/* Pagination */}
                            {sortedAndFilteredProducts?.length > 0 && (
                                <PaginationWrapper>
                                    <div className="ant-pagination">
                                        <Pagination
                                            defaultCurrent={panigate.page + 1}
                                            total={panigate?.total}
                                            onChange={onChange}
                                            showSizeChanger={false}
                                            showQuickJumper={false}
                                            showTotal={(total, range) =>
                                                `${range[0]}-${range[1]} của ${total} sản phẩm`
                                            }
                                        />
                                    </div>
                                </PaginationWrapper>
                            )}
                        </MainContent>
                    </ContentWrapper>
                </MainContainer>
            </PageContainer>
        </Loading>
    );
};

export default TypeProductPage;
