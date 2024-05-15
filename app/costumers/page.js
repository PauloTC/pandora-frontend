import Image from "next/image";
import { CostumerForm } from "@/components/Costumers/CostumerForm";

const options = [
  {
    title: "Inscríbete",
    description:
      "Completa nuestro formulario de registro con tus datos. ¡Así de fácil te unes a nuestra comunidad!",
    image: "/costumers/chica.png",
  },
  {
    title: "Te Contactamos",
    description:
      "Según las necesidades de investigación, te invitaremos a participar en entrevistas, talleres y encuestas.",
    image: "/costumers/feedback.png",
  },
  {
    title: "Tu Participación",
    description:
      "Coordina con nosotros la mejor fecha y hora para participar en las actividades planificadas.",
    image: "/costumers/entrevista.png",
  },
];

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

const benefits = [
  {
    title: "Sé escuchado",
    description:
      "Tus ideas y opiniones pueden marcar la diferencia en el desarrollo de nuevos productos y estrategias.",
  },
  {
    title: "Recibe recompensas",
    description:
      "Por compartir tus experiencias y tiempo, te ofrecemos incentivos, merchandising, entre otros.",
  },
  {
    title: "Construye red",
    description:
      "Conecta con otros bodegueros y restauranteros, expandiendo tu red de contactos y oportunidades de negocio.",
  },
];

export default function CostumersPage() {
  return (
    <>
      <section
        className="relative flex items-center justify-center bg-red-500"
        style={{ height: 500 }}
      >
        <figure className="w-full absolute top-full">
          <Image
            src="/costumers/subscribe_bg.svg"
            alt="background"
            className="w-full"
            height={700}
            width={2000}
          />
        </figure>
        <div
          className="flex items-center justify-between w-full relative px-5"
          style={{ maxWidth: 1124 }}
        >
          <div className="max-w-2xl text-white flex flex-col">
            <h1 className={`font-bold text-4xl`}>Creando contigo</h1>
            <span
              className={`font-bold  text-md block mt-4 mb-4`}
              style={{ width: 500 }}
            >
              Una iniciativa de Diseño y Experiencia para innovar y co-crear
              junto a la comunidad de bodegueros y restauranteros.
            </span>
            <p className="text-md" style={{ width: 700 }}>
              En Alicorp queremos revolucionar la forma en que interactuamos y
              apoyamos a los negocios locales. Por eso, lanzamos
              <b> Creando Contigo</b>, un espacio donde tu voz y experiencia son
              fundamentales para construir el futuro de los negocios de
              alimentación en nuestra región.
            </p>
            <button
              type="button"
              className="
                text-gray-900 bg-white 
                border border-gray-300 
                focus:outline-none 
                hover:bg-gray-100 
                focus:ring-4 
                focus:ring-gray-100 
                font-medium rounded-lg 
                text-sm px-5 py-2.5 me-2 mt-6
                w-60"
            >
              Quiero ser parte
            </button>
          </div>
          <Image
            height={400}
            width={400}
            alt="juntos-banner"
            src="/costumers/juntos.png"
          />
        </div>
      </section>
      <br />
      <br />
      <br />
      <section className="flex flex-col items-center p-4 md:p-12">
        <h4 className={`text-3xl mb-8 font-bold`}>¿Cómo participar?</h4>
        <ul className="flex flex-col md:flex-row justify-around gap-16">
          {options.map((option, index) => (
            <li
              key={index}
              className="flex flex-col items-center shadow-xl p-8 rounded-md"
            >
              <Image
                src={option.image}
                width={200}
                height={200}
                alt="Chica con laptop"
              />
              <span className={`mb-3 block font-medium`}>Paso {index + 1}</span>
              <h4 className={`font-bold mb-3 text-xl`}>{option.title}</h4>
              <p className={`text-center text-md`}>{option.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="p-4 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-500 p-8">
          <h3 className={`text-white text-3xl font-bold`}>
            Beneficios de ser parte de Conecta Alicorp
          </h3>

          <ul>
            {benefits.map((benefit, index) => (
              <li key={index} className="text-white mt-8">
                <h4 className={`font-bold text-2xl`}>{benefit.title}</h4>
                <p className={`text-md`}>{benefit.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="shadow-xl p-8">
          <CostumerForm />
        </div>
      </section>

      <section className="flex flex-col items-center p-12">
        <h4 className="text-3xl mb-8 font-bold">Preguntas frecuentes</h4>

        <ul>
          {faq.map((q, index) => {
            return (
              <li key={index}>
                <label htmlFor={`faq${index}`}>
                  {q.question}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
                <input
                  type="checkbox"
                  id={`faq${index}`}
                  value="second_checkbox"
                />
                <div>{q.answer}</div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
