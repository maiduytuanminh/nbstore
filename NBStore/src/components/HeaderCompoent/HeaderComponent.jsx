import { Badge, Col, Popover } from "antd";
import React, { useState, useEffect } from "react";
import {
    WrapperContentPopup,
    WrapperHeader,
    WrapperHeaderAccout,
    WrapperTextHeader,
    WrapperTextHeaderSmall,
    WrapperLogo,
    WrapperActions,
} from "./style";
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined,
    LoginOutlined,
    UserAddOutlined,
    SettingOutlined,
    LogoutOutlined,
    DashboardOutlined,
} from "@ant-design/icons";
import ButttonInputSearch from "../ButtonInputSearch/ButttonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../LoadingComponent/Loading";
import { searchProduct } from "../../redux/slides/productSlide";
import imageLogo from '../../assets/images/logo.svg'

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [userName, setUserName] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [search, setSearch] = useState("");
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const order = useSelector((state) => state.order);
    const [loading, setLoading] = useState(false);

    const handleNavigateLogin = () => {
        navigate("/sign-in");
    };

    const handleNavigateSignup = () => {
        navigate("/sign-up");
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await UserService.logoutUser(
                user?.access_token,
                user?.refreshToken
            );
            dispatch(resetUser());
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        setUserName(user?.name);
        setUserAvatar(user?.avatar);
        setLoading(false);
    }, [user?.name, user?.avatar]);

    const content = (
        <div>
            <WrapperContentPopup onClick={() => handleClickNavigate("profile")}>
                <SettingOutlined style={{ marginRight: "8px" }} />
                Thông tin người dùng
            </WrapperContentPopup>
            {user?.isAdmin && (
                <WrapperContentPopup
                    onClick={() => handleClickNavigate("admin")}
                >
                    <DashboardOutlined style={{ marginRight: "8px" }} />
                    Quản lý hệ thống
                </WrapperContentPopup>
            )}
            <WrapperContentPopup
                onClick={() => handleClickNavigate("my-order")}
            >
                <ShoppingCartOutlined style={{ marginRight: "8px" }} />
                Đơn hàng của tôi
            </WrapperContentPopup>
            <WrapperContentPopup onClick={() => handleClickNavigate()}>
                <LogoutOutlined style={{ marginRight: "8px" }} />
                Đăng xuất
            </WrapperContentPopup>
        </div>
    );

    const handleClickNavigate = (type) => {
        if (type === "profile") {
            navigate("/profile-user");
        } else if (type === "admin") {
            navigate("/system/admin");
        } else if (type === "my-order") {
            navigate("/my-order", {
                state: {
                    id: user?.id,
                    token: user?.access_token,
                },
            });
        } else {
            handleLogout();
        }
        setIsOpenPopup(false);
    };

    const onSearch = (value) => {
        setSearch(value);
        dispatch(searchProduct(value));
    };

    return (
        <div
            style={{
                hehiht: "100%",
                width: "100%",
                display: "flex",
                background: "var(--primary-color)",
                justifyContent: "center",
                boxShadow: "var(--shadow-md)",
                position: "sticky",
                top: 0,
                zIndex: 999,
            }}
        >
            <WrapperHeader
                style={{
                    justifyContent:
                        isHiddenSearch && isHiddenSearch
                            ? "space-between"
                            : "unset",
                }}
            >
                <Col span={5}>
                    <WrapperLogo onClick={() => navigate("/")}>
                        <img
                            src={imageLogo}
                            alt="Logo"
                            style={{ width: "auto", height: "30px" }}
                        />
                    </WrapperLogo>
                </Col>
                {!isHiddenSearch && (
                    <Col span={13}>
                        <ButttonInputSearch
                            placeholder="Tìm kiếm sản phẩm, thương hiệu..."
                            onSearch={onSearch}
                            style={{
                                width: "100%",
                            }}
                        />
                    </Col>
                )}
                <Col
                    span={6}
                    style={{
                        display: "flex",
                        gap: "16px",
                        alignItems: "center",
                        justifyContent: "flex-end",
                    }}
                >
                    <WrapperActions>
                        <Loading isLoading={loading}>
                            <WrapperHeaderAccout>
                                {userAvatar ? (
                                    <img
                                        src={userAvatar}
                                        alt="avatar"
                                        style={{
                                            height: "32px",
                                            width: "32px",
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                            border: "2px solid white",
                                        }}
                                    />
                                ) : (
                                    <UserOutlined
                                        style={{ fontSize: "20px" }}
                                    />
                                )}
                                {user?.access_token ? (
                                    <>
                                        <Popover
                                            content={content}
                                            trigger="click"
                                            open={isOpenPopup}
                                        >
                                            <div
                                                style={{
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "4px",
                                                }}
                                                onClick={() =>
                                                    setIsOpenPopup(
                                                        (prev) => !prev
                                                    )
                                                }
                                            >
                                                <WrapperTextHeaderSmall>
                                                    {userName?.length
                                                        ? userName
                                                        : user?.email}
                                                </WrapperTextHeaderSmall>
                                                <CaretDownOutlined />
                                            </div>
                                        </Popover>
                                    </>
                                ) : (
                                    <div
                                        style={{
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "12px",
                                        }}
                                    >
                                        <div
                                            onClick={handleNavigateLogin}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "4px",
                                            }}
                                        >
                                            <LoginOutlined />
                                            <WrapperTextHeaderSmall>
                                                Đăng nhập
                                            </WrapperTextHeaderSmall>
                                        </div>
                                        <div
                                            style={{
                                                color: "rgba(255,255,255,0.5)",
                                            }}
                                        >
                                            |
                                        </div>
                                        <div
                                            onClick={handleNavigateSignup}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "4px",
                                            }}
                                        >
                                            <UserAddOutlined />
                                            <WrapperTextHeaderSmall>
                                                Đăng ký
                                            </WrapperTextHeaderSmall>
                                        </div>
                                    </div>
                                )}
                            </WrapperHeaderAccout>
                        </Loading>
                        {!isHiddenCart && (
                            <div
                                onClick={() => navigate("/order")}
                                style={{
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                }}
                            >
                                <Badge
                                    count={order?.orderItems?.length}
                                    size="small"
                                >
                                    <ShoppingCartOutlined
                                        style={{
                                            fontSize: "20px",
                                            color: "#fff",
                                            padding: "8px",
                                            background: "rgba(255,255,255,0.1)",
                                            borderRadius: "8px",
                                        }}
                                    />
                                </Badge>
                                <WrapperTextHeaderSmall>
                                    Giỏ hàng
                                </WrapperTextHeaderSmall>
                            </div>
                        )}
                    </WrapperActions>
                </Col>
            </WrapperHeader>
        </div>
    );
};

export default HeaderComponent;
