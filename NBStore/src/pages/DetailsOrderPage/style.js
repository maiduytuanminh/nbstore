import styled from "styled-components"

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
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

export const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const OrderSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-top: 20px;
`;

export const SummaryCard = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;

  .summary-label {
    font-size: 12px;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
  }

  .summary-value {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
  }

  .summary-sub {
    font-size: 14px;
    color: #6b7280;
    margin-top: 4px;
  }
`;

export const StatusSection = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

export const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
`;

export const StatusCard = styled.div`
  background: #f8fafc;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #e5e7eb;
`;

export const StatusTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;

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
    color: ${props => props.isPaid ? '#059669' : '#dc2626'};
  }
`;

export const InfoSection = styled.div`
  .info-label {
    font-size: 12px;
    font-weight: 600;
    color: #6b7280;
    margin-bottom: 4px;
  }

  .info-value {
    font-size: 14px;
    color: #1f2937;
    margin-bottom: 8px;
  }

  .info-sub {
    font-size: 13px;
    color: #6b7280;
    margin-bottom: 4px;
  }
`;

export const ProductSection = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

export const ProductHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 16px;
`;

export const ProductTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ProductTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #f3f4f6;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
`;

export const ProductName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  line-height: 1.4;
`;

export const ProductPrice = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #3b82f6;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const ProductQuantity = styled.div`
  font-size: 14px;
  color: #6b7280;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const ProductDiscount = styled.div`
  font-size: 14px;
  color: #059669;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const PricingSection = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

export const PricingGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PricingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;

  &.total {
    border-top: 1px solid #e5e7eb;
    padding-top: 16px;
    margin-top: 8px;
    font-size: 18px;
    font-weight: 700;
    color: #1f2937;
  }
`;

export const PricingLabel = styled.div`
  font-size: 14px;
  color: #6b7280;

  &.total {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
  }
`;

export const PricingValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;

  &.total {
    font-size: 20px;
    font-weight: 700;
    color: #3b82f6;
  }
`;

export const ActionSection = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  text-align: center;
`;

export const ActionButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid;
  margin: 0 8px;

  &.cancel {
    background: #ffffff;
    border-color: #ef4444;
    color: #ef4444;

    &:hover {
      background: #fef2f2;
      border-color: #dc2626;
      color: #dc2626;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &.back {
    background: #ffffff;
    border-color: #6b7280;
    color: #6b7280;

    &:hover {
      background: #f9fafb;
      border-color: #4b5563;
      color: #4b5563;
    }
  }
`;

export const LoadingState = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 64px 32px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  .loading-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  .loading-text {
    font-size: 16px;
    color: #6b7280;
  }
`;

// Legacy compatibility
export const WrapperHeaderUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const WrapperInfoUser = styled.div`
  .name-info {
    font-size: 14px;
    color: #1f2937;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .address-info, .phone-info, .delivery-info, .delivery-fee, .payment-info {
    color: #6b7280;
    font-size: 13px;
    margin-bottom: 4px;
  }

  .name-delivery {
    color: #f59e0b;
    font-weight: 600;
    text-transform: uppercase;
  }

  .status-payment {
    margin-top: 8px;
    color: #f59e0b;
  }
`;

export const WrapperLabel = styled.div`
  color: #374151;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 12px;
  letter-spacing: 0.5px;
`;

export const WrapperContentInfo = styled.div`
  min-height: 120px;
  width: 100%;
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e5e7eb;
`;

export const WrapperStyleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;

export const WrapperProduct = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

export const WrapperNameProduct = styled.div`
  display: flex;
  align-items: center;
  flex: 2;
  gap: 12px;
`;

export const WrapperItem = styled.div`
  flex: 1;
  font-weight: 500;
  color: #1f2937;
  text-align: right;

  &:last-child {
    color: #3b82f6;
    font-weight: 600;
  }
`;

export const WrapperItemLabel = styled.div`
  flex: 1;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: right;

  &:last-child {
    font-weight: 700;
    color: #374151;
  }
`;

export const WrapperAllPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-top: 1px solid #e5e7eb;

  &:last-child {
    border-top: 2px solid #e5e7eb;
    padding-top: 16px;
    margin-top: 8px;
    font-size: 18px;
    font-weight: 700;
  }
`;