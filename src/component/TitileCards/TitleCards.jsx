import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import {Link} from 'react-router-dom'

const TitleCard = ({title, category}) => {

  const cardsRef = useRef();
  const [apiData, setApiData] = useState([]);
  

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {

    const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTI0MzI3OGJkMTRkNjYxNTg2MDlkNDQ1Yjc4NmJkNSIsIm5iZiI6MTc1MzM0MDc1NC4yMDIsInN1YiI6IjY4ODFkYjUyYzYyODE4OGVmMWY3N2M3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VAsZ9Ggb-Ikg4WgNKEA4w9IIc17b2L_7e9NwtI84s_4'
  }
};

fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
  .then(response => response.json())
  .then(response => setApiData(response.results))
  .catch(err => console.error(err));

  const container = cardsRef.current;
  if (container) {
    container.addEventListener('wheel', handleWheel, { passive: false });
  }

  return () => {
    if (container) {
      container.removeEventListener('wheel', handleWheel);
    }
  };
}, [category]);


  return (
    <div className="titlecards">
      <h2>{title?title:'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
  if (!card.backdrop_path) return null; // ✅ Skip broken images

  return (
    <Link to={`/player/${card.id}`} className="card" key={index}>
      <img
        src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
        alt={card.original_title}
      />
      <p>{card.original_title}</p>
    </Link>
  );
})}

      </div>
    </div>
  );
};

export default TitleCard;
