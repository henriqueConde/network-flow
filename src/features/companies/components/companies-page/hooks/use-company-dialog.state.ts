import { useState } from 'react';
import { CompanyFormSchema } from '../companies-page.schema';
import type { CompanyFormValues } from '../companies-page.schema';
import type { CompanyListItem } from '../../../services/companies.service';

type SubmitHandler = (values: CompanyFormValues, editingCompany: CompanyListItem | null) => Promise<void> | void;

/**
 * UI state hook for the "Create/Edit Company" dialog.
 * Owns open/close state, form values, and validation errors.
 */
export function useCompanyDialog(onSubmit: SubmitHandler) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<CompanyListItem | null>(null);
  const [values, setValues] = useState<CompanyFormValues>({
    name: '',
    industry: '',
    fundingRound: '',
    fundingDate: '',
    fundingSource: '',
    careersPageUrl: '',
    hasRelevantRole: false,
    roleTitle: '',
    applied: false,
    applicationDate: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CompanyFormValues, string>>>({});

  const open = (company?: CompanyListItem) => {
    if (company) {
      setEditingCompany(company);
      setValues({
        name: company.name,
        industry: company.industry || '',
        fundingRound: company.fundingRound || '',
        fundingDate: company.fundingDate || '',
        fundingSource: company.fundingSource || '',
        careersPageUrl: company.careersPageUrl || '',
        hasRelevantRole: company.hasRelevantRole,
        roleTitle: company.roleTitle || '',
        applied: company.applied,
        applicationDate: company.applicationDate || '',
        notes: '',
      });
    } else {
      setEditingCompany(null);
      setValues({
        name: '',
        industry: '',
        fundingRound: '',
        fundingDate: '',
        fundingSource: '',
        careersPageUrl: '',
        hasRelevantRole: false,
        roleTitle: '',
        applied: false,
        applicationDate: '',
        notes: '',
      });
    }
    setErrors({});
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setEditingCompany(null);
  };

  const changeField = (
    field: keyof CompanyFormValues,
    value: CompanyFormValues[keyof CompanyFormValues],
  ) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submit = async () => {
    const parsed = CompanyFormSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof CompanyFormValues, string>> = {};
      parsed.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof CompanyFormValues | undefined;
        if (path && !fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    const currentEditingCompany = editingCompany;
    await onSubmit(parsed.data, currentEditingCompany);
  };

  return {
    isOpen,
    editingCompany,
    values,
    errors,
    open,
    close,
    changeField,
    submit,
  };
}




