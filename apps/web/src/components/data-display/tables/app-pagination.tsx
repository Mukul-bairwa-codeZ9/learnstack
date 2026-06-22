import {
  Pagination as ShadPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface SharedPaginationProps {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
}

export function AppPagination({
  currentPage,
  totalPages,
  buildHref,
}: SharedPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <ShadPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={buildHref(Math.max(currentPage - 1, 1))} />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href={buildHref(Math.min(currentPage + 1, totalPages))}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadPagination>
  );
}
