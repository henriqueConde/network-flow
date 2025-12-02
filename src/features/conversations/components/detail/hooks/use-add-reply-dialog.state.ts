import { useState } from 'react';
import { z } from 'zod';
import { messageSideSchema } from '@/shared/types';

const AddReplySchema = z.object({
  body: z.string().min(1, 'Message is required'),
  sender: messageSideSchema,
  sentAt: z.string().datetime(),
});

type AddReplyFormValues = z.infer<typeof AddReplySchema>;

type AddReplyErrors = Partial<Record<keyof AddReplyFormValues, string>>;

export function useAddReplyDialog(onSubmit: (values: AddReplyFormValues) => Promise<void> | void) {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<AddReplyFormValues>({
    body: '',
    sender: 'user',
    sentAt: new Date().toISOString(),
  });
  const [errors, setErrors] = useState<AddReplyErrors>({});

  const open = () => {
    setIsOpen(true);
    setValues({
      body: '',
      sender: 'user',
      sentAt: new Date().toISOString(),
    });
    setErrors({});
  };

  const close = () => {
    setIsOpen(false);
    setValues({
      body: '',
      sender: 'user',
      sentAt: new Date().toISOString(),
    });
    setErrors({});
  };

  const changeField = (
    field: keyof AddReplyFormValues,
    value: string | 'user' | 'contact',
  ) => {
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
    try {
      const validated = AddReplySchema.parse(values);
      await onSubmit(validated);
      close();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: AddReplyErrors = {};
        error.issues.forEach((issue) => {
          const path = issue.path[0] as keyof AddReplyFormValues | undefined;
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
    values,
    errors,
    open,
    close,
    changeField,
    submit,
  };
}

