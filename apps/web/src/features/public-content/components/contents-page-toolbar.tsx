"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import {
  AppSelect,
  DataToolbar,
  SearchInput,
} from "@/components/shared";

import { PUBLIC_CONTENT_SORT_OPTIONS } from "@/constants";

interface LearnToolbarProps {
  search: string;
  sort: string;
}

export function ContentsToolbar({
  search,
  sort,
}: LearnToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] =
    useState(search);

  const handleSearch = () => {
    const params = new URLSearchParams(
      searchParams,
    );

    if (searchValue.trim()) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }

    params.delete("page");

    router.push(`/learn?${params.toString()}`);
  };

  const handleSortChange = (
    value: string,
  ) => {
    const params = new URLSearchParams(
      searchParams,
    );

    params.set("sort", value);
    params.delete("page");

    router.push(`/learn?${params.toString()}`);
  };

  return (
    <DataToolbar
      search={
        <div className="w-full max-w-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <SearchInput
              value={searchValue}
              placeholder="Search content..."
              onChange={setSearchValue}
            />
          </form>
        </div>
      }
      controls={
        <AppSelect
          value={sort}
          options={PUBLIC_CONTENT_SORT_OPTIONS}
          placeholder="Sort By"
          className="w-[220px]"
          onValueChange={handleSortChange}
        />
      }
    />
  );
}