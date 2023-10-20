import React from 'react';

function Alert({text}) {

  return (
    <div className="absolute md:top-20 sm:top-1/3 left-0 bg-blue-500 border-l-4 border-blue-800 text-white-700 p-4 w-80 rounded-lg border-blue-400 border-b-[4px]" role="alert">
      <p className="font-bold text-white">¡Atención!</p>
      <p className='text-white'>{text}</p>
    </div>
  );
}

export default Alert