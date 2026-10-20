# Host Business AI Lab trên server lab

Tên miền: `bailab.neu.edu.vn`. Website tĩnh Jekyll chạy qua PM2, không chạy Jekyll development server ngoài mạng.

## Điểm kết nối cho quản trị mạng trường

| Mục | Giá trị |
| --- | --- |
| Server LAN | `172.17.17.50` |
| Gateway LAN | `172.17.17.254` |
| HTTP backend | `http://172.17.17.50:8080` (TCP) |
| Tên miền / Host header | `bailab.neu.edu.vn` |
| IP public outbound quan sát ngày 19/10/2026 | `14.0.20.157` — cần quản trị xác nhận khả năng nhận inbound |
| DNS A hiện quan sát | `185.199.108.153` — vẫn trỏ GitHub Pages |

Nếu trường có reverse proxy: cấu hình TLS cho `bailab.neu.edu.vn`, chuyển tiếp đến `http://172.17.17.50:8080`, và trỏ DNS A/AAAA về proxy. Proxy phải có đường mạng đến LAN này. Có thể dùng `nginx-academic.conf.example` làm phần HTTP backend; khối TLS cần cấu hình bằng chứng chỉ của trường.

Nếu dùng NAT trực tiếp: xác nhận IP public inbound tĩnh của router, trỏ DNS A về IP đó, forward TCP 80 đến `172.17.17.50:8080` cho HTTP. HTTPS cần reverse proxy kết thúc TLS và chứng chỉ hợp lệ; **không** forward TCP 443 đến cổng HTTP 8080. Cổng 8080 không cần ghi trong URL tên miền khi proxy/NAT tiếp nhận cổng chuẩn. Kiểm tra/xóa AAAA cũ nếu không dùng IPv6. Không đổi NS trừ khi quản trị DNS yêu cầu.

Giữ IP LAN cố định/reservation. Nếu có firewall server, cho phép TCP 8080 từ proxy/LAN theo mô hình đã chọn. Cấu hình DNS, NAT và TLS ngoài server chưa được thực hiện trong phiên này vì chưa có quyền quản trị các hệ thống đó.

## Vận hành trên server hiện tại

```bash
cd /home/cuongvng/lab-server/business-ai-lab.github.io
export PATH="$PWD/.runtime/ruby/bin:$PWD/.runtime/node/bin:$PATH"
node_modules/.bin/pm2 status
node_modules/.bin/pm2 logs bailab-web --lines 50
bash scripts/deploy.sh
```

Sau khi sửa nội dung hoặc cập nhật code, chạy `bash scripts/deploy.sh`. Script build toàn bộ Jekyll sang release mới rồi đổi symlink `deploy/current`, khởi động lại app và lưu PM2. Build lỗi trước bước đổi symlink giữ nguyên bản đang phục vụ. Release cũ được giữ để rollback; theo dõi dung lượng và xóa release cũ khi không cần nữa.

Ruby 3.3.10 và Node 22.23.3 được cài riêng trong `.runtime/`; dependencies Ruby ở `vendor/bundle`, dependencies Node khóa bằng `package-lock.json`. Các thư mục runtime không đưa lên Git. Khi thay đổi dependencies, dùng `npm ci` và `bundle install` với PATH ở trên, sau đó deploy lại.

## Tự khôi phục

PM2 cấu hình `autorestart`, chờ 3 giây khi tiến trình dừng, giới hạn RAM 256 MB. `pm2 save` lưu danh sách tiến trình. Dịch vụ hệ thống `cron` đã active/enabled; crontab tài khoản `cuongvng` chạy `scripts/restore.sh` bằng `@reboot` để gọi `pm2 resurrect`. Không phụ thuộc đăng nhập SSH hay shell profile.

```bash
crontab -l
systemctl is-active cron
systemctl is-enabled cron
cat .runtime/boot.log
curl --fail http://172.17.17.50:8080/
```

Đã kiểm tra phục hồi sau khi kill tiến trình web và phục hồi toàn bộ PM2 bằng môi trường tối giản tương tự cron. Chưa reboot máy thật để tránh gián đoạn các công việc khác trên server. Không cài thêm PM2 systemd song song với cron nếu chưa loại bỏ một trong hai cơ chế.

Log web: `.runtime/web-out.log`, `.runtime/web-error.log`. Log boot: `.runtime/boot.log`. Định kỳ kiểm tra dung lượng log.

Tài liệu PM2: https://pm2.keymetrics.io/docs/usage/startup/
