import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Ranking from './Ranking';







function Home() { // Agrega un estado para mostrar o ocultar el juego
  const navigate = useNavigate();


  
  const [volume, setVolume] = useState(0.5);

  




      const handleVolumenChange = (e) => {
          setVolume(e.target.value);
      };

      console.log(volume);
  
      const start = () => {
          navigate("/instrucctions")
      };
  

      const redSaveGames = () => {
        navigate("/games")
      }



      return (
        <div className="flex flex-col items-center min-h-screen">
          <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-4xl font-bold text-white text-center text-gray-800 animate-fade-in">
              Joc d'Història
            </h1>
            <button className="bg-gray-700 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out transform hover:scale-105 hover:rotate-3 rounded-lg px-4 py-2 animate-fade-in" 
              onClick={start}>
              Començar Partida
            </button>
            <div className="flex">
              <button className="bg-gray-700 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:border-red-300 transition duration-300 ease-in-out transform hover:scale-105 hover:rotate-3 rounded-lg px-4 py-2 animate-fade-in" 
                onClick={redSaveGames}>
                Partides Guardades
              </button>
            </div>
          </div>
        </div>
        <Ranking />
        </div>
      );
}

export default Home;
