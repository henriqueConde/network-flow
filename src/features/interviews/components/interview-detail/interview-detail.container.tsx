'use client';

import { InterviewDetailView } from './interview-detail.view';
import { INTERVIEW_DETAIL_CONFIG } from './interview-detail.config';
import { useInterviewDetail } from '../../services/interviews.queries';
import { useUpdateInterview } from '../../services/interviews.mutations';
import { useInterviewDetailNavigation } from './hooks/use-interview-detail-navigation.state';
import { useInterviewNotes } from './hooks/use-interview-notes.state';

export function InterviewDetailContainer() {
  // Navigation
  const { interviewId, handleBack, handleRelatedConversationClick, handleRelatedContactClick } =
    useInterviewDetailNavigation();

  // Data fetching
  const { data: interview, isLoading, error } = useInterviewDetail(interviewId);

  // Mutations
  const updateMutation = useUpdateInterview();

  // Notes editing state
  const notesState = useInterviewNotes(interview?.notes ?? null);

  const handleSaveNotes = async () => {
    if (!interview) return;
    await updateMutation.mutateAsync({
      id: interview.id,
      payload: { notes: notesState.notes },
    });
    notesState.cancelEdit();
  };

  return (
    <InterviewDetailView
      interview={interview ?? null}
      isLoading={isLoading}
      error={error ? 'Failed to load interview. Please try again.' : null}
      config={INTERVIEW_DETAIL_CONFIG}
      notes={notesState.notes}
      isEditingNotes={notesState.isEditing}
      isSavingNotes={updateMutation.isPending}
      onBack={handleBack}
      onNotesChange={notesState.handleNotesChange}
      onStartEditNotes={notesState.startEdit}
      onSaveNotes={handleSaveNotes}
      onCancelEditNotes={notesState.cancelEdit}
      onRelatedConversationClick={handleRelatedConversationClick}
      onRelatedContactClick={handleRelatedContactClick}
    />
  );
}

