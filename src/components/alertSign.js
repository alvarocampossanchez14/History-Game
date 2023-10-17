import React from 'react';
import { useNavigate } from 'react-router-dom';

function AlertIniciarSesion() {
  const navigate = useNavigate();

  return (
    <div className="fixed top-20 bg-blue-600 border-l-4 border-blue-500 text-white-700 p-4 w-80" role="alert">
      <p className="font-bold text-white">Atenció!</p>
      <p className='text-white'>Has d'iniciar sessió per jugar.</p>
      <button
        onClick={() => navigate('/instrucctions')}
        className="mt-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded"
      >
        Iniciar Sessió
      </button>
    </div>
  );
}

export default AlertIniciarSesion;