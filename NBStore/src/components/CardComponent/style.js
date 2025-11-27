import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 200px;
    position: relative;
    background: ${(props) =>
        props.disabled
            ? "var(--gray-100)"
            : "var(--white)"};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    border-radius: var(--radius-lg) !important;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border-color);
    font-family: "Inter", sans-serif;

    &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-md);
        border-color: var(--primary-lighter);
    }

    &:active {
        transform: translateY(-2px);
    }

    .ant-card-body {
        padding: 14px !important;
        position: relative;
        background: var(--white);
    }

    .ant-card-cover {
        position: relative;
        overflow: hidden;
        border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    }
`;

export const CardImage = styled.div`
    position: relative;
    width: 200px;
    height: 200px;
    overflow: hidden;
    background: var(--gray-50);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.3s ease;
    }

    &:hover img {
        transform: scale(1.05);
    }
`;

export const BestSellerBadge = styled.div`
    position: absolute;
    top: 8px;
    right: 8px;
    background: var(--error-color);
    color: var(--white);
    padding: 6px 10px;
    border-radius: var(--radius-md);
    font-size: 11px;
    font-weight: 700;
    box-shadow: var(--shadow-sm);
    z-index: 3;
    display: flex;
    align-items: center;
    gap: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    .anticon {
        font-size: 11px;
    }
`;

export const StyleNameProduct = styled.div`
    font-weight: 600;
    font-size: 14px;
    line-height: 1.4;
    color: var(--text-primary);
    margin: 10px 0 8px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 38px;
    font-family: "Inter", sans-serif;
    transition: all 0.3s ease;

    &:hover {
        color: var(--primary-color);
    }
`;

export const WrapperReportText = styled.div`
    font-size: 12px;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: 4px;
    margin: 4px 0;
    font-family: "Inter", sans-serif;
`;

export const WrapperPriceText = styled.div`
    color: var(--primary-color);
    font-size: 16px;
    font-weight: 700;
    margin: 8px 0 4px;
    font-family: "Inter", sans-serif;
`;

export const WrapperDiscountText = styled.span`
    color: var(--text-light);
    font-size: 12px;
    text-decoration: line-through;
    font-weight: 400;
    margin-left: 8px;
    font-family: "Inter", sans-serif;
`;

export const WrapperStyleTextSell = styled.span`
    font-size: 12px;
    line-height: 24px;
    color: var(--text-secondary);
    font-family: "Inter", sans-serif;
`;

export const WrapperOutOfStock = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4;
    backdrop-filter: blur(2px);
    border-radius: var(--radius-lg);
`;

export const OutOfStockText = styled.div`
    background: var(--error-color);
    color: var(--white);
    padding: 8px 16px;
    border-radius: var(--radius-md);
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    box-shadow: var(--shadow-sm);
    font-family: "Inter", sans-serif;
`;

export const DiscountBadge = styled.div`
    position: absolute;
    top: 8px;
    left: 8px;
    background: var(--success-color);
    color: var(--white);
    padding: 4px 8px;
    border-radius: var(--radius-md);
    font-size: 11px;
    font-weight: 700;
    z-index: 3;
    box-shadow: var(--shadow-sm);
    font-family: "Inter", sans-serif;
`;

export const OfficialBadge = styled.div`
    position: absolute;
    bottom: 8px;
    left: 8px;
    background: var(--info-color);
    color: var(--white);
    padding: 2px 6px;
    border-radius: var(--radius-sm);
    font-size: 10px;
    font-weight: 600;
    z-index: 3;
    display: flex;
    align-items: center;
    gap: 2px;
    font-family: "Inter", sans-serif;

    .anticon {
        font-size: 10px;
    }
`;

export const RatingContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    margin: 4px 0;
    font-family: "Inter", sans-serif;
`;

export const StarRating = styled.div`
    display: flex;
    align-items: center;
    gap: 2px;

    .anticon {
        font-size: 12px;
        color: var(--warning-color);
    }
`;

export const RatingText = styled.span`
    font-size: 12px;
    color: var(--text-secondary);
    font-family: "Inter", sans-serif;
`;
