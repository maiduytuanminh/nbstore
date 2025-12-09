import styled from "styled-components";

export const WrapperContent = styled.div`
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--white);
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-sm);
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;

    &:hover {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }
`;

export const WrapperLableText = styled.h4`
    color: var(--text-primary);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    margin: 0 0 var(--spacing-sm) 0;
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);

    .anticon {
        color: var(--primary-color);
    }
`;

export const WrapperTextPrice = styled.div`
    padding: var(--spacing-xs) var(--spacing-sm);
    color: var(--text-secondary);
    border-radius: var(--radius-sm);
    background-color: var(--gray-100);
    width: fit-content;
    font-size: var(--font-size-sm);
    margin-bottom: var(--spacing-xs);
    border: 1px solid var(--border-color);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: var(--primary-color);
        color: var(--white);
        border-color: var(--primary-color);
    }
`;

export const RadioGroupWrapper = styled.div`
    .ant-radio-group {
        .ant-radio-wrapper {
            color: var(--text-secondary);
            font-size: var(--font-size-base);
            font-weight: var(--font-weight-normal);

            .ant-radio {
                .ant-radio-input:checked + .ant-radio-inner {
                    background-color: var(--primary-color);
                    border-color: var(--primary-color);
                }

                .ant-radio-inner {
                    border-color: var(--border-color);

                    &:hover {
                        border-color: var(--primary-color);
                    }
                }
            }

            &.ant-radio-wrapper-checked {
                color: var(--primary-color);
                font-weight: var(--font-weight-semibold);
            }
        }
    }
`;
