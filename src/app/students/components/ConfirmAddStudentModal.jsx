import { HeartPulse, Medal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui";

export default function ConfirmAddStudentModal({
  isModalOpen,
  setIsModalOpen,
  handleSubmit,
}) {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Confirm Submission
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="text-center space-y-2">
            <HeartPulse className="mx-auto h-12 w-12 text-red-500" />
            <p>
              Please ensure all information provided is accurate before
              submitting. Once submitted, you cannot make changes to your
              application.
            </p>
          </div>
          <div className="flex items-center space-x-2 border-t border-b border-gray-100 py-3">
            <Medal className="h-5 w-5 text-amber-500" />
            <p className="text-sm">
              Your application will be reviewed by our admissions team. We aim
              to respond within 5-7 working days.
            </p>
          </div>
        </div>
        <div className="flex justify-between space-x-4">
          <Button
            variant="outline"
            onClick={() => setIsModalOpen(false)}
            className="flex-1 rounded-full border-gray-300"
          >
            Go Back
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
              setIsModalOpen(false);
            }}
            className="flex-1 rounded-full bg-black text-white hover:bg-gray-800"
          >
            Confirm & Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
