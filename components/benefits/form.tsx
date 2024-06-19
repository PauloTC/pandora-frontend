import React from 'react';

const Form = () => {
  return (
    <div
      className='w-full bg-white py-12 px-2 rounded-3xl border border-neutral-medium lg:py-16 lg:px-12'
    >
      <div className='mb-2 flex justify-between items-center'>
        <h3 className='font-bold text-2xl'>Regístrate</h3>
        <div className='text-positive-dark text-xs bg-positive-dark-opacity px-2 py-1 rounded-lg'>
          Paso 1 de 2
        </div>
      </div>
      <p className='font-light mb-8'>Por favor, completa estos datos.</p>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col xl:flex-row w-full gap-5'>
          <div className='w-full'>
            <label htmlFor="email" className="block mb-[6px] font-semibold">Nombres y apellidos</label>
            <input type="email" id="email" className="border border-neutral-medium rounded-lg block w-full h-12 px-4 placeholder-gray-400 bg-neutral-light" placeholder="Ingresa tus nombres y apellidos" required />
          </div>
          <div className='w-full'>
            <label htmlFor="email" className="block mb-[6px] font-semibold">DNI</label>
            <input type="email" id="email" className="border border-neutral-medium rounded-lg block w-full h-12 px-4 placeholder-gray-400 bg-neutral-light" placeholder="Documento de identidad" required />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block mb-[6px] font-semibold">Correo electrónico</label>
          <input type="email" id="email" className="border border-neutral-medium rounded-lg block w-full h-12 px-4 placeholder-gray-400 bg-neutral-light" placeholder="micorreo@correo.com" required />
        </div>
        <div className='flex flex-col xl:flex-row w-full gap-5'>
          <div className='w-full'>
            <label htmlFor="email" className="block mb-[6px] font-semibold">Fecha de nacimiento</label>
            <input type="email" id="email" className="border border-neutral-medium rounded-lg block w-full h-12 px-4 placeholder-gray-400 bg-neutral-light" placeholder="DD/MM/YYYY" required />
          </div>
          <div className='w-full'>
            <label htmlFor="email" className="block mb-[6px] font-semibold">Celular</label>
            <input type="email" id="email" className="border border-neutral-medium rounded-lg block w-full h-12 px-4 placeholder-gray-400 bg-neutral-light" placeholder="998883322" required />
          </div>
        </div>
      </div>
      <div className='my-8'>
        <p className='font-light text-xs'>
          Priorizamos tu seguridad y la confidencialidad de la información que compartes con nosotros. En Alicorp, la seguridad de tu información es nuestra prioridad, asegurando tu privacidad y bienestar.
        </p>
      </div>
      <button
        type="submit"
        // onClick={handleButtonClick}
        className={`
          w-full
          h-14
          font-semibold
          focus:outline-none
          text-white
          bg-red-500
          rounded-lg
          xl:hover:bg-red-700
        `}
      >
        Continuar
        {/* {step === 1 ? "Continuar" : "Enviar"} */}
      </button>
    </div>
  );
};

export default Form;
