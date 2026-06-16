interface DataToolbarProps {
  search?: React.ReactNode;
  controls?: React.ReactNode;
  actions?: React.ReactNode;
}

export function DataToolbar({
  search,
  controls,
  actions,
}: DataToolbarProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
        {search}

        {controls}
      </div>

      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}