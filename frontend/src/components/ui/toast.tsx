import { createRoot } from "react-dom/client";

interface ToastProps {
  title: string;
  description: string;
  variant?: "default" | "destructive";
}

export function toast({ title, description, variant = "default" }: ToastProps) {
  const toastContainer =
    document.getElementById("toast-container") || createToastContainer();

  const toastElement = document.createElement("div");
  const root = createRoot(toastElement);

  root.render(
    <div
      className={`
      fixed bottom-4 right-4 p-4 rounded-lg shadow-lg
      ${
        variant === "destructive"
          ? "bg-red-500 text-white"
          : "bg-green-500 text-white"
      }
    `}
    >
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="text-sm text-white">{description}</p>
    </div>
  );

  toastContainer.appendChild(toastElement);

  setTimeout(() => {
    toastElement.remove();
  }, 3000);
}

function createToastContainer() {
  const container = document.createElement("div");
  container.id = "toast-container";
  document.body.appendChild(container);
  return container;
}
