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

export const PageHeader = styled.div`
    background: #ffffff;
    border-radius: 12px;
    padding: 32px;
    margin-bottom: 32px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const PageTitle = styled.h1`
    font-size: 32px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const PageSubtitle = styled.p`
    font-size: 16px;
    color: #6b7280;
    margin-bottom: 24px;
`;

export const OrderStats = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-top: 24px;
`;

export const StatCard = styled.div`
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 16px;
    text-align: center;

    .stat-number {
        font-size: 24px;
        font-weight: 700;
        color: #3b82f6;
        margin-bottom: 4px;
    }

    .stat-label {
        font-size: 14px;
        color: #6b7280;
    }
`;

export const FilterSection = styled.div`
    background: #ffffff;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const FilterTitle = styled.h3`
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 16px;
`;

export const StatusFilter = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
`;

export const StatusChip = styled.button`
    padding: 8px 16px;
    border-radius: 20px;
    border: 1px solid #e5e7eb;
    background: ${(props) => (props.active ? "#3b82f6" : "#ffffff")};
    color: ${(props) => (props.active ? "#ffffff" : "#6b7280")};
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        border-color: #3b82f6;
        background: ${(props) => (props.active ? "#2563eb" : "#eff6ff")};
    }
`;

export const WrapperListOrder = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const WrapperItemOrder = styled.div`
    background: #ffffff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    transition: all 0.2s ease;

    &:hover {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        border-color: #3b82f6;
    }
`;

export const OrderHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e5e7eb;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 16px;
    }
`;

export const OrderInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const OrderId = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    .order-number {
        font-size: 16px;
        font-weight: 600;
        color: #1f2937;
    }

    .order-date {
        font-size: 14px;
        color: #6b7280;
    }
`;

export const WrapperStatus = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-end;

    @media (max-width: 768px) {
        align-items: flex-start;
    }
`;

export const StatusBadge = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &.pending {
        background: #fef3c7;
        color: #92400e;
    }

    &.approved {
        background: #d1fae5;
        color: #065f46;
    }

    &.paid {
        background: #cffafe;
        color: #155e75;
    }

    &.shipping {
        background: #dbeafe;
        color: #1e40af;
    }

    &.delivered {
        background: #dcfce7;
        color: #166534;
    }

    &.cancelled {
        background: #f3f4f6;
        color: #374151;
    }

    &.rejected {
        background: #fee2e2;
        color: #991b1b;
    }
`;

export const PaymentStatus = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;

    .payment-label {
        color: #6b7280;
    }

    .payment-value {
        font-weight: 600;
        color: ${(props) => (props.isPaid ? "#059669" : "#dc2626")};
    }
`;

export const WrapperHeaderItem = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px;
    background: #f8fafc;
    border-radius: 8px;
    margin-bottom: 8px;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const ProductImage = styled.img`
    width: 64px;
    height: 64px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
`;

export const ProductInfo = styled.div`
    flex: 1;
    min-width: 0;
`;

export const ProductName = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: #1f2937;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const ProductPrice = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #3b82f6;
    margin-left: auto;
`;

export const WrapperFooterItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 16px;
    border-top: 1px solid #e5e7eb;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 16px;
        align-items: stretch;
    }
`;

export const TotalPrice = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    .total-label {
        font-size: 14px;
        color: #6b7280;
    }

    .total-amount {
        font-size: 20px;
        font-weight: 700;
        color: #3b82f6;
    }
`;

export const ActionButtons = styled.div`
    display: flex;
    gap: 12px;

    @media (max-width: 768px) {
        justify-content: stretch;
    }
`;

export const ActionButton = styled.button`
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid;

    &.cancel {
        background: #ffffff;
        border-color: #ef4444;
        color: #ef4444;

        &:hover {
            background: #fef2f2;
            border-color: #dc2626;
            color: #dc2626;
        }
    }

    &.view {
        background: #ffffff;
        border-color: #3b82f6;
        color: #3b82f6;

        &:hover {
            background: #eff6ff;
            border-color: #2563eb;
            color: #2563eb;
        }
    }

    @media (max-width: 768px) {
        flex: 1;
        text-align: center;
    }
`;

export const EmptyState = styled.div`
    background: #ffffff;
    border-radius: 12px;
    padding: 64px 32px;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    .empty-icon {
        font-size: 64px;
        margin-bottom: 24px;
    }

    .empty-title {
        font-size: 24px;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 12px;
    }

    .empty-description {
        font-size: 16px;
        color: #6b7280;
        margin-bottom: 32px;
    }
`;

// Legacy compatibility
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

export const WrapperStyleHeaderDilivery = styled.div`
    background: #ffffff;
    padding: 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    span {
        color: #1f2937;
        font-weight: 400;
        font-size: 14px;
    }
`;

export const WrapperLeft = styled.div`
    flex: 1;
`;
