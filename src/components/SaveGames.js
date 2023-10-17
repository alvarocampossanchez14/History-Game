import React, { useState, useEffect } from 'react';
import { db } from './../firebase';
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Ranking from './Ranking';

function SaveGame() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user] = useAuthState(auth);

  const [partidasGuardadas, setPartidasGuardadas] = useState([]);
  const [error, setError] = useState(null);
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);

  async function obtenerDatosDeFirestore() {
    try {
      const partidasRef = collection(db, 'games');
      const q = query(partidasRef, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const partidas = [];
      querySnapshot.forEach((doc) => {
        partidas.push({ id: doc.id, ...doc.data() });
      });
      setPartidasGuardadas(partidas);
    } catch (error) {
      setError('Error al obtener partidas guardadas: ' + error.message);
    }
  }

  useEffect(() => {
    if (user) {
      setUsuarioLogueado(true);
      obtenerDatosDeFirestore();
    } else {
      setUsuarioLogueado(false);
      setError("Has d'iniciar sessió o jugar abans de veure les partides guardades.");
    }
  }, [user]);

  return (
    <div className="container mx-auto p-6 mt-20">
      <h2 className="text-3xl font-bold mb-4">Partidas Guardadas</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {usuarioLogueado ? (
        <div>
          {partidasGuardadas.length > 0 ? (
            <ul>
              {partidasGuardadas.map((partida) => (
                <li key={partida.id} className="mb-2">
                  <div className="bg-white p-4 rounded shadow">
                    <p className="text-xl font-semibold">Puntos: {partida.puntos}</p>
                    {partida.fecha ? partida.fecha.toDate().toLocaleString() : "Fecha no disponible"}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white">No s'ha trobat cap partida.</p>
          )}
        </div>
      ) : (
        <div>
          <p className="mb-4">Has d'iniciar sessió o jugar abans de veure les partides guardades.</p>
          <button onClick={() => navigate('/instrucctions')} className="bg-blue-500 text-white py-2 px-4 rounded hover-bg-blue-700">
            Iniciar Sesión
          </button>
        </div>
      )}
    <Ranking />
    </div>

  );
}

export default SaveGame;






