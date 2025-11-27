import styled, { keyframes } from "styled-components";

// Keyframes
const slideIn = keyframes`
    0% {
        opacity: 0;
        transform: translateY(50px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

const textGlow = keyframes`
    0%, 100% {
        text-shadow:
            0 0 20px rgba(255, 255, 255, 0.8),
            0 0 40px rgba(255, 255, 255, 0.4),
            2px 2px 10px rgba(0, 0, 0, 0.8);
    }
    50% {
        text-shadow:
            0 0 30px rgba(255, 255, 255, 1),
            0 0 60px rgba(255, 255, 255, 0.6),
            2px 2px 10px rgba(0, 0, 0, 0.8);
    }
`;

const slideUp = keyframes`
    0% {
        opacity: 0;
        transform: translateY(30px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

const fadeInScale = keyframes`
    0% {
        opacity: 0;
        transform: scale(0.8);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
`;

export const SlideContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 550px;
    background-image: url(${(props) => props.image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        transform: scale(1.02);
    }

    @media (max-width: 1200px) {
        min-height: 500px;
    }

    @media (max-width: 768px) {
        min-height: 400px;
    }

    @media (max-width: 480px) {
        min-height: 350px;
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.6) 0%,
            rgba(0, 0, 0, 0.3) 40%,
            rgba(0, 0, 0, 0.1) 60%,
            rgba(0, 0, 0, 0.7) 100%
        );
        z-index: 1;
        transition: opacity 0.6s ease;
    }

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(
            ellipse at center,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(0, 0, 0, 0.4) 70%,
            rgba(0, 0, 0, 0.8) 100%
        );
        z-index: 2;
        opacity: 0.8;
    }
`;

export const SlideContent = styled.div`
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: var(--spacing-lg);
    animation: ${slideIn} 1s ease-out;
`;

export const SlideTitle = styled.h1`
    font-family: "Inter", sans-serif;
    font-size: 4.5rem;
    font-weight: 900;
    color: white;
    margin: 0 0 var(--spacing-lg);
    text-align: center;
    letter-spacing: 3px;
    text-transform: uppercase;
    animation: ${textGlow} 3s ease-in-out infinite, ${fadeInScale} 1s ease-out;
    position: relative;
    z-index: 2;

    @media (max-width: 768px) {
        font-size: 3.5rem;
        letter-spacing: 2px;
    }

    @media (max-width: 480px) {
        font-size: 2.8rem;
        letter-spacing: 1px;
    }
`;

export const SlideSubtitle = styled.h2`
    font-family: "Inter", sans-serif;
    font-size: 2.2rem;
    font-weight: 700;
    color: #ffe066;
    margin: 0 0 var(--spacing-lg);
    text-align: center;
    letter-spacing: 1px;
    animation: ${slideUp} 1s ease-out 0.3s both;
    text-shadow: 0 0 15px rgba(255, 224, 102, 0.8),
        2px 2px 8px rgba(0, 0, 0, 0.9);
    position: relative;
    z-index: 2;

    @media (max-width: 768px) {
        font-size: 1.8rem;
    }

    @media (max-width: 480px) {
        font-size: 1.5rem;
    }
`;

export const SlideDescription = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 1.6rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.95);
    margin: 0;
    text-align: center;
    max-width: 600px;
    line-height: 1.6;
    animation: ${slideUp} 1.2s ease-out 0.6s both;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.6),
        1px 1px 6px rgba(0, 0, 0, 0.8);
    position: relative;
    z-index: 2;

    @media (max-width: 768px) {
        font-size: 1.4rem;
        max-width: 500px;
    }

    @media (max-width: 480px) {
        font-size: 1.2rem;
        max-width: 350px;
    }
`;
