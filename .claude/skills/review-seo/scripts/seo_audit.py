#!/usr/bin/env python3
"""
SEO Audit orchestrator for Helix portfolio website.

Usage:
    python seo_audit.py --all              # Full audit (source files)
    python seo_audit.py --live             # Live site audit (deployed)
    python seo_audit.py --all --live       # Both source and live audits
    python seo_audit.py --meta             # Meta tags only
    python seo_audit.py --schema           # Schema.org only
    python seo_audit.py --content          # Content analysis only
    python seo_audit.py --technical        # Technical SEO only
    python seo_audit.py --pages LANDING_PAGE VENTURES_PAGE  # Specific pages
"""

import argparse
import sys
from datetime import datetime
from pathlib import Path

# Add scripts directory to path for imports
SCRIPTS_DIR = Path(__file__).parent
SKILL_DIR = SCRIPTS_DIR.parent
sys.path.insert(0, str(SCRIPTS_DIR))

from models.reports import IssueSeverity, SEOAuditReport, SEOIssue, generate_summary
from validators import (
    ContentAnalyzer,
    LiveSiteValidator,
    MetaValidator,
    SchemaValidator,
    TechnicalSEOChecker,
)

# Paths
PROJECT_ROOT = Path(__file__).parent.parent.parent.parent.parent
OUTPUT_DIR = SCRIPTS_DIR / "output"


def run_audit(
    include_meta: bool = True,
    include_schema: bool = True,
    include_content: bool = True,
    include_technical: bool = True,
    include_live: bool = False,
    pages: list[str] | None = None,
) -> SEOAuditReport:
    """Run SEO audit with specified validators."""
    issues: list[SEOIssue] = []

    # Source file audits
    if any(
        [
            include_meta,
            include_schema,
            include_content,
            include_technical,
        ]
    ):
        print(f"Auditing source: {PROJECT_ROOT}")
        print("-" * 60)

        if include_meta:
            print("Running meta tags validation...")
            validator = MetaValidator(PROJECT_ROOT)
            meta_issues = validator.validate_all_pages(pages)
            issues.extend(meta_issues)
            print(f"  Found {len(meta_issues)} issues")

        if include_schema:
            print("Running Schema.org validation...")
            validator = SchemaValidator(PROJECT_ROOT)
            schema_issues = validator.validate_all_schemas()
            issues.extend(schema_issues)
            print(f"  Found {len(schema_issues)} issues")

        if include_content:
            print("Running content analysis...")
            analyzer = ContentAnalyzer(PROJECT_ROOT)
            content_issues = analyzer.analyze_all_pages(pages)
            issues.extend(content_issues)
            print(f"  Found {len(content_issues)} issues")

        if include_technical:
            print("Running technical SEO checks...")
            checker = TechnicalSEOChecker(PROJECT_ROOT)
            tech_issues = checker.check_all()
            issues.extend(tech_issues)
            print(f"  Found {len(tech_issues)} issues")

    # Live site audit
    if include_live:
        print("\n" + "-" * 60)
        print("Auditing live site: https://merylldindin.com")
        print("-" * 60)
        print("Running live site validation...")
        live_validator = LiveSiteValidator()
        live_issues = live_validator.validate()
        issues.extend(live_issues)
        print(f"  Found {len(live_issues)} issues")

    return SEOAuditReport(
        timestamp=datetime.now().isoformat(),
        issues=issues,
        summary=generate_summary(issues),
    )


def print_summary(report: SEOAuditReport) -> None:
    """Print audit summary to console."""
    print("\n" + "=" * 60)
    print("SEO AUDIT SUMMARY")
    print("=" * 60)

    if report.summary:
        print(f"\nTotal issues: {report.summary.total_issues}")
        print(f"  HIGH:   {report.summary.high_priority}")
        print(f"  MEDIUM: {report.summary.medium_priority}")
        print(f"  LOW:    {report.summary.low_priority}")

        if report.summary.by_category:
            print("\nBy category:")
            for cat, count in report.summary.by_category.items():
                print(f"  {cat}: {count}")

    # Print high priority issues
    high_issues = [i for i in report.issues if i.severity == IssueSeverity.HIGH]
    if high_issues:
        print("\n" + "-" * 60)
        print("HIGH PRIORITY ISSUES:")
        print("-" * 60)
        for issue in high_issues[:10]:
            print(f"\n[{issue.category.value}] {issue.page}")
            print(f"  Problem: {issue.message}")
            print(f"  Fix: {issue.recommendation}")
            if issue.code_example:
                print(f"  Example: {issue.code_example[:100]}")


def main() -> None:
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description="SEO Audit for Helix Portfolio",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python seo_audit.py --all              # Full audit
  python seo_audit.py --live             # Live site only
  python seo_audit.py --meta --schema    # Meta and Schema only
  python seo_audit.py --pages LANDING_PAGE  # Specific page
        """,
    )

    parser.add_argument("--meta", action="store_true", help="Validate meta tags")
    parser.add_argument("--schema", action="store_true", help="Validate Schema.org")
    parser.add_argument("--content", action="store_true", help="Analyze content")
    parser.add_argument("--technical", action="store_true", help="Check technical SEO")
    parser.add_argument("--live", action="store_true", help="Audit live deployed site")
    parser.add_argument("--all", action="store_true", help="Run all source validators")
    parser.add_argument("--pages", nargs="*", help="Specific page names to audit")
    parser.add_argument("--json", action="store_true", help="Output JSON only")

    args = parser.parse_args()

    # Determine scope
    has_source_flags = any([args.meta, args.schema, args.content, args.technical])

    # If --live only, skip source validators
    if args.live and not args.all and not has_source_flags:
        run_source = False
    elif args.all or not has_source_flags:
        run_source = True
    else:
        run_source = False

    # Run audit
    report = run_audit(
        include_meta=run_source or args.meta,
        include_schema=run_source or args.schema,
        include_content=run_source or args.content,
        include_technical=run_source or args.technical,
        include_live=args.live,
        pages=args.pages,
    )

    # Save report
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    report_file = OUTPUT_DIR / f"seo-report-{timestamp}.json"
    report_file.write_text(report.model_dump_json(indent=2))

    if args.json:
        print(report.model_dump_json(indent=2))
    else:
        print(f"\nReport saved: {report_file}")
        print_summary(report)


if __name__ == "__main__":
    main()
