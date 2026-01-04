"""Schema.org structured data validation for personal portfolio."""

import json
from pathlib import Path

from models.reports import IssueCategory, IssueSeverity, SEOIssue


class SchemaValidator:
    """Validate Schema.org structured data."""

    PERSON_REQUIRED_FIELDS = [
        "name",
        "url",
        "email",
        "jobTitle",
        "description",
        "image",
        "sameAs",
    ]

    PERSON_RECOMMENDED_FIELDS = [
        "alumniOf",
        "worksFor",
        "address",
    ]

    def __init__(self, project_root: Path):
        self.project_root = project_root
        self.schemas_dir = project_root / "src" / "content" / "schemas"
        self.utils_schemas_dir = project_root / "src" / "utils" / "schemas"

    def validate_all_schemas(self) -> list[SEOIssue]:
        """Validate all Schema.org implementations."""
        issues: list[SEOIssue] = []

        issues.extend(self._validate_person_schema())
        issues.extend(self._validate_website_schema())
        issues.extend(self._validate_schema_generators())

        return issues

    def _validate_person_schema(self) -> list[SEOIssue]:
        """Validate default.json (Person schema)."""
        issues: list[SEOIssue] = []
        schema_file = self.schemas_dir / "default.json"

        if not schema_file.exists():
            return [
                SEOIssue(
                    severity=IssueSeverity.HIGH,
                    category=IssueCategory.SCHEMA,
                    page="global",
                    message="Missing default.json schema file",
                    recommendation="Create Person schema in src/content/schemas/",
                )
            ]

        try:
            schema = json.loads(schema_file.read_text())
        except json.JSONDecodeError as e:
            return [
                SEOIssue(
                    severity=IssueSeverity.HIGH,
                    category=IssueCategory.SCHEMA,
                    page="default.json",
                    message=f"Invalid JSON in schema: {e}",
                    recommendation="Fix JSON syntax",
                )
            ]

        # Check @type
        schema_type = schema.get("@type", "")
        if schema_type != "Person":
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.HIGH,
                    category=IssueCategory.SCHEMA,
                    page="default.json",
                    message=f"Expected Person @type, found: {schema_type}",
                    recommendation='Set @type to "Person"',
                    code_example='"@type": "Person"',
                )
            )

        # Check required fields
        for field in self.PERSON_REQUIRED_FIELDS:
            if field not in schema:
                issues.append(
                    SEOIssue(
                        severity=IssueSeverity.HIGH,
                        category=IssueCategory.SCHEMA,
                        page="default.json",
                        message=f"Missing required field: {field}",
                        recommendation=f"Add {field} to Person schema",
                    )
                )

        # Check recommended fields
        for field in self.PERSON_RECOMMENDED_FIELDS:
            if field not in schema:
                issues.append(
                    SEOIssue(
                        severity=IssueSeverity.LOW,
                        category=IssueCategory.SCHEMA,
                        page="default.json",
                        message=f"Missing recommended field: {field}",
                        recommendation=f"Consider adding {field} for richer profile",
                    )
                )

        # Validate sameAs (social profiles)
        same_as = schema.get("sameAs", [])
        if len(same_as) < 3:
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.MEDIUM,
                    category=IssueCategory.SCHEMA,
                    page="default.json",
                    message=f"Few sameAs links ({len(same_as)})",
                    recommendation="Add social profile URLs (LinkedIn, GitHub, Twitter)",
                )
            )

        # Check for key social platforms
        same_as_lower = [s.lower() for s in same_as]
        key_platforms = ["linkedin", "github", "twitter"]
        for platform in key_platforms:
            if not any(platform in url for url in same_as_lower):
                issues.append(
                    SEOIssue(
                        severity=IssueSeverity.MEDIUM,
                        category=IssueCategory.SCHEMA,
                        page="default.json",
                        message=f"Missing {platform.title()} in sameAs",
                        recommendation=f"Add {platform.title()} profile URL to sameAs array",
                    )
                )

        # Validate worksFor structure
        works_for = schema.get("worksFor", [])
        for i, org in enumerate(works_for):
            if not isinstance(org, dict):
                continue
            if "@type" not in org:
                issues.append(
                    SEOIssue(
                        severity=IssueSeverity.LOW,
                        category=IssueCategory.SCHEMA,
                        page="default.json",
                        message=f"worksFor[{i}] missing @type",
                        recommendation='Add "@type": "Organization" to worksFor entries',
                    )
                )
            if "name" not in org:
                issues.append(
                    SEOIssue(
                        severity=IssueSeverity.MEDIUM,
                        category=IssueCategory.SCHEMA,
                        page="default.json",
                        message=f"worksFor[{i}] missing name",
                        recommendation="Add organization name to worksFor entries",
                    )
                )

        return issues

    def _validate_website_schema(self) -> list[SEOIssue]:
        """Validate website.json schema."""
        issues: list[SEOIssue] = []
        schema_file = self.schemas_dir / "website.json"

        if not schema_file.exists():
            return [
                SEOIssue(
                    severity=IssueSeverity.MEDIUM,
                    category=IssueCategory.SCHEMA,
                    page="global",
                    message="Missing website.json schema",
                    recommendation="Create WebSite schema in src/content/schemas/",
                )
            ]

        try:
            schema = json.loads(schema_file.read_text())
        except json.JSONDecodeError:
            return [
                SEOIssue(
                    severity=IssueSeverity.MEDIUM,
                    category=IssueCategory.SCHEMA,
                    page="website.json",
                    message="Invalid JSON in website schema",
                    recommendation="Fix JSON syntax",
                )
            ]

        # Check @type
        if schema.get("@type") != "WebSite":
            issues.append(
                SEOIssue(
                    severity=IssueSeverity.MEDIUM,
                    category=IssueCategory.SCHEMA,
                    page="website.json",
                    message="Missing or incorrect @type",
                    recommendation='Set @type to "WebSite"',
                )
            )

        # Check required fields
        for field in ["name", "url"]:
            if field not in schema:
                issues.append(
                    SEOIssue(
                        severity=IssueSeverity.MEDIUM,
                        category=IssueCategory.SCHEMA,
                        page="website.json",
                        message=f"Missing {field} in WebSite schema",
                        recommendation=f"Add {field} to WebSite schema",
                    )
                )

        return issues

    def _validate_schema_generators(self) -> list[SEOIssue]:
        """Validate TypeScript schema generators exist."""
        issues: list[SEOIssue] = []

        expected_generators = [
            ("breadcrumbs.ts", IssueSeverity.HIGH, "BreadcrumbList for navigation"),
            ("webpages.ts", IssueSeverity.MEDIUM, "WebPage for each page"),
            ("itemlists.ts", IssueSeverity.LOW, "ItemList for collections"),
            ("blogposts.ts", IssueSeverity.MEDIUM, "BlogPosting for articles"),
            ("profile.ts", IssueSeverity.LOW, "ProfilePage for landing page"),
        ]

        for generator, severity, purpose in expected_generators:
            gen_file = self.utils_schemas_dir / generator
            if not gen_file.exists():
                issues.append(
                    SEOIssue(
                        severity=severity,
                        category=IssueCategory.SCHEMA,
                        page=f"schemas/{generator}",
                        message=f"Missing schema generator: {generator}",
                        recommendation=f"Create {generator} for {purpose}",
                    )
                )

        return issues
