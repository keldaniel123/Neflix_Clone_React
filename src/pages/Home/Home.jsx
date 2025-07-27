import React, { useEffect } from 'react'
import './home.css'
import Navbar from '../../component/Navbar/Navbar'
import hero_banner from '../../../assets/hero_banner.jpg'
import hero_title from '../../../assets/hero_title.png'
import play_icon from '../../../assets/play_icon.png'
import info_icon from '../../../assets/info_icon.png'
import TitleCards from '../../component/TitileCards/TitleCards'
import Footer from '../../component/footer/footer'
import { useNavigate } from 'react-router-dom';
import useAuthStatus from '../../hooks/useAuthStatus';
import './home.css';

const Home = () => {
  const { user, loading } = useAuthStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { replace: true });
    }

    // ✅ Prevent navigating back to login page once logged in
    if (user) {
      window.history.pushState(null, '', '/');
      window.onpopstate = () => {
        navigate('/', { replace: true });
      };
    }
  }, [loading, user, navigate]);

  if (loading || !user) return null;
  return (
    <div className='home'>
    <Navbar/>
    <div className='hero'>
      <img src={hero_banner} className='banner-img' />
      <div className='hero-caption'>
        <div className='hero-text'>
        <img src={hero_title} className='caption-img' />
        <p>
          Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarkds on a quest to save the city from an immortal enemy.
        </p>
        <div className='hero-btns'>
          <button className='btn'><img src={play_icon} />Play</button>
          <button className='btn dark-btn'><img src={info_icon} />More Info</button>
        </div>
        </div>
        <TitleCards/>
      </div>
    </div>
    <div className='more-cards'>
       <TitleCards title={'Blockbuster Movies'} category={'top_rated'} />
       <TitleCards title={'Only On Netflix'} category={'popular'} />
       <TitleCards title={'Upcoming'} category={'upcoming'} />
       <TitleCards title={'Top Pics For You'} category={'now_playing'} />
    </div>
    <Footer/>
    </div>
  
  )
}

export default Home;