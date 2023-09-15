import React from 'react';
import { NavLink } from 'react-router-dom';
import { GuestNavLinks } from '../MainNavigation/NavLinks/GuestNavLinks';

import Modal from './Modal';

const AuthModal = (props) => {
  return (
    <Modal title='Log in to continue' show={props.show} onClose={props.onClose}>
      <div className='modal__container'>
        <NavLink to='/' className='header__logo nav__logo--modal'>
        <img  src={require('./DevConx.png')} alt="fireSpot" className='logoi'/>
        </NavLink>
        <p>
        At DevConX, we are passionate about fostering a community of tech enthusiasts, developers, and learners.
        </p>
        <ul className='nav__list nav__list--modal'>
          <GuestNavLinks loginFirst={false} />
        </ul>
      </div>
    </Modal>
  );
};

export default AuthModal;
