import { createContext, useCallback, useContext, useState } from "react";

// Icons
import { RejectIcon } from "../utils/Icon";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: "", type: "success" });

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 3000);
  }, []);

  const toastClass = toast.type === "success" ? "alert-success" : "alert-error";

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.message && (
        <div className="toast toast-top toast-center z-50">
          <div className={`alert ${toastClass}`}>
            <span>{toast.message}</span>
            <button
              className="btn btn-ghost btn-circle size-4"
              onClick={() => setToast({ message: "", type: "success" })}
            >
              <RejectIcon />
            </button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};
