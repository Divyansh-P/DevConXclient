import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <p>
        Made with ❤️ and{' '}
        <a href='https://github.com/facebook/react'  target='_blank' rel="noopener noreferrer" className='hvr-underline'>
          React
        </a>
        {' by '}
        <a href='https://github.com/Divyansh-P' target='_blank' rel="noopener noreferrer" className='hu_underline'>Divyansh</a>
        .
      </p>
    </footer>
  );
};

export default Footer;
