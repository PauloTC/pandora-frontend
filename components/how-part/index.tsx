import React from "react";
import Image from "next/image";

const cards = [
  {
    title: "Inscríbete",
    description:
      "Completa nuestro formulario de registro con tus datos. ¡Así de fácil te unes a nuestra Comunidad Alicorp!",
    image: "/costumers/chica.svg",
  },
  {
    title: "Te Contactamos",
    description:
      "Según las necesidades de investigación, te invitaremos a participar en entrevistas, talleres y encuestas.",
    image: "/costumers/megafono.svg",
  },
  {
    title: "Tu Participación",
    description:
      "Coordina con nosotros la mejor fecha y hora para participar en las actividades que tenemos preparadas para ti.",
    image: "/costumers/participacion.svg",
  },
];

const HowPart = () => {
  return (
    <div className='pb-20 xl:bg-[url("/costumers/bg-dots.svg")] xl:pb-44 xl:pt-24'>
      <div className="container mx-auto px-4 flex items-center flex-col xl:px-0">
        <h2 className="text-2xl font-bold mb-10 xl:text-4.5xl xl:mb-14">
          ¿Cómo participar?
        </h2>
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3 xl:gap-12">
          {cards.map((card, index) => {
            return (
              <div
                key={card.title}
                className="
                  rounded-2xl
                  shadow-card
                  min-h-80
                  flex
                  flex-col
                  justify-center
                  items-center
                  bg-white
                  px-6
                  py-12
                  xl:px-8
                  xl:py-16
                "
              >
                <div className="flex">
                  <div
                    className="
                      rounded-full
                      bg-red-400
                      w-12
                      h-12
                      flex
                      items-center
                      justify-center
                      text-3xl
                      mr-4
                      text-white
                    "
                  >
                    {++index}
                  </div>
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={140}
                    height={140}
                  />
                </div>
                <h4 className="text-2xl font-bold mb-2 mt-4 xl:text-3.2xl xl:mb-4">
                  {card.title}
                </h4>
                <p className="text-xs text-center xl:text-base">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HowPart;
