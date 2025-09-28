---
layout: list
title:
  en: "Career Growth"
  vi: "Phát triển sự nghiệp"
summary:
  en: "Opportunities for professional development and career advancement."
  vi: "Cơ hội để phát triển chuyên môn và thăng tiến nghề nghiệp."
---

<div class="careers-list">
  {% for career in site.careers %}
    <div class="card career-card">
      <div class="card-content">
        <h3 class="card-title" data-lang-en="{{ career.title.en }}" data-lang-vi="{{ career.title.vi }}">
          <a href="{{ career.url | relative_url }}">{{ career.title.en }}</a>
        </h3>
        {% if career.type %}
        <p class="career-type">{{ career.type }}</p>
        {% endif %}
        {% if career.summary %}
        <p class="card-summary" data-lang-en="{{ career.summary.en }}" data-lang-vi="{{ career.summary.vi }}">
          {{ career.summary.en }}
        </p>
        {% endif %}
      </div>
    </div>
  {% endfor %}
</div>