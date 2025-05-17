// For a fee receipt, you can use a similar approach
const generateFeeReceipt = (receiptData) => {
  try {
    const doc = new window.jspdf.jsPDF();

    // Set document properties
    doc.setProperties({
      title: `Fee Receipt - ${receiptData.studentName}`,
      subject: `Fee Receipt for ${receiptData.term}`,
      creator: "School Management System",
    });

    // Define colors
    const primaryColor = [0, 70, 140]; // Dark blue

    // Add school logo/name
    doc.setFontSize(20);
    doc.setTextColor(...primaryColor);
    doc.setFont("helvetica", "bold");
    doc.text(schoolName, doc.internal.pageSize.getWidth() / 2, 15, {
      align: "center",
    });

    // Add receipt title
    doc.setFontSize(16);
    doc.text("FEE RECEIPT", doc.internal.pageSize.getWidth() / 2, 25, {
      align: "center",
    });

    // Add receipt number and date
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Receipt No: ${receiptData.receiptNo}`, 15, 35);
    doc.text(
      `Date: ${format(receiptData.date, "MMMM d, yyyy")}`,
      doc.internal.pageSize.getWidth() - 15,
      35,
      { align: "right" }
    );

    // Add student information
    doc.setFontSize(11);
    doc.text(`Student Name: ${receiptData.studentName}`, 15, 45);
    doc.text(`Class: ${receiptData.class}`, 15, 52);
    doc.text(`Roll No: ${receiptData.rollNo}`, 15, 59);
    doc.text(`Term: ${receiptData.term}`, 15, 66);

    // Create fee details table
    const tableBody = receiptData.feeDetails.map((item) => [
      item.description,
      item.amount.toFixed(2),
    ]);

    // Add total row
    const total = receiptData.feeDetails.reduce(
      (sum, item) => sum + item.amount,
      0
    );
    tableBody.push([
      { content: "Total", styles: { fontStyle: "bold" } },
      { content: total.toFixed(2), styles: { fontStyle: "bold" } },
    ]);

    doc.autoTable({
      head: [
        [
          {
            content: "Description",
            styles: {
              halign: "left",
              fillColor: primaryColor,
              textColor: [255, 255, 255],
            },
          },
          {
            content: "Amount",
            styles: {
              halign: "right",
              fillColor: primaryColor,
              textColor: [255, 255, 255],
            },
          },
        ],
      ],
      body: tableBody,
      startY: 75,
      margin: { left: 15, right: 15 },
      styles: {
        fontSize: 10,
        cellPadding: 5,
      },
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { cellWidth: 30, halign: "right" },
      },
    });

    // Add payment method
    const finalY = doc.previousAutoTable.finalY + 10;
    doc.text(`Payment Method: ${receiptData.paymentMethod}`, 15, finalY);

    // Add signature line
    doc.line(
      doc.internal.pageSize.getWidth() - 65,
      finalY + 20,
      doc.internal.pageSize.getWidth() - 15,
      finalY + 20
    );
    doc.text(
      "Authorized Signature",
      doc.internal.pageSize.getWidth() - 40,
      finalY + 25,
      { align: "center" }
    );

    // Add footer
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(
      "This is a computer-generated receipt and does not require a physical signature.",
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );

    // Save the PDF
    doc.save(`Fee Receipt - ${receiptData.studentName}.pdf`);
    showSuccess("Fee receipt generated successfully");
  } catch (error) {
    console.error("PDF export error:", error);
    setFormError("Failed to generate fee receipt. Please try again.");
  }
};
