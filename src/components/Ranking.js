import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs, limit } from "firebase/firestore";
import { db } from "./../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faMedal, faAward } from '@fortawesome/free-solid-svg-icons';
import InfoBar from './InfoBar';

function Ranking() {
  const [rankingData, setRankingData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [infoBar, setInfobar] = useState(false)

  useEffect(() => {
    const fetchRanking = async () => {
      const rankingQuery = query(
        collection(db, 'games'),
        orderBy('puntos', 'desc'),
        limit(5)
      );
      const rankingSnapshot = await getDocs(rankingQuery);

      const rankingArray = rankingSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          nombre: data.nombre,
          puntos: data.puntos
        };
      });
      setRankingData(rankingArray);
    };

    fetchRanking();
  }, []);

  useEffect(() => {
    const infoBarTimer = setInterval(() => {
      setInfobar(!infoBar);
    }, 20000); 

    return () => {
      clearInterval(infoBarTimer);
    };
  }, [infoBar]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < rankingData.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 3000);

    {rankingData.map((item, index) => (
      <div key={index} className="mb-2">
        <p>{item.nombre}</p>
        <p>Puntos: {item.puntos}</p>
      </div>
    ))}

    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex, rankingData]);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-2 overflow-hidden">
      <div className="marquee items-center">
      {infoBar ? (
         <InfoBar data={['Creat per Álvaro 💻']} />
      ) : (
          <div>
            <h1 className='font-bold text-xl'>Ranking:</h1>
            <div className="flex gap-10 px-4 py-2">
              {rankingData.map((item, index) => (
                <div key={index} className="mb-2 flex items-center">
                  <div className='mr-2'>
                      {index === 0 && <FontAwesomeIcon icon={faTrophy} className="text-yellow-400 mr-2" />}
                      {index === 1 && <FontAwesomeIcon icon={faMedal} className="text-silver mr-2" />}
                      {index === 2 && <FontAwesomeIcon icon={faAward} className="text-bronze mr-2" />}
                  </div>
                    <p>{item.nombre}</p>
                    <p>Puntos: {item.puntos}</p>
                  </div>
              ))}
            </div>
          </div>
      )}

      </div>
    </div>
  );
}

export default Ranking;