import styled from "styled-components";

export const WrapperType = styled.div`
    padding: var(--spacing-md) var(--spacing-lg);
    cursor: pointer;
    border-radius: var(--radius-md);
    transition: all 0.3s ease;
    font-family: "Inter", sans-serif;
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-semibold);
    color: var(--text-secondary);
    border: 1px solid var(--border-color);
    background: var(--white);

    &:hover {
        background-color: var(--primary-color);
        color: var(--white);
        border-color: var(--primary-color);
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
    }

    &:active {
        transform: translateY(0);
    }

    @media (max-width: 768px) {
        padding: var(--spacing-sm) var(--spacing-md);
        font-size: var(--font-size-base);
    }
`;
