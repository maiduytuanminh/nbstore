import styled from "styled-components";
import { Upload, Button } from "antd";

export const WrapperHeader = styled.h1`
    color: var(--dark-text-primary);
    font-size: 24px;
    font-weight: bold;
    margin: 0 0 20px 0;
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
    height: 40px;
    font-weight: 600;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 8px;

    &.ant-btn-primary {
        background: var(--primary-color);
        border-color: var(--primary-color);

        &:hover {
            background: var(--primary-dark);
            border-color: var(--primary-dark);
        }
    }

    &.ant-btn-danger {
        background: #dc2626;
        border-color: #dc2626;
        color: white;

        &:hover {
            background: #b91c1c !important;
            border-color: #b91c1c !important;
        }
    }

    .anticon {
        font-size: 16px;
    }
`;

export const TableWrapper = styled.div`
    background: var(--dark-bg-secondary);
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .ant-table-thead > tr > th {
        background-color: var(--dark-bg-tertiary);
        font-weight: 600;
        border-bottom: 2px solid var(--dark-border);
    }

    .ant-table-tbody > tr:hover > td {
        background-color: var(--dark-bg-tertiary);
    }

    .ant-table-pagination {
        margin: 16px 0 0 0;
    }
`;

export const ActionButtons = styled.div`
    display: flex;
    gap: 12px;
    justify-content: center;
    align-items: center;

    .edit-button {
        color: #1890ff;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            color: #40a9ff;
            transform: scale(1.1);
        }
    }

    .delete-button {
        color: #ff4d4f;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            color: #ff7875;
            transform: scale(1.1);
        }
    }
`;

export const DrawerContent = styled.div`
    .ant-form-item {
        margin-bottom: 20px;
    }

    .ant-form-item-label > label {
        font-weight: 600;
    }

    .ant-input-number {
        width: 100%;
    }

    .ant-select {
        width: 100%;
    }
`;

export const DrawerFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
`;
