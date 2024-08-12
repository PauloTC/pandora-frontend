interface IconProps {
  type: string;
}

export const ExperimentCardIcon: React.FC<IconProps> = ({ type }) => {
  if (type === "Experimento") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-80 inset-x-0 inset-y-0 absolute text-gray-200 translate-x-20 "
      >
        {type}
      </svg>
    );
  }

  if (type === "Reporte") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-80 inset-x-0 inset-y-0 absolute text-gray-200 translate-x-20"
      >
        {/* ...resto del código... */}
      </svg>
    );
  }

  console.log("No icon found for type:", type);

  return null;
};
