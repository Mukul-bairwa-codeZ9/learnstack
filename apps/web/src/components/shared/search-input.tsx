"use client";

import { Input } from "@/components/ui/input";

interface SearchInputProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export function SearchInput({
  value,
  placeholder,
  onChange,
}: SearchInputProps) {
  return (
    <Input
      value={value}
      placeholder={placeholder}
      onChange={(e) =>
        onChange(e.target.value)
      }
    />
  );
}