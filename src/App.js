import './index.css';
import React, {Suspense, lazy, useState, useEffect} from 'react';
import { BrowserRouter,Route, Routes } from "react-router-dom";
import Header from './components/Header'
import { Auth, getAuth } from 'firebase/auth';
import { AuthProvider } from './AuthContext';



function App({rankingData}) {
  const auth = getAuth()

  const Home = lazy(()=> import('./components/Home'));
  const Game = lazy(()=> import('./components/Game'));
  const Instrucctions = lazy(()=> import('./components/Instrucctions'));
  const SaveGame = lazy(()=> import('./components/SaveGames'));

  const [isGameInProgress, setIsGameInProgress] = useState(false); 
  const [showAlert, setShowAlert] = useState(false);



  const [usuarioLogueado, setUsuarioLogueado] = useState(false);

    useEffect(()=> {
      const usuarioActual = auth.currentUser;
    auth.onAuthStateChanged((usuarioActual) => {
        if(usuarioActual) {
          setUsuarioLogueado(true)
        } else {
          setUsuarioLogueado(false)
        }
    })
    }, [auth.currentUser])

  return (
    <div className="App">
    <AuthProvider>
      <BrowserRouter>
        
        <Header isGameInProgress={isGameInProgress} setShowAlert={setShowAlert} showAlert={showAlert} />
        <Routes>
          <Route path="/" element={<Suspense fallback={<div>Loading..</div>}><Home /></Suspense>} />
          <Route path="/:uuid" element={<Suspense fallback={<div>Loading..</div>}><Game setIsGameInProgress={setIsGameInProgress} setShowAlert={setShowAlert} showAlert={showAlert}/></Suspense>} />
          <Route path="/games" element={<Suspense fallback={<div>Loading..</div>}><SaveGame /></Suspense>} />
          <Route path="/instrucctions" element={<Suspense fallback={<div>Loading..</div>}><Instrucctions showAlert={setShowAlert} setShowAlert={setShowAlert} usuarioLogueado={usuarioLogueado}/></Suspense>} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
  </div>
  );
}

export default App;