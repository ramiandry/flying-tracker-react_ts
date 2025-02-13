import React, { useEffect } from 'react';
import './Loader.css'; // Assurez-vous d'avoir un fichier CSS pour les styles

const Loader = () => {
  useEffect(() => {
    const pointsContainer = document.querySelector(".points");
    for (let i = 0; i < 90; i++) {
      let point = document.createElement("li");
      point.style.top = Math.random() * 100 + "%";
      point.style.left = Math.random() * 100 + "%";
      pointsContainer.appendChild(point);
    }

    const circlesContainer = document.querySelector(".circles");
    for (let i = 1; i <= 5; i++) {
      let circle = document.createElement("div");
      circle.style.width = (i * 20) + "%";
      circle.style.height = (i * 20) + "%";
      circle.style.top = ((100 - i * 20) / 2) + "%";
      circle.style.left = ((100 - i * 20) / 2) + "%";
      circlesContainer.appendChild(circle);
    }
  }, []);

  return (
    <div className="radar">
      <div className="scanner"></div>
      <ul className="points">
        {Array.from({ length: 90 }).map((_, index) => (
          <li key={index}></li>
        ))}
      </ul>
      <div className="circles">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index}></div>
        ))}
      </div>
      <div className="lines">
        <div></div>
        <div></div>
      </div>
      <div className="targets">
        <div className="plane"></div>
        <div className="ufo"></div>
      </div>
    </div>
  );
};

export default Loader;