# Homepage Redesign Investigation Report

## Summary

The current Business AI Lab homepage has been redesigned by Copilot with a PI-focused structure, but the implementation has significant UI/UX issues that make it look unprofessional for an academic lab application. The layout lacks visual hierarchy, the CSS has poor spacing and typography, and the overall design does not match the polish expected for a Claude for Research Academic application.

**Key Issues:**
1. The hero section uses a dark overlay that makes text hard to read
2. CSS classes are defined inside a media query (incorrect placement)
3. Achievement grid and PI profile card lack visual refinement
4. Typography and spacing are inconsistent
5. The design lacks the clean, professional aesthetic of top academic labs (Stanford AI Lab, MIT CSAIL)

---

## Current Homepage Structure Analysis

### File: `_layouts/home.html`

The homepage is structured in 5 sections:

1. **Hero Section** (`.home-hero`)
   - Dark gradient overlay with background image
   - Lab name, tagline, and CTA buttons
   - PI credential sidebar on the right
   - **Issue:** CSS classes for `.home-hero` are incorrectly placed inside a `@media (max-width: 768px)` block

2. **PI Profile Section** (`#pi-profile`)
   - Two-column layout with portrait and bio
   - Achievement grid with 4 stats (50+ publications, 2022 Golden Globe, 2× AI City Champion, Q1 IEEE)
   - **Issue:** The `.pi-profile-card` layout lacks visual hierarchy

3. **Research Agenda Section** (`.research-band`)
   - 3-column grid of research pillars
   - AI for Business & Finance, Computer Vision & NLP, Connected Intelligent Systems
   - **Issue:** Minimal styling, looks flat

4. **Lab Activities Section** (`.activity-section`)
   - 3-column grid with news cards and a CTA card
   - **Issue:** Cards lack depth and visual interest

5. **Members Preview Section** (`.members-band`)
   - 3-column grid of member cards
   - **Issue:** Same flat design problem

### File: `assets/css/theme.css`

**Critical Bug:** Lines ~1350-1547 contain homepage-specific CSS classes (`.home-hero`, `.home-hero-grid`, `.pi-profile-card`, etc.) that are defined INSIDE a `@media (max-width: 768px)` block. This means these styles only apply on mobile screens, not desktop.

**Missing Styles:**
- No desktop styles for `.home-hero`, `.home-hero-grid`, `.pi-profile-card`, `.achievement-grid`, `.research-pillars`, `.activity-grid`, `.member-preview-grid`
- No CSS variables defined for the new design system
- Inconsistent spacing and typography

### PI Profile Data

**File:** `_members/dr-thien_van_luong.md`

```yaml
name:
  en: "Dr. Thien Van Luong"
  vi: "TS. Lương Văn Thiện"
role: "Lab Leader"
profile_image: "https://fda.neu.edu.vn/wp-content/uploads/2024/08/TS.-Luong-Van-Thien-anh-2-scaled-e1773728619822.jpg"
web_personal: "https://tvluong.wordpress.com/"
email: "thienlv@neu.edu.vn"
affiliations: ["Business AI Lab", "National Economics University"]
```

**From NEU Profile (https://fda.neu.edu.vn/fda-members/ts-luong-van-thien/):**
- 50+ peer-reviewed publications (IEEE Transactions, Journal of Lightwave Technology, etc.)
- Golden Globe Award for Science & Technology 2022
- AI City Challenge Champion 2024 & 2025
- Research areas: Deep learning, wireless communications, computer vision, NLP, IoT
- PhD from Queen's University Belfast (2019)
- Research Fellow at University of Southampton (2019-2021)
- Lecturer at Faculty of Data Science and AI, NEU

---

## Site Architecture

### Directory Structure
```
business-ai-lab.github.io/
├── _config.yml           # Jekyll config, bilingual support
├── index.html            # Uses home layout
├── _layouts/
│   ├── default.html      # Base layout with header/footer
│   ├── home.html         # Homepage layout (needs redesign)
│   ├── detail.html       # Single item pages
│   ├── list.html         # Listing pages
│   └── page.html         # Static pages
├── _includes/
│   ├── header.html       # Navigation with lang switcher
│   ├── footer.html       # Contact info
│   ├── card-member.html  # Member card component
│   └── ...               # Other card components
├── _data/
│   ├── nav.yml           # Navigation structure
│   ├── members.yml       # 35+ lab members
│   ├── sitecopy.yml      # UI strings (EN/VI)
│   └── partners.yml      # Partner logos
├── _members/             # 6 member profiles with MD files
├── _projects/            # 4 research projects
├── _publications/        # 50+ publications
├── _news/                # 3 news items
├── assets/
│   ├── css/theme.css     # Main stylesheet (needs fixes)
│   ├── js/               # Language & theme toggle
│   └── images/
│       ├── logo/         # bai-logo.jpg, bailab-banner.jpg
│       ├── members/      # Profile photos
│       └── ...
```

### Jekyll Configuration

- **Collections:** projects, publications, members, news, blogs, gatherings, careers, datasets, code
- **Languages:** EN (default), VI
- **Theme:** Light by default, toggle supported
- **URL:** https://bailab.neu.edu.vn

---

## Best Practices from Top Academic Lab Websites

### Stanford AI Lab (ai.stanford.edu)
1. **Clean hero section** with lab name, brief tagline, and featured news
2. **News feed** prominently displayed on homepage
3. **Faculty spotlight** with photos and research areas
4. **Achievement highlights** (awards, best papers) in a dedicated section
5. **Affiliates program** for industry partnerships
6. Minimal, professional color scheme (blue/white)

### MIT CSAIL (csail.mit.edu)
1. **Simple, bold header** with institution name
2. **Research areas** as visual cards
3. **People directory** with filtering
4. **News and events** integrated into homepage

### Key Patterns for Academic Lab Websites
1. **PI Profile First:** Show PI photo, title, affiliations, and key achievements prominently
2. **Research Focus:** Clear statement of research direction with 3-5 key areas
3. **Impact Metrics:** Publications count, citations, awards, grants
4. **Team Overview:** Photos and roles of current members
5. **Latest News:** Recent publications, awards, events
6. **Contact & Affiliations:** Institution, address, email
7. **Clean Typography:** Sans-serif fonts, good line height, clear hierarchy
8. **Responsive Design:** Works on all screen sizes
9. **Accessibility:** Good contrast, alt text, semantic HTML

---

## Recommendations

### 1. Fix CSS Structure (Critical)
Move all homepage CSS classes OUT of the media query block and into the main stylesheet. Define desktop styles first, then mobile overrides.

### 2. Redesign Hero Section
- Use a lighter, cleaner hero with the lab logo prominently displayed
- Reduce the dark overlay or use a gradient that doesn't obscure text
- Add the PI photo and name in a dedicated "PI Spotlight" section below the hero
- Include key credentials: PhD institution, current role, top achievements

### 3. Improve PI Profile Card
- Use a card-based layout with proper spacing
- Add visual hierarchy: PI name → title → bio → achievements → contact
- Include links to Google Scholar, NEU profile, personal website
- Use a professional headshot from NEU

### 4. Create Achievement Timeline/Highlights
- Awards section with icons (Golden Globe, AI City Challenge)
- Publication stats with chart or visual
- Media mentions if available

### 5. Enhance Research Pillars
- Add icons or illustrations for each research area
- Include project examples or publications in each area
- Use hover effects to show more detail

### 6. Improve Visual Design
- Define a consistent color palette (primary: teal/cyan from logo, accent: orange)
- Use CSS variables for spacing, typography, colors
- Add subtle shadows and borders for depth
- Improve typography: larger headings, better line height

### 7. Add Missing Content
- PI's full bio from NEU profile
- List of top 5-10 publications with journal names
- Research grants and funding
- Industry partnerships
- Teaching and supervision

### 8. Mobile Optimization
- Ensure all sections stack properly on mobile
- Reduce image sizes for faster loading
- Test on various screen sizes

---

## Files to Modify

1. **`_layouts/home.html`** - Restructure HTML for better semantic layout
2. **`assets/css/theme.css`** - Fix CSS structure, add proper desktop styles
3. **`_members/dr-thien_van_luong.md`** - Add more PI credentials, bio
4. **`_data/sitecopy.yml`** - Add new UI strings if needed

## Files to Reference

- `_data/nav.yml` - Navigation structure
- `_data/members.yml` - Member count for stats
- `_includes/header.html` - Header styling
- `_includes/footer.html` - Footer styling

---

## Verification

After redesign, verify:
1. Jekyll build succeeds: `bundle exec jekyll build`
2. All pages render correctly in browser
3. Bilingual switching works (EN/VI)
4. Mobile responsiveness is correct
5. All links work (PI profile, publications, etc.)
6. Images load correctly (PI photo from NEU)

---

## Conclusion

The current homepage redesign has the right content structure (PI-first approach) but suffers from poor CSS implementation and lack of visual polish. The CSS bug where styles are inside a media query is causing desktop rendering issues. A complete CSS refactor with a professional design system matching Stanford AI Lab's aesthetic is recommended for the Claude for Research Academic application.
