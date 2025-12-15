import React, { useState, useEffect, useRef } from 'react';
import { createDialogflowSession, sendDialogflowMessage } from '../../services/DialogflowService';
import '../../styles/chatbox.css';

const SUGGESTIONS = [
    'Tôi muốn tìm sản phẩm',
    'Kiểm tra đơn hàng của tôi',
    'Thời gian giao hàng là bao lâu?',
    'Chính sách đổi trả như thế nào?',
];

const ChatBoxDialogflow = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef(null);

    // Tự động scroll đến tin nhắn mới nhất
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Khởi tạo session khi component mount
    useEffect(() => {
        initializeSession();
    }, []);

    const initializeSession = async () => {
        try {
            const response = await createDialogflowSession();
            if (response.status === 'OK') {
                setSessionId(response.data.sessionId);
                // Thêm tin nhắn chào mừng
                setMessages([{
                    sender: 'bot',
                    text: response.data.welcomeMessage,
                    timestamp: new Date(),
                }]);
            }
        } catch (error) {
            console.error('Error initializing session:', error);
            // Fallback message
            setMessages([{
                sender: 'bot',
                text: 'Xin chào! Tôi có thể giúp bạn về sản phẩm, đơn hàng, hoặc giao hàng. Bạn cần hỗ trợ gì ạ?',
                timestamp: new Date(),
            }]);
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = {
            sender: 'user',
            text: input.trim(),
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await sendDialogflowMessage(userMessage.text, sessionId);

            if (response.status === 'OK') {
                const botMessage = {
                    sender: 'bot',
                    text: response.data.response,
                    timestamp: new Date(),
                    intent: response.data.intent,
                    confidence: response.data.confidence,
                };
                setMessages(prev => [...prev, botMessage]);
            } else {
                throw new Error('Failed to get response');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = {
                sender: 'bot',
                text: 'Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại sau.',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        }

        setLoading(false);
    };

    const handleSuggestionClick = async (suggestion) => {
        setInput('');
        const userMessage = {
            sender: 'user',
            text: suggestion,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setLoading(true);

        try {
            const response = await sendDialogflowMessage(suggestion, sessionId);

            if (response.status === 'OK') {
                const botMessage = {
                    sender: 'bot',
                    text: response.data.response,
                    timestamp: new Date(),
                    intent: response.data.intent,
                    confidence: response.data.confidence,
                };
                setMessages(prev => [...prev, botMessage]);
            }
        } catch (error) {
            console.error('Error with suggestion:', error);
            const errorMessage = {
                sender: 'bot',
                text: 'Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại sau.',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        }

        setLoading(false);
    };

    const formatTime = (timestamp) => {
        return timestamp.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (!isOpen) {
        return (
            <div className="chatbox-toggle" onClick={() => setIsOpen(true)}>
                💬
            </div>
        );
    }

    return (
        <div className="chatbox">
            <div className="chatbox-header">
                <div className="chatbox-title">
                    <div className="chatbox-avatar">🤖</div>
                    <div>
                        <div className="chatbox-name">AI Assistant</div>
                        <div className="chatbox-status">Đang trực tuyến</div>
                    </div>
                </div>
                <button className="chatbox-close" onClick={() => setIsOpen(false)}>
                    ✕
                </button>
            </div>

            <div className="chatbox-suggestions">
                {messages.length <= 1 && SUGGESTIONS.map((suggestion, idx) => (
                    <button
                        key={idx}
                        className="chatbox-suggestion"
                        onClick={() => handleSuggestionClick(suggestion)}
                        disabled={loading}
                    >
                        {suggestion}
                    </button>
                ))}
            </div>

            <div className="chatbox-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`chatbox-message ${msg.sender}`}>
                        <div className="message-content">
                            {msg.text}
                        </div>
                        <div className="message-time">
                            {formatTime(msg.timestamp)}
                        </div>
                        {msg.intent && msg.confidence && (
                            <div className="message-debug">
                                Intent: {msg.intent} ({Math.round(msg.confidence * 100)}%)
                            </div>
                        )}
                    </div>
                ))}
                {loading && (
                    <div className="chatbox-message bot">
                        <div className="message-content">
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="chatbox-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    disabled={loading}
                />
                <button onClick={handleSend} disabled={loading || !input.trim()}>
                    {loading ? '...' : '➤'}
                </button>
            </div>
        </div>
    );
};

export default ChatBoxDialogflow;
