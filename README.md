# Landing Page SiaTruong.com - The Reels Editing Engine

Giao diện landing page cao cấp phong cách Editorial chuẩn theo mẫu [thestartupmom.com](https://www.thestartupmom.com/), được Việt hóa 100% và tối ưu cho tên miền **siatruong.com**.

---

## 1. Xem Thử Ngay Trên Máy Tính
- Mở file `index.html` bằng bất kỳ trình duyệt nào (Google Chrome, Cốc Cốc, Edge).
- Trang web hoàn toàn độc lập, tải cực nhanh, tương thích hoàn hảo cả trên điện thoại lẫn máy tính.

---

## 2. Cách Đưa Lên Mạng Hoàn Toàn Miễn Phí (Trong 2 Phút)

### Cách đơn giản nhất: Dùng Netlify Drop (Không cần cài phần mềm)
1. Truy cập: [https://app.netlify.com/drop](https://app.netlify.com/drop) (đăng ký tài khoản miễn phí nếu chưa có).
2. Kéo thả thư mục `SiaTruong` này vào ô upload trên trình duyệt.
3. Sau 5 giây, trang web của bạn sẽ có một đường link hoạt động trực tiếp trên Internet.

---

## 3. Cách Trỏ Tên Miền siatruong.com Vào Trang Web

1. Đăng nhập vào hệ thống quản lý DNS: [https://zonedns.vn](https://zonedns.vn)
   - Tên miền: `siatruong.com`
   - Mật khẩu: (mật khẩu nhận được qua email)
2. Thêm 2 bản ghi DNS (DNS Records):
   - **Bản ghi 1 (Trỏ tên miền chính):**
     - Loại bản ghi (Type): `A`
     - Tên bản ghi (Host / Name): `@`
     - Giá trị (Points to / Value): `75.2.60.5` *(IP của Netlify)* hoặc IP máy chủ hosting của bạn.
   - **Bản ghi 2 (Trỏ tên miền có www):**
     - Loại bản ghi (Type): `CNAME`
     - Tên bản ghi (Host / Name): `www`
     - Giá trị (Points to / Value): `<dia-chi-web-netlify-cua-ban>.netlify.app`
3. Đợi từ 5 - 15 phút để DNS cập nhật toàn cầu, truy cập `https://siatruong.com` là trang web sẽ hiện lên!
