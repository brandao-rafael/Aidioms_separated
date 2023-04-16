import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AiContext from '../../hooks/AiContext';
import aidiomsLogo from '../../assets/images/aidioms_logo.png';

export default function PageNotFound() {
  const { style } = useContext(AiContext);
  return (
    <div style={style} className="not-found-container">
      <h1>404 Not Found</h1>
      <Link to="/chat">
        <img src={aidiomsLogo} alt="logo" style={{ width: '300px' }} />
      </Link>
      <p style={{ color: style.color }}>
        Page not found please go back to the
        <Link to="/chat" style={{ margin: '7px', textDecoration: 'none' }}>
          home page
        </Link>
      </p>
    </div>
  );
}
