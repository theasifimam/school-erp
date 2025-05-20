import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash, Trash2Icon } from "lucide-react";

export function DeleteConfirmationModal({
  isOpen,
  onOpenChange,
  onConfirm,
  title = "Delete Item",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmButtonText = "Delete",
  cancelButtonText = "Cancel",
  confirmButtonVariant = "destructive",
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="p-5">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <Trash2Icon className="h-26 w-26 text-red-500 mx-auto" />
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOpenChange(false)}>
            {cancelButtonText}
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 text-white"
            variant={confirmButtonVariant}
            onClick={onConfirm}
          >
            {confirmButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
