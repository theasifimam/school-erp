import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  currentPage,
  setCurrentPage,
  totalItems,
  itemsPerPage,
  setItemsPerPage,
  className = "",
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = Math.min(indexOfFirstItem + itemsPerPage, totalItems);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const maxVisiblePages = 5;
    const pages = [];

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than or equal to maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Create a sliding window of pages around current page
      let startPage, endPage;

      if (currentPage <= 3) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages.map((pageNumber) => (
      <Button
        key={pageNumber}
        variant={currentPage === pageNumber ? "default" : "outline"}
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </Button>
    ));
  };

  return (
    <div
      className={`flex items-center justify-between rounded-full border-gray-200 dark:border-gray-700 px-4 py-3 sm:px-6 ${className}`}
    >
      {/* Mobile view - simple prev/next */}
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          className="rounded-full"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>

      {/* Desktop view - full pagination controls */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirstItem + 1}</span>{" "}
            to <span className="font-medium">{indexOfLastItem}</span> of{" "}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Items per page selector */}
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1); // Reset to first page when changing items per page
            }}
          >
            <SelectTrigger className="h-8 w-20 rounded-3xl bg-white dark:bg-black">
              <SelectValue placeholder={itemsPerPage} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>

          {/* Page navigation */}
          <div className="flex gap-1 bg-white dark:bg-black rounded-full">
            {/* First page button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-12"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <ChevronLeft className="h-4 w-4 -ml-2" />
            </Button>

            {/* Previous page button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Page numbers */}
            {renderPageNumbers()}

            {/* Next page button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Last page button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-12"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
              <ChevronRight className="h-4 w-4 -ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
