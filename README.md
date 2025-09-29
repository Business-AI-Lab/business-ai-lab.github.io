# Business AI Lab Website

Website chính thức của Business AI Lab - trực thuộc Trường Đại học Kinh tế Quốc dân. Website được xây dựng bằng Jekyll và GitHub Pages với CI/CD tự động.

## 🏗️ Cấu trúc dự án

### Tổng quan thư mục

```markdown
business-ai-lab.github.io/
├── _config.yml              # Cấu hình Jekyll chính
├── index.html              # Trang chủ
├── about.md               # Trang giới thiệu
├── Gemfile               # Dependencies Ruby/Jekyll
├── 
├── _layouts/            # Templates layout
│   ├── default.html    # Layout chính
│   ├── home.html      # Layout trang chủ  
│   ├── list.html      # Layout danh sách
│   ├── detail.html    # Layout chi tiết
│   └── page.html      # Layout trang đơn
│
├── _includes/          # Partial templates
│   ├── header.html
│   ├── footer.html
│   ├── card-*.html    # Card components
│   └── highlight-members.html  # Helper highlight tên thành viên
│
├── _data/             # Dữ liệu YAML
│   ├── members.yml    # Danh sách thành viên
│   ├── nav.yml        # Menu điều hướng
│   ├── partners.yml   # Đối tác
│   └── sitecopy.yml   # Nội dung tĩnh đa ngôn ngữ
│
├── _blogs/            # Bài viết blog
├── _news/             # Tin tức
├── _publications/     # Công bố khoa học  
├── _projects/         # Dự án nghiên cứu
├── _members/          # Hồ sơ thành viên
├── _careers/          # Cơ hội nghề nghiệp
├── _code/             # Tài liệu code
├── _datasets/         # Datasets
├── _gatherings/       # Sự kiện
│
├── activities/        # Trang danh sách activities
│   ├── blogs/index.md
│   └── news/index.md  
│
├── research/          # Trang nghiên cứu
│   ├── projects/index.md
│   └── publications/index.md
│
├── assets/           # Assets tĩnh
│   ├── css/theme.css # CSS chính
│   ├── js/          # JavaScript
│   └── images/      # Hình ảnh
│
└── _site/           # Build output (tự động tạo)
```

### Quy ước đặt tên file

- **Blogs**: `YYYY-MM-DD-title-slug.md`
- **News**: `YYYY-MM-DD-title-slug.md`  
- **Publications**: `YYYY-author-paper-title.md`
- **Members**: `prefix-name.md` (vd: `dr-john_doe.md`)
- **Projects**: `project-slug.md`

## 🚀 Cài đặt môi trường local

### Yêu cầu hệ thống

- **Ruby** >= 2.7.0
- **Bundler** gem
- **Git**

### Cài đặt trên macOS

```bash
# Cài đặt Ruby qua Homebrew (nếu chưa có)
brew install ruby

# Cài đặt Bundler
gem install bundler

# Clone repository
git clone https://github.com/Business-AI-Lab/business-ai-lab.github.io.git
cd business-ai-lab.github.io

# Cài đặt dependencies
bundle install
```

### Cài đặt trên Windows

```bash
# Tải và cài đặt Ruby+Devkit từ https://rubyinstaller.org/
# Sau khi cài đặt, mở Command Prompt và chạy:

gem install bundler jekyll

# Clone repository
git clone https://github.com/Business-AI-Lab/business-ai-lab.github.io.git
cd business-ai-lab.github.io

# Cài đặt dependencies  
bundle install
```

### Chạy website local

```bash
# Khởi động Jekyll server
bundle exec jekyll serve

# Hoặc với live reload
bundle exec jekyll serve --livereload

# Website sẽ chạy tại: http://localhost:4000
```

### Khắc phục lỗi thường gặp

```bash
# Nếu gặp lỗi permission trên macOS
sudo gem install bundler

# Cập nhật dependencies
bundle update

# Xóa cache và rebuild
bundle exec jekyll clean
bundle exec jekyll build
```

## ✍️ Hướng dẫn cập nhật nội dung

### 1. Thêm bài blog mới

```bash
# Tạo file mới trong _blogs/
touch _blogs/2025-01-15-new-blog-post.md
```

**Template blog:**

```yaml
---
layout: detail
title:
  en: "English Title"
  vi: "Tiêu đề tiếng Việt"  
date: 2025-01-15
author: "Tên tác giả"
thumb: "URL_hình_ảnh"
summary:
  en: "English summary"
  vi: "Tóm tắt tiếng Việt"
tags: ["tag1", "tag2"]
related_project: "project-slug"
---

Nội dung bài viết bằng Markdown...
```

### 2. Thêm tin tức mới

```bash
# Tạo file trong _news/
touch _news/2025-01-15-news-title.md
```

**Template news:**

```yaml
---
layout: detail
title:
  en: "News Title"
  vi: "Tiêu đề tin tức"
date: 2025-01-15
thumb: "URL_hình_ảnh" 
summary:
  en: "English summary"
  vi: "Tóm tắt tiếng Việt"
---

Nội dung tin tức...
```

### 3. Thêm công bố khoa học mới

```bash
# Tạo file trong _publications/
touch _publications/2025-author-paper-title.md
```

**Template publication:**

```yaml
---
layout: detail
year: 2025
venue: "Conference/Journal Name"
title: "Paper Title"
authors: ["author1-slug", "author2-slug"]
ieee: "Full IEEE citation format"
doi: "10.xxxx/xxxxx"
pdf: "URL_to_PDF"
code: "URL_to_code" 
project: "related-project-slug"
---

Chi tiết về bài báo...
```

### 4. Thêm thành viên mới

```bash
# Tạo file trong _members/
touch _members/new-member-name.md
```

**Template member:**

```yaml
---
layout: detail
name:
  en: "English Name"
  vi: "Tên tiếng Việt"
role: "Chức vụ"
profile_image: "URL_ảnh_đại_diện"
email: "email@domain.com"
web_personal: "URL_website_cá_nhân"
affiliations: ["Business AI Lab", "Institution"]
---

Giới thiệu về thành viên...
```

### 5. Cập nhật danh sách thành viên (để highlight trong publications)

Chỉnh sửa file `_includes/highlight-members.html`:

```liquid
{% assign lab_members = "T. V. Luong|Thien Van Luong|New Member Name|..." | split: "|" %}
```

Thêm tên mới vào danh sách với các format khác nhau như xuất hiện trong citations.

### Quy trình cập nhật nội dung

```bash
# 1. Tạo nhánh mới (tùy chọn)
git checkout -b feature/new-content

# 2. Thêm/chỉnh sửa nội dung
# ... thêm files mới hoặc chỉnh sửa files cũ

# 3. Kiểm tra local
bundle exec jekyll serve
# Truy cập http://localhost:4000 để xem trước

# 4. Commit changes
git add .
git commit -m "Add: new blog post about AI research"

# 5. Push lên GitHub
git push origin main
# Hoặc: git push origin feature/new-content (nếu dùng branch)

# 6. Website tự động cập nhật sau ~2-3 phút
```

### Kiểm tra build status

- Vào tab **Actions** trong GitHub repo
- Xem status của build gần nhất
- Nếu có lỗi, check logs để debug

## 🎨 Customization

### Chỉnh sửa giao diện

- **CSS**: Chỉnh sửa `assets/css/theme.css`
- **Layout**: Chỉnh sửa files trong `_layouts/`
- **Components**: Chỉnh sửa files trong `_includes/`

### Thêm ngôn ngữ mới

1. Cập nhật `_data/sitecopy.yml`
2. Thêm fields ngôn ngữ mới vào content
3. Cập nhật `_includes/lang-switcher.html`

### Cấu hình Jekyll

Chỉnh sửa `_config.yml` để:

- Thay đổi thông tin site
- Thêm plugins mới
- Cấu hình collections
- Thêm build settings

## 🐛 Troubleshooting

### Lỗi thường gặp

**1. Build failed trên GitHub**

```bash
# Kiểm tra syntax YAML trong frontmatter
# Đảm bảo không có ký tự đặc biệt trong tên file
```

**2. Hình ảnh không hiển thị**

```bash
# Kiểm tra URL hình ảnh có đúng không
# Sử dụng HTTPS URLs cho external images
```

**3. Links bị broken**

```bash
# Sử dụng relative URLs: {{ '/path/to/page' | relative_url }}
# Kiểm tra file tồn tại và path chính xác
```

**4. Local server không khởi động được**

```bash
bundle exec jekyll clean
bundle install
bundle exec jekyll serve
```

### Debug tips

- Sử dụng `bundle exec jekyll build` để kiểm tra lỗi build
- Check GitHub Actions logs khi push
- Test local trước khi push lên production
- Sử dụng branch để test features mới

## 👥 Liên hệ hỗ trợ

- **Lab Leader**: TS. Lương Văn Thiện (thienlv@neu.edu.vn)
- **Technical Lead**: Vương Tuấn Cường (cngvng123@gmail.com)
- **GitHub Issues**: [Create new issue](https://github.com/Business-AI-Lab/business-ai-lab.github.io/issues)

## 📝 Ghi chú quan trọng

1. **Luôn test local** trước khi push
2. **Backup nội dung quan trọng** trước khi chỉnh sửa lớn
3. **Sử dụng commit messages có ý nghĩa**
4. **Tuân thủ quy ước đặt tên files**  
5. **Kiểm tra responsive** trên mobile devices
6. **Optimize hình ảnh** trước khi upload (khuyến khích dùng external CDN)

---

## *Tài liệu được cập nhật lần cuối: {{ "now" | date: "%Y-%m-%d" }}*
