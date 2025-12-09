import styled from "styled-components";
import { Typography, Input } from "antd";

const { Title, Text } = Typography;

export const FooterContainer = styled.footer`
    background: var(--gray-800);
    color: var(--white);
    margin-top: auto;
    width: 100%;
`;

export const FooterContent = styled.div`
    max-width: 1270px;
    margin: 0 auto;
    padding: var(--spacing-xl) var(--spacing-sm);

    @media (max-width: 768px) {
        padding: var(--spacing-lg) var(--spacing-xs);
    }
`;

export const FooterSection = styled.div`
    height: 100%;
`;

export const FooterTitle = styled(Title)`
    &.ant-typography {
        color: var(--white) !important;
        font-family: "Inter", sans-serif !important;
        font-weight: 600 !important;
        margin-bottom: var(--spacing-md) !important;
        font-size: 1.6rem !important;
    }
`;

export const FooterText = styled(Text)`
    &.ant-typography {
        color: var(--gray-300) !important;
        font-family: "Inter", sans-serif !important;
        line-height: 1.6 !important;
        font-size: 1.4rem !important;
    }
`;

export const FooterLink = styled.a`
    display: block;
    color: var(--gray-400);
    text-decoration: none;
    margin-bottom: 8px;
    font-family: "Inter", sans-serif;
    font-size: 1.4rem;
    transition: all 0.3s ease;
    position: relative;
    padding-left: 16px;

    &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        opacity: 0;
        transition: all 0.3s ease;
    }

    &:hover {
        color: var(--primary-color);
        padding-left: 20px;

        &:before {
            opacity: 1;
        }
    }
`;

export const NewsletterSection = styled.div`
    .ant-input-search {
        .ant-input-group-addon {
            .ant-btn {
                height: 40px;
                border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
                background: var(--primary-color);
                border-color: var(--primary-color);
                color: var(--white);
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 6px;

                &:before {
                    content: "📧";
                    font-size: 14px;
                }

                &:hover {
                    background: var(--primary-hover);
                    border-color: var(--primary-hover);
                    color: var(--white);
                }

                &:focus {
                    background: var(--primary-hover);
                    border-color: var(--primary-hover);
                    color: var(--white);
                }
            }
        }
    }
`;

export const NewsletterInput = styled(Input)`
    .ant-input {
        background: var(--gray-700);
        border: 1px solid var(--gray-600);
        color: var(--white);
        border-radius: var(--radius-lg) 0 0 var(--radius-lg);
        height: 40px;

        &::placeholder {
            color: var(--gray-400);
        }

        &:hover {
            border-color: var(--primary-color);
            background: var(--gray-600);
        }

        &:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
            background: var(--gray-600);
        }
    }

    .ant-input-group-addon {
        .ant-btn {
            height: 40px;
            border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
            background: var(--primary-color);
            border-color: var(--primary-color);
            color: white;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;

            &:before {
                content: "📧";
                font-size: 14px;
            }

            &:hover {
                background: var(--primary-hover);
                border-color: var(--primary-hover);
                color: var(--white);
            }

            &:focus {
                background: var(--primary-hover);
                border-color: var(--primary-hover);
                color: var(--white);
            }
        }
    }
`;

export const SocialIcons = styled.div`
    display: flex;
    gap: 12px;
    margin-top: var(--spacing-md);

    .anticon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--gray-700);
        border-radius: var(--radius-full);
        color: var(--gray-400);
        font-size: 18px;
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover {
            background: var(--primary-color);
            color: var(--white);
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
        }
    }
`;

export const FooterBottom = styled.div`
    background: rgba(0, 0, 0, 0.3);
    padding: var(--spacing-md) 0;
    text-align: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const CompanyInfo = styled.div`
    .ant-typography {
        margin-bottom: var(--spacing-sm) !important;
    }
`;
