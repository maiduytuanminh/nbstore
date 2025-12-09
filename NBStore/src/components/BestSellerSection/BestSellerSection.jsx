import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Row, Col, Typography } from "antd";
import { FireOutlined } from "@ant-design/icons";
import * as ProductService from "../../services/ProductService";
import CardComponent from "../CardComponent/CardComponent";
import Loading from "../LoadingComponent/Loading";
import {
    BestSellerContainer,
    SectionTitle,
    ProductsGrid,
    TitleIcon,
    SectionHeader,
} from "./style";

const { Title } = Typography;

const BestSellerSection = () => {
    const fetchBestSellerProducts = async () => {
        const res = await ProductService.getBestSellerProducts(8);
        return res;
    };

    const { isLoading, data: bestSellerProducts } = useQuery({
        queryKey: ["best-sellers"],
        queryFn: fetchBestSellerProducts,
        retry: 3,
        retryDelay: 1000,
    });

    if (isLoading || !bestSellerProducts?.data?.length) {
        return <Loading isLoading={isLoading} />;
    }

    return (
        <BestSellerContainer>
            <SectionHeader>
                <TitleIcon>
                    <FireOutlined />
                </TitleIcon>
                <SectionTitle level={2}>Sản phẩm nổi bật</SectionTitle>
                <p className="section-subtitle">
                    Những sản phẩm được yêu thích nhất tại cửa hàng
                </p>
            </SectionHeader>

            <ProductsGrid>
                <Row gutter={[16, 16]} justify="center">
                    {bestSellerProducts?.data?.map((product) => (
                        <Col
                            key={product._id}
                            xs={24}
                            sm={12}
                            md={8}
                            lg={6}
                            xl={6}
                        >
                            <CardComponent
                                countInStock={product.countInStock}
                                description={product.description}
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
                        </Col>
                    ))}
                </Row>
            </ProductsGrid>
        </BestSellerContainer>
    );
};

export default BestSellerSection;
