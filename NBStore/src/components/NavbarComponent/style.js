import styled from "styled-components";

export const WrapperLableText = styled.h4`
    color: var(--text-primary);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    margin: 0 0 var(--spacing-md) 0;
    padding-bottom: var(--spacing-sm);
    border-bottom: 2px solid var(--primary-color);
`;

export const WrapperTextValue = styled.span`
    color: var(--text-secondary);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-normal);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all 0.3s ease;
    display: block;

    &:hover {
        background-color: var(--primary-color);
        color: var(--white);
        transform: translateX(4px);
    }
`;

export const WrapperContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    margin-bottom: var(--spacing-lg);
`;

export const WrapperTextPrice = styled.div`
    padding: var(--spacing-sm);
    color: var(--text-secondary);
    background-color: var(--gray-100);
    border-radius: var(--radius-md);
    width: fit-content;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    border: 1px solid var(--border-color);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: var(--primary-color);
        color: var(--white);
        border-color: var(--primary-color);
    }
`;
