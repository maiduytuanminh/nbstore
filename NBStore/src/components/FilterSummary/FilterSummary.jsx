import React from "react";
import { Tag, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Text } = Typography;

const FilterContainer = styled.div`
    margin-bottom: var(--spacing-md);
    padding: var(--spacing-md);
    background: var(--gray-50);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-color);

    .filter-header {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-sm);
    }

    .filter-text {
        color: var(--text-primary);
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-semibold);
    }

    .product-count {
        color: var(--text-secondary);
        font-size: var(--font-size-sm);
        background: var(--white);
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: var(--radius-sm);
        border: 1px solid var(--border-color);
    }

    .ant-tag {
        background: var(--primary-color);
        color: var(--white);
        border: none;
        border-radius: var(--radius-sm);
        padding: var(--spacing-xs) var(--spacing-sm);
        margin-right: var(--spacing-xs);
        margin-bottom: var(--spacing-xs);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);

        &:hover {
            background: var(--primary-600);
        }

        .ant-tag-close-icon {
            margin-left: var(--spacing-xs);
            color: var(--white);

            &:hover {
                color: var(--gray-200);
            }
        }
    }
`;

const FilterSummary = ({ priceFilter, onRemovePriceFilter, totalProducts }) => {
    if (priceFilter.length === 0) return null;

    return (
        <FilterContainer>
            <div className="filter-header">
                <Text className="filter-text">Đang lọc theo:</Text>
                <Text className="product-count">{totalProducts} sản phẩm</Text>
            </div>

            <div>
                {priceFilter.map((range) => (
                    <Tag
                        key={range.value}
                        closable
                        onClose={() => onRemovePriceFilter()}
                        icon={<CloseOutlined />}
                    >
                        Giá: {range.label}
                    </Tag>
                ))}
            </div>
        </FilterContainer>
    );
};

export default FilterSummary;
