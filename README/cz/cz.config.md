# ex czrc-config.json

## 大体の概要

- -g
  - git cz
- devdepen

  - hook
    - npm run commit

- adaptor
  - cz-conventional-changelog
  - cz-customize

```.json
{
  "types": [
    {
      "value": "build",
      "name": "👷 build:    Changes that affect the build system or dependencies"
    },
    {
      "value": "ci",
      "name": "💻 ci:       Changes to our CI configuration files and scripts"
    },
    {
      "value": "docs",
      "name": "📖 docs:     Documentation only changes"
    },
    {
      "value": "feat",
      "name": "✨ feat:     New feature [minor version: 0.v.0]"
    },
    {
      "value": "fix",
      "name": "🐛 fix:      Bug fix [patch version: 0.0.v]"
    },
    {
      "value": "perf",
      "name": "📈 perf:     Change that improves performance"
    },
    {
      "value": "refactor",
      "name": "🏗  refactor: Change that neither fixes a bug nor adds a feature"
    },
    {
      "value": "release",
      "name": "🚀 release:  A new project version"
    },
    {
      "value": "revert",
      "name": "🔥 revert:   Revert, must contains reverted commit header"
    },
    {
      "value": "test",
      "name": "🚨 test:     Adding missing tests or correcting existing tests"
    }
  ],

  "allowTicketNumber": false,
  "isTicketNumberRequired": false,
  "ticketNumberPrefix": "",
  "ticketNumberRegExp": "#\\d{1,5}",

  "messages": {
    "type": "Select the type of change that you're committing:\n",
    "scope": "Denote the scope of this change (optional):\n",
    "customScope": "What is the scope of this change: <press enter to skip>\n",
    "ticketNumber": "Enter the ticket number (e.g. #42): <press enter to skip>\n",
    "subject": "Write a short, imperative tense description of the change (max 80 chars):\n",
    "body": "Provide a long description of the change (Use \"|\" to break new line): <press enter to skip>\n",
    "breaking": "List with commas any breaking changes [major version: V.0.0]: <press enter to skip>\n",
    "footer": "List with commas any affected open issues (e.g. #42, #43): <press enter to skip>\n",
    "confirmCommit": "Are you sure you want to proceed with the commit above?"
  },

  "scopeOverrides": {
    "build": [],
    "ci": [],
    "feat": [],
    "fix": [],
    "perf": [],
    "refactor": [],
    "revert": [],
    "test": []
  },

  "appendBranchNameToCommitMessage": true,
  "allowCustomScopes": true,
  "askForBreakingChangeFirst": false,
  "allowBreakingChanges": ["feat", "fix"],
  "skipQuestions": [],
  "subjectLimit": 80,
  "breaklineChar": "|",
  "breakingPrefix": "BREAKING CHANGE:",
  "footerPrefix": "fixes"
}
```
