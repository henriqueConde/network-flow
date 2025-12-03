import { useState } from 'react';
import { z } from 'zod';

const EditMessageSchema = z.object({
  body: z.string().min(1, 'Message is required'),
  sentAt: z.string().datetime(),
});

type EditMessageFormValues = z.infer<typeof EditMessageSchema>;
type EditMessageErrors = Partial<Record<keyof EditMessageFormValues, string>>;

export function useEditMessageDialog(
  onSubmit: (values: EditMessageFormValues, messageId: string) => Promise<void> | void,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [messageId, setMessageId] = useState<string | null>(null);
  const [values, setValues] = useState<EditMessageFormValues>({
    body: '',
    sentAt: new Date().toISOString(),
  });
  const [errors, setErrors] = useState<EditMessageErrors>({});

  const open = (msgId: string, currentBody: string, currentSentAt: Date) => {
    setMessageId(msgId);
    setIsOpen(true);
    setValues({
      body: currentBody,
      sentAt: currentSentAt.toISOString(),
    });
    setErrors({});
  };

  const close = () => {
    setIsOpen(false);
    setMessageId(null);
    setValues({
      body: '',
      sentAt: new Date().toISOString(),
    });
    setErrors({});
  };

  const changeField = (field: keyof EditMessageFormValues, value: string) => {
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

  const submit = async () => {
    if (!messageId) return;
    try {
      const validated = EditMessageSchema.parse(values);
      await onSubmit(validated, messageId);
      close();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: EditMessageErrors = {};
        error.issues.forEach((issue) => {
          const path = issue.path[0] as keyof EditMessageFormValues | undefined;
          if (path) {
            fieldErrors[path] = issue.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  return {
    isOpen,
    messageId,
    values,
    errors,
    open,
    close,
    changeField,
    submit,
  };
}

