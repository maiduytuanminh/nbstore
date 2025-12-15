import React, { useState } from 'react';
import { getAIResponse } from '../../services/AiService';
import '../../styles/chatbox.css';

const SUGGESTIONS = [
    'sản phẩm',
    'Thời gian giao hàng dự kiến là bao lâu?',
    'Làm sao để kiểm tra tình trạng đơn hàng?',
];

const ChatBox = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input) return;

        const userMessage = { sender: 'user', text: input };
        setMessages((prev) => [...prev, userMessage]);

        setInput('');
        setLoading(true);

        try {
            const response = await getAIResponse(userMessage.text);
            const botMessage = { sender: 'ai', text: response };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            setMessages((prev) => [...prev, { sender: 'ai', text: 'Đã xảy ra lỗi khi lấy phản hồi từ AI.' }]);
        }

        setLoading(false);
    };

    const handleSuggestionClick = async (suggestion) => {
        setInput('');
        const userMessage = { sender: 'user', text: suggestion };
        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);
        try {
            const response = await getAIResponse(suggestion);
            const botMessage = { sender: 'ai', text: response };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            setMessages((prev) => [...prev, { sender: 'ai', text: 'Đã xảy ra lỗi khi lấy phản hồi từ AI.' }]);
        }
        setLoading(false);
    };

    return (
        <div className="chatbox">
            <div className="chatbox-suggestions">
                {SUGGESTIONS.map((q, idx) => (
                    <button key={idx} className="chatbox-suggestion" onClick={() => handleSuggestionClick(q)}>
                        {q}
                    </button>
                ))}
            </div>
            <div className="chatbox-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`chatbox-message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
                {loading && <div className="chatbox-message ai">Đang trả lời...</div>}
            </div>
            <div className="chatbox-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend} disabled={loading}>Gửi</button>
            </div>
        </div>
    );
};

export default ChatBox;