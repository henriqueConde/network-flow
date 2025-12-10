export { useContactsList, useContactDetail } from './services/contacts.queries';
export { useCreateContact, useUpdateContact, useDeleteContact } from './services/contacts.mutations';
export type {
  ContactListItem,
  ContactDetail,
  CreateContactPayload,
  UpdateContactPayload,
} from './services/contacts.service';

