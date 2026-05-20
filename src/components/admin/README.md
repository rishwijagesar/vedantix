# Admin Module Architecture

This directory contains the modular building blocks for the Vedantix Admin CRM.

## Structure

- `config/` – Static configuration such as tabs.
- `constants.js` – Shared constants.
- `hooks/` – Reusable React hooks.
- `sections/` – Feature-oriented UI sections.
- `services/` – API communication helpers.
- `utils/` – Formatting and utility functions.
- `index.js` – Top-level barrel exports.

## Example Usage

```javascript
import {
  ADMIN_TABS,
  useApiConfig,
  getCustomers,
  CustomerListSection,
  formatCurrency,
} from '@/components/admin';
```

## AdminCRM.jsx

`src/pages/AdminCRM.jsx` is now a compatibility wrapper around `AdminCRMPage`.
New admin work should live in this module:

1. Static navigation/configuration belongs in `config/` and `constants.js`.
2. Stateful behavior belongs in `hooks/`.
3. API communication belongs in `services/`.
4. Formatting and small pure helpers belong in `utils/`.
5. Feature UI belongs in `sections/`.

## Supported Domains

- CRM
- Leads
- Provisioning
- Mailboxes
- Finance
- Settings
