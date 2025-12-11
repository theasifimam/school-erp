import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { formatDateToDDMMYY } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../../components/ui/popover";
import { Label } from "../../../components/ui/label";
import { Calendar } from "../../../components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Textarea } from "../../../components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useBookstore } from "@/lib/state/stores/bookStore";

// Define validation schema
const returnSchema = yup.object().shape({
  returnDate: yup.date().required("Return date is required"),
  condition: yup.string().required("Book condition is required"),
  remarks: yup.string().optional(),
});

export default function ReturnModal({
  returnDialogOpen,
  setReturnDialogOpen,
  selectedIssue,
  setSelectedIssue,
  issue,
}) {
  const { returnBook, successMessage } = useBookstore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(returnSchema),
    defaultValues: {
      condition: "",
      remarks: "",
      returnDate: new Date(),
    },
  });

  const onSubmit = async (data) => {
    console.log("Return data:", data);
    try {
      await returnBook(selectedIssue._id, data);
      if (successMessage) {
        setReturnDialogOpen(false);
        reset();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Dialog
      open={returnDialogOpen && selectedIssue?._id === issue?._id}
      onOpenChange={(open) => {
        setReturnDialogOpen(open);
        if (!open) {
          setSelectedIssue(null);
          reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedIssue(issue)}
          className="bg-green-700 hover:bg-green-600 border-green-600 text-white"
        >
          Return
        </Button>
      </DialogTrigger>
      <DialogContent className="border-gray-300">
        <DialogHeader>
          <DialogTitle>Return Book</DialogTitle>
          <DialogDescription className="text-gray-400">
            Confirm book return for {selectedIssue?.book.title}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="py-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-400">Book</p>
              <p className="font-medium">{selectedIssue?.book.title}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Student</p>
              <p className="font-medium">
                {selectedIssue?.issuedTo.firstName}{" "}
                {selectedIssue?.issuedTo.lastName}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-400">Issue Date</p>
              <p>{formatDateToDDMMYY(selectedIssue?.issueDate)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Due Date</p>
              <p>{formatDateToDDMMYY(selectedIssue?.dueDate)}</p>
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor="returnDate">Return Date*</Label>
            <Controller
              name="returnDate"
              control={control}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full flex justify-between items-center mt-2"
                    >
                      {format(field.value, "PPP")}
                      <CalendarIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-3xl">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      className=""
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.returnDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.returnDate.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="condition">Book Condition*</Label>
            <Controller
              name="condition"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                    <SelectItem value="damaged">Damaged</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.condition && (
              <p className="text-red-500 text-sm mt-1">
                {errors.condition.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <Label htmlFor="remarks">Remarks (Optional)</Label>
            <Controller
              name="remarks"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="remarks"
                  className="border p-2 min-h-20"
                  placeholder="Any special remarks..."
                  {...field}
                />
              )}
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                setReturnDialogOpen(false);
                reset();
              }}
              className="bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit">Confirm Return</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
