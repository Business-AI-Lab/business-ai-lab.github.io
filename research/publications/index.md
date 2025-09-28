---
layout: list
title:
  en: "Publications"
  vi: "Công bố khoa học"
summary:
  en: "Our research publications in top-tier conferences and journals."
  vi: "Các công bố nghiên cứu của chúng tôi tại các hội nghị và tạp chí hàng đầu."
---

{% assign pubs_by_year = site.publications | group_by: "year" | sort: "name" | reverse %}
{% for year_group in pubs_by_year %}
  <section class="publications-year">
    <h2>{{ year_group.name }}</h2>
    <div class="publications-list">
      {% for pub in year_group.items %}
        <div class="publication-item">
          <div class="pub-citation">{{ pub.ieee }}</div>
          <div class="pub-links">
            {% if pub.pdf %}<a href="{{ pub.pdf }}" class="btn btn-sm" target="_blank">PDF</a>{% endif %}
            {% if pub.code %}<a href="{{ pub.code }}" class="btn btn-sm btn-outline" target="_blank">Code</a>{% endif %}
            {% if pub.project %}<a href="{{ '/research/projects/' | append: pub.project | append: '/' | relative_url }}" class="btn btn-sm btn-outline">Project</a>{% endif %}
          </div>
        </div>
      {% endfor %}
    </div>
  </section>
{% endfor %}