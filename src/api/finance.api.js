import { apiClient } from "./client";

export async function bootstrapFinanceCustomer({
  customerId,
  companyName,
  packageCode,
  extras = [],
  monthlyInfraCost = 0,
  oneTimeSetupCost = 0,
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
      monthlyInfraCost,
      oneTimeSetupCost,
      isActive,
    },
    { apiKey }
  );
}

export async function fetchFinanceOverview({
  range = "month",
  apiKey,
}) {
  const query = new URLSearchParams({ range }).toString();

  return apiClient.get(`/api/finance/overview?${query}`, {
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