# DHIL

Organization repository for the DHIL, which includes default issue templates and code of conduct. See the [Github Documentation](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file) for more information.

## Issue Templates

See the [DHIL's documentation](https://sfu-dhil.github.io/dhil-docs) for issue guidelines.

We currently use [Issue Forms](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms) for our issue templates, which should work for all public repositories. However, these forms (as of Oct. 2021) will not work for private repositories. 

To use the issue templates in private repositories:

1. Clone the repository
2. Download dependencies:
 ```bash
 npm install
 ```
3. Build the markdown versions:
```bash
npm run convert
```
4. Copy the markdown files into the private repository's `.github/ISSUE_TEMPLATES` directory