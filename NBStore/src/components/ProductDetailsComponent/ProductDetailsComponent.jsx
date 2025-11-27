import { Image, Rate } from "antd";
import React, { useState, useEffect } from "react";
import {
    ProductContainer,
    ProductRow,
    ImageSection,
    ThumbnailGrid,
    WrapperStyleImageSmall,
    ProductInfo,
    WrapperStyleNameProduct,
    RatingSection,
    WrapperStyleTextSell,
    WrapperPriceProduct,
    WrapperPriceTextProduct,
    WrapperAddressProduct,
    QuantitySection,
    WrapperQualityProduct,
    WrapperInputNumber,
    ButtonGroup,
    ErrorMessage,
    ServiceCommitments,
    ServiceHeader,
    ServiceGrid,
    ServiceItem,
    ServiceIcon,
    ServiceContent,
    PolicySection,
} from "./style";
import { PlusOutlined, MinusOutlined, TruckOutlined, SafetyOutlined, CustomerServiceOutlined, GiftOutlined, SafetyCertificateOutlined, UndoOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct, resetOrder } from "../../redux/slides/orderSlide";
import { convertPrice, initFacebookSDK } from "../../utils";
import * as message from "../Message/Message";
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent";

const ProductDetailsComponent = ({ idProduct }) => {
    const [numProduct, setNumProduct] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const user = useSelector((state) => state.user);
    const order = useSelector((state) => state.order);
    const [errorLimitOrder, setErrorLimitOrder] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1];
        if (id) {
            const res = await ProductService.getDetailsProduct(id);
            return res.data;
        }
    };

    const { isLoading, data: productDetails } = useQuery(
        ["product-details", idProduct],
        fetchGetDetailsProduct,
        { enabled: !!idProduct }
    );

    const onChange = (value) => {
        setNumProduct(Number(value));
    };

    useEffect(() => {
        initFacebookSDK();
    }, []);

    useEffect(() => {
        const orderRedux = order?.orderItems?.find(
            (item) => item.product === productDetails?._id
        );
        if (
            orderRedux?.amount + numProduct <= orderRedux?.countInstock ||
            (!orderRedux && productDetails?.countInStock > 0)
        ) {
            setErrorLimitOrder(false);
        } else if (productDetails?.countInStock === 0) {
            setErrorLimitOrder(true);
        }
    }, [numProduct, order?.orderItems, productDetails?._id, productDetails?.countInStock]);

    useEffect(() => {
        if (order.isSucessOrder) {
            message.success("Đã thêm vào giỏ hàng");
        }
        return () => {
            dispatch(resetOrder());
        };
    }, [order.isSucessOrder, dispatch]);

    const handleChangeCount = (type, limited) => {
        if (type === "increase") {
            if (!limited) {
                setNumProduct(numProduct + 1);
            }
        } else {
            if (!limited) {
                setNumProduct(numProduct - 1);
            }
        }
    };

    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate("/sign-in", { state: location?.pathname });
        } else {
            const orderRedux = order?.orderItems?.find(
                (item) => item.product === productDetails?._id
            );
            if (
                orderRedux?.amount + numProduct <= orderRedux?.countInstock ||
                (!orderRedux && productDetails?.countInStock > 0)
            ) {
                dispatch(
                    addOrderProduct({
                        orderItem: {
                            name: productDetails?.name,
                            amount: numProduct,
                            image:
                                productDetails?.images?.[selectedImage] ||
                                productDetails?.image,
                            price: productDetails?.price,
                            product: productDetails?._id,
                            discount: productDetails?.discount,
                            countInstock: productDetails?.countInStock,
                        },
                    })
                );
            } else {
                setErrorLimitOrder(true);
            }
        }
    };

    return (
        <Loading isLoading={isLoading}>
            <ProductContainer>
                <ProductRow>
                    {/* Image Section */}
                    <ImageSection>
                        <div className="main-image">
                            <Image
                                src={
                                    productDetails?.images?.[selectedImage] ||
                                    productDetails?.image
                                }
                                alt="product image"
                                preview={false}
                            />
                        </div>

                        <ThumbnailGrid>
                            {productDetails?.images?.map((image, index) => (
                                <WrapperStyleImageSmall
                                    key={index}
                                    src={image}
                                    alt={`thumbnail-${index}`}
                                    preview={false}
                                    onClick={() => setSelectedImage(index)}
                                    style={{
                                        cursor: "pointer",
                                        border:
                                            selectedImage === index
                                                ? "2px solid var(--primary-color)"
                                                : "none",
                                    }}
                                />
                            ))}
                        </ThumbnailGrid>
                    </ImageSection>

                    {/* Product Info Section */}
                    <ProductInfo>
                        <WrapperStyleNameProduct>
                            {productDetails?.name}
                        </WrapperStyleNameProduct>

                        <RatingSection>
                            <Rate
                                allowHalf
                                defaultValue={productDetails?.rating}
                                value={productDetails?.rating}
                                disabled
                            />
                            <WrapperStyleTextSell>
                                | Đã bán {productDetails?.selled || 0}+
                            </WrapperStyleTextSell>
                        </RatingSection>

                        <WrapperPriceProduct>
                            <WrapperPriceTextProduct>
                                {convertPrice(productDetails?.price)}
                            </WrapperPriceTextProduct>
                        </WrapperPriceProduct>

                        <WrapperAddressProduct>
                            <span>Giao đến </span>
                            <span className="address">
                                {user?.address || "Vui lòng cập nhật địa chỉ"}
                            </span>
                            <span> - </span>
                            <span className="change-address">Đổi địa chỉ</span>
                        </WrapperAddressProduct>

                        <LikeButtonComponent
                            dataHref={
                                process.env.REACT_APP_IS_LOCAL
                                    ? "https://developers.facebook.com/docs/plugins/"
                                    : window.location.href
                            }
                        />

                        <QuantitySection>
                            <div className="quantity-label">Số lượng</div>
                            <WrapperQualityProduct>
                                <button
                                    onClick={() =>
                                        handleChangeCount(
                                            "decrease",
                                            numProduct === 1
                                        )
                                    }
                                    disabled={numProduct === 1}
                                >
                                    <MinusOutlined />
                                </button>
                                <WrapperInputNumber
                                    onChange={onChange}
                                    defaultValue={1}
                                    max={productDetails?.countInStock}
                                    min={1}
                                    value={numProduct}
                                    size="small"
                                />
                                <button
                                    onClick={() =>
                                        handleChangeCount(
                                            "increase",
                                            numProduct ===
                                                productDetails?.countInStock
                                        )
                                    }
                                    disabled={
                                        numProduct ===
                                        productDetails?.countInStock
                                    }
                                >
                                    <PlusOutlined />
                                </button>
                            </WrapperQualityProduct>
                        </QuantitySection>

                        <ButtonGroup>
                            <div>
                                <ButtonComponent
                                    size={40}
                                    styleButton={{
                                        background: "var(--primary-color)",
                                        height: "48px",
                                        width: "220px",
                                        border: "none",
                                        borderRadius: "var(--radius-md)",
                                        transition: "all 0.3s ease",
                                    }}
                                    onClick={handleAddOrderProduct}
                                    textbutton={"Chọn mua"}
                                    styleTextButton={{
                                        color: "var(--white)",
                                        fontSize: "var(--font-size-base)",
                                        fontWeight:
                                            "var(--font-weight-semibold)",
                                    }}
                                />
                                {errorLimitOrder && (
                                    <ErrorMessage>
                                        Sản phẩm hết hàng hoặc vượt quá số lượng
                                        có sẵn
                                    </ErrorMessage>
                                )}
                            </div>

                            <ButtonComponent
                                size={40}
                                styleButton={{
                                    background: "var(--white)",
                                    height: "48px",
                                    width: "220px",
                                    border: "1px solid var(--primary-color)",
                                    borderRadius: "var(--radius-md)",
                                    transition: "all 0.3s ease",
                                }}
                                textbutton={"Mua trả sau"}
                                styleTextButton={{
                                    color: "var(--primary-color)",
                                    fontSize: "var(--font-size-base)",
                                    fontWeight: "var(--font-weight-medium)",
                                }}
                            />
                        </ButtonGroup>
                    </ProductInfo>
                </ProductRow>
            </ProductContainer>

            {/* Service Commitments Section */}
            <ServiceCommitments>
                <ServiceHeader>
                    <h3>🛡️ Cam kết chất lượng & dịch vụ</h3>
                    <p>Chúng tôi đảm bảo mang đến trải nghiệm mua sắm tốt nhất cho khách hàng</p>
                </ServiceHeader>

                <ServiceGrid>
                    <ServiceItem>
                        <ServiceIcon>
                            <TruckOutlined />
                        </ServiceIcon>
                        <ServiceContent>
                            <h4>Giao hàng nhanh chóng</h4>
                            <p>Giao hàng trong 1-2 ngày với đơn hàng nội thành. Miễn phí giao hàng với đơn từ 500.000đ.</p>
                        </ServiceContent>
                    </ServiceItem>

                    <ServiceItem>
                        <ServiceIcon>
                            <SafetyOutlined />
                        </ServiceIcon>
                        <ServiceContent>
                            <h4>Sản phẩm chính hãng</h4>
                            <p>100% sản phẩm chính hãng, có tem bảo hành và hóa đơn VAT đầy đủ.</p>
                        </ServiceContent>
                    </ServiceItem>

                    <ServiceItem>
                        <ServiceIcon>
                            <CustomerServiceOutlined />
                        </ServiceIcon>
                        <ServiceContent>
                            <h4>Hỗ trợ 24/7</h4>
                            <p>Đội ngũ tư vấn viên nhiệt tình, sẵn sàng hỗ trợ khách hàng mọi lúc mọi nơi.</p>
                        </ServiceContent>
                    </ServiceItem>

                    <ServiceItem>
                        <ServiceIcon>
                            <GiftOutlined />
                        </ServiceIcon>
                        <ServiceContent>
                            <h4>Ưu đãi hấp dẫn</h4>
                            <p>Nhiều chương trình khuyến mãi, tích điểm và quà tặng dành cho khách hàng thân thiết.</p>
                        </ServiceContent>
                    </ServiceItem>

                    <ServiceItem>
                        <ServiceIcon>
                            <SafetyCertificateOutlined />
                        </ServiceIcon>
                        <ServiceContent>
                            <h4>Bảo hành toàn diện</h4>
                            <p>Chế độ bảo hành chính hãng, đổi trả miễn phí trong 30 ngày đầu tiên.</p>
                        </ServiceContent>
                    </ServiceItem>

                    <ServiceItem>
                        <ServiceIcon>
                            <UndoOutlined />
                        </ServiceIcon>
                        <ServiceContent>
                            <h4>Đổi trả dễ dàng</h4>
                            <p>Chính sách đổi trả linh hoạt, hoàn tiền 100% nếu sản phẩm không đúng mô tả.</p>
                        </ServiceContent>
                    </ServiceItem>
                </ServiceGrid>

                <PolicySection>
                    <h4>📋 Chính sách mua hàng</h4>
                    <ul>
                        <li>Kiểm tra sản phẩm ngay khi nhận hàng</li>
                        <li>Đổi trả trong vòng 30 ngày kể từ ngày mua</li>
                        <li>Bảo hành chính hãng theo quy định nhà sản xuất</li>
                        <li>Hỗ trợ kỹ thuật và tư vấn sử dụng miễn phí</li>
                        <li>Giao hàng COD toàn quốc, thanh toán khi nhận hàng</li>
                    </ul>
                </PolicySection>
            </ServiceCommitments>

        </Loading>
    );
};

export default ProductDetailsComponent;
