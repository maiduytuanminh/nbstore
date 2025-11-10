import { Row } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    background-color: var(--gray-800);
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
    width: 1270px;
    padding: 12px 0;
    position: relative;

    @media (max-width: 1280px) {
        width: 100%;
        padding: 12px 16px;
    }

    @media (max-width: 768px) {
        padding: 8px 12px;
        gap: 12px;
    }
`;

export const WrapperLogo = styled.div`
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.02);
    }
`;

export const WrapperTextHeader = styled(Link)`
    font-size: 20px;
    color: #fff !important;
    font-weight: 700;
    text-align: left;
    font-family: "Inter", sans-serif;
    text-decoration: none;
    letter-spacing: -0.5px;

    &:hover {
        color: rgba(255, 255, 255, 0.9) !important;
        text-decoration: none;
    }

    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

export const WrapperActions = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

    @media (max-width: 768px) {
        gap: 12px;
    }
`;

export const WrapperHeaderAccout = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
    max-width: 200px;
    font-family: "Inter", sans-serif;
    transition: all 0.3s ease;

    &:hover {
        color: rgba(255, 255, 255, 0.9);
    }

    .anticon {
        transition: all 0.3s ease;

        &:hover {
            transform: scale(1.1);
        }
    }
`;

export const WrapperTextHeaderSmall = styled.span`
    font-size: 13px;
    color: #fff;
    white-space: nowrap;
    font-weight: 500;
    font-family: "Inter", sans-serif;
    transition: all 0.3s ease;

    &:hover {
        color: rgba(255, 255, 255, 0.8);
    }

    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    padding: 10px 16px;
    margin: 0;
    border-radius: var(--radius-md);
    transition: all 0.3s ease;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    display: flex;
    align-items: center;
    color: var(--text-primary);

    &:hover {
        background-color: var(--background-light);
        color: var(--primary-color);
        transform: translateX(4px);
    }

    .anticon {
        font-size: 16px;
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
