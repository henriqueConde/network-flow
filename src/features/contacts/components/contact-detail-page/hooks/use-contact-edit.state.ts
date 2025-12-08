import { useState, useEffect } from 'react';
import type { ContactDetail } from '../../../services/contacts.service';

type EditValues = {
  name: string;
  firstName: string;
  lastName: string;
  headlineOrRole: string | null;
  position: string | null;
  company: string | null;
  companyId: string | null;
  email: string | null;
  linkedinUrl: string | null;
  connectedOn: string | null;
  primaryPlatform: string | null;
  tags: string[];
  warmOrCold: 'warm' | 'cold' | null;
  commonGround: string | null;
  firstMessageDate: string | null;
  referralGiven: boolean;
  referralGivenAt: string | null;
  referralDetails: string | null;
  connectionRequestSentAt: string | null;
  connectionAcceptedAt: string | null;
  connectionStatus: 'not_connected' | 'request_sent' | 'connected' | null;
  dmSentAt: string | null;
  lastFollowUpAt: string | null;
  contactType: string | null;
  strategyIds: string[];
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
    companyId: null,
    email: null,
    linkedinUrl: null,
    connectedOn: null,
    primaryPlatform: null,
    tags: [],
    warmOrCold: null,
    commonGround: null,
    firstMessageDate: null,
    referralGiven: false,
    referralGivenAt: null,
    referralDetails: null,
    connectionRequestSentAt: null,
    connectionAcceptedAt: null,
    connectionStatus: null,
    dmSentAt: null,
    lastFollowUpAt: null,
    contactType: null,
    strategyIds: [],
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
        companyId: contact.companyId,
        email: contact.email,
        linkedinUrl,
        connectedOn: null, // This will come from LinkedIn API later
        primaryPlatform: contact.primaryPlatform,
        tags: contact.tags,
        warmOrCold: contact.warmOrCold,
        commonGround: contact.commonGround,
        firstMessageDate: contact.firstMessageDateDate ? contact.firstMessageDateDate.toISOString() : null,
        referralGiven: contact.referralGiven,
        referralGivenAt: contact.referralGivenAtDate ? contact.referralGivenAtDate.toISOString() : null,
        referralDetails: contact.referralDetails,
        connectionRequestSentAt: contact.connectionRequestSentAtDate ? contact.connectionRequestSentAtDate.toISOString() : null,
        connectionAcceptedAt: contact.connectionAcceptedAtDate ? contact.connectionAcceptedAtDate.toISOString() : null,
        connectionStatus: contact.connectionStatus,
        dmSentAt: contact.dmSentAtDate ? contact.dmSentAtDate.toISOString() : null,
        lastFollowUpAt: contact.lastFollowUpAtDate ? contact.lastFollowUpAtDate.toISOString() : null,
        contactType: contact.contactType,
        strategyIds: contact.strategyIds,
      });
    }
  }, [contact]);

  const changeField = (field: keyof EditValues, value: string | string[] | boolean | null) => {
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
        companyId: contact.companyId,
        email: contact.email,
        linkedinUrl,
        connectedOn: null,
        primaryPlatform: contact.primaryPlatform,
        tags: contact.tags,
        warmOrCold: contact.warmOrCold,
        commonGround: contact.commonGround,
        firstMessageDate: contact.firstMessageDateDate ? contact.firstMessageDateDate.toISOString() : null,
        referralGiven: contact.referralGiven,
        referralGivenAt: contact.referralGivenAtDate ? contact.referralGivenAtDate.toISOString() : null,
        referralDetails: contact.referralDetails,
        connectionRequestSentAt: contact.connectionRequestSentAtDate ? contact.connectionRequestSentAtDate.toISOString() : null,
        connectionAcceptedAt: contact.connectionAcceptedAtDate ? contact.connectionAcceptedAtDate.toISOString() : null,
        connectionStatus: contact.connectionStatus,
        dmSentAt: contact.dmSentAtDate ? contact.dmSentAtDate.toISOString() : null,
        lastFollowUpAt: contact.lastFollowUpAtDate ? contact.lastFollowUpAtDate.toISOString() : null,
        contactType: contact.contactType,
        strategyIds: contact.strategyIds,
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

    // Helper to convert empty strings to null
    const toNullIfEmpty = (val: string | null | undefined) => (val === '' ? null : val);

    return {
      name: newName,
      headlineOrRole: toNullIfEmpty(values.headlineOrRole) || null,
      company: toNullIfEmpty(values.company) || null,
      companyId: values.companyId || null,
      primaryPlatform: toNullIfEmpty(values.primaryPlatform) || null,
      profileLinks: Object.keys(profileLinks).length > 0 ? profileLinks : null,
      tags: values.tags,
      email: toNullIfEmpty(values.email) || null,
      warmOrCold: values.warmOrCold || null,
      commonGround: toNullIfEmpty(values.commonGround) || null,
      firstMessageDate: toNullIfEmpty(values.firstMessageDate) || null,
      referralGiven: values.referralGiven || false,
      referralGivenAt: toNullIfEmpty(values.referralGivenAt) || null,
      referralDetails: toNullIfEmpty(values.referralDetails) || null,
      connectionRequestSentAt: toNullIfEmpty(values.connectionRequestSentAt) || null,
      connectionAcceptedAt: toNullIfEmpty(values.connectionAcceptedAt) || null,
      connectionStatus: values.connectionStatus || null,
      dmSentAt: toNullIfEmpty(values.dmSentAt) || null,
      lastFollowUpAt: toNullIfEmpty(values.lastFollowUpAt) || null,
      contactType: toNullIfEmpty(values.contactType) || null,
      strategyIds: values.strategyIds || [],
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

