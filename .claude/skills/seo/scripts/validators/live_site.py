"""Live site validation for deployed website."""

import httpx

from models.reports import IssueCategory, IssueSeverity, SEOIssue

SITE_URL = "https://merylldindin.com"


class LiveSiteValidator:
    """Validate the live deployed website."""

    def __init__(self, base_url: str = SITE_URL):
        self.base_url = base_url.rstrip("/")

    def validate(self) -> list[SEOIssue]:
        """Run all live site validations."""
        issues: list[SEOIssue] = []

        issues.extend(self._check_robots_txt())
        issues.extend(self._check_sitemap())
        issues.extend(self._check_homepage())

        return issues

    def _check_robots_txt(self) -> list[SEOIssue]:
        """Check robots.txt is accessible."""
        issues: list[SEOIssue] = []
        url = f"{self.base_url}/robots.txt"

        try:
            response = httpx.get(url, timeout=10, follow_redirects=True)

            if response.status_code != 200:
                issues.append(
                    SEOIssue(
                        severity=IssueSeverity.HIGH,
                        category=IssueCategory.TECHNICAL,
                        page="robots.txt (live)",
                        message=f"robots.txt returned {response.status_code}",
                        recommendation="Ensure robots.txt is accessible at site root",
                    )
                )
            else:
                content = response.text.lower()
                if "sitemap" not in content:
                    issues.append(
                        SEOIssue(
                            severity=IssueSeverity.MEDIUM,
                            category=IssueCategory.TECHNICAL,
                            page="robots.txt (live)",
                            message="Live robots.txt missing Sitemap directive",
                            recommendation="Add Sitemap directive to robots.txt",
                        )
                    )

        except httpx.RequestError as e:
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.HIGH,
                    category=IssueCategory.TECHNICAL,
                    page="robots.txt (live)",
                    message=f"Failed to fetch robots.txt: {e}",
                    recommendation="Check site accessibility",
                )
            )

        return issues

    def _check_sitemap(self) -> list[SEOIssue]:
        """Check sitemap.xml is accessible."""
        issues: list[SEOIssue] = []
        url = f"{self.base_url}/sitemap.xml"

        try:
            response = httpx.get(url, timeout=10, follow_redirects=True)

            if response.status_code != 200:
                issues.append(
                    SEOIssue(
                        severity=IssueSeverity.HIGH,
                        category=IssueCategory.TECHNICAL,
                        page="sitemap.xml (live)",
                        message=f"sitemap.xml returned {response.status_code}",
                        recommendation="Ensure sitemap.xml is generated and accessible",
                    )
                )
            else:
                content = response.text
                if "<urlset" not in content and "<sitemapindex" not in content:
                    issues.append(
                        SEOIssue(
                            severity=IssueSeverity.HIGH,
                            category=IssueCategory.TECHNICAL,
                            page="sitemap.xml (live)",
                            message="Invalid sitemap format",
                            recommendation="Ensure sitemap follows XML sitemap protocol",
                        )
                    )

        except httpx.RequestError as e:
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.HIGH,
                    category=IssueCategory.TECHNICAL,
                    page="sitemap.xml (live)",
                    message=f"Failed to fetch sitemap: {e}",
                    recommendation="Check site accessibility",
                )
            )

        return issues

    def _check_homepage(self) -> list[SEOIssue]:
        """Check homepage SEO elements."""
        issues: list[SEOIssue] = []
        url = f"{self.base_url}/"

        try:
            response = httpx.get(url, timeout=15, follow_redirects=True)

            if response.status_code != 200:
                issues.append(
                    SEOIssue(
                        severity=IssueSeverity.HIGH,
                        category=IssueCategory.TECHNICAL,
                        page="homepage (live)",
                        message=f"Homepage returned {response.status_code}",
                        recommendation="Check site deployment",
                    )
                )
                return issues

            content = response.text

            # Check for title tag
            if "<title>" not in content.lower():
                issues.append(
                    SEOIssue(
                        severity=IssueSeverity.HIGH,
                        category=IssueCategory.META,
                        page="homepage (live)",
                        message="No title tag found",
                        recommendation="Ensure title is rendered server-side",
                    )
                )

            # Check for meta description
            if 'name="description"' not in content.lower():
                issues.append(
                    SEOIssue(
                        severity=IssueSeverity.HIGH,
                        category=IssueCategory.META,
                        page="homepage (live)",
                        message="No meta description found",
                        recommendation="Ensure meta description is rendered server-side",
                    )
                )

            # Check for JSON-LD
            if "application/ld+json" not in content:
                issues.append(
                    SEOIssue(
                        severity=IssueSeverity.MEDIUM,
                        category=IssueCategory.SCHEMA,
                        page="homepage (live)",
                        message="No JSON-LD structured data found",
                        recommendation="Ensure Schema.org data is rendered",
                    )
                )

            # Check for H1
            if "<h1" not in content.lower():
                issues.append(
                    SEOIssue(
                        severity=IssueSeverity.MEDIUM,
                        category=IssueCategory.CONTENT,
                        page="homepage (live)",
                        message="No H1 tag found in rendered HTML",
                        recommendation="Ensure H1 heading is present for main topic",
                    )
                )

            # Check for canonical
            if 'rel="canonical"' not in content.lower():
                issues.append(
                    SEOIssue(
                        severity=IssueSeverity.MEDIUM,
                        category=IssueCategory.META,
                        page="homepage (live)",
                        message="No canonical URL found",
                        recommendation="Add canonical link tag",
                    )
                )

        except httpx.RequestError as e:
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.HIGH,
                    category=IssueCategory.TECHNICAL,
                    page="homepage (live)",
                    message=f"Failed to fetch homepage: {e}",
                    recommendation="Check site accessibility",
                )
            )

        return issues
