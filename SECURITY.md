# Chính sách Bảo mật

Cảm ơn bạn đã giúp cải thiện tính bảo mật cho `wuxia`.

## Phạm vi Hỗ trợ

Dự án hiện tại đang trong giai đoạn phát triển liên tục, theo mặc định chỉ bảo trì phiên bản mainline mới nhất. Nếu bạn phát hiện vấn đề bảo mật, vui lòng tái tạo lỗi trên code hoặc phiên bản deploy mới nhất trước khi báo cáo.

## Cách Báo cáo Vấn đề Bảo mật

Vui lòng KHÔNG tiết lộ chi tiết lỗ hổng bảo mật nghiêm trọng trong Issue công khai.

Thứ tự ưu tiên:

1. Ưu tiên sử dụng tính năng báo cáo bảo mật riêng tư của GitHub (nếu repository đã bật).
2. Nếu repository chưa bật tính năng báo cáo riêng tư, vui lòng liên hệ riêng với maintainer qua trang cá nhân và nêu rõ mức độ ảnh hưởng.
3. Nếu bạn chỉ có thể tạo Issue công khai, vui lòng chỉ mô tả hiện tượng và tác động, không đính kèm PoC, key, token hoặc dữ liệu nhạy cảm có thể bị khai thác trực tiếp.

## Thông tin Nên Bao gồm

- Loại lỗ hổng và phạm vi ảnh hưởng
- Các bước tái tạo
- Điều kiện kích hoạt
- Module, file hoặc API bị ảnh hưởng
- Có liên quan đến rò rỉ dữ liệu, leo thang quyền, thực thi từ xa hoặc lộ thông tin xác thực không
- Hướng khắc phục đề xuất (nếu có)

## Mục tiêu Phản hồi

- Xác nhận trong vòng `72` giờ
- Đưa ra kết luận sơ bộ hoặc tiến độ khắc phục trong vòng `14` ngày
- Sau khi hoàn thành khắc phục, sẽ phối hợp công bố chi tiết

Các mục tiêu thời gian này là nỗ lực hết sức, không tạo ràng buộc bắt buộc, nhưng maintainer sẽ cố gắng duy trì liên lạc.

## Các Vấn đề Quan tâm Điển hình

Những vấn đề sau đặc biệt đáng báo cáo ưu tiên:

- Khuyết tật xác thực liên quan đến OAuth, Token, đồng bộ repo riêng
- Các vấn đề có thể dẫn đến rò rỉ save, cài đặt hoặc tài nguyên hình ảnh
- Chuyển tiếp request tùy ý, bypass đường dẫn hoặc thiếu xác thực upload/download có thể bị khai thác
- Lỗ hổng ảnh hưởng đến bảo mật dữ liệu cục bộ của người dùng hoặc tính toàn vẹn của quy trình khôi phục

## Không Nên gửi Công khai

- Access token thực, client secret, địa chỉ repo cá nhân
- Các tài liệu tái tạo chứa nội dung save riêng tư của người dùng
- Mã exploit hoàn chỉnh có thể trực tiếp tái tạo cuộc tấn công

Cảm ơn bạn đã chọn cách báo cáo có trách nhiệm.