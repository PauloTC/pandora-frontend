"use client";
import React from "react";
import Image from "next/image";

const Hero = () => {
  const handleClick = () => {
    const element = document.getElementById("form-benefits");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="
        container
        px-4
        pt-4
        pb-16
        mx-auto
        lg:px-0
        lg:flex
        gap-8
        lg:justify-between
        xl:pt-14
        xl:pb-32
      "
    >
      <div className="xl:max-w-screen-md">
        <div className="relative w-full max-w-28 h-10 xl:max-w-56 xl:h-20">
          <Image alt="conecta" src="/conecta.svg" fill sizes="100vw" />
        </div>
        <p
          className="
            text-primary-medium
            font-semibold
            mb-4
            mt-10
            xl:text-3.2xl
            xl:mb-8
            xl:mt-32
          "
        >
          Una iniciativa del equipo
        </p>
        <div className="text-4xl font-bold mb-8 xl:text-7xl xl:mb-14">
          <h2>Diseño &</h2>
          <h2 className="ml-12 xl:ml-28">Experiencia</h2>
        </div>
        <p className="text-xs xl:text-2xl">
          En Alicorp queremos revolucionar la forma en que interactuamos y
          apoyamos a los negocios locales. Por eso, lanzamos Conecta Alicorp, un
          espacio donde tu voz y experiencia son fundamentales para construir el
          futuro de los negocios de alimentación en nuestra región.
        </p>
        <button
          onClick={handleClick}
          type="button"
          className="
            text-neutral-lightest
            bg-primary-medium
            outline-none
            font-medium
            rounded-lg
            text-sm
            mt-6
            w-full
            h-10
            flex
            justify-center
            items-center
            xl:max-w-80
            xl:h-14
            xl:text-base
            xl:mt-8
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          Quiero ser parte
        </button>
      </div>
      <div
        className="
          relative
          w-full
          max-w-screen-sm
          animate-floating
        "
      >
        <Image
          alt="hero"
          src="/hero/image.png"
          fill
          sizes="100vw"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default Hero;
