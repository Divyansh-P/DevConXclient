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
        is an online place where people share their thoughts, stay up-to-date with each other and grow in thier respective fields.
      </p>
      <ul className='about__links'>{!isLoggedIn && <GuestNavLinks />}</ul>
    </div>
  );
};

export default About;
