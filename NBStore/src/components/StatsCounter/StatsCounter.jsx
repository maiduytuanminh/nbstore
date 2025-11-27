import React, { useState, useEffect, useRef } from "react";
import {
    UserOutlined,
    ShoppingOutlined,
    StarOutlined,
    GlobalOutlined,
    TrophyOutlined,
    HeartOutlined,
} from "@ant-design/icons";
import {
    StatsContainer,
    SectionTitle,
    SectionSubtitle,
    StatsGrid,
    StatCard,
    StatIcon,
    StatNumber,
    StatLabel,
} from "./style";

const StatsCounter = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [counters, setCounters] = useState({
        customers: 0,
        orders: 0,
        rating: 0,
        cities: 0,
        awards: 0,
        satisfaction: 0,
    });

    const sectionRef = useRef();

    const stats = [
        {
            icon: <UserOutlined />,
            target: 50000,
            label: "Khách hàng tin tưởng",
            suffix: "+",
            key: "customers",
        },
        {
            icon: <ShoppingOutlined />,
            target: 125000,
            label: "Đơn hàng thành công",
            suffix: "+",
            key: "orders",
        },
        {
            icon: <StarOutlined />,
            target: 4.9,
            label: "Đánh giá trung bình",
            suffix: "/5",
            key: "rating",
            decimals: 1,
        },
        {
            icon: <GlobalOutlined />,
            target: 63,
            label: "Tỉnh thành phục vụ",
            suffix: "",
            key: "cities",
        },
        {
            icon: <TrophyOutlined />,
            target: 15,
            label: "Giải thưởng nhận được",
            suffix: "",
            key: "awards",
        },
        {
            icon: <HeartOutlined />,
            target: 98,
            label: "Độ hài lòng khách hàng",
            suffix: "%",
            key: "satisfaction",
        },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                    animateCounters();
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

    const animateCounters = () => {
        stats.forEach((stat) => {
            animateValue(stat.key, 0, stat.target, 2000, stat.decimals);
        });
    };

    const animateValue = (key, start, end, duration, decimals = 0) => {
        const range = end - start;
        const increment = range / (duration / 16);
        const step = () => {
            start += increment;
            if (start >= end) {
                setCounters((prev) => ({ ...prev, [key]: end }));
            } else {
                const value =
                    decimals > 0
                        ? parseFloat(start.toFixed(decimals))
                        : Math.floor(start);
                setCounters((prev) => ({ ...prev, [key]: value }));
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    };

    return (
        <StatsContainer ref={sectionRef}>
            <SectionTitle>Số liệu ấn tượng</SectionTitle>
            <SectionSubtitle>
                Những con số minh chứng cho sự tin tưởng và hài lòng của khách
                hàng với dịch vụ của chúng tôi
            </SectionSubtitle>

            <StatsGrid>
                {stats.map((stat, index) => (
                    <StatCard key={index}>
                        <StatIcon>{stat.icon}</StatIcon>
                        <StatNumber>
                            {counters[stat.key].toLocaleString()}
                            {stat.suffix}
                        </StatNumber>
                        <StatLabel>{stat.label}</StatLabel>
                    </StatCard>
                ))}
            </StatsGrid>
        </StatsContainer>
    );
};

export default StatsCounter;
