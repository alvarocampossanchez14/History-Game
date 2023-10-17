import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faX } from '@fortawesome/free-solid-svg-icons';
import background from './../img/fondo.jpg'
import { collection, addDoc } from "firebase/firestore";
import { db } from "./../firebase";
import { getAuth } from 'firebase/auth';
import Alert from './Alert';
import Pista from './Pista';



function Game({setIsGameInProgress}) {
  const navigate = useNavigate();
  const auth = getAuth()

    const preguntas = [
        {
          pregunta: 'Qui va liderar el movimient cultural conegut com la Renaixença?',
          respuestas: ['Bonaventura Carles Aribau', 'Jacint Verdaguer', 'Àngel Guimerà'],
          respuestaCorrecta: 1,
          pista: 'Su obra "Oda a la Pàtria" marcó el inicio de la Renaixença. 📖' 
        },
        {
          pregunta: 'Quin va ser el lema dels Jocs Florals, un esdeveniment important per a la Renaixença?',
          respuestas: ['Pàtria, amor i pau', 'Pàtria, fe i amor', 'Pàtria, llibertat i art'],
          respuestaCorrecta: 1,
          pista: 'Aquest lema representava els valors fonamentals del moviment. 💪🏽'
        },
        {
          pregunta: 'Quin gènere literari va ser preferit pels escriptors romàntics i de la Renaixença?',
          respuestas: ['Poesia', 'Novel·la històrica', 'Teatre'],
          respuestaCorrecta: 0,
          pista: 'Aquest gènere va ajudar a expressar els sentiments de manera intensa.'
        },
        {
          pregunta: '¿Qui és conegut com "mossèn Cinto" i va ser un destacat poeta de la Renaixença?',
          respuestas: ['Bonaventura Carles Aribau', 'Narcís Oller', 'Jacint Verdaguer'],
          respuestaCorrecta: 2,
          pista: "És conegut per obres com L'Atlàntida i Canigó"
        },
        {
          pregunta: 'Quin va ser el propòsit principal de la Renaixença en relació amb la llengua catalana?',
          respuestas: ['Recuperar la llengua llatina', 'Recuperar i promoure la llengua catalana', 'Reemplaçar la llengua catalana pel castellà'],
          respuestaCorrecta: 1,
          pista: 'El moviment es va centrar en la revitalització de la cultura i la llengua catalanes 🌹'
        },
        {
          pregunta: 'Quin va ser el premi més alt atorgat als Jocs Florals de la Renaixença?',
          respuestas: ["La Viola d'Or i Argent", 'La Flor Natural', "L'Englantina d'Or"],
          respuestaCorrecta: 0,
          pista: "Aquest premi s'otorgaba al poeta que guanyaba els tres premis principals. 🏆"
        },
        {
          pregunta: "Quin gènere literari es va destacar en l'obra d'Àngel Guimerà?",
          respuestas: ['Poesia romàntica', 'Novel·la històrica', 'Teatre'],
          respuestaCorrecta: 2,
          pista: 'És conegut per obres com "Mar i Cel" i "Terra Baixa".'
        },
        {
          pregunta: "Qui va ser un dels fundadors del diari La Renaixença i va escriure l'obra Mar i Cel?",
          respuestas: ['Àngel Guimerà', 'Jacint Verdaguer', 'Bonaventura Carles Aribau'],
          respuestaCorrecta: 0,
          pista: 'Va ser una figura important en la Renaixença i en el periodisme cultural català."'
        },
        {
          pregunta: 'Quin tema va ser comú en la poesia dels romàntics i de la Renaixença?',
          respuestas: ['La vida urbana', 'La natura i el patriotisme', 'La ciència i la tecnologia'],
          respuestaCorrecta: 1,
          pista: "Aquest tema reflectia la connexió entre l'amor a la terra i la identitat nacional."
        },
        {
          pregunta: 'Quin període històric va abastar la Renaixença a Catalunya?',
          respuestas: ['Segle XVIII', 'Segle XIX', 'Segle XVI'],
          respuestaCorrecta: 1,
          pista: 'La Renaixença va tenir lloc entre dues dates específiques que es mencionen en el text.'
        },
      ];
  
      const [preguntaPista, setPreguntaPista] = useState(false)
      const [preguntaActual, setPreguntaActual] = useState(null);
      const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
      const [mostrarAcierto, setMostrarAcierto] = useState(false);
      const [mostrarAlertaJuego, setMostrarAlertaJuego] = useState(false);
      const [outTime, setOutTime] = useState(false)
      const [puntos, setPuntos] = useState(0);
      const [vidas, setVidas] = useState(3);
      const [tiempoRestante, setTiempoRestante] = useState(60);
      const [partidaFinalizada, setPartidaFinalizada] = useState(false) 
      const [closeAlert, setCloseAlert] = useState(false)
      const [preguntasRestantes, setPreguntasRestantes] = useState([...preguntas]);
      const [tiempoInicio, setTiempoInicio] = useState(0); 
      const [tiempoTotal, setTiempoTotal] = useState(0); 
      
      const vidasRestantes = Array(vidas).fill(<FontAwesomeIcon icon={faHeart} className="ease-out duration-300 text-red-700 mb-4" size='2x'/>);
     
      
  
    
      useEffect(()=> {
        if(vidas === 0) {
          alert("Has perdido")
          navigate("/")
          guardarPuntuacion()    
          setPartidaFinalizada(true)  
          setIsGameInProgress(false)  
        }

      }, [vidas])
    

      const mostrarPreguntaAleatoria = () => {
        if (preguntasRestantes.length > 0 && tiempoRestante > 0) {
          const index = Math.floor(Math.random() * preguntasRestantes.length);
          const preguntaAleatoria = preguntasRestantes[index];
          const nuevasPreguntasRestantes = [...preguntasRestantes];
          nuevasPreguntasRestantes.splice(index, 1);
    
          setPreguntasRestantes(nuevasPreguntasRestantes);
    
          console.log("Pregunta");
          setPreguntaActual(preguntaAleatoria);
          setRespuestaSeleccionada(null);
          setMostrarAcierto(false);
        } else if (preguntasRestantes.length === 0) {
          endGame()
        }
      };

      const endGame = () => {
        navigate("/");
        const tiempoFinal = Date.now(); 
        const tiempoTranscurrido = Math.floor((tiempoFinal - tiempoInicio) / 1000); 
        setTiempoTotal(tiempoTranscurrido)

        guardarPuntuacion();
        setPartidaFinalizada(true);
        setIsGameInProgress(false)

        console.log(tiempoTotal)
      }

      useEffect(() => {
          mostrarPreguntaAleatoria()
          setIsGameInProgress(true)
          setTiempoInicio(Date.now());
      }, []);
  
      useEffect(() => {
        let timer;
        if (tiempoRestante > 0 && !partidaFinalizada) {
          timer = setInterval(() => {
            setTiempoRestante((prevTiempoRestante) => prevTiempoRestante - 1);
          }, 1000);
        } else if (tiempoRestante <= 0 && !partidaFinalizada) {
          mostrarPreguntaAleatoria(); 
          setPreguntaPista(false)
          setOutTime(true)
          setTiempoRestante(60) 

          setTimeout(()=> {
            setOutTime(false)
          }, 3000)
        } 

        if(tiempoRestante === 30) {
          setPreguntaPista(true)
          console.log(preguntaPista)
        }

        console.log(tiempoRestante)
    
        return () => clearInterval(timer);
      }, [tiempoRestante, partidaFinalizada]);
    
    
      const manejarRespuesta = (indiceRespuesta) => {
        const esCorrecta = indiceRespuesta === preguntaActual.respuestaCorrecta;
      
        if (esCorrecta) {
          setMostrarAcierto(true);
          setMostrarAlertaJuego(false);
          setPuntos((prevPuntos) => prevPuntos + 10);
          setTiempoRestante(60) 
        } else {
          setMostrarAcierto(false);
          setMostrarAlertaJuego(true);
          setVidas((prevVidas) => prevVidas - 1);
          mostrarPreguntaAleatoria();
          setRespuestaSeleccionada(null);
           // Establecer respuestaSeleccionada en null
          setTimeout(() => {
            setMostrarAlertaJuego(false);
          }, 2000);
        }
      };


      const closeGame = () => {
        // Mostrar el cuadro de diálogo de confirmación
        const shouldClose = window.confirm("¿Estás seguro de que quieres cerrar el juego?");
        if (shouldClose) {
          navigate("/");
          guardarPuntuacion();
          setPartidaFinalizada(true);
          setIsGameInProgress(false)
        }
      };

      const guardarPuntuacion = async () => {
        try {
          const puntuacionesRef = collection(db, "games"); // "games" es el nombre de la colección en Firestore
          await addDoc(puntuacionesRef, {
            nombre: auth.currentUser.displayName,
            userId: auth.currentUser.uid, 
            fallos: 3 - vidas, 
            tiempoTotal,
            puntos, 
            fecha: new Date(),
          });
        } catch (error) {
          console.error("Error al guardar la puntuación:", error);
        }
      };
    
      return (
        <div className='flex flex-col items-center h-screen' 
        style={{
          backgroundImage: `url(${background})`,  // Utiliza la imagen de fondo importada
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
        >
          {preguntaPista && (
              <Pista preguntaPista={preguntaPista} pregunta={preguntaActual} />
            )}
          <div className='relative flex-1'>
            {preguntaActual && (
              <div>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-white text-black p-3 rounded-lg shadow-md'>
                <p>{preguntaActual.pregunta}</p>
                <div className='flex flex-col'>
                  {preguntaActual.respuestas.map((respuesta, index) => (
                    <button
                      key={index}
                      className='my-2 p-2 bg-slate-500 text-white rounded hover:bg-blue-700'
                      onClick={() => manejarRespuesta(index)}
                    >
                      {respuesta}
                    </button>
                  ))}
                </div>
                {mostrarAcierto && (
                  <div>
                    <p>¡Respuesta Correcta!</p>
                    <button onClick={mostrarPreguntaAleatoria} className='bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-700'>
                      Siguiente Pregunta
                    </button>
                  </div>
                )}
              </div>
          </div>
            )}
        </div>
          { outTime && (
            <Alert text={'Te has quedado sin tiempo. ¡ESPABILA!'} />
          )}
          
          {mostrarAlertaJuego && (
                  <Alert text={'Respuesta Incorrecta'}/>
          )}

        

        <div className="bg-slate-700 text-white p-1 w-48 m-3 rounded-lg flex flex-col items-center">
          <p className="font-bold text-2xl mb-2">Puntos: {puntos}</p>
        </div>

        <div className="vidas">
          {vidasRestantes.map((icon, index) => (
            <span key={index} className={`mx-1 heart-icon ${vidasRestantes.length === 1 ? 'last-child' : ''}`}>
              {icon}
            </span>
          ))}
        </div>

          {partidaFinalizada && <h1>PARTIDA FINALIZADA</h1>}
        <div className="h-4 bg-blue-500 w-full rounded-full">
          <div
            className="h-full bg-blue-700"
            style={{ width: `${(tiempoRestante / 60) * 100}%` }}>
          </div>
        </div>

        <button onClick={closeGame} className='absolute z-20 hidden sm:flex top-6 right-20 bg-blue-700 text-white px-4 py-2 mt-2 rounded hover:bg-red-700'>
            Abandonar
          </button>

          <button onClick={closeGame} className='absolute z-20 sm:flex md:hidden lg:hidden top-5 right-10 bg-blue-700 text-white px-4 py-2 mt-2 rounded'>
                <FontAwesomeIcon icon={faX} size="1x"/>
              </button>


        {closeAlert && (
        <div className="fixed top-2 right-2">
          <p>¿Estás seguro de que quieres cerrar el juego?</p>
          <button onClick={() => setCloseAlert(false)} className="bg-gray-500 text-white px-4 py-2 mt-2 rounded hover:bg-gray-700">
            Cancelar
          </button>
          <button onClick={closeGame} className="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-700">
            Cerrar Juego
          </button>
        </div>
      )}
          
   
      

        </div>
      );
    }
    
    export default Game;