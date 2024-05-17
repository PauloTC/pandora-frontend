"use client";
import React, { useState } from "react";

export default function CustomersFaqList() {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const faq = [
    {
      question: "¿Quiénes pueden unirse a “Nombre XXXXX”?",
      answer:
        "Explicar los criterios de elegibilidad para bodegueros y dueños de restaurantes.",
    },
    {
      question: "¿Cómo protege Alicorp mi información y privacidad?",
      answer:
        "Detallar las medidas de seguridad y privacidad para la información compartida.",
    },
    {
      question: "¿Hay alguna compensación por participar en “Nombre XXXXX”?",
      answer:
        "Describir los tipos de compensación o incentivos disponibles para los participantes.",
    },
  ];

  return (
    <>
      <ul className="full-width  md:w-9/12">
        {faq.map((q, index) => {
          return (
            <li key={index} className="relative mb-4">
              <label
                className="
                  cursor-pointer flex justify-between 
                  items-center p-4 bg-slate-50 text-base 
                  font-bold text-gray-800"
                htmlFor={`faq${index}`}
              >
                {q.question}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
              <input
                className="absolute top-0 right-0 opacity-0"
                type="checkbox"
                id={`faq${index}`}
                value="second_checkbox"
                onChange={(e) => {
                  setCheckedItems({
                    ...checkedItems,
                    [index]: e.target.checked,
                  });
                }}
              />
              <div
                className={`${
                  checkedItems[index] ? "block" : "hidden"
                } px-4 py-3.5 bg-slate-50 text-sm text-gray-800`}
              >
                {q.answer}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
