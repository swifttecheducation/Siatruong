// Cấu hình Database Webhook (Google Sheets App Script URL)
window.SIA_WEBHOOK_URL = window.SIA_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbyraE7l3L_-uBaHGzKbDgjHZW6jRBpVyJdYeGpgQDeVGyG0BPSKGTZgh2IuzFJQEE38/exec';

/**
 * Gửi dữ liệu khách hàng vào Google Sheets Database và lưu dự phòng
 * @param {Object} data - { name, email, phone, referral_by, product, note, type }
 */
async function submitToDatabase(data) {
  const prod = data.product || 'Xưởng Dựng Rảnh Tay';
  const inferredType = data.type || (prod.toLowerCase().includes('quà') ? 'freebie' : (prod.toLowerCase().includes('liên hệ') ? 'contact' : 'order'));
  const payload = {
    timestamp: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
    type: inferredType,
    name: data.name || '',
    email: data.email || '',
    phone: data.phone || '',
    referral_by: data.referral_by || data.referralCode || data.ref || '',
    product: prod,
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
    if (payload.referral_by) {
      localStorage.setItem('sia_order_ref', payload.referral_by);
    }
  } catch(e) {}

  // 2. Gửi về Google Sheets Webhook
  if (window.SIA_WEBHOOK_URL && window.SIA_WEBHOOK_URL.startsWith('http')) {
    try {
      await fetch(window.SIA_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        keepalive: true,
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
