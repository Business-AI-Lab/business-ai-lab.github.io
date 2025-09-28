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
  {% for blog in site.blogs %}
    {% include card-blog.html item=blog %}
  {% endfor %}
</div>