export { useContactsList, useContactDetail } from './services/contacts.queries';
export { useCreateContact, useUpdateContact, useDeleteContact } from './services/contacts.mutations';
export type {
  ContactListItem,
  ContactDetail,
  CreateContactPayload,
  UpdateContactPayload,
} from './services/contacts.service';
export { ContactsPageContainer } from './components/contacts-page';
export { ContactDetailPageContainer } from './components/contact-detail-page';

