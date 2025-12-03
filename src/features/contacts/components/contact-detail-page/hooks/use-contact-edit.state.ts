import { useState, useEffect } from 'react';
import type { ContactDetail } from '../../../services/contacts.service';

type EditValues = {
  name: string;
  firstName: string;
  lastName: string;
  headlineOrRole: string | null;
  position: string | null;
  company: string | null;
  email: string | null;
  linkedinUrl: string | null;
  connectedOn: string | null;
  primaryPlatform: string | null;
  tags: string[];
  categoryId: string | null;
  stageId: string | null;
};

type EditErrors = Partial<Record<keyof EditValues, string>>;

export function useContactEdit(contact: ContactDetail | null) {
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState<EditValues>({
    name: '',
    firstName: '',
    lastName: '',
    headlineOrRole: null,
    position: null,
    company: null,
    email: null,
    linkedinUrl: null,
    connectedOn: null,
    primaryPlatform: null,
    tags: [],
    categoryId: null,
    stageId: null,
  });
  const [errors, setErrors] = useState<EditErrors>({});

  // Initialize values from contact
  useEffect(() => {
    if (contact) {
      const linkedinUrl = contact.profileLinks?.linkedin || null;
      // Parse name into first and last name
      const nameParts = contact.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      setValues({
        name: contact.name,
        firstName,
        lastName,
        headlineOrRole: contact.headlineOrRole,
        position: null, // This will come from LinkedIn API later
        company: contact.company,
        email: null, // This will come from LinkedIn API later
        linkedinUrl,
        connectedOn: null, // This will come from LinkedIn API later
        primaryPlatform: contact.primaryPlatform,
        tags: contact.tags,
        categoryId: contact.categoryId,
        stageId: contact.stageId,
      });
    }
  }, [contact]);

  const changeField = (field: keyof EditValues, value: string | string[] | null) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: EditErrors = {};

    if (!values.name.trim()) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    if (contact) {
      const linkedinUrl = contact.profileLinks?.linkedin || null;
      const nameParts = contact.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      setValues({
        name: contact.name,
        firstName,
        lastName,
        headlineOrRole: contact.headlineOrRole,
        position: null,
        company: contact.company,
        email: null,
        linkedinUrl,
        connectedOn: null,
        primaryPlatform: contact.primaryPlatform,
        tags: contact.tags,
        categoryId: contact.categoryId,
        stageId: contact.stageId,
      });
    }
    setErrors({});
    setIsEditing(false);
  };

  const getUpdatePayload = (contact: ContactDetail | null) => {
    if (!contact) return null;

    // Combine firstName and lastName into name, or use the name field directly
    let newName = values.name.trim();
    if (values.firstName || values.lastName) {
      const firstName = values.firstName.trim();
      const lastName = values.lastName.trim();
      newName = [firstName, lastName].filter(Boolean).join(' ') || newName;
    }

    // Build profileLinks with LinkedIn URL
    const profileLinks = contact.profileLinks || {};
    if (values.linkedinUrl) {
      profileLinks.linkedin = values.linkedinUrl;
    }

    return {
      name: newName,
      headlineOrRole: values.headlineOrRole || null,
      company: values.company || null,
      primaryPlatform: values.primaryPlatform || null,
      profileLinks: Object.keys(profileLinks).length > 0 ? profileLinks : null,
      tags: values.tags,
      categoryId: values.categoryId || null,
      stageId: values.stageId || null,
    };
  };

  return {
    isEditing,
    values,
    errors,
    changeField,
    validate,
    startEditing,
    cancelEditing,
    getUpdatePayload,
  };
}

