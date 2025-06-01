const userRoles = [
  "super_admin",
  "admin",
  "principal",
  "vice_principal",
  "hod",
  "parent",
  "librarian",
  "accountant",
  "hr_manager",
  "receptionist",
  "counselor",
  "lab_assistant",
  "transport_incharge",
  "driver",
  "security_guard",
  "maintenance_staff",
  "vendor",
  "guest",
];

// Convert to array of objects with label and value
const roleOptions = userRoles.map((role) => ({
  value: role,
  label: role
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "),
}));

// Function to get assignable roles
export const getAssignableRoles = (assignerRole) => {
  const roleHierarchy = {
    super_admin: 10,
    admin: 9,
    principal: 8,
    vice_principal: 7,
    hod: 6,
    teacher: 5,
    faculty: 5,
    librarian: 4,
    accountant: 4,
    hr_manager: 4,
    counselor: 4,
    lab_assistant: 3,
    transport_incharge: 3,
    driver: 3,
    security_guard: 3,
    maintenance_staff: 3,
    receptionist: 2,
    student: 1,
    parent: 1,
    vendor: 1,
    guest: 0,
  };

  if (!roleHierarchy[assignerRole]) return [];

  const assignerLevel = roleHierarchy[assignerRole];

  return roleOptions.filter((role) => {
    const targetLevel = roleHierarchy[role.value];
    return assignerLevel > targetLevel;
  });
};
