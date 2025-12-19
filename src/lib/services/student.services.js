import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Camera, Loader2 } from "lucide-react";
import {
  formSections,
  familyInfo,
  contactInfo,
  academicInfo,
  additionalInfo,
  tabs,
} from "@/lib/data/student.data";
import { getAcademicSessions } from "../utils/student.utils";

// Field configurations for each section
export const FIELD_CONFIGS = {
  personalInfo: {
    firstName: { type: "input", label: "First Name*", required: true },
    middleName: { type: "input", label: "Middle Name" },
    lastName: { type: "input", label: "Last Name*", required: true },
    preferredName: { type: "input", label: "Preferred Name/Nickname" },
    gender: {
      type: "select",
      label: "Gender*",
      required: true,
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "nonbinary", label: "Non-Binary" },
        { value: "other", label: "Other" },
        { value: "prefernottosay", label: "Prefer Not to Say" },
      ],
    },
    dob: { type: "date", label: "Date of Birth*", required: true },
    bloodGroup: {
      type: "select",
      label: "Blood Group",
      options: [
        { value: "a+", label: "A+" },
        { value: "a-", label: "A-" },
        { value: "b+", label: "B+" },
        { value: "b-", label: "B-" },
        { value: "ab+", label: "AB+" },
        { value: "ab-", label: "AB-" },
        { value: "o+", label: "O+" },
        { value: "o-", label: "O-" },
      ],
    },
    medicalConditions: {
      type: "textarea",
      label: "Any Medical Conditions or Allergies",
      placeholder:
        "Please list any medical conditions, allergies, or special needs",
      fullWidth: true,
    },
  },
  contactInfo: {
    email: { type: "email", label: "Email Address*", required: true },
    phone: { type: "tel", label: "Phone Number*", required: true },
    alternatePhone: { type: "tel", label: "Alternate Phone Number" },
    emergencyContactName: { type: "input", label: "Emergency Contact Name" },
    emergencyContactPhone: { type: "tel", label: "Emergency Contact Phone" },
    emergencyRelation: { type: "input", label: "Relationship to Student" },
    address: {
      type: "input",
      label: "Current Address*",
      required: true,
      fullWidth: true,
    },
    city: { type: "input", label: "City*", required: true },
    state: { type: "input", label: "State/Province*", required: true },
    country: { type: "input", label: "Country*", required: true },
    zipCode: { type: "input", label: "Zip/Postal Code*", required: true },
  },
  familyInfo: {
    fatherName: { type: "input", label: "Father's/Guardian 1 Full Name" },
    fatherOccupation: { type: "input", label: "Occupation" },
    fatherPhone: { type: "tel", label: "Phone Number" },
    fatherEmail: { type: "email", label: "Email Address" },
    motherName: { type: "input", label: "Mother's/Guardian 2 Full Name" },
    motherOccupation: { type: "input", label: "Occupation" },
    motherPhone: { type: "tel", label: "Phone Number" },
    motherEmail: { type: "email", label: "Email Address" },
    siblings: { type: "number", label: "Number of Siblings", min: 0 },
    siblingsAtSchool: { type: "switch", label: "Siblings at this School" },
    familyNotes: {
      type: "textarea",
      label: "Additional Family Information",
      placeholder:
        "Any additional information about family circumstances that the school should be aware of",
      fullWidth: true,
    },
  },
  academicInfo: {
    appliedClass: {
      type: "select",
      label: "Class Applied For*",
      required: true,
      options: [],
      isDynamic: true,
    },
    session: {
      type: "select",
      label: "Academic Session*",
      required: true,
      options: getAcademicSessions(3),
    },
    admissionType: {
      type: "select",
      label: "Admission Type*",
      required: true,
      options: [
        { value: "new", label: "New Admission" },
        { value: "transfer", label: "Transfer" },
        { value: "rte", label: "RTE Quota" },
        { value: "scholarship", label: "Scholarship" },
      ],
    },
    board: {
      type: "select",
      label: "Board",
      options: [
        { value: "cbse", label: "CBSE" },
        { value: "icse", label: "ICSE" },
        { value: "state", label: "State Board" },
        { value: "igcse", label: "IGCSE" },
        { value: "ib", label: "IB" },
      ],
    },
    previousSchool: { type: "input", label: "Previous School" },
    schoolAddress: { type: "input", label: "School Address" },
    lastClass: { type: "input", label: "Last Class Attended" },
    lastGrade: { type: "input", label: "Last Grade/Percentage" },
    transferCertificate: {
      type: "switch",
      label: "Transfer Certificate Available",
    },
    stream: {
      type: "select",
      label: "Stream (For Class 11-12)",
      options: [
        { value: "science", label: "Science" },
        { value: "commerce", label: "Commerce" },
        { value: "arts", label: "Arts/Humanities" },
        { value: "vocational", label: "Vocational" },
        { value: "na", label: "Not Applicable" },
      ],
    },
    achievements: {
      type: "textarea",
      label: "Academic/Co-curricular Achievements",
      placeholder: "List any significant achievements or awards",
      fullWidth: true,
    },
  },
  additionalInfo: {
    languages: {
      type: "input",
      label: "Languages Spoken",
      placeholder: "English, Hindi, etc.",
    },
    hearAbout: {
      type: "select",
      label: "How did you hear about us?",
      options: [
        { value: "website", label: "School Website" },
        { value: "social", label: "Social Media" },
        { value: "friends", label: "Friends/Family" },
        { value: "newspaper", label: "Newspaper" },
        { value: "billboard", label: "Billboard" },
        { value: "event", label: "School Event" },
        { value: "other", label: "Other" },
      ],
    },
    transport: { type: "switch", label: "School Transport Required" },
    hostel: { type: "switch", label: "Hostel Accommodation Required" },
    specialNeeds: { type: "switch", label: "Special Educational Needs" },
    activities: {
      type: "textarea",
      label: "Extra-Curricular Activities Interest",
      placeholder:
        "List any sports, arts, music, or other activities the student is interested in",
      fullWidth: true,
    },
    additionalInfo: {
      type: "textarea",
      label: "Additional Information",
      placeholder: "Any other information you would like to provide",
      fullWidth: true,
    },
    termsAccepted: {
      type: "switch",
      label:
        "I confirm that all the information provided is accurate and complete. I understand that providing false information may result in the cancellation of admission.",
      fullWidth: true,
    },
  },
};

// Reusable field components
export const FieldComponents = {
  input: ({ id, config, value, onChange, section }) => (
    <div className={config.fullWidth ? "md:col-span-2" : ""}>
      <Label htmlFor={id} className="text-sm font-medium">
        {config.label}
      </Label>
      <Input
        id={id}
        type={config.type || "text"}
        placeholder={config.placeholder || config.label.replace("*", "")}
        min={config.min}
        className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
        value={value}
        onChange={onChange}
      />
    </div>
  ),

  email: ({ id, config, value, onChange }) =>
    FieldComponents.input({
      id,
      config: { ...config, type: "email" },
      value,
      onChange,
    }),

  tel: ({ id, config, value, onChange }) =>
    FieldComponents.input({
      id,
      config: { ...config, type: "tel" },
      value,
      onChange,
    }),

  date: ({ id, config, value, onChange }) =>
    FieldComponents.input({
      id,
      config: { ...config, type: "date" },
      value,
      onChange,
    }),

  number: ({ id, config, value, onChange }) =>
    FieldComponents.input({
      id,
      config: { ...config, type: "number" },
      value,
      onChange,
    }),

  select: ({ id, config, value, onSelectChange }) => (
    <div className={config.fullWidth ? "md:col-span-2" : ""}>
      <Label htmlFor={id} className="text-sm font-medium">
        {config.label}
      </Label>
      <Select onValueChange={(val) => onSelectChange(id, val)} value={value}>
        <SelectTrigger className="mt-1 bg-white border-gray-300 w-full rounded-full">
          <SelectValue
            placeholder={`Select ${config.label.replace("*", "")}`}
          />
        </SelectTrigger>
        <SelectContent>
          {config.options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),

  textarea: ({ id, config, value, onChange }) => (
    <div className={config.fullWidth ? "md:col-span-2" : ""}>
      <Label htmlFor={id} className="text-sm font-medium">
        {config.label}
      </Label>
      <Textarea
        id={id}
        placeholder={config.placeholder}
        className="mt-1 bg-white border-gray-300 focus:ring-black rounded-2xl h-24"
        value={value}
        onChange={onChange}
      />
    </div>
  ),

  switch: ({ id, config, value, onSwitchChange }) => (
    <div className={config.fullWidth ? "md:col-span-2" : ""}>
      <Label htmlFor={id} className="text-sm font-medium">
        {config.label}
      </Label>
      <div className="flex items-center space-x-2 mt-3">
        <Switch
          id={id}
          checked={value}
          onCheckedChange={(checked) => onSwitchChange(id, checked)}
          className="ml-3"
        />
        <Label htmlFor={id} className="text-sm m-0">
          {config.fullWidth ? "" : "Yes"}
        </Label>
      </div>
    </div>
  ),
};

// Helper functions
export const getSectionFromFieldId = (id) => {
  if (familyInfo.includes(id)) return "familyInfo";
  if (contactInfo.includes(id)) return "contactInfo";
  if (academicInfo.includes(id)) return "academicInfo";
  if (additionalInfo.includes(id)) return "additionalInfo";
  return "personalInfo";
};

export const validateRequiredFields = (formData) => {
  const missingFields = [];

  Object.entries(FIELD_CONFIGS).forEach(([sectionKey, fields]) => {
    Object.entries(fields).forEach(([fieldId, config]) => {
      if (config.required && !formData[sectionKey]?.[fieldId]) {
        missingFields.push(config.label.replace("*", ""));
      }
    });
  });

  return missingFields;
};

// Form section renderer
export const FormSection = ({
  sectionKey,
  formData,
  handleInputChange,
  handleSelectChange,
  handleSwitchChange,
  dynamicOptions = {}, // Pass all dynamic options as object
}) => {
  const sectionConfig = FIELD_CONFIGS[sectionKey];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.entries(sectionConfig).map(([fieldId, config]) => {
        const FieldComponent = FieldComponents[config.type];
        const value =
          formData[sectionKey]?.[fieldId] ||
          (config.type === "switch" ? false : "");

        // Override options if dynamic options are provided
        if (dynamicOptions[fieldId]) {
          config.options = dynamicOptions[fieldId];
          config.label = "Class Applied For*";
        }

        return (
          <FieldComponent
            key={fieldId}
            id={fieldId}
            config={config}
            value={value}
            onChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onSwitchChange={handleSwitchChange}
            section={sectionKey}
          />
        );
      })}
    </div>
  );
};

// Photo upload component
export const PhotoUpload = ({
  photo,
  firstName,
  onFileChange,
  fileInputRef,
}) => (
  <div className="flex flex-col items-center mb-6">
    <div className="relative group">
      <Avatar className="w-20 h-20 rounded-full border-2 border-gray-100">
        <AvatarImage
          src={photo || "/default-avatar.png"}
          className="rounded-full"
          alt="Profile"
        />
        <AvatarFallback className="rounded-full bg-gray-50 text-gray-600">
          {firstName ? firstName[0] : "S"}
        </AvatarFallback>
      </Avatar>
      <button
        type="button"
        className="absolute -bottom-2 -right-2 bg-white border border-gray-200 text-gray-700 p-2 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
        onClick={() => fileInputRef.current.click()}
      >
        <Camera className="h-4 w-4" />
      </button>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={onFileChange}
      />
    </div>
    <p className="text-xs text-gray-500 mt-2">Upload student photo</p>
  </div>
);

// Option 1: Horizontal Progress Bar with Current Step
export const ProgressBarNavigation = ({ activeTab, setActiveTab }) => {
  const currentIndex = tabs.indexOf(activeTab);
  const progress = ((currentIndex + 1) / tabs.length) * 100;

  return (
    <div className="px-4 py-3 bg-white border-b">
      {/* Progress Bar */}
      <div className="relative">
        <div className="h-2 bg-gray-200 rounded-full mb-3">
          <div
            className="h-2 bg-black rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between absolute -top-1 left-0 right-0">
          {formSections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`w-4 h-4 rounded-full border-2 transition-all ${
                index <= currentIndex
                  ? "bg-black border-black"
                  : "bg-white border-gray-300 hover:border-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Current Step Info */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">
            {formSections[currentIndex]?.icon}
          </div>
          <div>
            <p className="text-sm font-medium">
              {formSections[currentIndex]?.label}
            </p>
            <p className="text-xs text-gray-500">
              Step {currentIndex + 1} of {tabs.length}
            </p>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          {Math.round(progress)}% Complete
        </div>
      </div>
    </div>
  );
};

export function ActionButtons({
  activeTab,
  onClose,
  prevTab,
  nextTab,
  handleSubmit,
  mode = "add",
  isSubmitting = false,
}) {
  const currentIndex = tabs.indexOf(activeTab);
  const isFirstTab = currentIndex === 0;
  const isLastTab = currentIndex === tabs.length - 1;

  return (
    <div className="flex justify-between items-center pt-4 border-t">
      <div className="flex gap-2">
        <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        {!isFirstTab && (
          <Button variant="outline" onClick={prevTab} disabled={isSubmitting}>
            Previous
          </Button>
        )}
      </div>

      <div className="flex gap-2">
        {!isLastTab ? (
          <Button onClick={nextTab} disabled={isSubmitting}>
            Next
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === "add" ? "Submitting..." : "Updating..."}
              </>
            ) : mode === "add" ? (
              "Submit Application"
            ) : (
              "Update Student"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
