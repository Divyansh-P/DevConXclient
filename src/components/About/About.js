import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { GuestNavLinks } from '../MainNavigation/NavLinks/GuestNavLinks';
import './About.css';

const About = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className='about'>
      <p className='about__bold'>
        <Link to='/' className='about__bold--co hvr-underline'>
          DevConx
        </Link>{' '}
        ,your ultimate destination for all things development, coding, and technology!
      </p>
      <p>At DevConX, we are passionate about fostering a community of tech enthusiasts, developers, and learners. Whether you're a seasoned coder looking to stay up-to-date with the latest trends or a beginner taking your first steps into the world of programming, DevConX is here to guide and inspire you on your journey.</p>
      <ul className='about__links'>{!isLoggedIn && <GuestNavLinks />}</ul>
    </div>
  );
};

export default About;
