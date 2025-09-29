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
  {% assign news_by_date = site.news | sort: 'date' | reverse %}
  {% for news in news_by_date %}
    <div class="news-item-wrapper">
      {% include card-news.html item=news %}
    </div>
  {% endfor %}
</div>