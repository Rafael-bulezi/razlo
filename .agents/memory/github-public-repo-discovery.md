---
name: GitHub public repository discovery
description: How to recover from a user-supplied GitHub repository URL that returns 404.
---

When a public GitHub repository URL returns 404, search GitHub's public repository API before concluding that authorization is required; owner casing, punctuation, and repository capitalization can differ from the supplied name.

**Why:** Public repositories can be downloadable without OAuth, but GitHub paths may not match the user's informal spelling exactly.

**How to apply:** Query `https://api.github.com/search/repositories?q=<repo>` and use the returned `full_name` and `default_branch` for archive downloads or further inspection.