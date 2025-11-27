import styled from "styled-components";
import { Button, Modal } from "antd";

export const WrapperHeader = styled.h1`
    color: var(--dark-text-primary);
    font-size: 24px;
    font-weight: bold;
    margin: 0;
    margin-bottom: 24px;
`;

export const WrapperButton = styled.div`
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    .ant-form-item {
        margin-bottom: 24px;
    }

    .ant-form-item-label > label {
        font-weight: 500;
        color: #262626;
    }

    .ant-input {
        border-radius: 4px;
        border-color: #d9d9d9;

        &:hover,
        &:focus {
            border-color: #1890ff;
            box-shadow: none;
        }
    }
`;

export const DrawerFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid #f0f0f0;

    .ant-btn {
        min-width: 100px;
    }
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

export const StyledModal = styled(Modal)`
    .ant-modal-content {
        border-radius: 8px;
    }

    .ant-modal-header {
        border-radius: 8px 8px 0 0;
    }

    .ant-modal-title {
        font-weight: 600;
    }

    .ant-modal-footer {
        border-radius: 0 0 8px 8px;
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
