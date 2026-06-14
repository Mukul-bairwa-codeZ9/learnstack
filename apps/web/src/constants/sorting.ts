export interface SortOption {
  value: string;
  label: string;
}

export const PUBLIC_CONTENT_SORT_OPTIONS: SortOption[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "updated", label: "Recently Updated" },
];

