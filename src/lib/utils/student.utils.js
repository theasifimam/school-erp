export function transformStudent(raw) {
  return {
    personalInfo: {
      firstName: raw?.firstName || "",
      lastName: raw?.lastName || "",
      middleName: raw?.middleName || "",
      preferredName: raw?.preferredName || "",
      gender: raw?.gender || "",
      dob: raw?.dateOfBirth || "",
      bloodGroup: raw?.bloodGroup || "",
      medicalConditions: raw?.medicalConditions || "",
      photo: raw?.photo || null,
    },

    contactInfo: {
      phone: raw?.phoneNumber || "",
      alternatePhone: raw?.alternatePhoneNumber || "",
      email: raw?.email || "",
      address: raw?.address?.street || "",
      city: raw?.address?.city || "",
      state: raw?.address?.state || "",
      country: raw?.address?.country || "",
      zipCode: raw?.address?.zipCode || "",
      emergencyContactName: raw?.emergencyContact?.name || "",
      emergencyRelation: raw?.emergencyContact?.relationship || "",
      emergencyContactPhone: raw?.emergencyContact?.phone || "",
    },

    academicInfo: {
      session: raw?.academicSession || "",
      achievements: raw?.achievements || "",
      admissionType: raw?.admissionType || "",
      appliedClass: raw?.appliedClass || "",
      board: raw?.board || "",
      previousSchool: raw?.previousSchool?.name || "",
      schoolAddress: raw?.previousSchool?.address || "",
      lastClass: raw?.previousSchool?.lastClass || "",
      lastGrade: raw?.previousSchool?.lastGrade || "",
      stream: raw?.stream || "",
      transferCertificate: raw?.hasTransferCertificate || false,
    },

    familyInfo: {
      fatherName: raw?.guardians?.[0]?.name || "",
      fatherEmail: raw?.guardians?.[0]?.email || "",
      fatherPhone: raw?.guardians?.[0]?.phone || "",
      fatherOccupation: raw?.guardians?.[0]?.occupation || "",

      motherName: raw?.guardians?.[1]?.name || "",
      motherEmail: raw?.guardians?.[1]?.email || "",
      motherPhone: raw?.guardians?.[1]?.phone || "",
      motherOccupation: raw?.guardians?.[1]?.occupation || "",

      siblings: raw?.siblings?.count?.toString() || "",
      siblingsAtSchool: raw?.siblings?.atSchool || false,
      familyNotes: raw?.familyNotes || "",
    },

    additionalInfo: {
      languages: raw?.languages || "",
      hearAbout: raw?.hearAbout || "",
      hostel: raw?.hostelRequired || false,
      transport: raw?.transportRequired || false,
      specialNeeds: raw?.specialNeeds || false,
      termsAccepted: raw?.termsAccepted || false,
      activities: raw?.activities || "",
      additionalInfo: raw?.additionalInfo || "",
    },
  };
}

export function getAcademicSessions(yearsAhead = 5) {
  const currentYear = new Date().getFullYear();
  const sessions = [];

  for (let i = 0; i <= yearsAhead; i++) {
    const start = currentYear + i;
    const end = start + 1;
    sessions.push({ value: `${start}-${end}`, label: `${start}-${end}` });
  }

  return sessions;
}
