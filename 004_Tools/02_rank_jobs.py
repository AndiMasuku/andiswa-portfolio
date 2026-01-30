"""
Job Ranking Script
==================
Adds a 'Rank' column to applications_tracker.csv based on:
- Applied status (highest priority)
- Date Posted (older = higher priority for Not Applied)
- Skillset match (jobs outside skillset get lowest priority)

Usage: python rank_jobs.py
"""

import csv
import os
from datetime import datetime
from pathlib import Path

# Define paths
SCRIPT_DIR = Path(__file__).parent
TRACKER_PATH = SCRIPT_DIR.parent / "applications_tracker.csv"
OUTPUT_PATH = SCRIPT_DIR.parent / "applications_tracker.csv"  # Overwrite original

# CV Skillset - extracted from Andiswa Masuku's CV
# These are SPECIFIC field-related terms, not generic keywords
SKILLSET_FIELDS = [
    # Environmental & Ecology
    "environmental",
    "ecology",
    "ecologist",
    "conservation",
    "biodiversity",
    "wildlife",
    "marine",
    "sustainability",
    "esg",
    "climate",
    "eia",  # Environmental Impact Assessment
    
    # Biological Sciences
    "biological",
    "biologist",
    "biology",
    "zoology",
    "zoologist",
    "animal behavior",
    "ethology",
    "genetics",
    "molecular",
    "bioprocess",
    
    # Food Science
    "food science",
    "food scientist",
    "food technologist",
    "food quality",
    "food safety",
    "nutrition",
    
    # Research & Science (specific contexts)
    "research assistant",
    "research officer",
    "research analyst",
    "scientific officer",
    "scientific writer",
    
    # Lab (biological/environmental context)
    "lab analyst",
    "laboratory technician",
    
    # Data (in scientific context)
    "data analyst",
    "data scientist",
    
    # GIS/Spatial
    "spatial",
    "gis",
    
    # M&E / Programme work
    "monitoring and evaluation",
    "m&e officer",
    "programme officer",
    "project coordinator",
    
    # Grad/Entry level programs (environmental/science focus)
    "graduate programme",
    "graduate trainee",
    "intern",
    "internship",
]

# Unrelated fields that should NOT match even if they have "analyst" or "scientist"
UNRELATED_CONTEXTS = [
    "nuclear",
    "actuarial",
    "financial analyst",
    "business analyst",
    "it analyst",
    "systems analyst",
    "security",
    "cyber",
    "network",
    "software",
    "developer",
    "engineer",  # except environmental engineer
    "medical",
    "nursing",
    "health",  # except if environmental health
    "pharmaceutical",
    "insurance",
    "banking",
    "investment",
    "legal",
    "attorney",
]

# Roles requiring PhD/Postdoc credentials user doesn't have
DISQUALIFYING_KEYWORDS = [
    "postdoc",
    "postdoctoral",
    "phd req",
    "doctoral",
    "senior (6 years",
    "senior (project manager)",
    "chief",
    "general manager",
    "manager",
    "director",
    "head of",
    "senior (manager)",
    "senior (chief)",
    "senior (grade a)",
]

# Completely unrelated fields
UNRELATED_FIELDS = [
    "sales",
    "accountant",
    "bookkeeper",
    "electrician",
    "mechanic",
    "plumber",
    "driver",
    "chef",
    "pastry",
    "attorney",
    "lawyer",
    "nurse",
    "payroll",
    "refrigeration",
    "hvac",
    "store manager",
    "branch manager",
    "truck",
    "fleet",
    "debt collection",
    "telemarketer",
    "car wash",
    "handyman",
    "fitter",
    "automation engineer",
    "retail",
    "property",
    "conveyancing",
    "financial controller",
    "financial manager",
    "draughtsperson",
    "treasury",
    "treasurer",
    "insurance",
    "bank",
    "credit control",
]


def parse_date(date_str):
    """Parse date string to datetime, return None if invalid."""
    if not date_str or date_str.strip().lower() in ["", "recent", "not listed"]:
        return None
    
    date_str = date_str.strip()
    
    # Try DD/MM/YYYY format
    try:
        return datetime.strptime(date_str, "%d/%m/%Y")
    except ValueError:
        pass
    
    # Try YYYY-MM-DD format
    try:
        return datetime.strptime(date_str, "%Y-%m-%d")
    except ValueError:
        pass
    
    return None


def is_skillset_match(row):
    """
    Check if job matches user's skillset.
    Returns: 'match', 'disqualified', or 'unrelated'
    """
    search_term = row.get("Search_Term", "").lower()
    position = row.get("Position", "").lower()
    experience = row.get("Experience_Level", "").lower()
    combined = f"{search_term} {position} {experience}"
    
    # First check for unrelated contexts (nuclear, actuarial, etc.)
    for context in UNRELATED_CONTEXTS:
        if context in combined:
            # Exception: "environmental engineer" should still match
            if context == "engineer" and "environmental" in combined:
                continue
            # Exception: "environmental health" should still match
            if context == "health" and "environmental" in combined:
                continue
            return "unrelated"
    
    # Check for disqualifying credentials (PhD, senior management, etc.)
    for keyword in DISQUALIFYING_KEYWORDS:
        if keyword in combined:
            return "disqualified"
    
    # Check for completely unrelated fields (retail, trades, etc.)
    for keyword in UNRELATED_FIELDS:
        if keyword in position:
            return "unrelated"
    
    # Check for skillset match using specific field terms
    for skill in SKILLSET_FIELDS:
        if skill in search_term or skill in position:
            return "match"
    
    # Default to unrelated if no match found
    return "unrelated"


def get_status(row):
    """Get application status. Returns 'Applied', 'Not Applied', or None."""
    status = row.get("Status", "").strip()
    date_applied = row.get("Date_Applied", "").strip()
    
    if status.lower() == "applied" or date_applied:
        return "Applied"
    elif status.lower() in ["", "not applied"]:
        return "Not Applied"
    return None


def rank_jobs(input_path, output_path):
    """Read CSV, calculate ranks, and write updated CSV with Rank column."""
    
    # Read all rows
    rows = []
    warnings = []
    
    with open(input_path, "r", encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        
        for idx, row in enumerate(reader, start=2):  # Start at 2 (header is row 1)
            row["_original_idx"] = idx
            rows.append(row)
    
    # Categorize jobs
    applied_jobs = []
    not_applied_match = []
    not_applied_disqualified = []
    not_applied_unrelated = []
    ambiguous_rows = []
    
    for row in rows:
        status = get_status(row)
        date_posted = parse_date(row.get("Date_Posted", ""))
        match_status = is_skillset_match(row)
        
        # Check for ambiguous/missing data
        has_issue = False
        issues = []
        
        if date_posted is None and row.get("Date_Posted", "").strip().lower() not in ["recent"]:
            if row.get("Date_Posted", "").strip():
                issues.append(f"Invalid date format: '{row.get('Date_Posted', '')}'")
                has_issue = True
            else:
                issues.append("Missing Date_Posted")
                has_issue = True
        
        row["_date_posted"] = date_posted
        row["_match_status"] = match_status
        row["_has_issue"] = has_issue
        row["_issues"] = issues
        
        if status == "Applied":
            applied_jobs.append(row)
        elif status == "Not Applied":
            if has_issue:
                ambiguous_rows.append(row)
            elif match_status == "match":
                not_applied_match.append(row)
            elif match_status == "disqualified":
                not_applied_disqualified.append(row)
            else:
                not_applied_unrelated.append(row)
        else:
            # Ambiguous status
            row["_issues"].append("Unclear application status")
            ambiguous_rows.append(row)
    
    # Sort by date (oldest first) - use original index as tiebreaker
    def date_sort_key(row):
        dt = row.get("_date_posted")
        if dt is None:
            # "Recent" dates go to the end within their category
            return (datetime.max, row["_original_idx"])
        return (dt, row["_original_idx"])
    
    applied_jobs.sort(key=date_sort_key)
    not_applied_match.sort(key=date_sort_key)
    not_applied_disqualified.sort(key=date_sort_key)
    not_applied_unrelated.sort(key=date_sort_key)
    
    # Assign ranks
    rank = 1
    
    # 1. Applied jobs first (highest priority)
    for row in applied_jobs:
        row["Rank"] = str(rank)
        rank += 1
    
    # 2. Not Applied - Skills Match (second priority, older dates first)
    for row in not_applied_match:
        row["Rank"] = str(rank)
        rank += 1
    
    # 3. Not Applied - Disqualified (lower priority)
    for row in not_applied_disqualified:
        row["Rank"] = str(rank)
        rank += 1
    
    # 4. Not Applied - Unrelated (lowest priority)
    for row in not_applied_unrelated:
        row["Rank"] = str(rank)
        rank += 1
    
    # 5. Ambiguous rows - no rank
    for row in ambiguous_rows:
        row["Rank"] = ""
        line_num = row["_original_idx"]
        warning_msg = f"Row {line_num}: {'; '.join(row['_issues'])}"
        warnings.append(warning_msg)
    
    # Prepare output fieldnames
    output_fieldnames = list(fieldnames) + ["Rank"]
    
    # Create row lookup by original index
    all_rows_ranked = {r["_original_idx"]: r for r in rows}
    
    # Write output in ORIGINAL order with Rank appended
    with open(output_path, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=output_fieldnames)
        writer.writeheader()
        
        for idx in sorted(all_rows_ranked.keys()):
            row = all_rows_ranked[idx]
            # Remove internal tracking fields
            output_row = {k: v for k, v in row.items() if not k.startswith("_")}
            writer.writerow(output_row)
    
    # Generate warning output
    warning_text = "=" * 60 + "\n"
    warning_text += "JOB RANKING WARNING REPORT\n"
    warning_text += "=" * 60 + "\n\n"
    
    if warnings:
        warning_text += f"Total rows with blank ranks: {len(warnings)}\n\n"
        warning_text += "Affected rows:\n"
        warning_text += "-" * 40 + "\n"
        for w in warnings:
            warning_text += f"  {w}\n"
    else:
        warning_text += "No issues found. All rows ranked successfully.\n"
    
    warning_text += "\n" + "=" * 60 + "\n"
    warning_text += "RANKING SUMMARY\n"
    warning_text += "=" * 60 + "\n"
    warning_text += f"Applied jobs (Rank 1-{len(applied_jobs)}): {len(applied_jobs)}\n"
    warning_text += f"Skillset match jobs: {len(not_applied_match)}\n"
    warning_text += f"Disqualified jobs (credentials): {len(not_applied_disqualified)}\n"
    warning_text += f"Unrelated jobs: {len(not_applied_unrelated)}\n"
    warning_text += f"Ambiguous/blank rank: {len(ambiguous_rows)}\n"
    warning_text += f"Total: {len(rows)}\n"
    
    return warning_text


if __name__ == "__main__":
    print("Processing job applications tracker...")
    print(f"Input: {TRACKER_PATH}")
    print(f"Output: {OUTPUT_PATH}")
    print()
    
    if not TRACKER_PATH.exists():
        print(f"ERROR: Tracker file not found at {TRACKER_PATH}")
        exit(1)
    
    warnings = rank_jobs(TRACKER_PATH, OUTPUT_PATH)
    print(warnings)
    
    print("\nDone! Rank column has been added to applications_tracker.csv")
