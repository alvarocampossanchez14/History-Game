import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLightbulb } from '@fortawesome/free-solid-svg-icons';

function Pista({preguntaPista, pregunta}) {
    const [mostrarPista, setMostrarPista] = useState(false);


    return (
        <div className="bg-slate-600 text-white flex absolute mt-40 rounded-md">
        {preguntaPista ? (
          mostrarPista ? (
            <div className="p-2">
                <p className="text-white">{pregunta.pista}</p>
            </div>
          ) : (
            <div className="flex items-center p-2">
              <h1 className="font-bold">¿Quieres una pista?</h1>
              <button onClick={() => setMostrarPista(true)}>
                <FontAwesomeIcon icon={faLightbulb} size="1x" />
              </button>
            </div>
          )
        ) : null}
      </div>
    );
}

export default Pista;