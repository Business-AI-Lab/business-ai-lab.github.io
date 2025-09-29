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
    <h2 class="year-heading">{{ year_group.name }}</h2>
    <div class="publications-list">
      {% for pub in year_group.items %}
        <div class="publication-item-wrapper">
          {% include card-publication.html item=pub %}
        </div>
      {% endfor %}
    </div>
  </section>
{% endfor %}