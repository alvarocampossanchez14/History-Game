import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import AudioPlayer from "./Audio";
import song from "./../audio.mp3"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { getAuth, signOut } from 'firebase/auth';
import Alert from './Alert';



function Header({isGameInProgress, setShowAlert, showAlert}) {
    const [volume] = useState(0.5)
    const navigate = useNavigate()
    const auth = getAuth();
    const [audioVisible, setAudioVisible] = useState(false);


    const headerStyles = {
        position: 'fixed', // Encabezado fijo en la parte superior
        top: 0, // Colocar en la parte superior
        left: 0,
        right: 0,
        backgroundColor: 'transparent', // Fondo transparente
        display: 'flex',
        gap: '10rem',
        justifyContent: 'center',
        padding: '1rem',
        zIndex: 1000,
        color: '#ffff',
        textShadow: '0px -1px 6px #000000',
        zIndex: '10' // Asegura que esté encima de otros elementos
      };

      const cerrarSesion = async () => {
        try {
          await signOut(auth);
        } catch (error) {
          console.error('Error al cerrar sesión', error);
        }
      };

      useEffect(() => {
        if (!isGameInProgress) {
          setAudioVisible(false);
        } else {
          setAudioVisible(true);
        }
        console.log(isGameInProgress)
      }, [isGameInProgress]);

      const handleHomeClick = () => {
        if (isGameInProgress) {
          // Si el juego está en progreso, muestra el componente Alert
          setShowAlert(true);

          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        } else {
          // Si el juego no está en progreso, realiza la navegación
          navigate('/');
        }
      };
    
    

      return (
        <header style={headerStyles}>
          <div className="flex bg-gray-800 p-2 rounded-lg border-gray-700 border-b-[4px]">
            
          {showAlert && <Alert color={'blue'} text={'No puedes volver al inicio, debes cerrar o acabar la partida'} />}

            {
              isGameInProgress ? (
                <button onClick={handleHomeClick}>
                  <FontAwesomeIcon icon={faHome} size="2x" />
                </button>
              ) : (
                <button onClick={() => navigate("/")}>
                  <FontAwesomeIcon icon={faHome} size="2x" />
                </button>
              )
            }

            

           {audioVisible && <AudioPlayer song={song} volume={volume} />}

            <div className="relative group w-100">
              <button className="bg-gray-800 p-2 rounded-md">
                <FontAwesomeIcon icon={faUser} size="2x" />
              </button>

              {auth.currentUser ? (
                <div className="absolute hidden group-hover:block bg-gray-800 ease-in-out duration-300 p-2 rounded-md mt-2 space-y-2 w-100">
                  <p className="text-center">{auth.currentUser.displayName}</p>
                  <button onClick={cerrarSesion} className="bg-blue-700 rounded-md p-3">Tancar Sessió</button>
                </div>
                ) : (
                  <div className="absolute hidden group-hover:block bg-gray-800 p-2 rounded-md mt-2 space-y-2 w-100">
                  <button onClick={() => navigate('/instrucctions')} className="bg-blue-700 rounded-md p-3">Inicia Sessió</button>
                </div>
                )}
            </div>
          </div>
        </header>
      );
}

export default Header;