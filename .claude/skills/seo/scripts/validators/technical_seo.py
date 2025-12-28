"""Technical SEO checks for Helix portfolio."""

from pathlib import Path

from models.reports import IssueCategory, IssueSeverity, SEOIssue


class TechnicalSEOChecker:
    """Check technical SEO aspects of the site."""

    def __init__(self, project_root: Path):
        self.project_root = project_root

    def check_all(self) -> list[SEOIssue]:
        """Run all technical SEO checks."""
        issues: list[SEOIssue] = []

        issues.extend(self._check_robots_txt())
        issues.extend(self._check_sitemap_config())
        issues.extend(self._check_nuxt_config())

        return issues

    def _check_robots_txt(self) -> list[SEOIssue]:
        """Check robots.txt exists and is properly configured."""
        issues: list[SEOIssue] = []
        robots_file = self.project_root / "src" / "public" / "robots.txt"

        if not robots_file.exists():
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.HIGH,
                    category=IssueCategory.TECHNICAL,
                    page="robots.txt",
                    message="Missing robots.txt",
                    recommendation="Create robots.txt in src/public/",
                    code_example="User-agent: *\nAllow: /\n\nSitemap: https://merylldindin.com/sitemap.xml",
                )
            )
            return issues

        content = robots_file.read_text()

        # Check for sitemap directive
        if "sitemap" not in content.lower():
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.MEDIUM,
                    category=IssueCategory.TECHNICAL,
                    page="robots.txt",
                    message="Missing Sitemap directive",
                    recommendation="Add Sitemap: https://merylldindin.com/sitemap.xml",
                )
            )

        # Check for Allow directive
        if "allow:" not in content.lower():
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.LOW,
                    category=IssueCategory.TECHNICAL,
                    page="robots.txt",
                    message="No explicit Allow directive",
                    recommendation="Add Allow: / for clarity",
                )
            )

        return issues

    def _check_sitemap_config(self) -> list[SEOIssue]:
        """Check sitemap module configuration."""
        issues: list[SEOIssue] = []
        nuxt_config = self.project_root / "nuxt.config.ts"

        if not nuxt_config.exists():
            return issues

        content = nuxt_config.read_text()

        # Check for sitemap module
        if "@nuxtjs/sitemap" not in content:
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.HIGH,
                    category=IssueCategory.TECHNICAL,
                    page="nuxt.config.ts",
                    message="Sitemap module not configured",
                    recommendation="Add @nuxtjs/sitemap to modules",
                )
            )

        return issues

    def _check_nuxt_config(self) -> list[SEOIssue]:
        """Check Nuxt configuration for SEO settings."""
        issues: list[SEOIssue] = []
        nuxt_config = self.project_root / "nuxt.config.ts"

        if not nuxt_config.exists():
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.HIGH,
                    category=IssueCategory.TECHNICAL,
                    page="nuxt.config.ts",
                    message="Missing nuxt.config.ts",
                    recommendation="Create Nuxt configuration file",
                )
            )
            return issues

        content = nuxt_config.read_text()

        # Check for SSR
        if "ssr: false" in content:
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.HIGH,
                    category=IssueCategory.TECHNICAL,
                    page="nuxt.config.ts",
                    message="SSR is disabled",
                    recommendation="Enable SSR for better SEO (ssr: true)",
                )
            )

        # Check for trailing slash configuration
        if "trailingSlash" not in content:
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.MEDIUM,
                    category=IssueCategory.TECHNICAL,
                    page="nuxt.config.ts",
                    message="trailingSlash not configured",
                    recommendation="Set trailingSlash: true for consistent URLs",
                )
            )

        # Check for site URL configuration
        if "siteUrl" not in content and "NUXT_WEBSITE_URL" not in content:
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.MEDIUM,
                    category=IssueCategory.TECHNICAL,
                    page="nuxt.config.ts",
                    message="Site URL not configured",
                    recommendation="Set siteUrl in runtimeConfig for absolute URLs",
                )
            )

        return issues
