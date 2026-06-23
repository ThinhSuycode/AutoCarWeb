export const resetPasswordTemplate = (username: string, link: string) => `
<div
  style="
    max-width:600px;
    margin:0 auto;
    padding:32px;
    font-family:Arial, Helvetica, sans-serif;
    background:#ffffff;
    border:1px solid #e5e7eb;
    border-radius:12px;
  "
>
  <h1
    style="
      color:#dc2626;
      margin-bottom:24px;
      text-align:center;
    "
  >
    AutoCar Viet
  </h1>

  <h2 style="color:#111827;">
    Xin chào ${username},
  </h2>

  <p
    style="
      color:#4b5563;
      line-height:1.8;
      margin-top:16px;
    "
  >
    Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn tại
    <strong>AutoCar Viet</strong>.
  </p>

  <p
    style="
      color:#4b5563;
      line-height:1.8;
    "
  >
    Để tiếp tục quá trình đặt lại mật khẩu, vui lòng nhấn vào nút bên dưới:
  </p>

  <div style="text-align:center;margin:32px 0;">
    <a
      href="${link}"
      style="
        background:#dc2626;
        color:#ffffff;
        text-decoration:none;
        padding:14px 28px;
        border-radius:8px;
        display:inline-block;
        font-weight:600;
      "
    >
      Đặt lại mật khẩu
    </a>
  </div>

  <p
    style="
      color:#6b7280;
      line-height:1.8;
    "
  >
    Hoặc sao chép liên kết dưới đây và dán vào trình duyệt:
  </p>

  <p
    style="
      word-break:break-all;
      background:#f9fafb;
      padding:12px;
      border-radius:6px;
      color:#2563eb;
    "
  >
    ${link}
  </p>

  <hr
    style="
      margin:24px 0;
      border:none;
      border-top:1px solid #e5e7eb;
    "
  />

  <p
    style="
      color:#dc2626;
      font-weight:600;
    "
  >
    Lưu ý bảo mật:
  </p>

  <p
    style="
      color:#6b7280;
      line-height:1.8;
    "
  >
    Liên kết này chỉ có hiệu lực trong vòng
    <strong>15 phút</strong>.
  </p>

  <p
    style="
      color:#6b7280;
      line-height:1.8;
    "
  >
    Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.
    Tài khoản của bạn sẽ không bị thay đổi.
  </p>

  <div
    style="
      margin-top:32px;
      color:#6b7280;
      line-height:1.8;
    "
  >
    Trân trọng,<br />
    <strong>Đội ngũ AutoCar Viet</strong><br />
    Hệ thống quản lý và tư vấn xe ô tô.
  </div>
</div>
`;
