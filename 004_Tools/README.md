# Tools Folder

This folder contains utility scripts for managing job search documents.

## Available Tools

| Script | Purpose | Usage |
|--------|---------|-------|
| `01_md_to_docx.py` | Convert Markdown files to Word documents | `python 01_md_to_docx.py input.md output.docx` |
| `02_rank_jobs.py` | Rank job applications based on fit and priority | `python 02_rank_jobs.py` |

## Requirements

Install dependencies before running:

```bash
pip install python-docx
```

## Quick Usage

### Convert a CV or Cover Letter to Word

```bash
python 01_md_to_docx.py "../002_Applications/01_DigbyWells_CV.md" "output.docx"
```

Or run without arguments for interactive mode:

```bash
python 01_md_to_docx.py
```

### Rank Job Applications

```bash
python 02_rank_jobs.py
```

This will update `applications_tracker.csv` with a `Rank` column based on:
- Application status (Applied jobs first)
- Date posted (older posts get priority)
- Skillset match (jobs outside your field get lowest priority)
