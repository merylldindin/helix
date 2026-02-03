"""Content analysis for SEO optimization."""

import json
from pathlib import Path

from models.reports import IssueCategory, IssueSeverity, SEOIssue


class ContentAnalyzer:
    """Analyze page content for SEO issues."""

    def __init__(self, project_root: Path):
        self.project_root = project_root
        self.content_dir = project_root / "src" / "content" / "pages"

    def analyze_all_pages(self, pages: list[str] | None = None) -> list[SEOIssue]:
        """Analyze content for all or specified pages."""
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
                issues.extend(self._analyze_page_content(page_name, content))
            except (json.JSONDecodeError, Exception):
                # Already caught in meta validator
                pass

        return issues

    def _analyze_page_content(self, page: str, content: dict) -> list[SEOIssue]:
        """Analyze content structure of a single page."""
        issues: list[SEOIssue] = []

        components = content.get("components", [])
        if not components:
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.MEDIUM,
                    category=IssueCategory.CONTENT,
                    page=page,
                    message="No components defined",
                    recommendation="Add content components to the page",
                )
            )
            return issues

        # Check for H1 presence (usually in first component or head)
        has_h1 = self._check_for_h1(content, components)
        if not has_h1:
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.HIGH,
                    category=IssueCategory.CONTENT,
                    page=page,
                    message="No H1 heading detected",
                    recommendation="Ensure page has exactly one H1 heading for primary topic",
                )
            )

        # Check for thin content
        text_length = self._estimate_text_length(components)
        if text_length < 100:
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.MEDIUM,
                    category=IssueCategory.CONTENT,
                    page=page,
                    message=f"Potentially thin content (~{text_length} chars)",
                    recommendation="Consider adding more descriptive content for better SEO",
                )
            )

        # Check for images without alt text
        missing_alts = self._check_image_alts(components)
        for img_location in missing_alts:
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.MEDIUM,
                    category=IssueCategory.CONTENT,
                    page=page,
                    message=f"Image missing alt text: {img_location}",
                    recommendation="Add descriptive alt text for accessibility and SEO",
                )
            )

        return issues

    def _check_for_h1(self, content: dict, components: list) -> bool:
        """Check if page has an H1 heading."""
        # Check head for title (often used as H1)
        head = content.get("head", {})
        if head.get("title"):
            return True

        # Check components for heading props
        for comp in components:
            props = comp.get("props", {})
            if props.get("headline") or props.get("title"):
                return True

        return False

    def _estimate_text_length(self, components: list) -> int:
        """Estimate total text content length."""
        total = 0

        for comp in components:
            props = comp.get("props", {})
            total += self._count_strings_recursive(props)

        return total

    def _count_strings_recursive(self, obj: dict | list | str | int | float | bool | None) -> int:
        """Recursively count string lengths in nested structures."""
        if isinstance(obj, str):
            return len(obj)
        elif isinstance(obj, dict):
            return sum(self._count_strings_recursive(v) for v in obj.values())
        elif isinstance(obj, list):
            return sum(self._count_strings_recursive(item) for item in obj)
        return 0

    def _check_image_alts(self, components: list) -> list[str]:
        """Find images missing alt text."""
        missing = []

        for i, comp in enumerate(components):
            props = comp.get("props", {})
            name = comp.get("name", f"component[{i}]")

            # Check for image-related props (nested structure like image.altText)
            if "image" in props:
                image = props["image"]
                if isinstance(image, dict):
                    if "altText" not in image and "alt" not in image:
                        missing.append(name)
                elif "alt" not in props and "imageAlt" not in props and "altText" not in props:
                    missing.append(name)

            # Check for background images (like in ARTICLE_SECTION)
            if "background" in props:
                bg = props["background"]
                if isinstance(bg, dict):
                    if "altText" not in bg and "alt" not in bg:
                        missing.append(f"{name}.background")

            # Check nested images in items
            if "items" in props:
                for j, item in enumerate(props["items"]):
                    if isinstance(item, dict):
                        if "image" in item:
                            img = item["image"]
                            if isinstance(img, dict):
                                if "altText" not in img and "alt" not in img:
                                    missing.append(f"{name}.items[{j}]")
                            elif "alt" not in item and "altText" not in item:
                                missing.append(f"{name}.items[{j}]")

        return missing
