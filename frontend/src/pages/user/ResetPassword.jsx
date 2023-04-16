import React, { useContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { sendEmailResetPassword } from '../../api';
import AiContext from '../../hooks/AiContext';
import aidioms from '../../assets/images/aidioms_logo.png';

function ResetPassword() {
  const { notify, style } = useContext(AiContext);

  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await sendEmailResetPassword(email);
    if (response.error) {
      notify('Somethig went wrong, please try again');
      return;
    }
    notify(`Password reset email sent to: ${email}`);
  };

  return (
    <div className="reset-password-page">
      <h1 style={{ color: style.color, marginTop: '50px' }}>Reset Password</h1>
      <img src={aidioms} alt="aidioms logo" style={{ width: '300px' }} />
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <legend style={{ color: style.color }}>Insert your email</legend>
          <label htmlFor="email" style={{ color: style.color }}>
            <input
              style={style}
              type="email"
              id="email"
              name="email"
              className="reset-senha-email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="btn btn-outline-success" type="submit">Send Reset Link</button>
          </label>
        </div>
      </form>
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

export default ResetPassword;
