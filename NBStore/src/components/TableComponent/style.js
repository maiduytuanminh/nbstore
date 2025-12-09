import styled from "styled-components";
import { Table } from "antd";

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

export const TableActions = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
`;

export const DeleteAllButton = styled.button`
    background: #dc2626;
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: #b91c1c;
    }
`;

export const ExportButton = styled.button`
    background: var(--primary-color);
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: var(--primary-dark);
    }
`;
