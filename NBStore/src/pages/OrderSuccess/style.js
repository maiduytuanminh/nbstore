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

export const SuccessHeader = styled.div`
    text-align: center;
    padding: 48px 0;
    background: #ffffff;
    border-radius: 16px;
    margin-bottom: 32px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

export const SuccessIcon = styled.div`
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #22c55e, #16a34a);
    border-radius: 50%;
    margin: 0 auto 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    animation: successBounce 0.8s ease-out;

    @keyframes successBounce {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }
`;

export const SuccessTitle = styled.h1`
    font-size: 32px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 16px;
`;

export const SuccessSubtitle = styled.p`
    font-size: 18px;
    color: #6b7280;
    margin-bottom: 24px;
`;

export const OrderNumber = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #eff6ff;
    border: 1px solid #3b82f6;
    border-radius: 24px;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    color: #1d4ed8;
`;

export const ContentGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 32px;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
        gap: 24px;
    }
`;

export const OrderDetailsSection = styled.div`
    background: #ffffff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 24px;
`;

export const SectionTitle = styled.h3`
    font-size: 20px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const InfoCard = styled.div`
    background: #f8fafc;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;

    .label {
        font-size: 14px;
        color: #6b7280;
        margin-bottom: 8px;
    }

    .value {
        font-size: 16px;
        font-weight: 500;
        color: #1f2937;
    }
`;

export const OrderItemsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const OrderItem = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: #f8fafc;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
`;

export const ItemImage = styled.img`
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
`;

export const ItemInfo = styled.div`
    flex: 1;
    min-width: 0;
`;

export const ItemName = styled.h4`
    font-size: 16px;
    font-weight: 500;
    color: #1f2937;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const ItemDetails = styled.div`
    display: flex;
    gap: 24px;

    .detail-item {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 14px;
        color: #6b7280;

        .label {
            font-weight: 500;
        }

        .value {
            color: #1f2937;
        }
    }
`;

export const OrderSummary = styled.div`
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    height: fit-content;
    position: sticky;
    top: 24px;
`;

export const SummaryHeader = styled.div`
    padding: 24px;
    background: #f0f9ff;
    border-bottom: 1px solid #e5e7eb;
`;

export const SummaryTitle = styled.h3`
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 8px;
`;

export const SummarySubtitle = styled.p`
    font-size: 14px;
    color: #6b7280;
`;

export const SummaryContent = styled.div`
    padding: 24px;
`;

export const SummaryRow = styled.div`
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
        font-weight: 500;
    }
`;

export const TotalRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-top: 1px solid #e5e7eb;
    margin-top: 16px;

    .label {
        font-size: 18px;
        font-weight: 600;
        color: #1f2937;
    }

    .value {
        font-size: 24px;
        font-weight: 700;
        color: #3b82f6;
    }
`;

export const TrackingSection = styled.div`
    background: #ffffff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 24px;
`;

export const TrackingSteps = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 20px;
`;

export const TrackingStep = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    .step-icon {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: 600;

        &.active {
            background: #3b82f6;
            color: #ffffff;
        }

        &.completed {
            background: #22c55e;
            color: #ffffff;
        }

        &.pending {
            background: #e5e7eb;
            color: #6b7280;
        }
    }

    .step-content {
        flex: 1;

        .step-title {
            font-size: 16px;
            font-weight: 500;
            color: #1f2937;
            margin-bottom: 4px;
        }

        .step-description {
            font-size: 14px;
            color: #6b7280;
        }
    }
`;

export const ActionButtons = styled.div`
    display: flex;
    gap: 16px;
    margin-top: 24px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const ActionButton = styled.button`
    flex: 1;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &.primary {
        background: linear-gradient(135deg, #3b82f6, #2563eb);
        color: #ffffff;
        border: none;

        &:hover {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
    }

    &.secondary {
        background: #ffffff;
        color: #3b82f6;
        border: 1px solid #3b82f6;

        &:hover {
            background: #eff6ff;
            border-color: #2563eb;
        }
    }
`;

export const ContactInfo = styled.div`
    background: #fffbeb;
    border: 1px solid #fbbf24;
    border-radius: 8px;
    padding: 16px;
    margin-top: 24px;

    .title {
        font-size: 16px;
        font-weight: 600;
        color: #92400e;
        margin-bottom: 8px;
    }

    .content {
        font-size: 14px;
        color: #a16207;
    }
`;

// Legacy styles for compatibility
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

export const WrapperValue = styled.div`
    background: #f0f9ff;
    border: 1px solid #93c5fd;
    padding: 12px;
    border-radius: 8px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 500;
`;

export const WrapperListOrder = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const WrapperItemOrder = styled.div`
    display: flex;
    align-items: center;
    padding: 16px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    gap: 16px;
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

export const WrapperRight = styled.div`
    width: 320px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
`;

export const WrapperInfo = styled.div`
    padding: 20px;
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    width: 100%;
    margin-bottom: 16px;
`;

export const WrapperItemOrderInfo = styled.div`
    padding: 20px;
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    width: 100%;
    margin-bottom: 16px;
`;

export const WrapperTotal = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
`;

export const Lable = styled.span`
    font-size: 14px;
    color: #1f2937;
    font-weight: 600;
    display: block;
    margin-bottom: 8px;
`;

export const WrapperRadio = styled(Radio.Group)`
    margin-top: 12px;
    background: #f0f9ff;
    border: 1px solid #93c5fd;
    border-radius: 8px;
    padding: 16px;
    width: 100%;

    .ant-radio-wrapper {
        margin-bottom: 8px;

        &:last-child {
            margin-bottom: 0;
        }
    }
`;
