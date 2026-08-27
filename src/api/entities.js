/**
 * Temporary public-frontend adapter for the Base44 migration.
 *
 * The old admin/CRM backend is intentionally not carried over. The public
 * planning page is kept visually intact, but the current production database
 * has no Availability records, so an empty read preserves today's public state
 * until the appointments backend is redesigned.
 */
const BACKEND_NOT_CONFIGURED = "Afsprakenbackend is nog niet gekoppeld.";

function readOnlyEmptyEntity() {
  return {
    async list() {
      return [];
    },
    async filter() {
      return [];
    },
    async get() {
      return null;
    },
    async create() {
      throw new Error(BACKEND_NOT_CONFIGURED);
    },
    async update() {
      throw new Error(BACKEND_NOT_CONFIGURED);
    },
    async delete() {
      throw new Error(BACKEND_NOT_CONFIGURED);
    },
  };
}

export const Availability = readOnlyEmptyEntity();
export const Appointment = readOnlyEmptyEntity();

// Legacy exports remain as inert adapters so any accidentally retained import
// fails closed instead of reconnecting the removed Base44 backoffice.
export const Client = readOnlyEmptyEntity();
export const ChangeRequest = readOnlyEmptyEntity();
export const EmailTemplate = readOnlyEmptyEntity();
export const EmailLog = readOnlyEmptyEntity();

export const User = {
  async me() {
    return null;
  },
  async logout() {},
};
