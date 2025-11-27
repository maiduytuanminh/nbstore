import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CameraOutlined } from "@ant-design/icons";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { getBase64 } from "../../utils";
import * as UserService from "../../services/UserService";

import {
    WrapperContainer,
    WrapperContent,
    PageHeader,
    PageTitle,
    PageSubtitle,
    StatsSection,
    StatsGrid,
    StatCard,
    ProfileGrid,
    AvatarSection,
    AvatarTitle,
    AvatarContainer,
    AvatarImage,
    AvatarPlaceholder,
    UploadButton,
    WrapperUploadFile,
    InfoSection,
    InfoTitle,
    FormGrid,
    FormGroup,
    FormLabel,
    FormInput,
    ActionSection,
    ActionButton,
    ValidationMessage,
    SuccessMessage,
} from "./style";

const ProfilePage = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // Form states
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        phone: "",
        address: "",
        avatar: "",
    });

    // UI states
    const [hasChanges, setHasChanges] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    // Mutation for updating user
    const mutation = useMutationHooks((data) => {
        const { id, access_token, ...rests } = data;
        return UserService.updateUser(id, rests, access_token);
    });

    const { data, isLoading, isSuccess, isError } = mutation;

    // Initialize form data
    useEffect(() => {
        if (user) {
            setFormData({
                email: user.email || "",
                name: user.name || "",
                phone: user.phone || "",
                address: user.address || "",
                avatar: user.avatar || "",
            });
        }
    }, [user]);

    // Handle success/error states
    useEffect(() => {
        if (isSuccess) {
            message.success("Cập nhật thông tin thành công!");
            setShowSuccess(true);
            setHasChanges(false);
            handleGetDetailsUser(user?.id, user?.access_token);
            setTimeout(() => setShowSuccess(false), 3000);
        } else if (isError) {
            message.error("Có lỗi xảy ra khi cập nhật thông tin");
        }
    }, [isSuccess, isError]);

    // Fetch updated user details
    const handleGetDetailsUser = async (id, token) => {
        try {
            const res = await UserService.getDetailsUser(id, token);
            dispatch(updateUser({ ...res?.data, access_token: token }));
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    // Handle input changes
    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        setHasChanges(true);

        // Clear error for this field
        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: "",
            }));
        }
    };

    // Handle avatar upload
    const handleAvatarChange = async ({ fileList }) => {
        const file = fileList[0];
        if (file) {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            handleInputChange("avatar", file.preview);
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Tên không được để trống";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email không được để trống";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ";
        }

        if (
            formData.phone &&
            !/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))
        ) {
            newErrors.phone = "Số điện thoại không hợp lệ";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = () => {
        if (!validateForm()) {
            message.error("Vui lòng kiểm tra lại thông tin");
            return;
        }

        mutation.mutate({
            id: user?.id,
            ...formData,
            access_token: user?.access_token,
        });
    };

    // Reset form
    const handleReset = () => {
        setFormData({
            email: user.email || "",
            name: user.name || "",
            phone: user.phone || "",
            address: user.address || "",
            avatar: user.avatar || "",
        });
        setHasChanges(false);
        setErrors({});
    };

    // Calculate user stats (mock data - you can replace with real data)
    const userStats = {
        orders: 12,
        reviews: 8,
        wishlist: 24,
        joinDate: new Date(user?.createdAt || Date.now()).getFullYear(),
    };

    return (
        <WrapperContainer>
            <WrapperContent>
                <PageHeader>
                    <PageTitle>👤 Thông tin cá nhân</PageTitle>
                    <PageSubtitle>
                        Quản lý thông tin tài khoản và cài đặt bảo mật của bạn
                        tại NBStore
                    </PageSubtitle>
                </PageHeader>

                <StatsSection>
                    <StatsGrid>
                        <StatCard>
                            <div className="stat-icon">📦</div>
                            <div className="stat-number">
                                {userStats.orders}
                            </div>
                            <div className="stat-label">Đơn hàng</div>
                        </StatCard>
                        <StatCard>
                            <div className="stat-icon">⭐</div>
                            <div className="stat-number">
                                {userStats.reviews}
                            </div>
                            <div className="stat-label">Đánh giá</div>
                        </StatCard>
                        <StatCard>
                            <div className="stat-icon">❤️</div>
                            <div className="stat-number">
                                {userStats.wishlist}
                            </div>
                            <div className="stat-label">Yêu thích</div>
                        </StatCard>
                        <StatCard>
                            <div className="stat-icon">📅</div>
                            <div className="stat-number">
                                {userStats.joinDate}
                            </div>
                            <div className="stat-label">Năm tham gia</div>
                        </StatCard>
                    </StatsGrid>
                </StatsSection>

                <Loading isLoading={isLoading}>
                    <ProfileGrid>
                        <AvatarSection>
                            <AvatarTitle>📷 Ảnh đại diện</AvatarTitle>

                            <AvatarContainer>
                                {formData.avatar ? (
                                    <AvatarImage
                                        src={formData.avatar}
                                        alt="Avatar"
                                    />
                                ) : (
                                    <AvatarPlaceholder>👤</AvatarPlaceholder>
                                )}

                                <WrapperUploadFile
                                    onChange={handleAvatarChange}
                                    maxCount={1}
                                    accept="image/*"
                                    showUploadList={false}
                                >
                                    <UploadButton>
                                        <CameraOutlined />
                                    </UploadButton>
                                </WrapperUploadFile>
                            </AvatarContainer>

                            <p
                                style={{
                                    fontSize: "14px",
                                    color: "#6b7280",
                                    textAlign: "center",
                                }}
                            >
                                Nhấp vào biểu tượng camera để thay đổi ảnh đại
                                diện
                            </p>
                        </AvatarSection>

                        <InfoSection>
                            <InfoTitle>ℹ️ Thông tin cá nhân</InfoTitle>

                            {showSuccess && (
                                <SuccessMessage>
                                    <span className="success-icon">✅</span>
                                    Thông tin đã được cập nhật thành công!
                                </SuccessMessage>
                            )}

                            <FormGrid>
                                <FormGroup>
                                    <FormLabel>👤 Họ và tên *</FormLabel>
                                    <FormInput
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Nhập họ và tên"
                                    />
                                    {errors.name && (
                                        <ValidationMessage>
                                            ⚠️ {errors.name}
                                        </ValidationMessage>
                                    )}
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel>📧 Email *</FormLabel>
                                    <FormInput
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Nhập địa chỉ email"
                                    />
                                    {errors.email && (
                                        <ValidationMessage>
                                            ⚠️ {errors.email}
                                        </ValidationMessage>
                                    )}
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel>📱 Số điện thoại</FormLabel>
                                    <FormInput
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "phone",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Nhập số điện thoại"
                                    />
                                    {errors.phone && (
                                        <ValidationMessage>
                                            ⚠️ {errors.phone}
                                        </ValidationMessage>
                                    )}
                                </FormGroup>

                                <FormGroup className="full-width">
                                    <FormLabel>🏠 Địa chỉ</FormLabel>
                                    <FormInput
                                        type="text"
                                        value={formData.address}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "address",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Nhập địa chỉ"
                                    />
                                    {errors.address && (
                                        <ValidationMessage>
                                            ⚠️ {errors.address}
                                        </ValidationMessage>
                                    )}
                                </FormGroup>
                            </FormGrid>

                            <ActionSection>
                                <ActionButton
                                    className="secondary"
                                    onClick={handleReset}
                                    disabled={!hasChanges || isLoading}
                                >
                                    🔄 Khôi phục
                                </ActionButton>

                                <ActionButton
                                    className="primary"
                                    onClick={handleSubmit}
                                    disabled={!hasChanges || isLoading}
                                >
                                    {isLoading
                                        ? "⏳ Đang cập nhật..."
                                        : "💾 Lưu thay đổi"}
                                </ActionButton>
                            </ActionSection>
                        </InfoSection>
                    </ProfileGrid>
                </Loading>
            </WrapperContent>
        </WrapperContainer>
    );
};

export default ProfilePage;
