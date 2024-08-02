"use client";
import React, { useState } from "react";

export default function CustomersFaqList() {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const faq = [
    {
      question: "¿Quiénes pueden unirse a “Comunidad Alicorp”?",
      answer:
        "Todos nuestros clientes con un negocio que deseen participar voluntariamente en investigaciones para mejorar nuestros productos digitales.",
    },
    {
      question: "¿Cómo protege Alicorp mi información y privacidad?",
      answer:
        "Tus datos son confidenciales y se utilizarán únicamente con fines de investigación. No se emplearán para actividades comerciales ni publicitarias.",
    },
    {
      question: "Hay compensación por participar en “Comunidad Alicorp”",
      answer:
        "Sí. Al participar en actividades con nuestros diseñadores e investigadores, recibirás un incentivo por tu tiempo.",
    },
    {
      question: "Cómo y cuándo me contactará el equipo de “Comunidad Alicorp”?",
      answer:
        "Te contactaremos por llamada o mensaje de WhatsApp al número que nos proporcionaste para confirmar tu disponibilidad",
    },
    {
      question: "Cómo puedo dejar de participar en “Comunidad Alicorp”?",
      answer:
        "Envía un correo a experiencedesign@alicorp.com.pe indicando tu deseo de dejar de participar. Tus datos serán eliminados en 48 horas hábiles. Puedes registrarte nuevamente si cambias de opinión.",
    },
  ];

  return (
    <ul className="max-w-5xl w-full flex flex-col gap-4">
      {faq.map((q, index) => {
        return (
          <li key={index} className="relative">
            <label
              htmlFor={`faq${index}`}
              className="
                cursor-pointer
                rounded
                flex
                gap-4
                justify-between
                items-center
                p-6
                bg-slate-50
                text-base
                font-semibold
                text-gray-800
                xl:text-2xl
              "
            >
              {q.question}

              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className={`w-8 h-8 text-red-500 transform transition-transform duration-500 ${
                    checkedItems[index] ? "rotate-180" : ""
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
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
              className={`px-6 pb-6 bg-slate-50 text-base text-gray-800 ${
                checkedItems[index]
                  ? "opacity-100 max-h-96"
                  : "opacity-0 max-h-0 hidden"
              }`}
            >
              {q.answer}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
