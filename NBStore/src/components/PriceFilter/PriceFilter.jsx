import React, { useState } from "react";
import { Radio, Divider, Button } from "antd";
import { FilterOutlined, ClearOutlined } from "@ant-design/icons";
import { WrapperContent, WrapperLableText, RadioGroupWrapper } from "./style";

const PriceFilter = ({ onPriceChange }) => {
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);

    const priceRanges = [
        { value: "0-5000000", label: "Dưới 5 triệu", min: 0, max: 5000000 },
        {
            value: "5000000-10000000",
            label: "5 - 10 triệu",
            min: 5000000,
            max: 10000000,
        },
        {
            value: "10000000-20000000",
            label: "10 - 20 triệu",
            min: 10000000,
            max: 20000000,
        },
        {
            value: "20000000-50000000",
            label: "20 - 50 triệu",
            min: 20000000,
            max: 50000000,
        },
        {
            value: "50000000-100000000",
            label: "50 - 100 triệu",
            min: 50000000,
            max: 100000000,
        },
        {
            value: "100000000-999999999",
            label: "Trên 100 triệu",
            min: 100000000,
            max: 999999999,
        },
    ];

    const handlePriceChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedPriceRange(selectedValue);

        // Tìm range được chọn
        const selectedRange = priceRanges.find(
            (range) => range.value === selectedValue
        );

        if (selectedRange) {
            onPriceChange([selectedRange]); // Vẫn trả về array để tương thích với logic hiện tại
        }
    };

    const handleClearFilter = () => {
        setSelectedPriceRange(null);
        onPriceChange([]);
    };

    return (
        <div style={{ marginBottom: "var(--spacing-lg)" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "var(--spacing-sm)",
                }}
            >
                <WrapperLableText>
                    <FilterOutlined
                        style={{
                            marginRight: "var(--spacing-xs)",
                            color: "var(--primary-color)",
                        }}
                    />
                    Khoảng giá
                </WrapperLableText>
                {selectedPriceRange && (
                    <Button
                        type="text"
                        size="small"
                        onClick={handleClearFilter}
                        style={{
                            color: "var(--primary-color)",
                            padding: "0",
                            fontSize: "var(--font-size-sm)",
                            fontWeight: "var(--font-weight-medium)",
                        }}
                    >
                        <ClearOutlined /> Xóa
                    </Button>
                )}
            </div>

            <WrapperContent>
                <RadioGroupWrapper>
                    <Radio.Group
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "var(--spacing-xs)",
                        }}
                        value={selectedPriceRange}
                        onChange={handlePriceChange}
                    >
                        {priceRanges.map((range) => (
                            <Radio
                                key={range.value}
                                value={range.value}
                                style={{
                                    marginLeft: 0,
                                    fontSize: "var(--font-size-base)",
                                    padding: "var(--spacing-xs) 0",
                                    borderRadius: "var(--radius-sm)",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                <span
                                    style={{
                                        fontWeight:
                                            selectedPriceRange === range.value
                                                ? "var(--font-weight-semibold)"
                                                : "var(--font-weight-normal)",
                                        color:
                                            selectedPriceRange === range.value
                                                ? "var(--primary-color)"
                                                : "var(--text-secondary)",
                                    }}
                                >
                                    {range.label}
                                </span>
                            </Radio>
                        ))}
                    </Radio.Group>
                </RadioGroupWrapper>
            </WrapperContent>

            <Divider
                style={{
                    margin: "var(--spacing-md) 0",
                    borderColor: "var(--border-color)",
                }}
            />
        </div>
    );
};

export default PriceFilter;
