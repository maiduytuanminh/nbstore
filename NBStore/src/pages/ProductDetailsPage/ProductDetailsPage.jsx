import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { HomeOutlined, ShoppingOutlined, EyeOutlined } from "@ant-design/icons";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import styled from "styled-components";

const PageContainer = styled.div`
    min-height: calc(100vh - 64px);
    background: var(--gray-50);
    padding: var(--spacing-lg) 0;
`;

const MainContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-md);

    @media (max-width: 768px) {
        padding: 0 var(--spacing-sm);
    }
`;

const BreadcrumbContainer = styled.div`
    background: var(--white);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-lg);
    box-shadow: var(--shadow-sm);

    .ant-breadcrumb {
        font-size: var(--font-size-base);

        .ant-breadcrumb-item {
            .ant-breadcrumb-link {
                color: var(--text-secondary) !important;
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: var(--spacing-xs);

                &:hover {
                    color: var(--primary-color) !important;
                }
            }

            &:last-child {
                .ant-breadcrumb-link {
                    color: var(--text-primary) !important;
                    font-weight: var(--font-weight-medium);
                }
            }
        }

        .ant-breadcrumb-separator {
            color: var(--text-muted) !important;
        }

        span {
            color: inherit;
            margin-left: var(--spacing-xs);
        }

        .anticon {
            color: inherit;
            margin-right: var(--spacing-xs);
        }
    }
`;

const ProductDetailsPage = () => {
    const { id } = useParams();

    return (
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
                            <EyeOutlined />
                            <span>Chi tiết sản phẩm</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </BreadcrumbContainer>

                {/* Product Details */}
                <ProductDetailsComponent idProduct={id} />
            </MainContainer>
        </PageContainer>
    );
};

export default ProductDetailsPage;
