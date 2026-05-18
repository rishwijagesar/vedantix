import { useMemo, useState } from 'react';

export const DEFAULT_CUSTOMER_FORM = {
  companyName: '',
  contactName: '',
  email: '',
  phone: '',
  domain: '',
  packageCode: 'STARTER',
  extras: [],
  notes: '',
  address: '',
  postalCode: '',
  city: '',
  country: 'Nederland',
  selectedMailboxLocalParts: ['info'],
  includedMailboxes: 1,
  extraMailboxes: 0,
};

export default function useCustomerForm(initialValues = {}) {
  const [form, setForm] = useState({
    ...DEFAULT_CUSTOMER_FORM,
    ...initialValues,
  });

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateForm = (patch) => {
    setForm((prev) => ({
      ...prev,
      ...patch,
    }));
  };

  const resetForm = () => {
    setForm({
      ...DEFAULT_CUSTOMER_FORM,
      ...initialValues,
    });
  };

  const payload = useMemo(
    () => ({
      ...form,
      selectedMailboxLocalParts: Array.from(
        new Set(
          (form.selectedMailboxLocalParts || [])
            .map((item) => String(item || '').trim().toLowerCase())
            .filter(Boolean)
        )
      ),
    }),
    [form]
  );

  return {
    form,
    setForm,
    updateField,
    updateForm,
    resetForm,
    payload,
  };
}
