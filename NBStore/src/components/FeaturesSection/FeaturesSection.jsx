import React from "react";
import {
    ShoppingCartOutlined,
    MobileOutlined,
    CreditCardOutlined,
    SearchOutlined,
    MessageOutlined,
    CloudOutlined,
} from "@ant-design/icons";
import {
    FeaturesContainer,
    FeaturesGrid,
    FeatureCard,
    FeatureIcon,
    FeatureTitle,
    FeatureDescription,
    SectionTitle,
    SectionSubtitle,
} from "./style";

const FeaturesSection = () => {
    const features = [
        {
            icon: <ShoppingCartOutlined />,
            title: "Mua sắm dễ dàng",
            description:
                "Giao diện thân thiện, tìm kiếm thông minh và thanh toán nhanh chóng chỉ với vài click",
            color: "#3B82F6",
        },
        {
            icon: <MobileOutlined />,
            title: "Responsive Design",
            description:
                "Trải nghiệm mượt mà trên mọi thiết bị: desktop, tablet và smartphone",
            color: "#2563EB",
        },
        {
            icon: <CreditCardOutlined />,
            title: "Thanh toán an toàn",
            description:
                "Hỗ trợ nhiều phương thức thanh toán: thẻ tín dụng, ví điện tử, chuyển khoản",
            color: "#1E40AF",
        },
        {
            icon: <SearchOutlined />,
            title: "Tìm kiếm thông minh",
            description:
                "AI-powered search giúp bạn tìm được sản phẩm mong muốn một cách nhanh chóng",
            color: "#60A5FA",
        },
        {
            icon: <MessageOutlined />,
            title: "Chatbot AI",
            description:
                "Trợ lý ảo 24/7 hỗ trợ tư vấn sản phẩm và giải đáp thắc mắc tức thì",
            color: "#1E293B",
        },
        {
            icon: <CloudOutlined />,
            title: "Cloud Technology",
            description:
                "Hạ tầng cloud hiện đại đảm bảo tốc độ truy cập nhanh và ổn định",
            color: "#475569",
        },
    ];

    return (
        <FeaturesContainer>
            <SectionTitle>Tại sao chọn NB Store?</SectionTitle>
            <SectionSubtitle>
                Chúng tôi không ngừng đổi mới và nâng cấp để mang đến trải
                nghiệm mua sắm tuyệt vời nhất
            </SectionSubtitle>

            <FeaturesGrid>
                {features.map((feature, index) => (
                    <FeatureCard key={index}>
                        <FeatureIcon color={feature.color}>
                            {feature.icon}
                        </FeatureIcon>
                        <FeatureTitle>{feature.title}</FeatureTitle>
                        <FeatureDescription>
                            {feature.description}
                        </FeatureDescription>
                    </FeatureCard>
                ))}
            </FeaturesGrid>
        </FeaturesContainer>
    );
};

export default FeaturesSection;
