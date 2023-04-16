import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AiContext from '../hooks/AiContext';

export default function Header() {
  const {
    toggleTheme, style, lsTheme, logout,
  } = useContext(AiContext);
  return (
    <header style={style}>
      <nav className="header-navbar" style={{ color: style.color }}>
        <Link to="/chat" style={{ color: style.color }}>
          <i className="fa fa-comment" aria-hidden="true" />
          {' '}
          Chat
        </Link>
        <Link to="image" style={{ color: style.color }}>
          <i className="fa fa-camera" aria-hidden="true" />
          {' '}
          Image Generator
        </Link>
        <Link to="/playphrase" style={{ color: style.color }}>
          <i className="fa fa-play" aria-hidden="true" />
          {' '}
          Playphrase
        </Link>
        <div className="dropdown" style={{ color: style.color }}>
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ ...style, border: 'none' }}>
            <i className="fa fa-ellipsis-h" aria-hidden="true" />
          </button>
          <ul className="dropdown-menu" style={style}>
            <li>
              <div className="form-check form-switch">
                {/*  eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                  {lsTheme === 'light' ? (
                    <i className="fa fa-circle" aria-hidden="true" />
                  ) : (
                    <i className="fa fa-certificate" aria-hidden="true" />
                  )}
                </label>
                <input className="form-check-input" style={style} onChange={toggleTheme} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
              </div>
            </li>
            <li>
              <Link to="/postvideo" style={style}>
                <i className="fa fa-arrow-up" aria-hidden="true" />
                {' '}
                Upload
              </Link>
            </li>
            <li>
              <button type="button" onClick={() => logout()} className="logout-button" style={style}>
                <i className="fa fa-power-off" aria-hidden="true" />
                {' '}
                Logout
              </button>
            </li>
          </ul>
        </div>

      </nav>
    </header>
  );
}
