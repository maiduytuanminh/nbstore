import React, { useState } from "react";
import {
    CheckCircleOutlined,
    GiftOutlined,
    ShoppingCartOutlined,
    SafetyCertificateOutlined,
} from "@ant-design/icons";
import {
    NewsletterContainer,
    NewsletterContent,
    NewsletterTitle,
    NewsletterDescription,
    NewsletterForm,
    NewsletterInput,
    NewsletterButton,
    BenefitsGrid,
    BenefitItem,
    BenefitIcon,
    BenefitText,
    SuccessMessage,
} from "./style";

const NewsletterSection = () => {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const benefits = [
        {
            icon: <GiftOutlined />,
            text: "Ưu đãi độc quyền",
        },
        {
            icon: <ShoppingCartOutlined />,
            text: "Thông tin sản phẩm mới",
        },
        {
            icon: <SafetyCertificateOutlined />,
            text: "Bảo mật thông tin",
        },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || isLoading) return;

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubscribed(true);
            setIsLoading(false);
            setEmail("");
        }, 1000);
    };

    if (isSubscribed) {
        return (
            <NewsletterContainer>
                <NewsletterContent>
                    <SuccessMessage className="bounce">
                        <CheckCircleOutlined
                            style={{ fontSize: "2rem", marginBottom: "1rem" }}
                        />
                        <div>
                            <h3>Đăng ký thành công!</h3>
                            <p>
                                Cảm ơn bạn đã đăng ký nhận tin. Chúng tôi sẽ gửi
                                những ưu đãi tốt nhất đến email của bạn.
                            </p>
                        </div>
                    </SuccessMessage>
                </NewsletterContent>
            </NewsletterContainer>
        );
    }

    return (
        <NewsletterContainer>
            <NewsletterContent>
                <NewsletterTitle>Đăng ký nhận tin khuyến mãi</NewsletterTitle>

                <NewsletterDescription>
                    Nhận thông báo về sản phẩm mới, ưu đãi đặc biệt và các
                    chương trình khuyến mãi hấp dẫn
                </NewsletterDescription>

                <NewsletterForm onSubmit={handleSubmit}>
                    <NewsletterInput
                        type="email"
                        placeholder="Nhập địa chỉ email của bạn"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <NewsletterButton type="submit" disabled={isLoading}>
                        {isLoading ? "Đang xử lý..." : "Đăng ký"}
                    </NewsletterButton>
                </NewsletterForm>

                <BenefitsGrid>
                    {benefits.map((benefit, index) => (
                        <BenefitItem key={index}>
                            <BenefitIcon>{benefit.icon}</BenefitIcon>
                            <BenefitText>{benefit.text}</BenefitText>
                        </BenefitItem>
                    ))}
                </BenefitsGrid>
            </NewsletterContent>
        </NewsletterContainer>
    );
};

export default NewsletterSection;
