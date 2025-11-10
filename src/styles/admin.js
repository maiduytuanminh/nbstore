import styled from "styled-components";
import { Modal, Table, Button } from "antd";

// Common styled components for admin pages
export const AdminWrapper = styled.div`
    padding: 24px;
    background: var(--dark-bg-primary);
    min-height: 100vh;
`;

export const AdminHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--dark-border);
`;

export const AdminTitle = styled.h1`
    color: var(--dark-text-primary);
    font-size: 24px;
    font-weight: bold;
    margin: 0;
`;

export const AdminActions = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
`;

export const StyledButton = styled(Button)`
    height: 40px;
    padding: 0 20px;
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

export const AdminCard = styled.div`
    background: var(--dark-bg-secondary);
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const StyledTable = styled(Table)`
    .ant-table {
        background: var(--dark-bg-secondary);
        border-radius: 8px;
        overflow: hidden;
    }

    .ant-table-thead > tr > th {
        background: var(--dark-bg-tertiary);
        color: var(--dark-text-primary);
        border-bottom: 1px solid var(--dark-border);
        padding: 16px;
        font-weight: 600;
    }

    .ant-table-tbody > tr > td {
        background: var(--dark-bg-secondary);
        color: var(--dark-text-secondary);
        border-bottom: 1px solid var(--dark-border);
        padding: 16px;
        transition: all 0.3s ease;
    }

    .ant-table-tbody > tr:hover > td {
        background: var(--dark-bg-tertiary);
    }

    .ant-table-pagination {
        margin: 16px 0;

        .ant-pagination-item {
            background: var(--dark-bg-tertiary);
            border-color: var(--dark-border);

            a {
                color: var(--dark-text-secondary);
            }

            &:hover {
                border-color: var(--primary-color);
                a {
                    color: var(--primary-color);
                }
            }
        }

        .ant-pagination-item-active {
            background: var(--primary-color);
            border-color: var(--primary-color);

            a {
                color: white;
            }
        }

        .ant-pagination-prev,
        .ant-pagination-next {
            button {
                background: var(--dark-bg-tertiary);
                border-color: var(--dark-border);
                color: var(--dark-text-secondary);

                &:hover {
                    border-color: var(--primary-color);
                    color: var(--primary-color);
                }
            }
        }
    }
`;

export const StyledModal = styled(Modal)`
    .ant-modal-content {
        background: var(--dark-bg-secondary);
        border-radius: 8px;
        overflow: hidden;
    }

    .ant-modal-header {
        background: var(--dark-bg-tertiary);
        border-bottom: 1px solid var(--dark-border);
        padding: 16px 24px;

        .ant-modal-title {
            color: var(--dark-text-primary);
            font-weight: 600;
        }
    }

    .ant-modal-body {
        padding: 24px;
    }

    .ant-modal-footer {
        border-top: 1px solid var(--dark-border);
        padding: 16px 24px;
    }

    .ant-form-item-label > label {
        color: var(--dark-text-primary);
    }

    .ant-input {
        background: var(--dark-bg-tertiary);
        border-color: var(--dark-border);
        color: var(--dark-text-primary);

        &:hover,
        &:focus {
            border-color: var(--primary-color);
        }
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

// Stats card styles
export const StatsCard = styled.div`
    background: var(--dark-bg-secondary);
    border-radius: 8px;
    padding: 24px;
    display: flex;
    align-items: center;
    gap: 16px;

    .icon {
        width: 48px;
        height: 48px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        color: white;
    }

    .content {
        flex: 1;

        .title {
            color: var(--dark-text-secondary);
            font-size: 14px;
            margin-bottom: 8px;
        }

        .value {
            color: var(--dark-text-primary);
            font-size: 24px;
            font-weight: bold;
        }
    }
`;

export const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px;
    margin-bottom: 24px;
`;
