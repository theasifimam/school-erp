// Role-based sidebar configuration
export const roleBasedSidebarConfig = {
  admin: {
    sections: ["main", "academic", "administration", "finance", "system"],
    hasFullAccess: true,
  },
  principal: {
    sections: ["main", "academic", "administration", "finance", "system"],
    hasFullAccess: true,
  },
  vice_principal: {
    sections: ["main", "academic", "administration"],
    hasFullAccess: false,
  },
  teacher: {
    sections: ["main", "academic"],
    hasFullAccess: false,
    limitedItems: {
      academic: ["students", "classes", "exams"],
    },
  },
  faculty: {
    sections: ["main", "academic"],
    hasFullAccess: false,
    limitedItems: {
      academic: ["students", "classes", "exams"],
    },
  },
  hod: {
    sections: ["main", "academic"],
    hasFullAccess: false,
    limitedItems: {
      academic: ["students", "faculty", "classes", "exams"],
    },
  },
  student: {
    sections: ["main"],
    hasFullAccess: false,
    limitedItems: {
      main: ["dashboard", "calendar", "tasks"],
    },
  },
  parent: {
    sections: ["main", "communication"],
    hasFullAccess: false,
    limitedItems: {
      main: ["dashboard", "calendar"],
      //   communication: ["communication"],
    },
  },
  librarian: {
    sections: ["main", "academic"],
    hasFullAccess: false,
    limitedItems: {
      academic: ["library"],
    },
  },
  accountant: {
    sections: ["main", "finance"],
    hasFullAccess: false,
  },
  hr_manager: {
    sections: ["main", "academic", "administration"],
    hasFullAccess: false,
    limitedItems: {
      academic: ["faculty"],
      administration: ["system"],
    },
  },
  receptionist: {
    sections: ["main", "communication"],
    hasFullAccess: false,
  },
  counselor: {
    sections: ["main", "academic"],
    hasFullAccess: false,
    limitedItems: {
      academic: ["students"],
    },
  },
  lab_assistant: {
    sections: ["main", "academic"],
    hasFullAccess: false,
    limitedItems: {
      academic: ["classes"],
    },
  },
  transport_incharge: {
    sections: ["main", "administration"],
    hasFullAccess: false,
    limitedItems: {
      administration: ["transport"],
    },
  },
  driver: {
    sections: ["main", "administration"],
    hasFullAccess: false,
    limitedItems: {
      administration: ["transport"],
    },
  },
  security_guard: {
    sections: ["main"],
    hasFullAccess: false,
  },
  maintenance_staff: {
    sections: ["main"],
    hasFullAccess: false,
  },
  vendor: {
    sections: ["main"],
    hasFullAccess: false,
  },
  guest: {
    sections: ["main"],
    hasFullAccess: false,
    limitedItems: {
      main: ["dashboard"],
    },
  },
};

const roleBasedSidebarConfig_OriginalTarget = {
  admin: {
    sections: [
      "main",
      "academic",
      "administration",
      "finance",
      "communication",
      "system",
    ],
    hasFullAccess: true,
  },
  principal: {
    sections: [
      "main",
      "academic",
      "administration",
      "finance",
      "communication",
      "system",
    ],
    hasFullAccess: true,
  },
  vice_principal: {
    sections: ["main", "academic", "administration", "communication"],
    hasFullAccess: false,
  },
  teacher: {
    sections: ["main", "academic"],
    hasFullAccess: false,
    limitedItems: {
      academic: ["students", "classes", "exams"],
    },
  },
  faculty: {
    sections: ["main", "academic"],
    hasFullAccess: false,
    limitedItems: {
      academic: ["students", "classes", "exams"],
    },
  },
  hod: {
    sections: ["main", "academic"],
    hasFullAccess: false,
    limitedItems: {
      academic: ["students", "faculty", "classes", "exams"],
    },
  },
  student: {
    sections: ["main"],
    hasFullAccess: false,
    limitedItems: {
      main: ["dashboard", "calendar", "tasks"],
    },
  },
  parent: {
    sections: ["main", "communication"],
    hasFullAccess: false,
    limitedItems: {
      main: ["dashboard", "calendar"],
      communication: ["communication"],
    },
  },
  librarian: {
    sections: ["main", "academic"],
    hasFullAccess: false,
    limitedItems: {
      academic: ["library"],
    },
  },
  accountant: {
    sections: ["main", "finance"],
    hasFullAccess: false,
  },
  hr_manager: {
    sections: ["main", "academic", "administration"],
    hasFullAccess: false,
    limitedItems: {
      academic: ["faculty"],
      administration: ["system"],
    },
  },
  receptionist: {
    sections: ["main", "communication"],
    hasFullAccess: false,
  },
  counselor: {
    sections: ["main", "academic"],
    hasFullAccess: false,
    limitedItems: {
      academic: ["students"],
    },
  },
  lab_assistant: {
    sections: ["main", "academic"],
    hasFullAccess: false,
    limitedItems: {
      academic: ["classes"],
    },
  },
  transport_incharge: {
    sections: ["main", "administration"],
    hasFullAccess: false,
    limitedItems: {
      administration: ["transport"],
    },
  },
  driver: {
    sections: ["main", "administration"],
    hasFullAccess: false,
    limitedItems: {
      administration: ["transport"],
    },
  },
  security_guard: {
    sections: ["main"],
    hasFullAccess: false,
  },
  maintenance_staff: {
    sections: ["main"],
    hasFullAccess: false,
  },
  vendor: {
    sections: ["main"],
    hasFullAccess: false,
  },
  guest: {
    sections: ["main"],
    hasFullAccess: false,
    limitedItems: {
      main: ["dashboard"],
    },
  },
};
