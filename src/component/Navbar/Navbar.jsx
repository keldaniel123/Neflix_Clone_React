import React, { useEffect, useRef } from 'react'
import './navbar.css'
import logo from '../../../assets/logo.png'
import search_icon from '../../../assets/search_icon.svg'
import bell_icon from '../../../assets/bell_icon.svg'
import profile_img from '../../../assets/profile_img.png'
import caret_icon from '../../../assets/caret_icon.svg'
import { logout } from '../../firebase'


const Navbar = () => {
  const navRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;

      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <div ref={navRef}className='navbar'>
      <div className='navbar-left'>
      {/* Logo img */}
        <img src={logo}/>
        {/* list Links */}
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browser by Languages</li>
        </ul>
      </div>

       <div className='navbar-right'>
       {/* search Icons */}
        <img src={search_icon} className='icons' />
        <p>Children</p>
        <img src={bell_icon} className='icons'/>
        {/* navbar profile */}
        <div className='navbar-profile'>
        <img src={profile_img} className='profile'/>
        <img src={caret_icon} />
        {/* dropdown */}
        <div className='dropdown'>
          <p onClick={()=>{logout()}}>Sign Out of Netflix</p>
        </div>
        </div>
       </div>
    </div>
    </>
  )
}

export default Navbar