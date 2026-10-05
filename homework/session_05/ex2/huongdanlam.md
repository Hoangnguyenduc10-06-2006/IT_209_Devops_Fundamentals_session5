# Hướng Dẫn Thực Hành & Nộp Bài: Session 05 - Exercise 2

> **Chủ đề:** Tối Ưu Lịch Sử Commit Bằng Git Interactive Rebase (`git rebase -i`), Gộp Commit (`squash`) & Xóa Bỏ Tệp Rác (`drop`)  
> **Thư mục bài nộp trên GitHub:** `homework/session_05/ex2/`  
> **Tệp báo cáo chính:** `README.md`  
> **Hình ảnh minh chứng:** `interactive_rebase_editor.jpg` và `git_log_clean.jpg`

---

## 1. Tóm Tắt Quy Trình Đã Thực Hiện

Hệ thống đã tự động thiết lập và thực thi đầy đủ toàn bộ kịch bản bài tập:

```
[Trước Rebase - 4 Commit Vụn Vặt]:
(a0ba64c) Base 
   \
    ---> (2fd2267) feat: khoi tao module auth (Tạo auth.js)
    ---> (c8608b8) fix typo (Sửa auth.js)
    ---> (6e16c44) adds utility functions (Sửa auth.js)
    ---> (f9e8b53) add temp file for debug (Tạo temp.txt)

[Sau Rebase - Cấu Hình: pick -> squash -> squash -> drop]:
(a0ba64c) Base 
   \
    ---> (78e7112) feat: hoan thien module authentication
                   (auth.js hoàn chỉnh, temp.txt bị xóa vĩnh viễn)
```

1. **Khởi tạo repository cục bộ:** Nhánh chính `main` với commit ban đầu `a0ba64c`.
2. **Tạo nhánh tính năng `feature/auth-module`:**
   - Commit 1 (`2fd2267`): Tạo `auth.js` -> `feat: khoi tao module auth`
   - Commit 2 (`c8608b8`): Sửa lỗi cú pháp trong `auth.js` -> `fix typo`
   - Commit 3 (`6e16c44`): Bổ sung hàm tiện ích vào `auth.js` -> `adds utility functions`
   - Commit 4 (`f9e8b53`): Tạo file tạm `temp.txt` -> `add temp file for debug`
3. **Kích hoạt Interactive Rebase lùi 4 commit:**
   - Lệnh: `git rebase -i HEAD~4`
4. **Cấu hình bảng Interactive Todo List:**
   - Dòng 1 (`2fd2267`): Giữ nguyên `pick`
   - Dòng 2 (`c8608b8`): Đổi thành `squash` (hoặc `s`)
   - Dòng 3 (`6e16c44`): Đổi thành `squash` (hoặc `s`)
   - Dòng 4 (`f9e8b53`): Đổi thành `drop` (hoặc `d`)
5. **Cập nhật thông điệp commit sau khi gộp:**
   - Soạn thảo thông điệp: `feat: hoan thien module authentication`
6. **Kiểm tra và nghiệm thu:**
   - `git log --oneline` -> hiển thị duy nhất 1 commit sạch sẽ cho tính năng.
   - `temp.txt` biến mất hoàn toàn, `auth.js` được bảo toàn toàn vẹn.
   - Đồng bộ nhanh (`fast-forward`) về nhánh `main`.

---

## 2. Hướng Dẫn Tự Làm Lại Bằng Tay (Manual Practice Guide)

Nếu bạn muốn tự tay thực hành lại các thao tác này trong Terminal cá nhân:

### Bước 1: Mở PowerShell tại thư mục bài tập
```powershell
cd "E:\[IT-209]_Devops_Fundamentals\btvn\session05"
```

### Bước 2: Chạy lệnh Interactive Rebase
```bash
git rebase -i HEAD~4
```

*Mẹo cấu hình trình soạn thảo cho Git nếu bạn chưa quen Vim:*
```bash
# Cấu hình VS Code làm trình soạn thảo cho Git:
git config --global core.editor "code --wait"

# Hoặc cấu hình Notepad làm trình soạn thảo mặc định:
git config --global core.editor "notepad"
```

### Bước 3: Trong trình soạn thảo mở ra
Sửa nội dung 4 dòng đầu tiên thành:
```text
pick 2fd2267 feat: khoi tao module auth
squash c8608b8 fix typo
squash 6e16c44 adds utility functions
drop f9e8b53 add temp file for debug
```
Lưu tệp và đóng trình soạn thảo lại.

### Bước 4: Soạn thảo thông điệp commit
Git sẽ tự động mở cửa sổ thứ hai yêu cầu nhập commit message cho commit gộp. Bạn xóa hết nội dung cũ và nhập:
```text
feat: hoan thien module authentication
```
Lưu tệp và đóng trình soạn thảo. Git sẽ thông báo hoàn thành rebase thành công!

---

## 3. Hướng Dẫn Đẩy Code Lên GitHub Để Nộp Bài

### Bước 1: Tạo Repository mới trên GitHub
1. Truy cập https://github.com/new
2. Đặt tên repository: `IT_209_Devops_Fundamentals_session5`
3. Chọn chế độ **Public**
4. **Không** tích chọn "Add a README file" (vì mã nguồn đã có sẵn trên máy bạn).

### Bước 2: Liên kết remote và đẩy code
Mở PowerShell tại `E:\[IT-209]_Devops_Fundamentals\btvn\session05`:

```bash
# Thêm remote origin
git remote add origin https://github.com/Hoangnguyenduc10-06-2006/IT_209_Devops_Fundamentals_session5.git

# Đẩy nhánh main lên GitHub
git push -u origin main

# (Tùy chọn) Đẩy cả nhánh feature lên GitHub
git push origin feature/auth-module
```

---

## 4. Nội Dung Nộp Bài Trên Hệ Thống LMS

Khi nộp bài, bạn gửi các thông tin sau:
1. **Đường dẫn thư mục GitHub:**  
   `https://github.com/Hoangnguyenduc10-06-2006/IT_209_Devops_Fundamentals_session5/tree/main/homework/session_05/ex2/`
2. **Đường dẫn tệp README.md:**  
   `https://github.com/Hoangnguyenduc10-06-2006/IT_209_Devops_Fundamentals_session5/blob/main/homework/session_05/ex2/README.md`
3. **Ảnh minh chứng đính kèm:**  
   - `interactive_rebase_editor.jpg` (Ảnh chụp cấu hình `pick`, `squash`, `drop`).
   - `git_log_clean.jpg` (Ảnh chụp log lịch sử sạch sẽ `git log --oneline`).
