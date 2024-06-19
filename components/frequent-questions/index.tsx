import React from 'react';
import CustomersFaqList from '../Costumers/CostumerFaqList';

const FrequentQuestions = () => {
  return (
    <div className='bg-white'>
      <div
        className='
          flex
          flex-col
          items-center
          container
          pt-8
          pb-12
          mx-auto
          px-4
          xl:px-0
          xl:py-24
        '
      >
        <h2 className='text-2xl mb-14 font-bold xl:text-[40px]'>
          Preguntas fecuentes
        </h2>
        <CustomersFaqList />
      </div>
    </div>
  );
};

export default FrequentQuestions;
