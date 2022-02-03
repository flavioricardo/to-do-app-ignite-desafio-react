import "../styles/feedback.scss";

interface ErrorProps {
  type?: string;
  message?: string;
}

export function useShowFeedbackMessage(error: ErrorProps) {
  const { type, message } = error;

  const title = document.createElement("h1");
  title.innerText = message ?? "Ocorreu um erro!";

  const container = document.createElement("div");
  container.id = "message-container";
  container.className = `feedback-message ${type ?? "warning"}`;
  container.appendChild(title);

  const rootNode = document.getElementById("root");
  rootNode?.appendChild(container);

  const messageContainer = document.getElementById("message-container");
  requestAnimationFrame(() => messageContainer?.classList.add("active"));

  if (messageContainer) {
    setTimeout(() => {
      requestAnimationFrame(() => messageContainer?.classList.remove("active"));
    }, 5000);
  }
}
