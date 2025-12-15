import React, { useState, useEffect, useRef } from "react";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import {
    SearchWrapper,
    SearchInputContainer,
    SearchInput,
    SearchIcon,
    ClearButton,
} from "./style";

const ButttonInputSearch = (props) => {
    const {
        placeholder = "Tìm kiếm sản phẩm...",
        onSearch,
        style,
        ...restProps
    } = props;

    const [searchValue, setSearchValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const debounceTimeout = useRef(null);

    // Debounce effect
    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            if (onSearch) {
                onSearch(searchValue);
            }
        }, 500);

        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [searchValue, onSearch]);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleClear = () => {
        setSearchValue("");
        if (onSearch) {
            onSearch("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            if (onSearch) {
                onSearch(searchValue);
            }
        }
    };

    return (
        <SearchWrapper style={style}>
            <SearchInputContainer
                isFocused={isFocused}
                hasValue={searchValue.length > 0}
            >
                <SearchIcon>
                    <SearchOutlined />
                </SearchIcon>
                <SearchInput
                    type="text"
                    placeholder={placeholder}
                    value={searchValue}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyPress={handleKeyPress}
                    {...restProps}
                />
                {searchValue && (
                    <ClearButton onClick={handleClear}>
                        <CloseOutlined />
                    </ClearButton>
                )}
            </SearchInputContainer>
        </SearchWrapper>
    );
};

export default ButttonInputSearch;
