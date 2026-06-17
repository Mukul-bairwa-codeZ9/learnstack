interface EditorStatusProps {
  isDirty: boolean;
  isSaving: boolean;
}

export function EditorStatus({ isDirty, isSaving }: EditorStatusProps) {
  if (isSaving) {
    return <span className="text-xs text-muted-foreground">Saving...</span>;
  }

  if (isDirty) {
    return (
      <span className="text-sm text-amber-600 dark:text-amber-400">
        Unsaved changes
      </span>
    );
  }

  return (
    <span className="text-sm text-emerald-600 dark:text-emerald-400">
      All changes saved
    </span>
  );
}
