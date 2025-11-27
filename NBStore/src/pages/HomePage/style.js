import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
    justify-content: center;
    flex-wrap: wrap;
    padding: var(--spacing-lg) 0;
    background: var(--white);
    border-bottom: 1px solid var(--border-color);

    @media (max-width: 768px) {
        gap: var(--spacing-md);
        padding: var(--spacing-md) 0;
    }
`;

export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover:not(:disabled) {
        color: white !important;
        background: var(--primary-color) !important;
        border-color: var(--primary-color) !important;
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);

        span {
            color: white !important;
        }
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;

        &:hover {
            transform: none;
            box-shadow: none;
        }
    }

    width: 100%;
    text-align: center;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export const WrapperProducts = styled.div`
    display: flex;
    gap: var(--spacing-md);
    margin-top: var(--spacing-lg);
    flex-wrap: wrap;
`;

export const MainContent = styled.div`
    width: 100%;
    background: var(--bg-secondary);

    .container {
        max-width: 1270px;
        margin: 0 auto;
        padding: var(--spacing-lg);

        @media (max-width: 1280px) {
            padding: var(--spacing-md);
        }
    }
`;

export const SectionDivider = styled.div`
    width: 100%;
    height: 1px;
    background: var(--border-color);
    margin: var(--spacing-xl) 0;
`;
