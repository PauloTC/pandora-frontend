import classNames from "classnames";

export const StatusBadge = ({ status }: { status: string }) => {
  const className = classNames(
    "rounded-lg",
    "text-xs",
    "block",
    "capitalize",
    "text-white",
    "px-2",
    "py-1",
    {
      "bg-stone-600": status === "finalizado",
      "bg-teal-600": status === "en curso",
      "bg-rose-600": status === "bloqueado" || status === "cancelado",
      "bg-sky-600": status === "por iniciar" || status === "en pausa",
    }
  );

  return <span className={className}>{status}</span>;
};
