import classNames from "classnames";

export const LabelDetail = ({
  label,
  value,
  orientation,
}: {
  label: string;
  value: string;
  orientation: string;
}) => {
  const labelClass = classNames("flex gap-2", {
    "flex-col": orientation === "vertical",
  });

  return (
    <li className={labelClass}>
      <p
        className={classNames("font-medium", {
          "text-left": orientation === "vertical",
          "w-full": orientation === "vertical",
        })}
      >
        {label}:
      </p>
      <p
        className={classNames(
          "text-sm capitalize overflow-auto break-words self-center",
          {
            "w-full": orientation === "vertical",
          }
        )}
      >
        {value}
      </p>
    </li>
  );
};
