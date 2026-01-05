# SEO Guidelines - Personal Portfolio

## Meta Tags

### Title Tag

- **Length**: 50-60 characters (optimal for SERP display)
- **Format**: `{Page} | Meryll Dindin` or `Meryll Dindin | {Page}`
- **Rules**:
  - Primary keyword first
  - Personal brand name included
  - Unique per page
  - No keyword stuffing

**Examples**:

```
Meryll Dindin | AI Entrepreneur & Data Scientist
Ventures | Meryll Dindin
Thoughts on AI | Meryll Dindin
```

### Meta Description

- **Length**: 120-160 characters
- **Content**:
  - Compelling summary of page content
  - Include primary keywords naturally
  - Personal branding elements
- **Avoid**: Duplicate descriptions across pages

**Example**:

```
Meryll Dindin is a serial entrepreneur shaping healthcare, mental health, and AI. Explore ventures, thoughts, and professional journey.
```

### Canonical URL

- Always include on every page
- Use trailing slashes: `/ventures/` not `/ventures`
- Full absolute URL in schema, relative in head

### Open Graph

- `og:title`: Same as title tag
- `og:description`: Same as meta description
- `og:image`: Default is `https://cdn.merylldindin.com/thumbnails/minimalist.png`
- `og:type`: `profile` for main page, `article` for blog posts
- `og:locale`: `en_US`

**Note**: Use `minimalist.png` as default thumbnail. For article pages, use the article header image from `articles/headers/`.

---

## Schema.org Structured Data

### Required Types

#### Person (Primary)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Meryll Dindin",
  "url": "https://merylldindin.com",
  "email": "merylldin@gmail.com",
  "jobTitle": "Director of Data and Artificial Intelligence",
  "description": "Serial entrepreneur in AI, healthcare, and technology",
  "image": "https://cdn.merylldindin.com/assets/avatar.webp",
  "sameAs": [
    "https://linkedin.com/in/merylldindin",
    "https://github.com/merylldindin",
    "https://x.com/merylldindin"
  ],
  "alumniOf": [...],
  "worksFor": [...]
}
```

#### WebSite

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Meryll Dindin",
  "url": "https://merylldindin.com",
  "inLanguage": "en-US"
}
```

#### BlogPosting (for thoughts/articles)

```json
{
  "@type": "BlogPosting",
  "headline": "Article Title",
  "author": {
    "@type": "Person",
    "name": "Meryll Dindin"
  },
  "datePublished": "2025-01-01",
  "image": "...",
  "url": "..."
}
```

#### BreadcrumbList (all pages)

```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://merylldindin.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Ventures",
      "item": "https://merylldindin.com/ventures/"
    }
  ]
}
```

---

## Content Guidelines

### Heading Hierarchy

- **H1**: One per page, contains primary keyword/page name
- **H2**: Section headings
- **H3-H6**: Subsections (don't skip levels)

**Bad**: H1 → H3 (skips H2)
**Good**: H1 → H2 → H3

### Keyword Integration

- Natural placement, no stuffing
- Primary keyword in: H1, first paragraph, meta description
- LSI keywords throughout content
- Target 1-2% keyword density

### Image Optimization

- **Alt text**: 50-125 characters, descriptive
- **Format**: WebP (with fallbacks)
- **Lazy loading**: All below-fold images
- **Dimensions**: Specify width/height to prevent CLS

**Alt text examples**:

```
"Meryll Dindin speaking at AI conference"
"Polygon Technologies team photo"
"Data visualization dashboard screenshot"
```

---

## Technical SEO

### Performance (Core Web Vitals)

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### robots.txt

```
User-agent: *
Allow: /

Sitemap: https://merylldindin.com/sitemap.xml
```

### Sitemap

- Include all indexable pages
- Set priorities: Homepage (1.0), Main sections (0.8-0.9), Secondary (0.5-0.7)
- Update `lastmod` when content changes
- Submit to Google Search Console

### HTTPS

- All URLs must use HTTPS
- Check for mixed content

### Mobile

- Responsive design (mobile-first)
- Touch-friendly navigation
- Readable font sizes (16px+)

---

## Personal Branding SEO

### Consistency

- Same name format across all platforms
- Consistent profile photo
- Matching bio/description themes
- Link all social profiles in schema sameAs

### Professional Keywords

- Job title variations
- Industry terms (AI, machine learning, healthcare)
- Company names
- Academic credentials

### Social Proof

- Link to publications
- Reference patents
- Include press mentions
- Showcase speaking engagements

---

## Quick Checklist

### Per-Page SEO

- [ ] Unique title (50-60 chars)
- [ ] Unique description (120-160 chars)
- [ ] Canonical URL with trailing slash
- [ ] OG image (1200x630px)
- [ ] One H1 with primary keyword
- [ ] Proper heading hierarchy
- [ ] Images with alt text
- [ ] Internal links to related pages
- [ ] Schema.org markup (page-specific)

### Site-Wide

- [ ] robots.txt with Sitemap directive
- [ ] XML sitemap submitted
- [ ] HTTPS everywhere
- [ ] Mobile responsive
- [ ] Fast loading (< 3s)
- [ ] Person schema on all pages
- [ ] BreadcrumbList on all pages
- [ ] Consistent personal branding
