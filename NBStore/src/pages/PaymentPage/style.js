import { Radio } from "antd";
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

export const WrapperRight = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    height: fit-content;
    position: sticky;
    top: 24px;
`;

export const PaymentSection = styled.div`
    background: #ffffff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
`;

export const SectionTitle = styled.h3`
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const WrapperRadio = styled(Radio.Group)`
    width: 100%;

    .ant-radio-wrapper {
        width: 100%;
        padding: 16px;
        margin: 0 0 12px 0;
        background: #f8fafc;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        transition: all 0.3s ease;

        &:hover {
            border-color: #3b82f6;
            background: #eff6ff;
        }

        &.ant-radio-wrapper-checked {
            border-color: #3b82f6;
            background: #eff6ff;
            box-shadow: 0 0 0 1px #3b82f6;
        }

        .ant-radio {
            .ant-radio-inner {
                border-color: #3b82f6;

                &::after {
                    background-color: #3b82f6;
                }
            }

            &.ant-radio-checked .ant-radio-inner {
                background-color: #3b82f6;
                border-color: #3b82f6;
            }
        }

        span:not(.ant-radio) {
            font-size: 16px;
            font-weight: 500;
            color: #1f2937;
        }
    }
`;

export const DeliveryOption = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    .delivery-logo {
        font-weight: 700;
        color: #ea8500;
        font-size: 14px;
    }

    .delivery-description {
        color: #6b7280;
        font-size: 14px;
    }
`;

export const PaymentOption = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    .payment-icon {
        font-size: 20px;
    }

    .payment-description {
        color: #6b7280;
        font-size: 14px;
        margin-top: 4px;
    }
`;

export const ShippingInfo = styled.div`
    background: #ffffff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    margin-bottom: 24px;
`;

export const ShippingHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;

    .title {
        font-size: 16px;
        font-weight: 600;
        color: #059669;
    }
`;

export const ShippingDetails = styled.div`
    .detail-row {
        display: flex;
        margin-bottom: 12px;

        .label {
            min-width: 140px;
            color: #6b7280;
            font-size: 14px;
        }

        .value {
            color: #1f2937;
            font-weight: 500;
            font-size: 14px;
            flex: 1;
        }
    }

    .edit-link {
        color: #3b82f6;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: color 0.3s ease;
        display: flex;
        align-items: center;
        gap: 4px;
        margin-top: 16px;

        &:hover {
            color: #2563eb;
        }
    }
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

export const PayPalWrapper = styled.div`
    width: 100%;
    margin-top: 16px;

    .paypal-loading {
        text-align: center;
        padding: 20px;
        background: #ffffff;
        border-radius: 8px;
        border: 1px solid #e5e7eb;

        .loading-text {
            color: #3b82f6;
            font-size: 16px;
            font-weight: 500;
        }
    }
`;

export const Lable = styled.span`
    font-size: 14px;
    color: #1f2937;
    font-weight: 600;
    display: block;
    margin-bottom: 12px;
`;

// Legacy styles - keeping for compatibility
export const WrapperStyleHeader = styled.div`
    background: #ffffff;
    padding: 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;

    span {
        color: #1f2937;
        font-weight: 400;
        font-size: 14px;
    }
`;

export const WrapperListOrder = styled.div`
    display: flex;
    flex-direction: column;
`;

export const WrapperItemOrder = styled.div`
    display: flex;
    align-items: center;
    padding: 16px;
    background: #ffffff;
    margin-top: 12px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
`;

export const WrapperPriceDiscount = styled.span`
    color: #6b7280;
    font-size: 12px;
    text-decoration: line-through;
    margin-left: 8px;
`;

export const WrapperCountOrder = styled.div`
    display: flex;
    align-items: center;
    width: 84px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
`;
