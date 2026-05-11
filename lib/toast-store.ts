export type ToastType = "success" | "error" | "info" | "default";

export interface ToastProps {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

type Listener = (toasts: ToastProps[]) => void;

let toasts: ToastProps[] = [];
const listeners: Set<Listener> = new Set();

const notify = () => {
  listeners.forEach((listener) => listener([...toasts]));
};

export const toastStore = {
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  add: (toast: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id };
    toasts = [...toasts, newToast];
    notify();

    if (toast.duration !== 0) {
      setTimeout(() => {
        toastStore.remove(id);
      }, toast.duration || 4000);
    }
  },

  remove: (id: string) => {
    toasts = toasts.filter((t) => t.id !== id);
    notify();
  },
};

export const toast = {
  success: (title: string, description?: string) =>
    toastStore.add({ title, description, type: "success" }),
  error: (title: string, description?: string) =>
    toastStore.add({ title, description, type: "error" }),
  info: (title: string, description?: string) =>
    toastStore.add({ title, description, type: "info" }),
  show: (title: string, description?: string) =>
    toastStore.add({ title, description, type: "default" }),
};
