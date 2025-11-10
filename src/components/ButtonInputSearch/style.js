import styled from "styled-components";

export const SearchWrapper = styled.div`
    width: 100%;
    max-width: 100%;
    position: relative;
`;

export const SearchInputContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 52px;
    background: ${(props) =>
        props.isFocused
            ? "rgba(255, 255, 255, 0.98)"
            : "rgba(255, 255, 255, 0.90)"};
    backdrop-filter: blur(25px);
    border: 2px solid
        ${(props) =>
            props.isFocused
                ? "rgba(255, 255, 255, 0.7)"
                : "rgba(255, 255, 255, 0.25)"};
    border-radius: var(--radius-full);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: ${(props) =>
        props.isFocused
            ? "0 0 0 4px rgba(255, 255, 255, 0.2), 0 20px 60px rgba(0, 0, 0, 0.2)"
            : "0 8px 32px rgba(0, 0, 0, 0.12)"};
    overflow: hidden;

    &:hover {
        background: rgba(255, 255, 255, 0.95);
        border-color: rgba(255, 255, 255, 0.5);
        transform: translateY(-2px);
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
        );
        transition: left 0.8s ease;
        z-index: 1;
    }

    &:hover::before {
        left: 100%;
    }
`;

export const SearchIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    color: var(--text-secondary);
    transition: all 0.3s ease;
    z-index: 2;

    .anticon {
        font-size: 20px;
        transition: all 0.3s ease;
    }

    ${SearchInputContainer}:hover & {
        color: var(--primary-color);

        .anticon {
            transform: scale(1.1);
        }
    }

    ${SearchInputContainer}:focus-within & {
        color: var(--primary-color);

        .anticon {
            transform: scale(1.15);
        }
    }
`;

export const SearchInput = styled.input`
    flex: 1;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    font-family: "Inter", sans-serif;
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-normal);
    color: var(--text-primary);
    padding: 0 16px 0 0;
    z-index: 2;

    &::placeholder {
        color: var(--text-light);
        font-family: "Inter", sans-serif;
        font-size: var(--font-size-base);
        transition: all 0.3s ease;
    }

    &:focus::placeholder {
        color: var(--text-secondary);
        transform: translateX(4px);
    }

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
        display: none;
    }
`;

export const ClearButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    background: rgba(255, 255, 255, 0.8);
    border-radius: var(--radius-full);
    color: var(--text-light);
    cursor: pointer;
    margin-right: 8px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 2;
    opacity: 0.7;

    .anticon {
        font-size: 14px;
        transition: all 0.3s ease;
    }

    &:hover {
        background: rgba(244, 63, 94, 0.1);
        color: var(--error-color);
        opacity: 1;
        transform: scale(1.05);

        .anticon {
            transform: rotate(90deg);
        }
    }

    &:active {
        transform: scale(0.95);
    }
`;
