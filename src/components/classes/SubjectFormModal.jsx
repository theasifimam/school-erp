import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect } from "react";
import { useSubjectStore } from "@/lib/state/stores/subjectStore";
import { useForm, Controller } from "react-hook-form";

export default function SubjectFormModal({
  isEditModalOpen,
  setIsEditModalOpen,
}) {
  const { createSubject, currentSubject, setSubjects, successMessage } =
    useSubjectStore();

  // Initialize React Hook Form
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      code: "",
      type: "Core",
      department: "Science",
      creditHours: 3,
      difficultyLevel: "Intermediate",
      syllabus: "",
      syllabusLink: "",
      description: "",
      textbook: "",
      isActive: true,
    },
  });

  // Reset form when currentSubject changes
  useEffect(() => {
    if (currentSubject) {
      reset({
        name: currentSubject.name || "",
        code: currentSubject.code || "",
        type: currentSubject.type || "Core",
        department: currentSubject.department || "Science",
        creditHours: currentSubject.creditHours || 3,
        difficultyLevel: currentSubject.difficultyLevel || "Intermediate",
        syllabus: currentSubject.syllabus || "",
        textbook: currentSubject.textbook || "",
        description: currentSubject.description || "",
        syllabusLink: currentSubject.syllabusLink || "",
        isActive:
          currentSubject.isActive !== undefined
            ? currentSubject.isActive
            : true,
      });
    }
  }, [currentSubject, reset]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      if (currentSubject) {
        await updateSubject(currentSubject._id, data);
      } else {
        await createSubject(data);
      }

      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error saving subject:", error);
      alert("Failed to save subject. Please try again.");
    }
  };

  return (
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>
            {currentSubject ? "Edit Subject" : "Add New Subject"}
          </DialogTitle>
          <DialogDescription>
            {currentSubject
              ? "Update the subject details below."
              : "Fill in the details to add a new subject."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4 max-h-[400px] overflow-y-auto">
            {/* Core Identification */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name*
              </Label>
              <div className="col-span-3">
                <Input
                  id="name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Code*
              </Label>
              <div className="col-span-3">
                <Input
                  id="code"
                  {...register("code", {
                    required: "Code is required",
                    pattern: {
                      value: /^[A-Z]{3,4}\d{3}$/,
                      message: "Must match pattern (e.g., MATH101, SCIE202)",
                    },
                  })}
                  className={errors.code ? "border-red-500" : ""}
                />
                {errors.code && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.code.message}
                  </p>
                )}
              </div>
            </div>

            {/* Categorization */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-left">
                Type*
              </Label>
              <div className="col-span-3">
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select subject type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Core">Core</SelectItem>
                        <SelectItem value="Elective">Elective</SelectItem>
                        <SelectItem value="Practical">Practical</SelectItem>
                        <SelectItem value="Project">Project</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-left">
                Department*
              </Label>
              <div className="col-span-3">
                <Controller
                  name="department"
                  control={control}
                  rules={{ required: "Department is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Science">Science</SelectItem>
                        <SelectItem value="Humanities">Humanities</SelectItem>
                        <SelectItem value="Commerce">Commerce</SelectItem>
                        <SelectItem value="Arts">Arts</SelectItem>
                        <SelectItem value="General">General</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.department && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.department.message}
                  </p>
                )}
              </div>
            </div>

            {/* Academic Metadata */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="creditHours" className="text-right">
                Credit Hours
              </Label>
              <div className="col-span-3">
                <Controller
                  name="creditHours"
                  control={control}
                  rules={{
                    min: { value: 1, message: "Minimum 1 credit hour" },
                    max: { value: 5, message: "Maximum 5 credit hours" },
                  }}
                  render={({ field }) => (
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      className={errors.creditHours ? "border-red-500" : ""}
                    />
                  )}
                />
                {errors.creditHours && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.creditHours.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="difficultyLevel" className="text-left">
                Difficulty Level
              </Label>
              <div className="col-span-3">
                <Controller
                  name="difficultyLevel"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Basic">Basic</SelectItem>
                        <SelectItem value="Intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* Resource References */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="syllabus" className="text-right">
                Syllabus
              </Label>
              <div className="col-span-3">
                <Input id="syllabus" {...register("syllabus")} />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="textbook" className="text-right">
                Textbook
              </Label>
              <div className="col-span-3">
                <Input id="textbook" {...register("textbook")} />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="syllabusLink" className="text-right">
                Syllabus Link
              </Label>
              <div className="col-span-3">
                <Input
                  id="syllabusLink"
                  {...register("syllabusLink", {
                    pattern: {
                      value:
                        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                      message: "Please enter a valid URL",
                    },
                  })}
                  className={errors.syllabusLink ? "border-red-500" : ""}
                />
                {errors.syllabusLink && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.syllabusLink.message}
                  </p>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <div className="col-span-3">
                <Textarea
                  id="description"
                  {...register("description")}
                  rows={3}
                />
              </div>
            </div>

            {/* Administrative */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isActive" className="text-right">
                Status
              </Label>
              <div className="col-span-3">
                <Controller
                  name="isActive"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="isActive" className="cursor-pointer">
                        Active
                      </Label>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {currentSubject ? "Update" : "Create"} Subject
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
