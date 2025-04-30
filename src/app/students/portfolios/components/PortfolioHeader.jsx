"use client"; // Add this at the top for client components
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Download, Printer, Share2 } from "lucide-react";

export default function PortfolioHeader() {
  const handlePrint = () => {
    toast.success("Preparing your portfolio for printing...");
    window.print();
  };

  const handleShare = () => {
    toast.info("Share functionality would open system dialog in a real app");
  };
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src="/student-avatar.jpg" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Student Portfolio</h1>
          <p className="text-muted-foreground">Academic Year 2023-2024</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          className="rounded-full"
          onClick={handlePrint}
        >
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button
          variant="outline"
          className="rounded-full"
          onClick={handleShare}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Button className="rounded-full">
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>
    </div>
  );
}
