---
layout: list
title:
  en: "Lab Gatherings"
  vi: "Gặp gỡ phòng lab"
summary:
  en: "Join our regular meetups, seminars, and social events."
  vi: "Tham gia các cuộc gặp gỡ, hội thảo và sự kiện xã hội thường xuyên của chúng tôi."
---

<div class="gatherings-list">
  {% for gathering in site.gatherings %}
    <div class="card gathering-card">
      <div class="card-content">
        <div class="card-date">{{ gathering.date | date: "%B %d, %Y" }}</div>
        <h3 class="card-title" data-lang-en="{{ gathering.title.en }}" data-lang-vi="{{ gathering.title.vi }}">
          <a href="{{ gathering.url | relative_url }}">{{ gathering.title.en }}</a>
        </h3>
        {% if gathering.location %}
        <p class="gathering-location">📍 {{ gathering.location }}</p>
        {% endif %}
        {% if gathering.summary %}
        <p class="card-summary" data-lang-en="{{ gathering.summary.en }}" data-lang-vi="{{ gathering.summary.vi }}">
          {{ gathering.summary.en }}
        </p>
        {% endif %}
      </div>
    </div>
  {% endfor %}
</div>