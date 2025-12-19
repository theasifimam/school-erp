"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useReactToPrint } from "react-to-print";
import { Download, Printer, Mail, X } from "lucide-react";
import { formatDateToDDMMYY } from "@/lib/utils";
import { toast } from "sonner";

const FeeReceiptModal = ({ open, onOpenChange, student, feeRecords }) => {
  const receiptRef = React.useRef();
  const [isSending, setIsSending] = useState(false);

  // Filter paid fees only for the receipt
  const paidFees =
    feeRecords?.filter((record) => record.status === "paid") || [];

  const handlePrint = useReactToPrint({
    contentRef: receiptRef,
    documentTitle: `Fee Receipt - ${student?.firstName} ${student?.lastName}`,
    pageStyle: `
      @page { 
        size: A4; 
        margin: 10mm; 
      }
      @media print {
        body { 
          -webkit-print-color-adjust: exact; 
          print-color-adjust: exact;
        }
        .no-print {
          display: none !important;
        }
      }
    `,
    onBeforeGetContent: () => {
      return Promise.resolve();
    },
    onAfterPrint: () => {
      toast({
        title: "Print Ready",
        description: "Receipt has been sent to printer successfully",
      });
    },
    removeAfterPrint: false,
  });

  const handleDownload = () => {
    // Create a download functionality
    const printContents = receiptRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Fee Receipt - ${student?.firstName} ${student?.lastName}</title>
          <style>
            @page { size: A4; margin: 10mm; }
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .bg-white { background-color: white; }
            .p-6 { padding: 1.5rem; }
            .border { border: 1px solid #d1d5db; }
            .rounded-3xl { border-radius: 1.5rem; }
            .text-center { text-align: center; }
            .text-2xl { font-size: 1.5rem; }
            .text-xl { font-size: 1.25rem; }
            .text-lg { font-size: 1.125rem; }
            .text-sm { font-size: 0.875rem; }
            .text-xs { font-size: 0.75rem; }
            .font-bold { font-weight: 700; }
            .font-semibold { font-weight: 600; }
            .font-medium { font-weight: 500; }
            .text-gray-600 { color: #4b5563; }
            .text-gray-500 { color: #6b7280; }
            .border-b-2 { border-bottom: 2px solid; }
            .border-gray-300 { border-color: #d1d5db; }
            .pb-4 { padding-bottom: 1rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-3 { margin-bottom: 0.75rem; }
            .mb-2 { margin-bottom: 0.5rem; }
            .mt-8 { margin-top: 2rem; }
            .pt-4 { padding-top: 1rem; }
            .pt-1 { padding-top: 0.25rem; }
            .grid { display: grid; }
            .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .gap-6 { gap: 1.5rem; }
            .space-y-1 > * + * { margin-top: 0.25rem; }
            .border-t { border-top: 1px solid; }
            .border-gray-200 { border-color: #e5e7eb; }
            .rounded-lg { border-radius: 0.5rem; }
            .overflow-hidden { overflow: hidden; }
            .bg-gray-100 { background-color: #f3f4f6; }
            .bg-gray-50 { background-color: #f9fafb; }
            .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
            .px-4 { padding-left: 1rem; padding-right: 1rem; }
            .text-left { text-align: left; }
            .text-right { text-align: right; }
            .w-full { width: 100%; }
            .w-32 { width: 8rem; }
            .flex { display: flex; }
            .flex-col { flex-direction: column; }
            .items-end { align-items: flex-end; }
            table { border-collapse: collapse; }
            .bg-green-100 { background-color: #dcfce7; }
            .text-green-800 { color: #166534; }
            .bg-red-100 { background-color: #fee2e2; }
            .text-red-800 { color: #991b1b; }
            .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
            .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
            .rounded-full { border-radius: 9999px; }
            .ml-2 { margin-left: 0.5rem; }

            @media screen and (min-width: 768px) {
              .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const sendReceiptByEmail = async () => {
    try {
      setIsSending(true);
      // Simulate API call to send receipt
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Receipt Sent",
        description: `Fee receipt has been sent to ${student?.firstName} ${student?.lastName}'s email`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send receipt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const totalPaid = paidFees.reduce((sum, record) => sum + record.amount, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Fee Receipt</DialogTitle>
          <DialogDescription>
            Generate and manage fee payment receipt for {student?.firstName}{" "}
            {student?.lastName}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap justify-end gap-2 mb-4 no-print">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={sendReceiptByEmail}
            disabled={isSending}
          >
            <Mail className="mr-2 h-4 w-4" />
            {isSending ? "Sending..." : "Email"}
          </Button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2  w-[100%] mx-auto no-print">
          {/* Printable Receipt Content */}
          <div
            ref={receiptRef}
            className="bg-white p-6 border border-gray-200 rounded-3xl"
          >
            {/* School Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">Imam's Academy</h1>
              <p className="text-gray-600">
                123 Education Street, Knowledge City
              </p>
              <p className="text-gray-600">
                Phone: (123) 456-7890 | Email: info@abcschool.edu
              </p>
            </div>

            {/* Receipt Title */}
            <div className="text-center border-b-2 border-gray-300 pb-4 mb-6">
              <h2 className="text-xl font-semibold">FEE PAYMENT RECEIPT</h2>
              <p className="text-gray-600">
                Receipt No: {Math.floor(100000 + Math.random() * 900000)}
              </p>
              <p className="text-gray-600">
                Date: {formatDateToDDMMYY(new Date())}
              </p>
            </div>

            {/* Student Information */}
            <div className="flex space-between w-[100%] gap-6 mb-6">
              <div className="w-[50%]">
                <h3 className="font-semibold text-lg mb-2">Student Details</h3>
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {student?.firstName} {student?.lastName}
                  </p>
                  <p>
                    <span className="font-medium">Admission No:</span>{" "}
                    {student?.admissionNumber}
                  </p>
                  <p>
                    <span className="font-medium">Class:</span> {student?.class}
                  </p>
                  <p>
                    <span className="font-medium">Section:</span>{" "}
                    {student?.section || "A"}
                  </p>
                </div>
              </div>
              <div className="w-[50%] ml-auto  block">
                <h3 className="font-semibold text-lg mb-2">Payment Summary</h3>
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">Total Fee:</span> ₹
                    {student?.totalFee}
                  </p>
                  <p>
                    <span className="font-medium">Total Paid:</span> ₹
                    {totalPaid}
                  </p>
                  <p>
                    <span className="font-medium">Balance:</span> ₹
                    {student?.feeBalance}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                        student?.feeBalance <= 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {student?.feeBalance <= 0
                        ? "Paid in Full"
                        : "Balance Due"}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Details Table */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Payment Details</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 text-left">Date</th>
                      <th className="py-2 px-4 text-left">Receipt No</th>
                      <th className="py-2 px-4 text-left">Description</th>
                      <th className="py-2 px-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paidFees.length > 0 ? (
                      paidFees.map((payment, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          <td className="py-2 px-4">
                            {formatDateToDDMMYY(new Date(payment.date))}
                          </td>
                          <td className="py-2 px-4">
                            {payment.receiptNumber || "N/A"}
                          </td>
                          <td className="py-2 px-4">
                            {payment.description || "Fee Payment"}
                          </td>
                          <td className="py-2 px-4 text-right">
                            ₹{payment.amount}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="py-4 text-center text-gray-500"
                        >
                          No payment records found
                        </td>
                      </tr>
                    )}
                    <tr className="bg-gray-100 font-semibold">
                      <td colSpan="3" className="py-2 px-4 text-right">
                        Total Paid:
                      </td>
                      <td className="py-2 px-4 text-right">₹{totalPaid}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment Method and Footer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Payment Method</h3>
                <p>{paidFees[0]?.paymentMethod || "Cash"}</p>
                {paidFees[0]?.transactionId && (
                  <p>Transaction ID: {paidFees[0]?.transactionId}</p>
                )}
              </div>
              <div className="flex flex-col items-end">
                <div className="mb-4 text-right">
                  <p className="text-gray-600">Authorized Signatory</p>
                  <div className="mt-8 pt-1 border-t border-gray-300 w-32"></div>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-8 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
              <p>
                This is a computer generated receipt and does not require
                signature
              </p>
              <p>Thank you for your payment!</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4 no-print">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeeReceiptModal;
