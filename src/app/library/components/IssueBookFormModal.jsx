"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../../components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Calendar as CalendarIcon, Search, Loader2 } from "lucide-react";
import { Calendar } from "../../../components/ui/calendar";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { useBookstore } from "@/lib/state/stores/bookStore";
import { toast } from "sonner";
import { studentsData } from "@/assets/data/data";
import { Textarea } from "../../../components/ui/textarea";
import { format } from "date-fns";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../components/ui/command";
import { useStudentStore } from "@/lib/state/stores/studentStore";

export default function IssueBookFormModal({
  issueDialogOpen,
  setIssueDialogOpen,
  selectedBook,
  setSelectedBook,
}) {
  const {
    fetchBooks,
    isLoading,
    successMessage,
    issuedBooks,
    books,
    searchBooks,
    fetchIssuedBooks,
    issueBook,
  } = useBookstore();

  const {
    fetchStudents,
    students,
    isLoading: studentsLoading,
  } = useStudentStore();

  // States for book search and selection
  const [bookSearchOpen, setBookSearchOpen] = useState(false);
  const [bookSearchQuery, setBookSearchQuery] = useState("");
  const [selectedBookDetails, setSelectedBookDetails] = useState(null);

  const [studentSeachOpen, setStudentSeachOpen] = useState(false);
  const [studentSearchQuery, setStudentSearchQuery] = useState("");
  const [selectedStudentDetails, setSelectedStudentDetails] = useState(null);

  // States for date picker
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
  ); // Default 14 days

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bookId: "",
      issuedTo: "",
      issueDate: dateFrom,
      dueDate: dateTo,
      notes: "",
    },
  });

  useEffect(() => {
    fetchBooks();
    fetchStudents();
    fetchIssuedBooks();
  }, []);

  // Function to search books - this would connect to your backend API
  const handleSearchBooks = async (query) => {
    if (!query || query.length < 2) {
      return;
    }
    try {
      // This would be your actual API call
      searchBooks(query);
    } catch (error) {
      console.error("Error searching books:", error);
      toast.error("Failed to search books. Please try again.");
    }
  };

  // Function to search students - this would connect to your backend API
  const handleSearchStudents = async (query) => {
    if (!query || query.length < 2) {
      return;
    }
    try {
      // This would be your actual API call
      console.log("Searching students with query:", query);
      await fetchStudents(`name=${query}`);
    } catch (error) {
      console.error("Error searching students:", error);
      toast.error("Failed to search students. Please try again.");
    }
  };

  // Handle book search input changes
  useEffect(() => {
    if (bookSearchQuery.length >= 2) {
      console.log("About to search books with:", bookSearchQuery);
      const timeoutId = setTimeout(() => {
        handleSearchBooks(bookSearchQuery);
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [bookSearchQuery]);

  // Handle student search input changes
  useEffect(() => {
    if (studentSearchQuery.length >= 2) {
      console.log("About to search students with:", studentSearchQuery);
      const timeoutId = setTimeout(() => {
        handleSearchStudents(studentSearchQuery);
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [studentSearchQuery]);

  // Handles form submission
  const onSubmit = async (data) => {
    if (!selectedBookDetails) {
      toast.error("Please select a book");
      return;
    }

    if (!selectedStudentDetails) {
      toast.error("Please select a student");
      return;
    }

    try {
      //   toast.success("Book issued successfully!");
      const response = await issueBook({ ...data, issuedToModel: "Student" });
      setIssueDialogOpen(false);
      // Reset form
      setSelectedBookDetails(null);
      setSelectedStudentDetails(null);
      setBookSearchQuery("");
      setStudentSearchQuery("");
      reset();
    } catch (error) {
      console.error("Error issuing book:", error);
      toast.error("Failed to issue book. Please try again.");
    }
  };

  return (
    <Dialog open={issueDialogOpen} onOpenChange={setIssueDialogOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          <span>Issue Book</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="border-gray-300">
        <DialogHeader>
          <DialogTitle>Issue Book to Student</DialogTitle>
          <DialogDescription className="text-gray-400">
            Record a new book issue to a student.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          {/* Book Selection - Combobox Pattern */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="bookSelect">Select Book</Label>
            <Popover open={bookSearchOpen} onOpenChange={setBookSearchOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={bookSearchOpen}
                  className="w-full justify-between"
                >
                  {selectedBookDetails
                    ? selectedBookDetails.title
                    : "Search for a book..."}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-full p-0 rounded-2xl overflow-hidden"
                align="start"
              >
                <Command>
                  <CommandInput
                    placeholder="Search books by title, ID or author..."
                    value={bookSearchQuery}
                    onValueChange={setBookSearchQuery}
                  />
                  <CommandList>
                    {isLoading && (
                      <div className="flex items-center justify-center py-6">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      </div>
                    )}
                    {!isLoading &&
                      bookSearchQuery.length > 0 &&
                      (!books || books.length === 0) && (
                        <CommandEmpty>No books found.</CommandEmpty>
                      )}
                    <CommandGroup>
                      {books &&
                        Array.isArray(books) &&
                        books.map((book) => {
                          return (
                            <CommandItem
                              key={book._id || book.id}
                              value={book._id || book.id}
                              onSelect={() => {
                                console.log("Selected book:", book);
                                setSelectedBookDetails(book);
                                setValue("bookId", book._id || book.id);
                                setBookSearchOpen(false);
                              }}
                            >
                              <div className="flex flex-col">
                                <span className="font-medium">
                                  {book.title}
                                </span>
                                <span className="text-sm text-gray-400">
                                  {book.bookId || book.id} • {book.author} •
                                  Available: {book.available}/{book.quantity}
                                </span>
                              </div>
                            </CommandItem>
                          );
                        })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Student Selection - Combobox Pattern */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="studentSelect">Select Student</Label>
            <Popover open={studentSeachOpen} onOpenChange={setStudentSeachOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={studentSeachOpen}
                  className="w-full justify-between"
                >
                  {selectedStudentDetails
                    ? `${selectedStudentDetails.firstName} ${selectedStudentDetails.lastName}`
                    : "Search for a student..."}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-full p-0 rounded-2xl overflow-hidden"
                align="start"
              >
                <Command>
                  <CommandInput
                    placeholder="Search students by name or ID..."
                    value={studentSearchQuery}
                    onValueChange={setStudentSearchQuery}
                  />
                  <CommandList>
                    {studentsLoading && (
                      <div className="flex items-center justify-center py-6">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      </div>
                    )}
                    {!studentsLoading &&
                      studentSearchQuery.length > 0 &&
                      (!students ||
                        !Array.isArray(students) ||
                        students.length === 0) && (
                        <CommandEmpty>No students found.</CommandEmpty>
                      )}
                    <CommandGroup>
                      {students &&
                        Array.isArray(students) &&
                        students.map((student) => {
                          return (
                            <CommandItem
                              key={student.id || student._id}
                              value={student.id || student._id}
                              onSelect={() => {
                                setSelectedStudentDetails(student);
                                setValue("issuedTo", student.id || student._id);
                                setStudentSeachOpen(false);
                              }}
                            >
                              <div className="flex flex-col">
                                <span className="font-medium">
                                  {student.firstName} {student.lastName}
                                </span>
                                <span className="text-sm text-gray-400">
                                  {student.id || student._id} •{" "}
                                  {student.grade || "N/A"}
                                </span>
                              </div>
                            </CommandItem>
                          );
                        })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Issue Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex justify-between items-center"
                  >
                    {dateFrom ? format(dateFrom, "PPP") : "Select date"}
                    <CalendarIcon className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-3xl">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={(date) => {
                      setDateFrom(date);
                      setValue("issueDate", date);
                    }}
                    className="rounded-3xl"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex justify-between items-center"
                  >
                    {dateTo ? format(dateTo, "PPP") : "Select date"}
                    <CalendarIcon className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-3xl">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={(date) => {
                      setDateTo(date);
                      setValue("dueDate", date);
                    }}
                    className="rounded-3xl"
                    disabled={(date) => date < new Date(dateFrom)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              className="border p-2 min-h-20"
              placeholder="Any special instructions or notes..."
              {...register("notes")}
            />
          </div>

          {/* Form Actions */}
          <DialogFooter className="pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => setIssueDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Issue Book
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
