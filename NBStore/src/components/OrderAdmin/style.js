import styled from "styled-components";
import { Button } from "antd";

export const WrapperHeader = styled.h1`
    color: var(--dark-text-primary);
    font-size: 24px;
    font-weight: bold;
    margin: 0 0 20px 0;
`;

export const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px;
    margin-bottom: 24px;
`;

export const StatsCard = styled.div`
    background: var(--dark-bg-secondary);
    border-radius: 8px;
    padding: 24px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

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

export const ChartContainer = styled.div`
    background: var(--dark-bg-secondary);
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .chart-title {
        color: var(--dark-text-primary);
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 16px;
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

    .view-button {
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

export const StatusTag = styled.span`
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;

    &.pending {
        background: #fff7e6;
        color: #d46b08;
    }

    &.confirmed {
        background: #e6f7ff;
        color: #096dd9;
    }

    &.shipping {
        background: #f6ffed;
        color: #389e0d;
    }

    &.delivered {
        background: #f6ffed;
        color: #389e0d;
    }

    &.cancelled {
        background: #fff1f0;
        color: #cf1322;
    }
`;

export const DrawerContent = styled.div`
    .ant-descriptions {
        background: #fff;
        padding: 24px;
        border-radius: 8px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
        margin-bottom: 24px;

        .ant-descriptions-title {
            font-size: 18px;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 20px;
        }

        .ant-descriptions-view {
            border: 1px solid #f0f0f0;
            border-radius: 8px;
        }

        .ant-descriptions-row {
            border-bottom: 1px solid #f0f0f0;

            &:last-child {
                border-bottom: none;
            }
        }

        .ant-descriptions-item-label {
            background-color: #fafafa;
            padding: 16px 24px;
            font-weight: 500;
            color: #262626;
            width: 200px;
        }

        .ant-descriptions-item-content {
            padding: 16px 24px;
            color: #595959;
        }

        .ant-select {
            width: 100% !important;
        }
    }

    table {
        border-collapse: collapse;
        width: 100%;
    }

    th,
    td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f5f5f5;
    }

    tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    tr:hover {
        background-color: #f5f5f5;
    }
`;

export const OrderProducts = styled.div`
    background: #fff;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);

    .title {
        font-size: 18px;
        font-weight: 600;
        color: #1a1a1a;
        margin-bottom: 20px;
    }

    .product-list {
        border: 1px solid #f0f0f0;
        border-radius: 8px;
    }
`;

export const ProductItem = styled.div`
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
        border-bottom: none;
    }

    img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 4px;
        margin-right: 16px;
    }

    .info {
        flex: 1;

        .name {
            font-size: 16px;
            font-weight: 500;
            color: #262626;
            margin-bottom: 8px;
        }

        .price {
            font-size: 14px;
            color: #595959;
        }
    }

    .total {
        font-size: 15px;
        font-weight: 500;
        color: #262626;
        min-width: 120px;
        text-align: right;
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
