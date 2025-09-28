---
layout: list
title:
  en: "Code & Tools"
  vi: "Mã nguồn & Công cụ"
summary:
  en: "Open source code, tools, and software from our research projects."
  vi: "Mã nguồn mở, công cụ và phần mềm từ các dự án nghiên cứu của chúng tôi."
---

<div class="code-list">
  {% for code in site.code %}
    <div class="card code-card">
      <div class="card-content">
        <h3 class="card-title" data-lang-en="{{ code.title.en }}" data-lang-vi="{{ code.title.vi }}">
          <a href="{{ code.url | relative_url }}">{{ code.title.en }}</a>
        </h3>
        {% if code.summary %}
        <p class="card-summary" data-lang-en="{{ code.summary.en }}" data-lang-vi="{{ code.summary.vi }}">
          {{ code.summary.en }}
        </p>
        {% endif %}
        {% if code.repo_url %}
        <a href="{{ code.repo_url }}" class="btn btn-sm" target="_blank">GitHub</a>
        {% endif %}
      </div>
    </div>
  {% endfor %}
</div>