// utils/draftUtils.js
// Utility functions for managing student form drafts in localStorage

import { useState, useEffect } from "react";

export const DRAFT_KEYS = {
  FORM_DATA: "student-form-draft",
  ACTIVE_TAB: "student-form-active-tab",
  LAST_SAVED: "student-form-last-saved",
};

/**
 * Check if there's any meaningful data in the form object
 */
export const hasFormData = (formData) => {
  if (!formData) return false;

  return Object.values(formData).some((section) =>
    Object.values(section).some((value) => {
      if (typeof value === "string") return value.trim() !== "";
      if (typeof value === "boolean") return value !== false;
      if (typeof value === "number") return value !== 0;
      return value !== null && value !== undefined;
    })
  );
};

/**
 * Check if there's a saved draft in localStorage
 */
export const hasDraftInStorage = () => {
  try {
    const savedData = localStorage.getItem(DRAFT_KEYS.FORM_DATA);
    if (!savedData) return false;

    const parsedData = JSON.parse(savedData);
    return hasFormData(parsedData);
  } catch (error) {
    console.error("Error checking for draft:", error);
    return false;
  }
};

/**
 * Save draft to localStorage
 */
export const saveDraftToStorage = (formData, activeTab) => {
  try {
    localStorage.setItem(DRAFT_KEYS.FORM_DATA, JSON.stringify(formData));
    localStorage.setItem(DRAFT_KEYS.ACTIVE_TAB, activeTab);
    localStorage.setItem(DRAFT_KEYS.LAST_SAVED, new Date().toISOString());
    return { success: true };
  } catch (error) {
    console.error("Error saving draft:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Load draft from localStorage
 */
export const loadDraftFromStorage = () => {
  try {
    const savedData = localStorage.getItem(DRAFT_KEYS.FORM_DATA);
    const savedTab = localStorage.getItem(DRAFT_KEYS.ACTIVE_TAB);
    const savedTime = localStorage.getItem(DRAFT_KEYS.LAST_SAVED);

    if (!savedData) {
      return { success: false, message: "No draft found" };
    }

    const parsedData = JSON.parse(savedData);
    return {
      success: true,
      data: {
        formData: parsedData,
        activeTab: savedTab || "personalInfo",
        lastSaved: savedTime ? new Date(savedTime) : null,
      },
    };
  } catch (error) {
    console.error("Error loading draft:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Clear draft from localStorage
 */
export const clearDraftFromStorage = () => {
  try {
    localStorage.removeItem(DRAFT_KEYS.FORM_DATA);
    localStorage.removeItem(DRAFT_KEYS.ACTIVE_TAB);
    localStorage.removeItem(DRAFT_KEYS.LAST_SAVED);
    return { success: true };
  } catch (error) {
    console.error("Error clearing draft:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Get draft info (last saved time, etc.)
 */
export const getDraftInfo = () => {
  try {
    const savedTime = localStorage.getItem(DRAFT_KEYS.LAST_SAVED);
    const activeTab = localStorage.getItem(DRAFT_KEYS.ACTIVE_TAB);

    return {
      lastSaved: savedTime ? new Date(savedTime) : null,
      activeTab: activeTab || "personalInfo",
      exists: hasDraftInStorage(),
    };
  } catch (error) {
    console.error("Error getting draft info:", error);
    return {
      lastSaved: null,
      activeTab: "personalInfo",
      exists: false,
    };
  }
};

/**
 * React hook to monitor draft changes
 */
export const useDraftStatus = () => {
  const [draftExists, setDraftExists] = useState(false);
  const [draftInfo, setDraftInfo] = useState({
    lastSaved: null,
    activeTab: "personalInfo",
    exists: false,
  });

  useEffect(() => {
    const checkDraft = () => {
      const exists = hasDraftInStorage();
      const info = getDraftInfo();
      setDraftExists(exists);
      setDraftInfo(info);
    };

    // Initial check
    checkDraft();

    // Set up interval to check for changes
    const interval = setInterval(checkDraft, 2000);

    // Listen for storage changes from other tabs
    const handleStorageChange = (e) => {
      if (Object.values(DRAFT_KEYS).includes(e.key)) {
        checkDraft();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return {
    draftExists,
    draftInfo,
    refresh: () => {
      const exists = hasDraftInStorage();
      const info = getDraftInfo();
      setDraftExists(exists);
      setDraftInfo(info);
    },
  };
};
