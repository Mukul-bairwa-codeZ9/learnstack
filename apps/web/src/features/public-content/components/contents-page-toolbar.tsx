"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { AppSelect } from "@/components/shared/app-select";

import { PUBLIC_CONTENT_SORT_OPTIONS } from "@/constants";
import { SearchBar } from "./search-content";

interface LearnToolbarProps {
  search: string;
  sort: string;
}

export function ContentsToolbar({ search, sort }: LearnToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("sort", value);

    params.delete("page");

    router.push(`/learn?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="w-full max-w-md">
        <SearchBar initialValue={search} />
      </div>

      <AppSelect
        value={sort}
        options={PUBLIC_CONTENT_SORT_OPTIONS}
        placeholder="Sort By"
        className="w-[220px]"
        onValueChange={handleSortChange}
      />
    </div>
  );
}
