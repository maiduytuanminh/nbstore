import { Col } from "antd";
import styled from "styled-components";

export const PageContainer = styled.div`
    min-height: calc(100vh - 64px);
    background: var(--gray-50);
    padding: var(--spacing-lg) 0;
`;

export const MainContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-md);

    @media (max-width: 768px) {
        padding: 0 var(--spacing-sm);
    }
`;

export const BreadcrumbContainer = styled.div`
    background: var(--white);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-lg);
    box-shadow: var(--shadow-sm);

    .ant-breadcrumb {
        font-size: var(--font-size-base);

        .ant-breadcrumb-link {
            color: var(--text-secondary) !important;
            text-decoration: none;

            &:hover {
                color: var(--primary-color) !important;
            }
        }

        .ant-breadcrumb-separator {
            color: var(--text-muted) !important;
        }

        li:last-child {
            .ant-breadcrumb-link {
                color: var(--text-primary) !important;
                font-weight: var(--font-weight-medium);
            }
        }

        span {
            color: inherit;
            margin-left: var(--spacing-xs);
        }

        .anticon {
            color: inherit;
            margin-right: var(--spacing-xs);
        }

        /* Style for breadcrumb items */
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
    }
`;

export const ContentWrapper = styled.div`
    display: flex;
    gap: var(--spacing-lg);
    align-items: flex-start;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: var(--spacing-md);
    }
`;

export const WrapperNavbar = styled(Col)`
    background: var(--white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    padding: var(--spacing-lg);
    height: fit-content;
    min-width: 280px;

    @media (max-width: 768px) {
        width: 100%;
        min-width: unset;
    }
`;

export const MainContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
`;

export const FilterSection = styled.div`
    background: var(--white);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow-sm);
    margin-bottom: var(--spacing-lg);

    .filter-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-md);

        h3 {
            margin: 0;
            font-size: var(--font-size-lg);
            font-weight: var(--font-weight-semibold);
            color: var(--text-primary);
        }
    }
`;

export const WrapperProducts = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--spacing-lg);
    background: var(--white);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow-sm);

    @media (max-width: 1024px) {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: var(--spacing-md);
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: var(--spacing-sm);
        padding: var(--spacing-md);
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-xs);
    }
`;

export const EmptyState = styled.div`
    text-align: center;
    padding: var(--spacing-4xl) var(--spacing-lg);
    background: var(--white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);

    .empty-icon {
        font-size: 4rem;
        color: var(--gray-400);
        margin-bottom: var(--spacing-md);
    }

    .empty-title {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        color: var(--text-primary);
        margin-bottom: var(--spacing-sm);
    }

    .empty-description {
        font-size: var(--font-size-base);
        color: var(--text-secondary);
        margin-bottom: var(--spacing-lg);
    }
`;

export const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: var(--spacing-lg);
    background: var(--white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);

    .ant-pagination {
        .ant-pagination-item {
            border: 1px solid var(--border-color);

            &:hover {
                border-color: var(--primary-color);
            }

            &.ant-pagination-item-active {
                background: var(--primary-color);
                border-color: var(--primary-color);

                a {
                    color: var(--white);
                }
            }
        }

        .ant-pagination-prev,
        .ant-pagination-next {
            &:hover {
                border-color: var(--primary-color);
                color: var(--primary-color);
            }
        }
    }
`;

export const CategoryTitle = styled.h1`
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    color: var(--text-primary);
    margin: 0 0 var(--spacing-md) 0;

    @media (max-width: 768px) {
        font-size: var(--font-size-xl);
    }
`;

export const CategoryDescription = styled.p`
    font-size: var(--font-size-base);
    color: var(--text-secondary);
    margin: 0;
    line-height: var(--line-height-relaxed);
`;
