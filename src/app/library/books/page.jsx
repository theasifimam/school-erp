"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { booksData } from "@/assets/data/data";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CardFooter, Label } from "@/components/ui";
import { Pagination } from "@/components/common/Pagination";
import BookFormModal from "@/components/library/BookFormModal";
import { useBookstore } from "@/lib/state/stores/bookStore";
import { Skeleton } from "@/components/ui/skeleton";

export default function BooksPage() {
  const { fetchBooks, books, isLoading } = useBookstore();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [bookDialogOpen, setBookDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn?.includes(searchTerm)
  );

  return (
    <Card className="border-gray-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex justify-between items-center">
          <span>Book Inventory</span>
          <BookFormModal
            bookDialogOpen={bookDialogOpen}
            setBookDialogOpen={setBookDialogOpen}
            selectedBook={selectedBook}
            setSelectedBook={setSelectedBook}
            booksData={booksData}
          />
        </CardTitle>
        <CardDescription className="text-gray-400">
          Manage and track all books in the library collection
        </CardDescription>
        <div className="flex gap-4 mt-4 ml-auto">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search by title, author, or ISBN..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Select defaultValue="all" disabled={isLoading}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="border-gray-700">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Science">Science</SelectItem>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              <SelectItem value="History">History</SelectItem>
              <SelectItem value="Literature">Literature</SelectItem>
              <SelectItem value="Computer Science">Computer Science</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-300">
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Year</TableHead>
              <TableHead className="text-right">Available</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Skeleton loading state
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <TableRow
                    key={`skeleton-${index}`}
                    className="border-gray-300"
                  >
                    <TableCell>
                      <Skeleton className="h-4 w-8" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-48" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-12" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-6 w-16 ml-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center space-x-2">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
            ) : filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <TableRow key={book._id} className="border-gray-300">
                  <TableCell>{book.bookId}</TableCell>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="text-blue-400 border-blue-500"
                    >
                      {book.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{book.publicationYear}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={
                        book.available > 0 ? "bg-green-600" : "bg-red-600"
                      }
                    >
                      {book.available}/{book.copies}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-gray-200"
                        onClick={() => {
                          setSelectedBook(book);
                          setBookDialogOpen(true);
                        }}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-gray-200"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10 text-gray-400"
                >
                  No books found matching your search criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-gray-300 pt-4">
        {isLoading ? (
          <div className="w-full flex justify-between items-center">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-48" />
          </div>
        ) : (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItems={filteredBooks.length}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            className="w-full"
          />
        )}
      </CardFooter>
    </Card>
  );
}
