interface EditorStatusProps {
  isDirty: boolean;
  isSaving: boolean;
}

export function EditorStatus({
  isDirty,
  isSaving,
}: EditorStatusProps) {
  if (isSaving) {
    return (
      <span className="text-sm text-muted-foreground">
        Saving...
      </span>
    );
  }

  if (isDirty) {
    return (
      <span className="text-sm text-amber-500">
        Unsaved Changes
      </span>
    );
  }

  return (
    <span className="text-sm text-green-500">
      Saved
    </span>
  );
}