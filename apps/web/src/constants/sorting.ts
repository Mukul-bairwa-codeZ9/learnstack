export interface SortOption {
  value: string;
  label: string;
}

export const SORT_DIRECTION_OPTIONS = [
  {
    label: "Newest First",
    value: "newest",
  },
  {
    label: "Oldest First",
    value: "oldest",
  },
];
export const PUBLIC_CONTENT_SORT_OPTIONS: SortOption[] = [
  ...SORT_DIRECTION_OPTIONS,
  { value: "updated", label: "Recently Updated" },
];
