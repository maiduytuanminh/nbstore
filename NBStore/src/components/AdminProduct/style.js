import styled from "styled-components";
import { Upload, Button } from "antd";

export const WrapperHeader = styled.h1`
    color: var(--dark-text-primary);
    font-size: 24px;
    font-weight: bold;
    margin: 0;
    margin-bottom: 24px;
`;

export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    background: var(--dark-bg-secondary);
    border-radius: 8px;
    padding: 24px;
`;

export const WrapperLabel = styled.label`
    color: var(--dark-text-primary);
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 8px;
`;

export const WrapperInput = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 20px;
`;

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 150px;
        height: 150px;
        border-radius: 8px;
    }

    & .ant-upload-list-item-info {
        border-radius: 8px;
        overflow: hidden;
    }
`;

export const WrapperActions = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
`;

export const ActionButton = styled(Button)`
    &.ant-btn-primary {
        background-color: #1890ff;
        border-color: #1890ff;

        &:hover {
            background-color: #40a9ff;
            border-color: #40a9ff;
        }
    }

    &.ant-btn-danger {
        background-color: #ff4d4f;
        border-color: #ff4d4f;
        color: #fff;

        &:hover {
            background-color: #ff7875;
            border-color: #ff7875;
        }
    }
`;

export const TableWrapper = styled.div`
    background: var(--dark-bg-secondary);
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);

    .ant-table {
        .ant-table-thead > tr > th {
            background: var(--dark-bg-tertiary);
            font-weight: 600;
            border-bottom: 1px solid var(--dark-border);
        }

        .ant-table-tbody > tr > td {
            border-bottom: 1px solid var(--dark-border);
        }

        .ant-table-tbody > tr:hover > td {
            background: var(--dark-bg-tertiary);
        }
    }
`;

export const ActionButtons = styled.div`
    display: flex;
    gap: 12px;

    .view-button,
    .edit-button,
    .delete-button {
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s;
    }

    .view-button {
        color: #1890ff;
        &:hover {
            color: #40a9ff;
        }
    }

    .edit-button {
        color: #52c41a;
        &:hover {
            color: #73d13d;
        }
    }

    .delete-button {
        color: #ff4d4f;
        &:hover {
            color: #ff7875;
        }
    }
`;

export const DrawerContent = styled.div`
    .ant-descriptions {
        background: var(--dark-bg-secondary);
        padding: 24px;
        border-radius: 8px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
        margin-bottom: 24px;

        .ant-descriptions-title {
            font-size: 18px;
            font-weight: 600;
            color: var(--dark-text-primary);
            margin-bottom: 20px;
        }

        .ant-descriptions-view {
            border: 1px solid var(--dark-border);
            border-radius: 8px;
        }

        .ant-descriptions-row {
            border-bottom: 1px solid var(--dark-border);

            &:last-child {
                border-bottom: none;
            }
        }

        .ant-descriptions-item-label {
            background-color: var(--dark-bg-tertiary);
            padding: 16px 24px;
            font-weight: 500;
            color: var(--dark-text-primary);
            width: 200px;
        }

        .ant-descriptions-item-content {
            padding: 16px 24px;
            color: var(--dark-text-primary);
        }
    }
`;

export const DrawerFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid var(--dark-border);

    .ant-btn {
        min-width: 100px;
    }
`;

export const ProductImage = styled.img`
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
`;

export const StatusTag = styled.span`
    display: inline-block;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;

    &.inStock {
        background: var(--dark-bg-tertiary);
        color: #1890ff;
    }

    &.outOfStock {
        background: var(--dark-bg-tertiary);
        color: #ff4d4f;
    }

    &.lowStock {
        background: var(--dark-bg-tertiary);
        color: #fa8c16;
    }
`;
