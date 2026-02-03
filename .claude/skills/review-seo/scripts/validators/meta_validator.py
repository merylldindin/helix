"""Meta tags validation for Helix portfolio pages."""

import json
from pathlib import Path

from models.reports import IssueCategory, IssueSeverity, SEOIssue


class MetaValidator:
    """Validate meta tags across all pages."""

    TITLE_MIN = 30
    TITLE_MAX = 60
    DESCRIPTION_MIN = 120
    DESCRIPTION_MAX = 160

    def __init__(self, project_root: Path):
        self.project_root = project_root
        self.content_dir = project_root / "src" / "content" / "pages"

    def validate_all_pages(self, pages: list[str] | None = None) -> list[SEOIssue]:
        """Validate meta tags for all or specified pages."""
        issues: list[SEOIssue] = []

        # Get all page files
        page_files = list(self.content_dir.glob("*.json"))

        # Check subdirectories
        for subdir in ["suggestions", "thoughts", "ventures"]:
            subdir_path = self.content_dir / subdir
            if subdir_path.exists():
                page_files.extend(subdir_path.glob("*.json"))

        for page_file in page_files:
            page_name = page_file.stem
            if pages and page_name not in pages:
                continue

            try:
                content = json.loads(page_file.read_text())
                head = content.get("head", {})
                issues.extend(self._validate_page_meta(page_name, head, page_file))
            except json.JSONDecodeError as e:
                issues.append(
                    SEOIssue(
                        severity=IssueSeverity.HIGH,
                        category=IssueCategory.META,
                        page=page_name,
                        message=f"Invalid JSON: {e}",
                        recommendation="Fix JSON syntax in page file",
                    )
                )
            except Exception as e:
                issues.append(
                    SEOIssue(
                        severity=IssueSeverity.HIGH,
                        category=IssueCategory.META,
                        page=page_name,
                        message=f"Failed to parse page: {e}",
                        recommendation="Check page file structure",
                    )
                )

        return issues

    def _validate_page_meta(
        self, page: str, head: dict, page_file: Path
    ) -> list[SEOIssue]:
        """Validate meta for a single page."""
        issues: list[SEOIssue] = []

        # Title validation
        title = head.get("title", "")
        if not title:
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.HIGH,
                    category=IssueCategory.META,
                    page=page,
                    message="Missing title tag",
                    recommendation="Add a unique, descriptive title (50-60 chars)",
                    code_example='"title": "Ventures | Meryll Dindin"',
                )
            )
        elif len(title) < self.TITLE_MIN:
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.MEDIUM,
                    category=IssueCategory.META,
                    page=page,
                    message=f"Title too short ({len(title)} chars, min {self.TITLE_MIN})",
                    recommendation=f"Expand title with keywords: '{title}'",
                )
            )
        elif len(title) > self.TITLE_MAX:
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.MEDIUM,
                    category=IssueCategory.META,
                    page=page,
                    message=f"Title too long ({len(title)} chars, max {self.TITLE_MAX})",
                    recommendation=f"Shorten title to avoid truncation: '{title}'",
                )
            )

        # Description validation
        desc = head.get("description", "")
        if not desc:
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.HIGH,
                    category=IssueCategory.META,
                    page=page,
                    message="Missing meta description",
                    recommendation="Add a compelling meta description (120-160 chars)",
                    code_example='"description": "Explore Meryll Dindin\'s ventures in AI, healthcare, and technology."',
                )
            )
        elif len(desc) < self.DESCRIPTION_MIN:
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.MEDIUM,
                    category=IssueCategory.META,
                    page=page,
                    message=f"Description too short ({len(desc)} chars, min {self.DESCRIPTION_MIN})",
                    recommendation="Expand description with keywords and details",
                )
            )
        elif len(desc) > self.DESCRIPTION_MAX:
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.LOW,
                    category=IssueCategory.META,
                    page=page,
                    message=f"Description may be truncated ({len(desc)} chars, max {self.DESCRIPTION_MAX})",
                    recommendation="Consider shortening to avoid SERP truncation",
                )
            )

        # Canonical validation
        canonical = head.get("canonical", "")
        if not canonical:
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.HIGH,
                    category=IssueCategory.META,
                    page=page,
                    message="Missing canonical URL",
                    recommendation="Add canonical URL to prevent duplicate content issues",
                    code_example='"canonical": "/ventures/"',
                )
            )
        elif not canonical.startswith("/"):
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.MEDIUM,
                    category=IssueCategory.META,
                    page=page,
                    message=f"Canonical should start with /: '{canonical}'",
                    recommendation="Use relative path starting with /",
                )
            )
        elif not canonical.endswith("/"):
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.MEDIUM,
                    category=IssueCategory.META,
                    page=page,
                    message=f"Canonical missing trailing slash: '{canonical}'",
                    recommendation="Add trailing slash for consistency with site config",
                )
            )

        # Thumbnail (OG image) validation
        thumbnail = head.get("thumbnail", "")
        if not thumbnail:
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.MEDIUM,
                    category=IssueCategory.META,
                    page=page,
                    message="Missing OG thumbnail image",
                    recommendation="Add social sharing image (default: minimalist.png)",
                    code_example='"thumbnail": "https://cdn.merylldindin.com/thumbnails/minimalist.png"',
                )
            )

        return issues
