import React, { useState, useEffect } from 'react';

function InfoBar({ rankingData, data, interval = 20000 }) {
    if (!Array.isArray(data) || data.length === 0) {
        // Si data no es un arreglo o está vacío, no mostramos nada
        return null;
      }
    
  const [currentText, setCurrentText] = useState(data[0]);

  useEffect(() => {
    const scrollData = () => {
      const currentIndex = data.indexOf(currentText);
      const nextIndex = (currentIndex + 1) % data.length;
      setCurrentText(data[nextIndex]);
    };

    const scrollInterval = setInterval(scrollData, interval);

    return () => {
      clearInterval(scrollInterval);
    };
  }, [data, currentText, interval]);

  return (
        <div
          className="inline-block px-4 py-2">
          {currentText}
      </div>
  );
}

export default InfoBar;