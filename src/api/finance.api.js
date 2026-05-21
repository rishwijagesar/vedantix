import { apiClient } from "./client";

export async function bootstrapFinanceCustomer({
  customerId,
  companyName,
  packageCode,
  extras = [],
  monthlyRevenue,
  monthlyInfraCost = 0,
  oneTimeSetupCost = 0,
  stripeCustomerId = "",
  stripeSubscriptionId = "",
  subscriptionStatus = "",
  paymentStatus = "",
  isActive = true,
  apiKey,
}) {
  return apiClient.post(
    "/api/finance/customers/bootstrap",
    {
      customerId,
      companyName,
      packageCode,
      extras,
      monthlyRevenue,
      monthlyInfraCost,
      oneTimeSetupCost,
      stripeCustomerId,
      stripeSubscriptionId,
      subscriptionStatus,
      paymentStatus,
      isActive,
    },
    { apiKey }
  );
}

export async function fetchFinanceOverview({ range = "month", apiKey }) {
  const query = new URLSearchParams({ range }).toString();

  return apiClient.get(`/api/finance/overview?${query}`, {
    apiKey,
  });
}

export async function fetchStripeFinanceSummary({ apiKey }) {
  return apiClient.get("/api/finance/summary", {
    apiKey,
  });
}

export async function fetchFinanceCustomerDetails({
  customerId,
  range = "month",
  apiKey,
}) {
  const query = new URLSearchParams({ range }).toString();

  return apiClient.get(`/api/finance/customers/${customerId}?${query}`, {
    apiKey,
  });
}

export async function createFinanceExpense({
  title,
  amount,
  category = "Overig",
  expenseDate,
  customerId,
  apiKey,
}) {
  return apiClient.post(
    "/api/finance/expenses",
    {
      title,
      amount: Number(amount),
      category,
      expenseDate,
      customerId: customerId || undefined,
    },
    { apiKey }
  );
}

export async function deleteFinanceCustomer({ customerId, apiKey }) {
  return apiClient.delete(`/api/finance/customers/${customerId}`, {
    apiKey,
  });
}

export async function deleteFinanceExpense({ expenseId, apiKey }) {
  return apiClient.delete(`/api/finance/expenses/${expenseId}`, {
    apiKey,
  });
}
