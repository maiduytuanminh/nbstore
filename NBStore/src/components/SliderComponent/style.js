import Slider from "react-slick";
import styled from "styled-components";

export const WrapperSliderStyle = styled(Slider)`
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    margin-bottom: var(--spacing-2xl);
    overflow: hidden;

    .slick-slide {
        & > div {
            height: 550px;
            position: relative;

            @media (max-width: 1200px) {
                height: 500px;
            }

            @media (max-width: 768px) {
                height: 400px;
            }

            @media (max-width: 480px) {
                height: 350px;
            }
        }
    }

    .slick-arrow {
        width: 60px;
        height: 60px;
        z-index: 100;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0.8;

        &::before {
            font-size: 24px;
            color: var(--white);
            opacity: 1;
        }

        &:hover {
            opacity: 1;
            transform: scale(1.1);
        }
    }

    .slick-arrow.slick-prev {
        left: 30px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.5);
        border-radius: var(--radius-full);
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

        &:hover {
            background: rgba(0, 0, 0, 0.7);
            border-color: rgba(255, 255, 255, 0.2);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
        }

        @media (max-width: 768px) {
            left: 15px;
            width: 50px;
            height: 50px;

            &::before {
                font-size: 20px;
            }
        }
    }

    .slick-arrow.slick-next {
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.5);
        border-radius: var(--radius-full);
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

        &:hover {
            background: rgba(0, 0, 0, 0.7);
            border-color: rgba(255, 255, 255, 0.2);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
        }

        @media (max-width: 768px) {
            right: 15px;
            width: 50px;
            height: 50px;

            &::before {
                font-size: 20px;
            }
        }
    }

    .slick-dots {
        z-index: 100;
        bottom: 30px !important;
        display: flex !important;
        justify-content: center;
        align-items: center;

        li {
            margin: 0 8px;

            button {
                width: 12px;
                height: 12px;
                padding: 0;
                border: 2px solid rgba(255, 255, 255, 0.4);
                border-radius: var(--radius-full);
                background: transparent;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

                &::before {
                    content: "";
                    width: 8px;
                    height: 8px;
                    border-radius: var(--radius-full);
                    background: rgba(255, 255, 255, 0.5);
                    opacity: 1;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                &:hover {
                    border-color: rgba(255, 255, 255, 0.8);
                    transform: scale(1.2);

                    &::before {
                        background: rgba(255, 255, 255, 0.8);
                        transform: translate(-50%, -50%) scale(1.1);
                    }
                }
            }
        }

        li.slick-active {
            button {
                border-color: var(--white);
                background: rgba(255, 255, 255, 0.1);
                transform: scale(1.3);
                box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);

                &::before {
                    background: var(--white);
                    transform: translate(-50%, -50%) scale(1.2);
                    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
                }
            }
        }

        @media (max-width: 768px) {
            bottom: 20px !important;

            li {
                margin: 0 6px;

                button {
                    width: 10px;
                    height: 10px;

                    &::before {
                        width: 6px;
                        height: 6px;
                    }
                }
            }
        }
    }
`;
