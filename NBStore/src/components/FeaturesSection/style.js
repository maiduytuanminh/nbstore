import styled from "styled-components";

export const FeaturesContainer = styled.section`
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
    max-width: 700px;
    line-height: var(--line-height-relaxed);
`;

export const FeaturesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: var(--spacing-lg);
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
        padding: 0 var(--spacing-md);
    }
`;

export const FeatureCard = styled.div`
    background: var(--white);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: var(--spacing-xl);
    text-align: center;
    transition: all 0.3s ease;
    box-shadow: var(--shadow-sm);
    position: relative;

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: var(--primary-color);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.3s ease;
        border-radius: 0 0 var(--radius-lg) var(--radius-lg);
    }

    &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-md);
        border-color: var(--primary-lighter);

        &::after {
            transform: scaleX(1);
        }
    }
`;

export const FeatureIcon = styled.div`
    width: 64px;
    height: 64px;
    border-radius: var(--radius-full);
    background: ${(props) => props.color}15;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto var(--spacing-lg);
    transition: all 0.3s ease;

    .anticon {
        font-size: 1.8rem;
        color: ${(props) => props.color || "var(--primary-color)"};
        transition: all 0.3s ease;
    }

    ${FeatureCard}:hover & {
        background: ${(props) => props.color}25;
        transform: scale(1.05);
    }
`;

export const FeatureTitle = styled.h3`
    font-family: "Inter", sans-serif;
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--text-primary);
    margin: 0 0 var(--spacing-md);
    line-height: var(--line-height-tight);
`;

export const FeatureDescription = styled.p`
    font-family: "Inter", sans-serif;
    font-size: var(--font-size-base);
    color: var(--text-secondary);
    line-height: var(--line-height-relaxed);
    margin: 0;
`;
