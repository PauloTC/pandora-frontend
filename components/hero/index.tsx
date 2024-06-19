import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <div
      className='
        container
        px-4
        pt-4
        pb-16
        mx-auto
        xl:px-0
        xl:flex
        xl:justify-between
        xl:pt-14
        xl:pb-[120px]
      '
    >
      <div className='xl:max-w-screen-md'>
        <div className='relative w-full max-w-28 h-10 xl:max-w-56 xl:h-20'>
          <Image alt='conecta' src='/conecta.svg' fill sizes='100vw' />
        </div>
        <p
          className='
            text-primary-medium
            font-semibold
            mb-4
            mt-10
            xl:text-[32px]
            xl:mb-8
            xl:mt-32
          '
        >
          Una iniciativa del equipo
        </p>
        <div className='text-4xl font-bold mb-8 xl:text-7xl xl:mb-14'>
          <h2>Diseño &</h2>
          <h2 className='ml-12 xl:ml-28'>Experiencia</h2>
        </div>
        <p className='text-xs xl:text-2xl'>
          En Alicorp queremos revolucionar la forma en que interactuamos y apoyamos a los negocios locales. Por eso, lanzamos Conecta Alicorp, un espacio donde tu voz y experiencia son fundamentales para construir el futuro de los negocios de alimentación en nuestra región.
        </p>
        <button
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
            xl:max-w-80
            xl:h-14
            xl:text-base
            xl:mt-8
          "
        >
          Quiero ser parte
        </button>
      </div>
      <div
        className='
          relative
          w-full
          max-w-screen-sm
          animate-floating
        '
      >
        <Image alt='hero' src='/hero/image.png' fill sizes='100vw' objectFit='contain' />
      </div>
    </div>
  );
};

export default Hero;