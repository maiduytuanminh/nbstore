import { Checkbox } from "antd";
import styled from "styled-components";

export const WrapperContainer = styled.div`
    background: #f8fafc;
    min-height: 100vh;
    padding: 24px 0;
`;

export const WrapperContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
`;

export const PageTitle = styled.h1`
    font-size: 32px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 48px;
    text-align: center;
`;

export const WrapperMain = styled.div`
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 48px;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
        gap: 24px;
    }
`;

export const WrapperLeft = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const DeliverySection = styled.div`
    background: #ffffff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;

    h4 {
        margin: 0 0 16px 0;
        font-size: 18px;
        font-weight: 600;
        color: #1f2937;
    }
`;

export const WrapperStyleHeaderDilivery = styled.div`
    background: #f8fafc;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
`;

export const CartSection = styled.div`
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    overflow: hidden;
`;

export const WrapperStyleHeader = styled.div`
    background: #eff6ff;
    padding: 16px 24px;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    align-items: center;

    .select-all {
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 300px;

        span {
            color: #1f2937;
            font-weight: 500;
            font-size: 16px;
        }
    }

    .headers {
        flex: 1;
        display: grid;
        grid-template-columns: 1fr 120px 120px 40px;
        gap: 16px;
        text-align: center;

        span {
            color: #6b7280;
            font-weight: 500;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .delete-all {
            cursor: pointer;
            color: #ef4444;
            transition: all 0.3s ease;

            &:hover {
                color: #dc2626;
                transform: scale(1.1);
            }
        }
    }
`;

export const WrapperListOrder = styled.div`
    display: flex;
    flex-direction: column;
`;

export const WrapperItemOrder = styled.div`
    display: flex;
    align-items: center;
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--border-color);
    transition: all 0.3s ease;

    &:hover {
        background: var(--gray-25);
    }

    &:last-child {
        border-bottom: none;
    }

    .product-info {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        min-width: 300px;

        .product-image {
            width: 80px;
            height: 80px;
            border-radius: var(--radius-md);
            object-fit: cover;
            border: 1px solid var(--border-color);
        }

        .product-name {
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: var(--font-size-base);
            color: var(--text-primary);
            font-weight: var(--font-weight-medium);
        }
    }

    .product-details {
        flex: 1;
        display: grid;
        grid-template-columns: 1fr 120px 120px 40px;
        gap: var(--spacing-md);
        align-items: center;
        text-align: center;

        .price {
            font-size: var(--font-size-base);
            font-weight: var(--font-weight-semibold);
            color: var(--text-primary);
        }

        .total-price {
            font-size: var(--font-size-base);
            font-weight: var(--font-weight-bold);
            color: var(--primary-600);
        }

        .delete-btn {
            cursor: pointer;
            color: var(--red-500);
            transition: all 0.3s ease;

            &:hover {
                color: var(--red-600);
                transform: scale(1.1);
            }
        }
    }
`;

export const WrapperCountOrder = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    overflow: hidden;
    background: var(--white);

    button {
        border: none;
        background: var(--gray-50);
        padding: var(--spacing-xs) var(--spacing-sm);
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            background: var(--gray-100);
        }

        &:active {
            background: var(--gray-200);
        }
    }

    .ant-input-number {
        border: none;
        box-shadow: none;

        .ant-input-number-input {
            text-align: center;
            padding: var(--spacing-xs);
        }
    }
`;

export const WrapperRight = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    height: fit-content;
    position: sticky;
    top: 24px;
`;

export const OrderSummary = styled.div`
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    overflow: hidden;
`;

export const WrapperInfo = styled.div`
    padding: 24px;

    .summary-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;

        &:last-child {
            margin-bottom: 0;
        }

        .label {
            color: #6b7280;
            font-size: 16px;
        }

        .value {
            color: #1f2937;
            font-size: 16px;
            font-weight: 600;
        }
    }
`;

export const WrapperTotal = styled.div`
    padding: 24px;
    border-top: 1px solid #e5e7eb;
    background: #f0f9ff;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .total-label {
        font-size: 18px;
        font-weight: 700;
        color: #1f2937;
    }

    .total-amount {
        display: flex;
        flex-direction: column;
        align-items: end;

        .amount {
            font-size: 24px;
            font-weight: 700;
            color: #3b82f6;
        }

        .vat-note {
            font-size: 12px;
            color: #6b7280;
            margin-top: 8px;
        }
    }
`;

export const CheckoutButton = styled.button`
    width: 100%;
    padding: 16px 24px;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: #ffffff;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &:hover {
        background: linear-gradient(135deg, #2563eb, #1d4ed8);
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        background: #d1d5db !important;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
        opacity: 0.6;
    }
`;

export const EmptyCart = styled.div`
    text-align: center;
    padding: var(--spacing-4xl) var(--spacing-lg);

    .empty-icon {
        font-size: 4rem;
        color: var(--gray-300);
        margin-bottom: var(--spacing-lg);
    }

    h3 {
        font-size: var(--font-size-xl);
        color: var(--text-primary);
        margin-bottom: var(--spacing-md);
    }

    p {
        color: var(--text-secondary);
        font-size: var(--font-size-base);
        margin-bottom: var(--spacing-lg);
    }

    .continue-shopping {
        background: var(--primary-600);
        color: var(--white);
        padding: var(--spacing-sm) var(--spacing-lg);
        border: none;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: var(--font-weight-medium);
        transition: all 0.3s ease;

        &:hover {
            background: var(--primary-700);
            color: var(--white);
        }
    }
`;

export const CustomCheckbox = styled(Checkbox)`
    .ant-checkbox-checked .ant-checkbox-inner {
        background-color: #3b82f6 !important;
        border-color: #3b82f6 !important;
    }

    .ant-checkbox:hover .ant-checkbox-inner {
        border-color: #3b82f6 !important;
    }

    .ant-checkbox-inner {
        border-radius: 4px;
    }
`;

export const WrapperPriceDiscount = styled.span`
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    text-decoration: line-through;
    margin-left: var(--spacing-xs);
`;
