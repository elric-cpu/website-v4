# State Models

## Auth Session

States: `anonymous` -> `authenticating` -> `authenticated` -> `expired`
Invalid: `authenticated` -> `anonymous` without `signOut` (unless token revoked)

| From           | Event         | To             | Notes                     |
| -------------- | ------------- | -------------- | ------------------------- |
| anonymous      | submit login  | authenticating | network isolated in tests |
| authenticating | success       | authenticated  | role decides portal route |
| authenticated  | refresh       | authenticated  | session restored          |
| authenticated  | signOut       | anonymous      | clear tokens              |
| authenticated  | token revoked | expired        | redirect to login         |

## Commercial Agreement Funnel

States: `step-1` -> `step-2` -> `step-3` -> `submitted`
Invalid: `step-2` -> `submitted` without required fields

| From   | Event            | To        | Invalid cases                 |
| ------ | ---------------- | --------- | ----------------------------- |
| step-1 | continue (valid) | step-2    | missing company/contact/email |
| step-2 | continue (valid) | step-3    | missing address/type          |
| step-3 | submit           | submitted | missing term/tier/cadence     |

## Client Portal Documents (CRUD)

States: `empty` -> `uploaded` -> `deleted`
Invalid: `deleted` -> `uploaded` without file selection
