import styled from "styled-components";

export const StatsContainer = styled.section`
    width: 100%;
    padding: var(--spacing-4xl) 0;
    background: var(--bg-primary);
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

export const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--spacing-md);
        padding: 0 var(--spacing-md);
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
    }
`;

export const StatCard = styled.div`
    background: var(--white);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: var(--spacing-xl);
    text-align: center;
    transition: all 0.3s ease;
    box-shadow: var(--shadow-sm);

    &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-md);
        border-color: var(--primary-lighter);
    }
`;

export const StatIcon = styled.div`
    width: 64px;
    height: 64px;
    border-radius: var(--radius-full);
    background: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto var(--spacing-lg);
    transition: all 0.3s ease;

    .anticon {
        font-size: 1.8rem;
        color: var(--white);
    }

    ${StatCard}:hover & {
        background: var(--primary-hover);
        transform: scale(1.05);
    }
`;

export const StatNumber = styled.div`
    font-family: "Inter", sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-xs);
    transition: all 0.3s ease;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

export const StatLabel = styled.div`
    font-family: "Inter", sans-serif;
    font-size: var(--font-size-base);
    color: var(--text-secondary);
    font-weight: var(--font-weight-medium);
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;
