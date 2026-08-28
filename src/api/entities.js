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
    async list(..._args) {
      return [];
    },
    async filter(..._args) {
      return [];
    },
    async get(..._args) {
      return null;
    },
    async create(..._args) {
      throw new Error(BACKEND_NOT_CONFIGURED);
    },
    async update(..._args) {
      throw new Error(BACKEND_NOT_CONFIGURED);
    },
    async delete(..._args) {
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
  async me(..._args) {
    return null;
  },
  async logout(..._args) {},
};
