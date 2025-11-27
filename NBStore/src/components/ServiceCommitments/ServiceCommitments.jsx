import React from "react";
import {
    TruckOutlined,
    SafetyOutlined,
    CustomerServiceOutlined,
    ReloadOutlined,
    GiftOutlined,
    CrownOutlined,
} from "@ant-design/icons";
import {
    ServiceContainer,
    ServiceGrid,
    ServiceCard,
    ServiceIcon,
    ServiceTitle,
    ServiceDescription,
    SectionTitle,
    SectionSubtitle,
} from "./style";

const ServiceCommitments = () => {
    const services = [
        {
            icon: <TruckOutlined />,
            title: "Miễn phí vận chuyển",
            description:
                "Giao hàng miễn phí cho đơn hàng từ 500.000đ trên toàn quốc",
            color: "#4F46E5",
        },
        {
            icon: <SafetyOutlined />,
            title: "Bảo hành chính hãng",
            description:
                "Bảo hành 1-3 năm từ nhà sản xuất, hỗ trợ sửa chữa 24/7",
            color: "#6366F1",
        },
        {
            icon: <CustomerServiceOutlined />,
            title: "Hỗ trợ 24/7",
            description:
                "Đội ngũ tư vấn chuyên nghiệp, hỗ trợ khách hàng mọi lúc",
            color: "#7C3AED",
        },
        {
            icon: <ReloadOutlined />,
            title: "Đổi trả dễ dàng",
            description: "Đổi trả miễn phí trong 30 ngày nếu không hài lòng",
            color: "#334155",
        },
        {
            icon: <GiftOutlined />,
            title: "Quà tặng hấp dẫn",
            description: "Nhiều ưu đãi và quà tặng cho khách hàng thân thiết",
            color: "#1E293B",
        },
        {
            icon: <CrownOutlined />,
            title: "Chất lượng cao cấp",
            description: "Chỉ bán các sản phẩm chính hãng, chất lượng đảm bảo",
            color: "#475569",
        },
    ];

    return (
        <ServiceContainer>
            <SectionTitle>Cam kết dịch vụ</SectionTitle>
            <SectionSubtitle>
                Những lý do bạn nên tin tướng và mua sắm tại NB Store
            </SectionSubtitle>

            <ServiceGrid>
                {services.map((service, index) => (
                    <ServiceCard key={index} delay={index * 0.1}>
                        <ServiceIcon color={service.color}>
                            {service.icon}
                        </ServiceIcon>
                        <ServiceTitle>{service.title}</ServiceTitle>
                        <ServiceDescription>
                            {service.description}
                        </ServiceDescription>
                    </ServiceCard>
                ))}
            </ServiceGrid>
        </ServiceContainer>
    );
};

export default ServiceCommitments;
