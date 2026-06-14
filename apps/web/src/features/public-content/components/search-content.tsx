"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Input } from "@/components/ui/input";

interface SearchBarProps {
  initialValue?: string;
}

export function SearchBar({
  initialValue = "",
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(initialValue);

  const handleSearch = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    params.delete("page");

    router.push(`/learn?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search content..."
      />
    </form>
  );
}