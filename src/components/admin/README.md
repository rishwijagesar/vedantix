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

## Recommended Migration Strategy for AdminCRM.jsx

1. Replace local constants with imports from `config` and `constants`.
2. Replace inline helper functions with imports from `utils`.
3. Replace direct fetch calls with imports from `services`.
4. Replace inline JSX sections with components from `sections`.
5. Move stateful logic into hooks.

## Supported Domains

- CRM
- Leads
- Provisioning
- Mailboxes
- Finance
- Settings
