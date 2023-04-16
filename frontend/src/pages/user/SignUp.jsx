import React, { useContext } from 'react';
import 'react-calendar/dist/Calendar.css';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterForm from '../../components/user/RegisterForm';
import AiContext from '../../hooks/AiContext';

export default function SignUp() {
  const { style } = useContext(AiContext);
  return (
    <div className="signup-container" style={style}>
      <h1>Register</h1>
      <RegisterForm />
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

SignUp.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
