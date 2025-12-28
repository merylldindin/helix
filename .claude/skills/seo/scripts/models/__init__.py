"""Pydantic models for SEO audit reports."""

from .reports import (
    AuditSummary,
    IssueCategory,
    IssueSeverity,
    SEOAuditReport,
    SEOIssue,
    generate_summary,
)

__all__ = [
    "AuditSummary",
    "IssueCategory",
    "IssueSeverity",
    "SEOAuditReport",
    "SEOIssue",
    "generate_summary",
]
