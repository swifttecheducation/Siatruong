// Cấu hình Database Webhook (Google Sheets App Script URL)
window.SIA_WEBHOOK_URL = window.SIA_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbyraE7l3L_-uBaHGzKbDgjHZW6jRBpVyJdYeGpgQDeVGyG0BPSKGTZgh2IuzFJQEE38/exec';

/**
 * Gửi dữ liệu khách hàng vào Google Sheets Database và lưu dự phòng
 * @param {Object} data - { name, email, phone, product, note }
 */
async function submitToDatabase(data) {
  const payload = {
    timestamp: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
    name: data.name || '',
    email: data.email || '',
    phone: data.phone || '',
    product: data.product || 'Xưởng Dựng Rảnh Tay',
    note: data.note || ''
  };

  // 1. Lưu dự phòng vào LocalStorage
  try {
    const history = JSON.parse(localStorage.getItem('sia_customer_records') || '[]');
    history.unshift(payload);
    localStorage.setItem('sia_customer_records', JSON.stringify(history));
    localStorage.setItem('sia_order_name', payload.name);
    localStorage.setItem('sia_order_email', payload.email);
    localStorage.setItem('sia_order_phone', payload.phone);
  } catch(e) {}

  // 2. Gửi về Google Sheets Webhook
  if (window.SIA_WEBHOOK_URL && window.SIA_WEBHOOK_URL.startsWith('http')) {
    try {
      await fetch(window.SIA_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });
    } catch(err) {
      console.warn('Lỗi gửi webhook, data đã lưu an toàn ở browser:', err);
    }
  }
  return true;
}
