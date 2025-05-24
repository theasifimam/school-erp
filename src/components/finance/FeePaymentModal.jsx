"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
// import {} from "@/lib/utils";
import { toast } from "sonner";

export default function FeePaymentModal({
  open,
  onOpenChange,
  student,
  onSuccess,
}) {
  const [date, setDate] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const paymentMethods = [
    { value: "cash", label: "Cash" },
    { value: "cheque", label: "Cheque" },
    { value: "bank_transfer", label: "Bank Transfer" },
    { value: "online", label: "Online Payment" },
    { value: "other", label: "Other" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrors({});

    // Validate inputs
    const newErrors = {};
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }
    if (parseFloat(amount) > (student?.feeBalance || 0)) {
      newErrors.amount = "Amount cannot exceed the fee balance";
    }
    if (!date) {
      newErrors.date = "Please select a payment date";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsProcessing(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Payment Recorded",
        description: `Successfully recorded payment of ${amount} for ${student?.firstName} ${student?.lastName}`,
      });

      onSuccess(); // Refresh data
      onOpenChange(false); // Close modal
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setAmount("");
    setDate(new Date());
    setPaymentMethod("cash");
    setErrors({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Record Fee Payment</DialogTitle>
          <DialogDescription>
            {student && (
              <>
                For {student.firstName} {student.lastName} (Adm No:{" "}
                {student.admissionNumber})
                <div className="mt-2">
                  <span className="font-medium">Fee Balance: </span>
                  <span
                    className={
                      student.feeBalance > 0 ? "text-red-600" : "text-green-600"
                    }
                  >
                    {student.feeBalance}
                  </span>
                </div>
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount (₹)
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="col-span-3"
              placeholder="Enter payment amount"
            />
            {errors.amount && (
              <p className="col-span-4 col-start-2 text-sm text-red-500">
                {errors.amount}
              </p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Payment Date
            </Label>
            <Popover>
              <PopoverTrigger asChild className="col-span-3">
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.date && (
              <p className="col-span-4 col-start-2 text-sm text-red-500">
                {errors.date}
              </p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="method" className="text-right">
              Payment Method
            </Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {paymentMethod === "cheque" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="chequeNumber" className="text-right">
                Cheque No.
              </Label>
              <Input
                id="chequeNumber"
                className="col-span-3"
                placeholder="Enter cheque number"
              />
            </div>
          )}

          {paymentMethod === "bank_transfer" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="transactionId" className="text-right">
                Transaction ID
              </Label>
              <Input
                id="transactionId"
                className="col-span-3"
                placeholder="Enter transaction reference"
              />
            </div>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="remarks" className="text-right">
              Remarks
            </Label>
            <Input
              id="remarks"
              className="col-span-3"
              placeholder="Any additional notes"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Record Payment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
