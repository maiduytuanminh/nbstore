import styled from "styled-components";

export const BrandContainer = styled.section`
    width: 100%;
    padding: var(--spacing-3xl) 0;
    background: var(--bg-tertiary);
    position: relative;
`;

export const SectionTitle = styled.h2`
    font-family: "Inter", sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-primary);
    text-align: center;
    margin: 0 0 var(--spacing-md);
    position: relative;

    &::after {
        content: "";
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 3px;
        background: var(--primary-color);
        border-radius: var(--radius-sm);
    }
`;

export const SectionSubtitle = styled.p`
    font-family: "Inter", sans-serif;
    font-size: var(--font-size-lg);
    color: var(--text-secondary);
    text-align: center;
    margin: 0 auto var(--spacing-3xl);
    max-width: 600px;
    line-height: var(--line-height-relaxed);
`;

export const BrandGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: var(--spacing-lg);
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: var(--spacing-md);
        padding: 0 var(--spacing-md);
    }

    @media (max-width: 480px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export const BrandCard = styled.div`
    background: var(--white);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: var(--spacing-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: var(--shadow-sm);
    min-height: 120px;

    &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
        border-color: var(--primary-lighter);
    }
`;

export const BrandLogo = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    img {
        max-width: 120px;
        max-height: 50px;
        width: auto;
        height: auto;
        object-fit: contain;
        filter: grayscale(80%) opacity(0.8);
        transition: all 0.3s ease;
    }

    ${BrandCard}:hover & img {
        filter: grayscale(0%) opacity(1);
        transform: scale(1.05);
    }
`;

export const BrandName = styled.div`
    font-family: "Inter", sans-serif;
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: ${(props) => props.color || "var(--text-primary)"};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: all 0.3s ease;

    ${BrandCard}:hover & {
        color: var(--primary-color);
    }
`;
