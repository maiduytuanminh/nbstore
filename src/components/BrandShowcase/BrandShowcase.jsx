import React from 'react';
import {
    BrandContainer,
    BrandGrid,
    BrandCard,
    BrandLogo,
    SectionTitle,
    SectionSubtitle,
    BrandName
} from './style';

const BrandShowcase = () => {
    const brands = [
        {
            name: "New Balance",
            logo: "https://upload.wikimedia.org/wikipedia/commons/archive/e/ea/20160801155104%21New_Balance_logo.svg",
        },
        {
            name: "Nike",
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
        },
        {
            name: "Adidas",
            logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Adidas_2022_logo.svg",
        },
        {
            name: "Puma",
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Puma-logo-%28text%29.svg",
        },
    ];

    return (
        <BrandContainer>
            <SectionTitle>Thương hiệu đối tác</SectionTitle>
            <SectionSubtitle>
                Chúng tôi tự hào hợp tác với các thương hiệu hàng đầu thế giới
            </SectionSubtitle>

            <BrandGrid>
                {brands.map((brand, index) => (
                    <BrandCard key={index} delay={index * 0.1}>
                        <BrandLogo>
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextElementSibling.style.display = 'flex';
                                }}
                            />
                            <BrandName color={brand.color} style={{display: 'none'}}>
                                {brand.name}
                            </BrandName>
                        </BrandLogo>
                    </BrandCard>
                ))}
            </BrandGrid>
        </BrandContainer>
    );
};

export default BrandShowcase;