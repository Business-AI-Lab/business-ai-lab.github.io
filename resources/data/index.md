---
layout: list
title:
  en: "Datasets"
  vi: "Tập dữ liệu"
summary:
  en: "Open datasets and data resources from our research."
  vi: "Tập dữ liệu mở và tài nguyên dữ liệu từ nghiên cứu của chúng tôi."
---

<div class="datasets-list">
  {% for dataset in site.datasets %}
    <div class="card dataset-card">
      <div class="card-content">
        <h3 class="card-title" data-lang-en="{{ dataset.title.en }}" data-lang-vi="{{ dataset.title.vi }}">
          <a href="{{ dataset.url | relative_url }}">{{ dataset.title.en }}</a>
        </h3>
        {% if dataset.summary %}
        <p class="card-summary" data-lang-en="{{ dataset.summary.en }}" data-lang-vi="{{ dataset.summary.vi }}">
          {{ dataset.summary.en }}
        </p>
        {% endif %}
        {% if dataset.download_url %}
        <a href="{{ dataset.download_url }}" class="btn btn-sm" target="_blank">Download</a>
        {% endif %}
      </div>
    </div>
  {% endfor %}
</div>