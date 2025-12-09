import { Upload } from "antd";
import styled from "styled-components";

export const WrapperContainer = styled.div`
  background: #f8fafc;
  min-height: 100vh;
  padding: 24px 0;
`;

export const WrapperContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 16px;
`;

export const PageHeader = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  text-align: center;
`;

export const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const PageSubtitle = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 0;
`;

export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const AvatarSection = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  text-align: center;
  height: fit-content;
`;

export const AvatarTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const AvatarContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
`;

export const AvatarImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #e5e7eb;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: #9ca3af;
`;

export const AvatarPlaceholder = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #f3f4f6;
  border: 4px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: #9ca3af;
  margin: 0 auto 20px;
`;

export const UploadButton = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background: #3b82f6;
  border: 2px solid #ffffff;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ffffff;
  transition: all 0.2s ease;

  &:hover {
    background: #2563eb;
    transform: scale(1.1);
  }
`;

export const WrapperUploadFile = styled(Upload)`
  .ant-upload {
    border: none !important;
    background: transparent !important;
  }

  .ant-upload-list {
    display: none;
  }
`;

export const InfoSection = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

export const InfoTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  &.full-width {
    grid-column: 1 / -1;
  }
`;

export const FormLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const FormInput = styled.input`
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #1f2937;
  background: #ffffff;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    ring: 2px;
    ring-color: rgba(59, 130, 246, 0.2);
  }

  &:disabled {
    background: #f9fafb;
    color: #6b7280;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const ActionSection = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ActionButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;

  &.primary {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    border-color: #3b82f6;
    color: #ffffff;

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }

  &.secondary {
    background: #ffffff;
    border-color: #d1d5db;
    color: #374151;

    &:hover:not(:disabled) {
      background: #f9fafb;
      border-color: #9ca3af;
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const StatsSection = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

export const StatCard = styled.div`
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  text-align: center;

  .stat-icon {
    font-size: 24px;
    margin-bottom: 8px;
  }

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

export const ValidationMessage = styled.div`
  font-size: 12px;
  color: #ef4444;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const SuccessMessage = styled.div`
  background: #dcfce7;
  border: 1px solid #86efac;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
  color: #166534;
  display: flex;
  align-items: center;
  gap: 8px;

  .success-icon {
    color: #059669;
  }
`;

// Legacy compatibility
export const WrapperHeader = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 32px 0;
  text-align: center;
`;

export const WrapperContentProfile = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  max-width: 800px;
  margin: 0 auto;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  gap: 24px;
`;

export const WrapperLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  min-width: 80px;
  display: flex;
  align-items: center;
`;

export const WrapperInput = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`;