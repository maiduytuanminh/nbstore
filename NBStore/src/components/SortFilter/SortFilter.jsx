import React from "react";
import { Select, Typography } from "antd";
import { SortAscendingOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Text } = Typography;
const { Option } = Select;

const SortContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);

    .sort-label {
        color: var(--text-secondary);
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-medium);
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);

        .anticon {
            color: var(--primary-color);
        }
    }

    .ant-select {
        min-width: 200px;

        .ant-select-selector {
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            padding: var(--spacing-xs) var(--spacing-sm);
            font-size: var(--font-size-base);
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
                border-color: var(--primary-color);
            }

            &.ant-select-focused {
                border-color: var(--primary-color);
                box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
            }
        }

        .ant-select-selection-item {
            color: var(--text-primary);
            font-weight: var(--font-weight-medium);
        }

        .ant-select-arrow {
            color: var(--text-secondary);
        }
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-xs);

        .ant-select {
            width: 100%;
        }
    }
`;

const SortFilter = ({ onSortChange }) => {
    const sortOptions = [
        { value: "default", label: "Mặc định" },
        { value: "price-asc", label: "Giá: Thấp đến cao" },
        { value: "price-desc", label: "Giá: Cao đến thấp" },
        { value: "name-asc", label: "Tên: A-Z" },
        { value: "name-desc", label: "Tên: Z-A" },
        { value: "rating-desc", label: "Đánh giá cao nhất" },
        { value: "selled-desc", label: "Bán chạy nhất" },
    ];

    return (
        <SortContainer>
            <Text className="sort-label">
                <SortAscendingOutlined />
                Sắp xếp theo:
            </Text>
            <Select
                defaultValue="default"
                onChange={onSortChange}
                placeholder="Chọn cách sắp xếp"
            >
                {sortOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                        {option.label}
                    </Option>
                ))}
            </Select>
        </SortContainer>
    );
};

export default SortFilter;
