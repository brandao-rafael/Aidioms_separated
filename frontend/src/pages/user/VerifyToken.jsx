import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { resetPassword } from '../../api';
import AiContext from '../../hooks/AiContext';
import aidioms from '../../assets/images/aidioms_logo.png';

export default function VerifyToken() {
  const {
    notify, style,
  } = useContext(AiContext);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [isPasswordLoginHiden, setIsPasswordLoginHidden] = useState(true);
  const location = useLocation();

  const handleSubmit = async (e) => {
    const code = location.search.split('=')[1];
    e.preventDefault();

    const response = await resetPassword(code, user.password);

    if (response.status === 200) {
      notify('Token verified');
    } else {
      notify('Token not verified');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      [name]: value,
    });
  };

  const passwordShowHide = () => {
    setIsPasswordLoginHidden(!isPasswordLoginHiden);
  };

  return (
    <div className="container-input reset-password-container">
      <h1 style={{ color: style.color }}>Reset password</h1>
      <img src={aidioms} alt="aidioms logo" style={{ width: '300px' }} />
      <div className="reset-password-form">
        <legend style={{ color: style.color }}>Insert your email and your new password</legend>
        <label htmlFor="email-input" className="input-login-label">
          <div className="login-icon user-icon">
            <i className="fa fa-user" aria-hidden="true" />
          </div>
          <input
            type="email"
            name="email"
            value={user.email}
            style={style}
            id="email-input"
            placeholder="youremail@email.com"
            onChange={(e) => handleChange(e)}
            required
          />
        </label>
        <label htmlFor="password-input" className="input-login-label" style={{ position: 'relative' }}>
          <div className="login-icon icon-password">
            <i className="fa fa-lock" aria-hidden="true" />
          </div>
          <input
            type={isPasswordLoginHiden ? 'password' : 'text'}
            name="password"
            value={user.password}
            id="password-input"
            style={style}
            placeholder="********"
            onChange={(e) => handleChange(e)}
            required
          />
          <button
            type="button"
            className="btn-hide"
            style={{
              position: 'absolute',
              top: '50%',
              right: '5px',
              transform: 'translateY(-50%)',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              outline: 'none',
              padding: 0,
            }}
            onClick={passwordShowHide}
          >
            {isPasswordLoginHiden
              ? <i className="fas fa-eye-slash" id="hide_eye" />
              : <i className="fas fa-eye" id="show_eye" />}
          </button>
        </label>
        <button
          type="button"
          className="btn btn-success submit-login"
          onClick={(e) => handleSubmit(e)}
          disabled={!user.password || user.password.length < 8}
        >
          Reset Password
        </button>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={15000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
