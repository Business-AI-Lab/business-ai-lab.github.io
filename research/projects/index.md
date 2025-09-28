---
layout: list
title:
  en: "Research Projects"
  vi: "Dự án nghiên cứu"
summary:
  en: "Explore our current and completed research projects in AI."
  vi: "Khám phá các dự án nghiên cứu hiện tại và đã hoàn thành của chúng tôi trong AI."
---

<div class="projects-list-single">
  {% for project in site.projects %}
    {% include card-project.html item=project %}
  {% endfor %}
</div>