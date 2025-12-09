const Product = require('../models/ProductModel');

exports.getAIResponseWithContext = async (message, context) => {
  const lowerMsg = message.toLowerCase();
  // Trả lời cho câu hỏi về thời gian giao hàng
  if (lowerMsg.includes('thời gian giao hàng')) {
    return 'Thời gian giao hàng dự kiến từ 2-5 ngày làm việc tùy khu vực.';
  }
  // Trả lời cho câu hỏi về kiểm tra tình trạng đơn hàng
  if (lowerMsg.includes('kiểm tra tình trạng đơn hàng')) {
    return "Bạn có thể kiểm tra tình trạng đơn hàng trong mục 'Đơn hàng của tôi' sau khi đăng nhập.";
  }
  // Nếu người dùng hỏi về sản phẩm, trả về danh sách sản phẩm
  if (
    lowerMsg.includes('sản phẩm') ||
    lowerMsg.includes('có những sản phẩm') ||
    lowerMsg.includes('giới thiệu sản phẩm')
  ) {
    const products = await Product.find({}, 'name price');
    if (products.length === 0) {
      return 'Hiện tại chưa có sản phẩm nào trong hệ thống.';
    }
    const productList = products.map(p => `- ${p.name} (Giá: ${p.price}đ)`).join('\n');
    return `Các sản phẩm hiện có:\n${productList}`;
  }
  // Tích hợp OpenAI hoặc AI khác với ngữ cảnh
  // Hiện tại trả về phản hồi mẫu
  return `Đây là phản hồi từ AI cho: ${message} với ngữ cảnh: ${context}`;
};

exports.getAIResponse = async (message) => {
  // Gọi hàm với context rỗng để tương thích với controller
  return exports.getAIResponseWithContext(message, '');
};