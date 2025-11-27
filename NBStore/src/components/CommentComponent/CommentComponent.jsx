import React, { useState } from "react";
import { Avatar, Button, Input, Rate, Divider } from "antd";
import { LikeOutlined, MessageOutlined, SendOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const CommentComponent = (props) => {
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(5);
    const [likedComments, setLikedComments] = useState(new Set([1, 3]));

    const fakeComments = [
        {
            id: 1,
            author: "Nguyễn Văn Minh",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Minh",
            time: "2 ngày trước",
            rating: 5,
            text: "Sản phẩm rất tốt, chất lượng vượt mong đợi. Giao hàng nhanh, đóng gói cẩn thận. Mình sẽ ủng hộ shop tiếp!",
            likes: 12,
            verified: true,
            replies: [
                {
                    id: 11,
                    author: "Shop NBStore",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NBStore",
                    text: "Cảm ơn bạn đã tin tưởng NBStore! Chúc bạn sử dụng sản phẩm vui vẻ ạ! 😊",
                },
            ],
        },
        {
            id: 2,
            author: "Trần Thị Hoa",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hoa",
            time: "1 tuần trước",
            rating: 4,
            text: "Điện thoại đẹp, màn hình sắc nét. Pin tạm ổn, dùng cả ngày được. Tuy nhiên giá hơi cao so với mặt bằng chung.",
            likes: 8,
            verified: false,
            replies: [],
        },
        {
            id: 3,
            author: "Lê Hoàng Nam",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nam",
            time: "3 ngày trước",
            rating: 5,
            text: "Tuyệt vời! Camera chụp hình siêu đẹp, hiệu năng mượt mà. Đặc biệt là dịch vụ hậu mãi rất tốt.",
            likes: 15,
            verified: true,
            replies: [
                {
                    id: 31,
                    author: "Phạm Văn Đức",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Duc",
                    text: "Mình cũng đang cân nhắc mua, bạn dùng bao lâu rồi?",
                },
                {
                    id: 32,
                    author: "Lê Hoàng Nam",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nam",
                    text: "@Phạm Văn Đức Mình dùng được 2 tháng rồi, vẫn rất ổn bạn ạ!",
                },
            ],
        },
        {
            id: 4,
            author: "Vũ Thị Mai",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mai",
            time: "5 ngày trước",
            rating: 4,
            text: "Sản phẩm ok, đáng tiền. Shop tư vấn nhiệt tình, giao hàng đúng hẹn. Sẽ quay lại ủng hộ!",
            likes: 6,
            verified: false,
            replies: [],
        },
        {
            id: 5,
            author: "Đặng Minh Tuấn",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tuan",
            time: "1 ngày trước",
            rating: 5,
            text: "Chất lượng tuyệt vời! Thiết kế sang trọng, tính năng đầy đủ. Nhất định sẽ giới thiệu cho bạn bè.",
            likes: 9,
            verified: true,
            replies: [],
        },
    ];

    const handleLike = (commentId) => {
        const newLiked = new Set(likedComments);
        if (newLiked.has(commentId)) {
            newLiked.delete(commentId);
        } else {
            newLiked.add(commentId);
        }
        setLikedComments(newLiked);
    };

    const handleSubmitComment = () => {
        if (newComment.trim()) {
            console.log("New comment:", {
                text: newComment,
                rating: newRating,
            });
            setNewComment("");
            setNewRating(5);
        }
    };

    const containerStyle = {
        background: "#ffffff",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        margin: "20px 0",
    };

    const headerStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "24px",
    };

    const formStyle = {
        marginBottom: "24px",
    };

    const formHeaderStyle = {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "16px",
    };

    const userInfoStyle = {
        display: "flex",
        flexDirection: "column",
    };

    const nameStyle = {
        fontWeight: "500",
        color: "#1f2937",
        fontSize: "16px",
    };

    const emailStyle = {
        color: "#6b7280",
        fontSize: "14px",
    };

    const ratingSectionStyle = {
        marginBottom: "16px",
    };

    const labelStyle = {
        display: "block",
        marginBottom: "8px",
        fontWeight: "500",
        color: "#1f2937",
    };

    const formActionsStyle = {
        display: "flex",
        justifyContent: "flex-end",
        gap: "12px",
        marginTop: "16px",
    };

    const commentItemStyle = {
        padding: "16px 0",
        borderBottom: "1px solid #e5e7eb",
    };

    const commentMainStyle = {
        display: "flex",
        gap: "16px",
    };

    const commentContentStyle = {
        flex: 1,
    };

    const commentAuthorStyle = {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "8px",
    };

    const authorNameStyle = {
        fontWeight: "600",
        color: "#1f2937",
        fontSize: "16px",
    };

    const timeStyle = {
        color: "#6b7280",
        fontSize: "14px",
    };

    const verifiedStyle = {
        background: "#10b981",
        color: "white",
        padding: "2px 6px",
        borderRadius: "4px",
        fontSize: "12px",
        fontWeight: "500",
    };

    const commentRatingStyle = {
        marginBottom: "8px",
    };

    const commentTextStyle = {
        color: "#1f2937",
        lineHeight: "1.6",
        marginBottom: "12px",
        fontSize: "16px",
    };

    const commentActionsStyle = {
        display: "flex",
        alignItems: "center",
        gap: "16px",
    };

    const actionBtnStyle = {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: "#6b7280",
        cursor: "pointer",
        fontSize: "14px",
        transition: "all 0.3s ease",
    };

    const actionBtnLikedStyle = {
        ...actionBtnStyle,
        color: "#3b82f6",
    };

    const replySectionStyle = {
        marginLeft: "56px",
        marginTop: "16px",
    };

    const replyItemStyle = {
        display: "flex",
        gap: "12px",
        marginBottom: "16px",
    };

    const replyContentStyle = {
        flex: 1,
        background: "#f9fafb",
        padding: "12px",
        borderRadius: "8px",
    };

    const replyAuthorStyle = {
        fontWeight: "500",
        color: "#1f2937",
        fontSize: "14px",
        marginBottom: "8px",
    };

    const replyTextStyle = {
        color: "#6b7280",
        fontSize: "14px",
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h3
                    style={{
                        margin: 0,
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#1f2937",
                    }}
                >
                    Đánh giá sản phẩm
                </h3>
                <span style={{ color: "#6b7280", fontSize: "16px" }}>
                    ({fakeComments.length} đánh giá)
                </span>
            </div>

            {/* Comment Form */}
            <div style={formStyle}>
                <div style={formHeaderStyle}>
                    <Avatar
                        size={40}
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
                    />
                    <div style={userInfoStyle}>
                        <span style={nameStyle}>Bạn chưa đăng nhập</span>
                        <span style={emailStyle}>
                            Vui lòng đăng nhập để bình luận
                        </span>
                    </div>
                </div>

                <div style={ratingSectionStyle}>
                    <label style={labelStyle}>Đánh giá của bạn:</label>
                    <Rate value={newRating} onChange={setNewRating} />
                </div>

                <TextArea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                    rows={4}
                    maxLength={500}
                />

                <div style={formActionsStyle}>
                    <Button
                        onClick={() => {
                            setNewComment("");
                            setNewRating(5);
                        }}
                    >
                        Hủy
                    </Button>
                    <Button
                        type="primary"
                        icon={<SendOutlined />}
                        onClick={handleSubmitComment}
                        disabled={!newComment.trim()}
                    >
                        Gửi đánh giá
                    </Button>
                </div>
            </div>

            <Divider />

            {/* Comments List */}
            {fakeComments.map((comment, index) => (
                <div
                    key={comment.id}
                    style={{
                        ...commentItemStyle,
                        ...(index === fakeComments.length - 1
                            ? { borderBottom: "none" }
                            : {}),
                    }}
                >
                    <div style={commentMainStyle}>
                        <Avatar size={40} src={comment.avatar} />
                        <div style={commentContentStyle}>
                            <div style={commentAuthorStyle}>
                                <span style={authorNameStyle}>
                                    {comment.author}
                                </span>
                                <span style={timeStyle}>{comment.time}</span>
                                {comment.verified && (
                                    <span style={verifiedStyle}>
                                        ✓ Đã mua hàng
                                    </span>
                                )}
                            </div>

                            <div style={commentRatingStyle}>
                                <Rate disabled value={comment.rating} />
                            </div>

                            <div style={commentTextStyle}>{comment.text}</div>

                            <div style={commentActionsStyle}>
                                <div
                                    style={
                                        likedComments.has(comment.id)
                                            ? actionBtnLikedStyle
                                            : actionBtnStyle
                                    }
                                    onClick={() => handleLike(comment.id)}
                                >
                                    <LikeOutlined />
                                    <span>
                                        Hữu ích (
                                        {comment.likes +
                                            (likedComments.has(comment.id)
                                                ? 1
                                                : 0)}
                                        )
                                    </span>
                                </div>

                                <div style={actionBtnStyle}>
                                    <MessageOutlined />
                                    <span>Trả lời</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                        <div style={replySectionStyle}>
                            {comment.replies.map((reply) => (
                                <div key={reply.id} style={replyItemStyle}>
                                    <Avatar size={32} src={reply.avatar} />
                                    <div style={replyContentStyle}>
                                        <div style={replyAuthorStyle}>
                                            {reply.author}
                                        </div>
                                        <div style={replyTextStyle}>
                                            {reply.text}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CommentComponent;
