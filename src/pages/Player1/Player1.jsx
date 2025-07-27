import React, { useEffect, useState } from 'react'
import './player.css'
import back_arrow_icon from '../../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

const {id} = useParams()
const navigate = useNavigate()

const [apiData, setApiData] = useState({
  name: '',
  key: '',
  published_at: '',
  typeof: ''
})

useEffect(() => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTI0MzI3OGJkMTRkNjYxNTg2MDlkNDQ1Yjc4NmJkNSIsIm5iZiI6MTc1MzM0MDc1NC4yMDIsInN1YiI6IjY4ODFkYjUyYzYyODE4OGVmMWY3N2M3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VAsZ9Ggb-Ikg4WgNKEA4w9IIc17b2L_7e9NwtI84s_4'
    }
  };

  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => {
      if (res.results && res.results.length > 0) {
        const youtubeTrailer = res.results.find(
          video => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
        );

        if (youtubeTrailer) {
          setApiData(youtubeTrailer);
        } else {
          console.warn('No suitable YouTube trailer found.');
        }
      } else {
        console.warn('No video results returned from API.');
      }
    })
    .catch(err => console.error('Error fetching video:', err));
}, [id]);



  return (
    <div className='player'>
      <img src={back_arrow_icon} alt='' onClick={()=>{navigate(-2)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen>
      </iframe>
      

      {/* player info */}
      <div className='player-info'>
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player