import React from "react";
import { Row, Col, Typography, Input, Button, Divider } from "antd";
import {
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    FacebookFilled,
    TwitterOutlined,
    LinkedinFilled,
    InstagramFilled,
    SendOutlined,
    HeartFilled,
} from "@ant-design/icons";
import {
    FooterContainer,
    FooterContent,
    FooterSection,
    FooterTitle,
    FooterText,
    FooterLink,
    NewsletterSection,
    SocialIcons,
    FooterBottom,
    CompanyInfo,
    NewsletterInput,
} from "./style";

const { Title, Text } = Typography;

const FooterComponent = () => {
    const handleNewsletterSubmit = (value) => {
        console.log("Newsletter subscription:", value);
        // Xử lý đăng ký newsletter
    };

    return (
        <FooterContainer>
            <FooterContent>
                <Row gutter={[32, 32]}>
                    {/* Company Info */}
                    <Col xs={24} sm={12} md={6}>
                        <FooterSection>
                            <CompanyInfo>
                                <FooterTitle level={5}>
                                    VỀ CÔNG TY
                                </FooterTitle>
                                <FooterLink href="/about">
                                    Giới thiệu công ty
                                </FooterLink>
                                <FooterLink href="/recruitment">
                                   Tuyển dụng
                                </FooterLink>
                                <FooterLink href="/contact">
                                    Góp ý, khiếu nại
                                </FooterLink>
                                <SocialIcons>
                                    <FacebookFilled />
                                    <TwitterOutlined />
                                    <LinkedinFilled />
                                    <InstagramFilled />
                                </SocialIcons>
                            </CompanyInfo>
                        </FooterSection>
                    </Col>

                    {/* Products */}
                    <Col xs={24} sm={12} md={6}>
                        <FooterSection>
                            <FooterTitle level={5}>
                                SẢN PHẨM
                            </FooterTitle>
                            <FooterLink href="/products?type=shoes">
                                Giầy
                            </FooterLink>
                            <FooterLink href="/products?type=clothing">
                                Quần áo
                            </FooterLink>
                            <FooterLink href="/products?type=accessories">
                                Phụ kiện
                            </FooterLink>
                            <FooterLink href="/products?type=giftcards">
                                Thẻ quà tặng
                            </FooterLink>
                        </FooterSection>
                    </Col>

                    {/* Support */}
                    <Col xs={24} sm={12} md={6}>
                        <FooterSection>
                            <FooterTitle level={5}>
                                Dịch vụ khách hàng
                            </FooterTitle>
                            <FooterLink href="/warranty">
                                Chính sách bảo hành
                            </FooterLink>
                            <FooterLink href="/delivery">
                                Giao hàng & Vận chuyển
                            </FooterLink>
                            <FooterLink href="/return">Đổi trả hàng</FooterLink>
                            <FooterLink href="/payment">
                                Hướng dẫn thanh toán
                            </FooterLink>
                            <FooterLink href="/support">Hỗ trợ 24/7</FooterLink>
                        </FooterSection>
                    </Col>

                    {/* Newsletter */}
                    <Col xs={24} sm={12} md={6}>
                        <FooterSection>
                            <NewsletterSection>
                                <FooterTitle level={5}>
                                    Đăng ký nhận khuyến mãi
                                </FooterTitle>
                                <FooterText style={{ marginBottom: "16px" }}>
                                    Nhận thông báo về sản phẩm mới và các ưu đãi
                                    đặc biệt từ NB Store
                                </FooterText>
                                <Input.Search
                                    placeholder="Địa chỉ email của bạn"
                                    enterButton="Đăng ký"
                                    size="large"
                                    onSearch={handleNewsletterSubmit}
                                />
                            </NewsletterSection>
                        </FooterSection>
                    </Col>
                </Row>

                <Divider
                    style={{
                        borderColor: "var(--gray-600)",
                        margin: "32px 0 24px",
                    }}
                />

                {/* Contact Info */}
                <Row gutter={[24, 16]} style={{ marginBottom: "24px" }}>
                    <Col xs={24} sm={8}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            <EnvironmentOutlined
                                style={{
                                    color: "var(--primary-color)",
                                    fontSize: "16px",
                                }}
                            />
                            <FooterText>
                                175 P. Tây Sơn, Trung Liệt, Đống Đa, Hà Nội
                            </FooterText>
                        </div>
                    </Col>
                    <Col xs={24} sm={8}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            <PhoneOutlined
                                style={{
                                    color: "var(--primary-color)",
                                    fontSize: "16px",
                                }}
                            />
                            <FooterText>024 3852 2201</FooterText>
                        </div>
                    </Col>
                    <Col xs={24} sm={8}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            <MailOutlined
                                style={{
                                    color: "var(--primary-color)",
                                    fontSize: "16px",
                                }}
                            />
                            <FooterText>support@nbstore.vn</FooterText>
                        </div>
                    </Col>
                </Row>
            </FooterContent>

            <FooterBottom>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    <Text style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                        © 2025 NB Store.
                    </Text>
                </div>
            </FooterBottom>
        </FooterContainer>
    );
};

export default FooterComponent;
