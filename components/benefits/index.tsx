import React from 'react';
import Form from './form';

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

const Benefits = () => {
  return (
    <div className='bg-slate-50 px-4 py-10 xl:py-24'>
      {/* <div className='container mx-auto gap-12 flex flex-col xl:flex-row xl:gap-48'> */}
      <div className='container mx-auto gap-12 grid lg:grid-cols-2 xl:gap-48'>
        <div className='h-fit lg:sticky top-10'>
          <h2 className='text-2xl mb-8 xl:text-4.5xl xl:leading-10 xl:mb-14'>
            Beneficios de ser parte de <br /> <span className='font-bold italic'>Conecta Alicorp</span>
          </h2>
          <div className='flex flex-col gap-10'>
            {benefits.map(benefit => {
              return (
                <div className='flex gap-2'>
                  <div className='pt-2'>
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.42609 0.619696L19.5769 7.89838V10.1804L9.50478 17.4L8.24577 15.7672C15.2687 10.6525 14.954 10.9279 16.4884 10.1804L0.927734 10.1804L0.927734 7.91806L16.4884 7.91806C15.3081 7.48527 14.954 7.1115 8.24577 2.33117L9.42609 0.619696Z" fill="#E96767"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className='text-2xl font-bold mb-4 xl:text-3xl'>
                      {benefit.title}
                    </h3>
                    <p className='xl:text-2xl'>{benefit.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className='w-full max-w-648 mx-auto'>
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Benefits;
