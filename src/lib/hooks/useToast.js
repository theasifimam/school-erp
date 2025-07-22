// hooks/use-toast.js
import { useState, useCallback } from "react";

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(
    ({ title, description, variant = "default", duration = 5000 }) => {
      const id = Date.now() + Math.random();

      const newToast = {
        id,
        title,
        description,
        variant,
        duration,
        createdAt: Date.now(),
      };

      setToasts((prev) => [...prev, newToast]);

      // Auto-remove toast after duration
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, duration);

      return id;
    },
    []
  );

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return {
    toast,
    dismiss,
    toasts,
  };
}

// Alternative: Using react-hot-toast (recommended)
// npm install react-hot-toast

// import toast from "react-hot-toast";

// export const useToastNotification = () => {
//   const showSuccess = (message) => {
//     toast.success(message, {
//       duration: 4000,
//       position: "top-right",
//       style: {
//         background: "#10b981",
//         color: "#ffffff",
//       },
//     });
//   };

//   const showError = (message) => {
//     toast.error(message, {
//       duration: 5000,
//       position: "top-right",
//       style: {
//         background: "#ef4444",
//         color: "#ffffff",
//       },
//     });
//   };

//   const showLoading = (message) => {
//     return toast.loading(message, {
//       position: "top-right",
//     });
//   };

//   const showInfo = (message) => {
//     toast(message, {
//       duration: 4000,
//       position: "top-right",
//       icon: "ℹ️",
//       style: {
//         background: "#3b82f6",
//         color: "#ffffff",
//       },
//     });
//   };

//   return {
//     showSuccess,
//     showError,
//     showLoading,
//     showInfo,
//     dismiss: toast.dismiss,
//   };
// };

// Toast Provider Component (if using custom toast)
// import React, { createContext, useContext } from "react";
// import { useToast } from "./useToast";

// const ToastContext = createContext();

// export const ToastProvider = ({ children }) => {
//   const toastMethods = useToast();

//   return (
//     <ToastContext.Provider value={toastMethods}>
//       {children}
//       <ToastContainer
//         toasts={toastMethods.toasts}
//         dismiss={toastMethods.dismiss}
//       />
//     </ToastContext.Provider>
//   );
// };

// export const useToastContext = () => {
//   const context = useContext(ToastContext);
//   if (!context) {
//     throw new Error("useToastContext must be used within a ToastProvider");
//   }
//   return context;
// };

// // Toast Container Component
// const ToastContainer = ({ toasts, dismiss }) => {
//   return (
//     <div className="fixed top-4 right-4 z-50 space-y-2">
//       {toasts.map((toast) => (
//         <div
//           key={toast.id}
//           className={`
//             max-w-md p-4 rounded-md shadow-lg transition-all duration-300
//             ${
//               toast.variant === "destructive"
//                 ? "bg-red-500 text-white"
//                 : "bg-white border border-gray-200 text-gray-900"
//             }
//           `}
//         >
//           <div className="flex justify-between items-start">
//             <div>
//               {toast.title && (
//                 <div className="font-semibold text-sm mb-1">{toast.title}</div>
//               )}
//               {toast.description && (
//                 <div className="text-sm opacity-90">{toast.description}</div>
//               )}
//             </div>
//             <button
//               onClick={() => dismiss(toast.id)}
//               className="ml-3 text-sm opacity-60 hover:opacity-100"
//             >
//               ×
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// Usage example in a component:
/*
import { useToastNotification } from '@/hooks/use-toast';

const MyComponent = () => {
  const { showSuccess, showError, showLoading } = useToastNotification();

  const handleSuccess = () => {
    showSuccess('User created successfully!');
  };

  const handleError = () => {
    showError('Failed to create user');
  };

  const handleAsyncOperation = async () => {
    const toastId = showLoading('Creating user...');
    try {
      await someAsyncOperation();
      toast.dismiss(toastId);
      showSuccess('User created successfully!');
    } catch (error) {
      toast.dismiss(toastId);
      showError('Failed to create user');
    }
  };

  return (
    <div>
      <button onClick={handleSuccess}>Success</button>
      <button onClick={handleError}>Error</button>
      <button onClick={handleAsyncOperation}>Async Operation</button>
    </div>
  );
};
*/
