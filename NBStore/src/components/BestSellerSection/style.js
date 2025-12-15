import styled from "styled-components";
import { Typography } from "antd";

const { Title } = Typography;

export const BestSellerContainer = styled.div`
    padding: var(--spacing-xl) 0;
    background: var(--bg-primary);
    margin: var(--spacing-xl) 0;
`;

export const SectionHeader = styled.div`
    text-align: center;
    margin-bottom: var(--spacing-3xl);
    padding: 0 var(--spacing-sm);

    .section-subtitle {
        color: var(--text-secondary);
        font-size: var(--font-size-lg);
        margin-top: var(--spacing-md);
        font-weight: var(--font-weight-normal);
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        line-height: var(--line-height-relaxed);
    }
`;

export const TitleIcon = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    background: var(--primary-color);
    border-radius: var(--radius-full);
    margin-bottom: var(--spacing-lg);
    transition: all 0.3s ease;

    .anticon {
        font-size: 1.8rem;
        color: var(--white);
    }

    &:hover {
        background: var(--primary-hover);
        transform: scale(1.05);
    }
`;

export const SectionTitle = styled(Title)`
    &.ant-typography {
        font-family: "Inter", sans-serif !important;
        font-weight: 700 !important;
        color: var(--text-primary) !important;
        margin-bottom: 0 !important;
        text-align: center;
        position: relative;
        font-size: 2.5rem !important;

        &::after {
            content: "";
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 3px;
            background: var(--primary-color);
            border-radius: var(--radius-sm);
        }
    }

    @media (max-width: 768px) {
        &.ant-typography {
            font-size: 2rem !important;
        }
    }
`;

export const ProductsGrid = styled.div`
    padding: 0 var(--spacing-lg);
    max-width: 1200px;
    margin: 0 auto;

    .ant-row {
        margin: 0 -8px;
    }

    .ant-col {
        padding: 0 8px;
        margin-bottom: var(--spacing-lg);

        &:hover {
            transform: translateY(-2px);
            transition: all 0.3s ease;
        }
    }

    @media (max-width: 768px) {
        padding: 0 var(--spacing-md);

        .ant-col {
            margin-bottom: var(--spacing-md);
        }
    }
`;

export const BestSellerBadge = styled.div`
    position: absolute;
    top: 8px;
    right: 8px;
    background: var(--error-color);
    color: var(--white);
    padding: 4px 8px;
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    box-shadow: var(--shadow-sm);
    z-index: 2;

    &::before {
        content: "🔥";
        margin-right: 4px;
    }
`;
