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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { useBookstore } from "@/lib/state/stores/bookStore";
import { toast } from "sonner";

export default function BookFormModal({
  bookDialogOpen,
  setBookDialogOpen,
  selectedBook,
  setSelectedBook,
}) {
  const { createBook, updateBook, isLoading, successMessage, books } =
    useBookstore();
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
      title: "",
      author: "",
      publisher: "",
      isbn: "",
      category: "",
      publicationYear: "",
      quantity: "",
    },
  });

  useEffect(() => {
    if (selectedBook) {
      reset(selectedBook);
    } else {
      reset({
        bookId: `B${String(books.length + 1).padStart(3, "0")}`,
        title: "",
        author: "",
        publisher: "",
        isbn: "",
        category: "",
        publicationYear: "",
        quantity: "",
      });
    }
  }, [selectedBook, books, reset]);

  const onSubmit = (data) => {
    try {
      if (selectedBook) {
        updateBook(selectedBook._id, data);
      } else {
        createBook(data);
      }
      if (successMessage) {
        setBookDialogOpen(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again.");
    }
  };

  return (
    <Dialog open={bookDialogOpen} onOpenChange={setBookDialogOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setSelectedBook(null);
          }}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          <span>Add Book</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="border-gray-300 py-3 pb-0">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-black">
            {selectedBook ? "Edit Book" : "Add New Book"}
          </DialogTitle>
          <DialogDescription className="text-gray-400 mt-0">
            Enter the details of the book to add to the library inventory.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="bookId">Book ID</Label>
              <Input
                {...register("bookId")}
                disabled={!!selectedBook}
                id="bookId"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="isbn">ISBN</Label>
              <Input {...register("isbn")} id="isbn" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
            <Input {...register("title")} id="title" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="author">Author</Label>
              <Input {...register("author")} id="author" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="publisher">Publisher</Label>
              <Input {...register("publisher")} id="publisher" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="category">Category</Label>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Fiction",
                        "Non-Fiction",
                        "Reference",
                        "Textbook",
                        "Other",
                      ].map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="publicationYear">Publication Year</Label>
              <Input
                {...register("publicationYear")}
                id="publicationYear"
                type="number"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="quantity">Total Quantity</Label>
              <Input {...register("quantity")} id="quantity" type="number" />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setBookDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {selectedBook ? "Update" : "Add Book"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
