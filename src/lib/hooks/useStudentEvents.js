// hooks/useStudentEvents.js
import { useEffect } from "react";

/**
 * Custom hook to listen for student-related events
 * Use this in your student list components to refresh data when new students are added
 */
export const useStudentEvents = (callbacks = {}) => {
  const {
    onStudentAdded = () => {},
    onStudentUpdated = () => {},
    onStudentDeleted = () => {},
  } = callbacks;

  useEffect(() => {
    // Listen for student added event
    const handleStudentAdded = (event) => {
      console.log("Student added event received:", event.detail);
      onStudentAdded(event.detail);
    };

    // Listen for student updated event
    const handleStudentUpdated = (event) => {
      console.log("Student updated event received:", event.detail);
      onStudentUpdated(event.detail);
    };

    // Listen for student deleted event
    const handleStudentDeleted = (event) => {
      console.log("Student deleted event received:", event.detail);
      onStudentDeleted(event.detail);
    };

    // Add event listeners
    window.addEventListener("studentAdded", handleStudentAdded);
    window.addEventListener("studentUpdated", handleStudentUpdated);
    window.addEventListener("studentDeleted", handleStudentDeleted);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("studentAdded", handleStudentAdded);
      window.removeEventListener("studentUpdated", handleStudentUpdated);
      window.removeEventListener("studentDeleted", handleStudentDeleted);
    };
  }, [onStudentAdded, onStudentUpdated, onStudentDeleted]);

  // Helper functions to emit events (use these from other components)
  const emitStudentAdded = (studentData) => {
    window.dispatchEvent(
      new CustomEvent("studentAdded", { detail: studentData })
    );
  };

  const emitStudentUpdated = (studentData) => {
    window.dispatchEvent(
      new CustomEvent("studentUpdated", { detail: studentData })
    );
  };

  const emitStudentDeleted = (studentId) => {
    window.dispatchEvent(
      new CustomEvent("studentDeleted", { detail: { id: studentId } })
    );
  };

  return {
    emitStudentAdded,
    emitStudentUpdated,
    emitStudentDeleted,
  };
};
