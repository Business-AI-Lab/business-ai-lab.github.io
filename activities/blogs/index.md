---
layout: list
title:
  en: "Research Blogs"
  vi: "Blog nghiên cứu"
summary:
  en: "In-depth articles and insights from our research team."
  vi: "Bài viết chi tiết và nhận thức từ đội ngũ nghiên cứu của chúng tôi."
---

<div class="blogs-list">
  {% assign blogs_by_date = site.blogs | sort: 'date' | reverse %}
  {% for blog in blogs_by_date %}
    <div class="blog-item-wrapper">
      {% include card-blog.html item=blog %}
    </div>
  {% endfor %}
</div>