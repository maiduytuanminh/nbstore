export const sendMessageToAI = async (message) => {
  return "Đây là phản hồi từ AI cho: " + message;
};

export const getAIResponse = async (message) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/ai/response`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return 'Đã xảy ra lỗi khi lấy phản hồi từ AI.';
  }
}