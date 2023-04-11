import React, { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from '../../components/user/LoginForm';
import AiContext from '../../hooks/AiContext';

export default function Login() {
  const { style } = useContext(AiContext);

  return (
    <div className="container-login" style={{ ...style, borderRadius: '5px' }}>
      <h1>Welcome!</h1>
      <LoginForm />
      {/*  Docs - https://fkhadra.github.io/react-toastify/introduction/ */}
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
