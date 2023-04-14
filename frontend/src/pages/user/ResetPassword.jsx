import React, { useContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { sendEmailResetPassword } from '../../api';
import AiContext from '../../hooks/AiContext';

function ResetPassword() {
  const { notify } = useContext(AiContext);

  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await sendEmailResetPassword(email);

    notify(`Password reset email sent to: ${email}`);
  };

  return (
    <div className="reset-password">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Send Reset Link</button>
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
