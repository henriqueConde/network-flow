import type { ContactDetail } from '../../../services/contacts.service';
import type { useContactEdit } from './use-contact-edit.state';
import type { useUpdateContact } from '../../../services/contacts.mutations';

/**
 * UI state hook for contact edit actions.
 * Component-level hook for orchestrating edit operations (no I/O, uses mutations).
 */
export function useContactEditActions(
    contact: ContactDetail | null,
    edit: ReturnType<typeof useContactEdit>,
    updateMutation: ReturnType<typeof useUpdateContact>,
) {
    const handleSave = async () => {
        if (!contact || !edit.validate()) {
            return;
        }

        const payload = edit.getUpdatePayload(contact);
        if (!payload) {
            return;
        }

        try {
            await updateMutation.mutateAsync({
                id: contact.id,
                payload,
            });
            edit.cancelEditing();
        } catch (err) {
            // Error handling is done by React Query
            console.error('Failed to update contact:', err);
        }
    };

    const handleCancel = () => {
        edit.cancelEditing();
    };

    const handleFieldChange = (
        field: keyof typeof edit.values,
        value: string | string[] | null,
    ) => {
        edit.changeField(field, value);
    };

    return {
        handleSave,
        handleCancel,
        handleFieldChange,
    };
}

