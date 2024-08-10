import classNames from "classnames";
import { useState } from "react";

export const FilterSection = ({
  title,
  items,
  handleFilterClick,
  filterType,
  filterValue,
}: any) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const handleClick = (value) => {
    setSelectedValue(value);
    handleFilterClick(filterType, value);
  };

  const displayedItems = showMore ? items : items.slice(0, 5);

  const buttonText = showMore ? "Ocultar" : "Más";
  let buttonFilterText = "";

  if (filterType === "project") {
    buttonFilterText = `${buttonText} proyectos`;
  } else if (filterType === "objectivePublic") {
    buttonFilterText = `${buttonText} públicos`;
  } else if (filterType === "objetiveResearcher") {
    buttonFilterText = `${buttonText} personas`;
  }

  return (
    <>
      <h4 className="font-medium text-sm block mb-2">{title}</h4>
      <ul className="flex flex-wrap gap-1 mb-6">
        {displayedItems.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => handleClick(item.value)}
              className={classNames(
                filterValue === item.value ? "bg-blue-100" : "bg-gray-100",
                filterValue === item.value ? "text-blue-800" : "text-gray-800",
                "text-xs",
                "font-medium",
                "me-2",
                "px-3",
                "py-1",
                "rounded-full"
              )}
            >
              {item.label}
            </button>
          </li>
        ))}
        {items.length > 5 && (
          <button
            className="text-xs text-blue-800 underline leading-4"
            onClick={() => setShowMore(!showMore)}
          >
            {buttonFilterText}
          </button>
        )}
      </ul>
    </>
  );
};
