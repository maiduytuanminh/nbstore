import React, { useState } from "react";
import { Avatar, Button, Input, Rate, Divider } from "antd";
import {
    LikeOutlined,
    DislikeOutlined,
    ReplyOutlined,
    SendOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const { TextArea } = Input;

const CommentContainer = styled.div`
    background: var(--white);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow-sm);
`;

const CommentHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-lg);

    h3 {
        margin: 0;
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        color: var(--text-primary);
    }

    .comment-count {
        color: var(--text-secondary);
        font-size: var(--font-size-base);
    }
`;

const CommentForm = styled.div`
    margin-bottom: var(--spacing-lg);

    .form-header {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-md);

        .user-info {
            display: flex;
            flex-direction: column;

            .name {
                font-weight: var(--font-weight-medium);
                color: var(--text-primary);
                font-size: var(--font-size-base);
            }

            .email {
                color: var(--text-secondary);
                font-size: var(--font-size-sm);
            }
        }
    }

    .rating-section {
        margin-bottom: var(--spacing-md);

        label {
            display: block;
            margin-bottom: var(--spacing-xs);
            font-weight: var(--font-weight-medium);
            color: var(--text-primary);
        }
    }

    .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: var(--spacing-sm);
        margin-top: var(--spacing-md);
    }
`;

const CommentItem = styled.div`
    padding: var(--spacing-md) 0;
    border-bottom: 1px solid var(--border-color);

    &:last-child {
        border-bottom: none;
    }

    .comment-main {
        display: flex;
        gap: var(--spacing-md);

        .comment-content {
            flex: 1;

            .comment-author {
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);
                margin-bottom: var(--spacing-xs);

                .name {
                    font-weight: var(--font-weight-semibold);
                    color: var(--text-primary);
                    font-size: var(--font-size-base);
                }

                .time {
                    color: var(--text-secondary);
                    font-size: var(--font-size-sm);
                }

                .verified {
                    background: var(--green-100);
                    color: var(--green-700);
                    padding: 2px 6px;
                    border-radius: var(--radius-sm);
                    font-size: var(--font-size-xs);
                    font-weight: var(--font-weight-medium);
                }
            }

            .comment-rating {
                margin-bottom: var(--spacing-xs);
            }

            .comment-text {
                color: var(--text-primary);
                line-height: var(--line-height-relaxed);
                margin-bottom: var(--spacing-sm);
                font-size: var(--font-size-base);
            }

            .comment-actions {
                display: flex;
                align-items: center;
                gap: var(--spacing-md);

                .action-btn {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-xs);
                    color: var(--text-secondary);
                    cursor: pointer;
                    font-size: var(--font-size-sm);
                    transition: all 0.3s ease;

                    &:hover {
                        color: var(--primary-color);
                    }

                    &.liked {
                        color: var(--primary-color);
                    }
                }
            }
        }
    }

    .reply-section {
        margin-left: calc(40px + var(--spacing-md));
        margin-top: var(--spacing-md);

        .reply-item {
            display: flex;
            gap: var(--spacing-sm);
            margin-bottom: var(--spacing-md);

            .reply-content {
                flex: 1;
                background: var(--gray-50);
                padding: var(--spacing-sm);
                border-radius: var(--radius-md);

                .reply-author {
                    font-weight: var(--font-weight-medium);
                    color: var(--text-primary);
                    font-size: var(--font-size-sm);
                    margin-bottom: var(--spacing-xs);
                }

                .reply-text {
                    color: var(--text-secondary);
                    font-size: var(--font-size-sm);
                }
            }
        }
    }
`;

const FakeCommentComponent = () => {
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
            // Simulate adding comment
            console.log("New comment:", {
                text: newComment,
                rating: newRating,
            });
            setNewComment("");
            setNewRating(5);
        }
    };

    return (
        <CommentContainer>
            <CommentHeader>
                <h3>Đánh giá sản phẩm</h3>
                <span className="comment-count">
                    ({fakeComments.length} đánh giá)
                </span>
            </CommentHeader>

            {/* Comment Form */}
            <CommentForm>
                <div className="form-header">
                    <Avatar
                        size={40}
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
                    />
                    <div className="user-info">
                        <span className="name">Bạn chưa đăng nhập</span>
                        <span className="email">
                            Vui lòng đăng nhập để bình luận
                        </span>
                    </div>
                </div>

                <div className="rating-section">
                    <label>Đánh giá của bạn:</label>
                    <Rate value={newRating} onChange={setNewRating} />
                </div>

                <TextArea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                    rows={4}
                    maxLength={500}
                />

                <div className="form-actions">
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
            </CommentForm>

            <Divider />

            {/* Comments List */}
            {fakeComments.map((comment) => (
                <CommentItem key={comment.id}>
                    <div className="comment-main">
                        <Avatar size={40} src={comment.avatar} />
                        <div className="comment-content">
                            <div className="comment-author">
                                <span className="name">{comment.author}</span>
                                <span className="time">{comment.time}</span>
                                {comment.verified && (
                                    <span className="verified">
                                        ✓ Đã mua hàng
                                    </span>
                                )}
                            </div>

                            <div className="comment-rating">
                                <Rate disabled value={comment.rating} />
                            </div>

                            <div className="comment-text">{comment.text}</div>

                            <div className="comment-actions">
                                <div
                                    className={`action-btn ${
                                        likedComments.has(comment.id)
                                            ? "liked"
                                            : ""
                                    }`}
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

                                <div className="action-btn">
                                    <ReplyOutlined />
                                    <span>Trả lời</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                        <div className="reply-section">
                            {comment.replies.map((reply) => (
                                <div key={reply.id} className="reply-item">
                                    <Avatar size={32} src={reply.avatar} />
                                    <div className="reply-content">
                                        <div className="reply-author">
                                            {reply.author}
                                        </div>
                                        <div className="reply-text">
                                            {reply.text}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CommentItem>
            ))}
        </CommentContainer>
    );
};

export default FakeCommentComponent;
