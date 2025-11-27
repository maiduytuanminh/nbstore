import styled from "styled-components";

export const NewsletterContainer = styled.section`
    width: 100%;
    padding: var(--spacing-4xl) 0;
    background: var(--gray-800);
    position: relative;
    color: var(--white);
`;

export const NewsletterContent = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
    text-align: center;

    @media (max-width: 768px) {
        padding: 0 var(--spacing-md);
    }
`;

export const NewsletterTitle = styled.h2`
    font-family: "Inter", sans-serif;
    font-size: 2.25rem;
    font-weight: 700;
    color: var(--white);
    margin: 0 0 var(--spacing-md);

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

export const NewsletterDescription = styled.p`
    font-family: "Inter", sans-serif;
    font-size: var(--font-size-lg);
    color: var(--gray-300);
    margin: 0 0 var(--spacing-xl);
    line-height: var(--line-height-relaxed);

    @media (max-width: 768px) {
        font-size: var(--font-size-base);
    }
`;

export const NewsletterForm = styled.form`
    display: flex;
    gap: var(--spacing-md);
    max-width: 500px;
    margin: 0 auto var(--spacing-xl);

    @media (max-width: 768px) {
        flex-direction: column;
        gap: var(--spacing-sm);
    }
`;

export const NewsletterInput = styled.input`
    flex: 1;
    padding: var(--spacing-md);
    border: 1px solid var(--gray-600);
    border-radius: var(--radius-md);
    background: var(--gray-700);
    color: var(--white);
    font-family: "Inter", sans-serif;
    font-size: var(--font-size-base);
    transition: all 0.3s ease;

    &::placeholder {
        color: var(--gray-400);
    }

    &:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    @media (max-width: 768px) {
        padding: var(--spacing-sm);
    }
`;

export const NewsletterButton = styled.button`
    padding: var(--spacing-md) var(--spacing-xl);
    background: var(--primary-color);
    color: var(--white);
    border: none;
    border-radius: var(--radius-md);
    font-family: "Inter", sans-serif;
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;

    &:hover {
        background: var(--primary-hover);
        transform: translateY(-1px);
        box-shadow: var(--shadow-sm);
    }

    &:active {
        transform: translateY(0);
    }

    @media (max-width: 768px) {
        padding: var(--spacing-sm) var(--spacing-lg);
    }
`;

export const BenefitsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-lg);
    margin-top: var(--spacing-xl);

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
    }
`;

export const BenefitItem = styled.div`
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    color: var(--gray-300);

    @media (max-width: 768px) {
        justify-content: center;
    }
`;

export const BenefitIcon = styled.div`
    width: 20px;
    height: 20px;
    color: var(--primary-color);

    .anticon {
        font-size: 1.25rem;
    }
`;

export const BenefitText = styled.span`
    font-family: "Inter", sans-serif;
    font-size: var(--font-size-base);
    color: var(--gray-300);
`;

export const SuccessMessage = styled.div`
    background: var(--success-color);
    color: var(--white);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    text-align: center;
    font-family: "Inter", sans-serif;
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    margin-top: var(--spacing-md);
    transform: scale(1);
    transition: transform 0.3s ease;

    &.bounce {
        animation: bounce 0.6s ease;
    }

    @keyframes bounce {
        0%,
        20%,
        53%,
        80%,
        100% {
            transform: scale(1);
        }
        40%,
        43% {
            transform: scale(1.05);
        }
        70% {
            transform: scale(1.02);
        }
    }
`;
