"""Pydantic models for SEO audit reports."""

from enum import Enum

from pydantic import BaseModel, Field


class IssueSeverity(str, Enum):
    """Severity level of an SEO issue."""

    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


class IssueCategory(str, Enum):
    """Category of SEO issue."""

    META = "meta_tags"
    SCHEMA = "schema_org"
    CONTENT = "content"
    TECHNICAL = "technical"


class SEOIssue(BaseModel):
    """Single SEO issue identified during audit."""

    severity: IssueSeverity = Field(description="Priority level of the issue")
    category: IssueCategory = Field(description="Type of SEO issue")
    page: str = Field(description="Page or file where issue was found")
    message: str = Field(description="Description of the issue")
    recommendation: str = Field(description="Suggested fix")
    code_example: str | None = Field(
        default=None, description="Example code if applicable"
    )


class AuditSummary(BaseModel):
    """Summary statistics for the audit."""

    total_issues: int = Field(description="Total number of issues found")
    high_priority: int = Field(description="Number of high priority issues")
    medium_priority: int = Field(description="Number of medium priority issues")
    low_priority: int = Field(description="Number of low priority issues")
    by_category: dict[str, int] = Field(description="Issue count per category")


class SEOAuditReport(BaseModel):
    """Complete SEO audit report."""

    timestamp: str = Field(description="ISO timestamp of audit")
    website: str = Field(
        default="https://merylldindin.com", description="Audited website"
    )
    issues: list[SEOIssue] = Field(
        default_factory=list, description="List of issues found"
    )
    summary: AuditSummary | None = Field(default=None, description="Summary statistics")


def generate_summary(issues: list[SEOIssue]) -> AuditSummary:
    """Generate summary statistics from issues list."""
    by_category: dict[str, int] = {}

    for issue in issues:
        cat = issue.category.value
        by_category[cat] = by_category.get(cat, 0) + 1

    return AuditSummary(
        total_issues=len(issues),
        high_priority=sum(1 for i in issues if i.severity == IssueSeverity.HIGH),
        medium_priority=sum(1 for i in issues if i.severity == IssueSeverity.MEDIUM),
        low_priority=sum(1 for i in issues if i.severity == IssueSeverity.LOW),
        by_category=by_category,
    )
