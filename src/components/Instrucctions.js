import React, {useEffect, useState} from 'react';
import { useNavigate }  from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "./../firebase";
import Alert from './Alert';

function Instrucctions({ usuarioLogueado}) {
    const navigate = useNavigate();
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [showAlert, setShowAlert] = useState(false)

    // useEffect(()=> {
    //   if(usuarioLogueado = true) {
    //     setShowAlert(true)

    //     setTimeout(()=> {
    //       setShowAlert(false)
    //     }, 1500)
    //   } else {
    //     setShowAlert(false)
    //   }
    // }, [usuarioLogueado])
  

    const iniciarSesionConGoogle = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        console.log("Inicio de sesión con Google exitoso", result.user);
        setShowAlert(true)

        setTimeout(()=> {
          setShowAlert(false)
        },2500)
      } catch (error) {
        console.error("Error al iniciar sesión con Google", error);
        navigate("/");
      }
    }

    function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
        
    
    return (
      <div className=" h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">Benvingut al Joc!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Abans de començar, aqui tens algunes instruccions:
          </p>
          <ul className="text-left list-inside list-disc text-lg text-gray-800 mb-8">
            <li>Busca i descubreix les pistes ocultes per tot el joc.</li>
            <li>No intentis fer trampes. Juga net!</li>
          </ul>
          {usuarioLogueado ? (
            <div>
            <button
            onClick={() => navigate(`/${generateUUID()}`)}// Ir a la página de juego
              className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
              border-blue-600
              border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
              active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            >
              Jugar
              <FontAwesomeIcon icon={faArrowRight} size='1x' className='ml-2'/>
            </button>
            </div>
          ) : (
            <button
              onClick={iniciarSesionConGoogle}
              className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
              border-blue-600
              border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
              active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            >
              Iniciar sessió per jugar
              <FontAwesomeIcon icon={faArrowRight} size='1x' className='ml-2'/>
            </button>
          )}
        </div>
        {showAlert && <Alert text={"Has iniciado sesión"} />}
      </div>
    );
   
}

export default Instrucctions;



