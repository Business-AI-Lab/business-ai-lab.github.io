---
layout: list
title:
  en: "News & Updates"
  vi: "Tin tức & Cập nhật"
summary:
  en: "Stay updated with the latest news and announcements from our lab."
  vi: "Luôn cập nhật với tin tức và thông báo mới nhất từ phòng lab của chúng tôi."
---

<div class="news-list">
  {% for news in site.news %}
    {% include card-news.html item=news %}
  {% endfor %}
</div>