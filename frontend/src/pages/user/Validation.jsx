import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { validateEmailUser } from '../../api/user';
import AiContext from '../../hooks/AiContext';

export default function Validation() {
  const history = useHistory();
  const {
    notify,
    style,
  } = useContext(AiContext);

  const [code, setCode] = useState(0);
  const [email, setEmail] = useState('');

  const submit = async () => {
    if (email === '' || code === 0) return notify('Some fields are invalid!');
    const validate = await validateEmailUser(email, code);
    if (validate.status === 401) return notify(validate.message);
    if (validate.status === 204) return history.push('/');
    return null;
  };

  const handleEnter = ({ key }) => {
    toast.dismiss();
    if (key === 'Enter') {
      submit();
    }
  };

  return (
    <div>
      <div className="validation-content" style={{ color: style.color }}>
        <h3 style={{ color: style.color }}>Please enter the code received in the email below.</h3>
        <label htmlFor="emailValidation">
          Email:
          <input
            style={style}
            type="email"
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => handleEnter(e)}
            id="emailValidation"
          />
        </label>
        <label htmlFor="codeValidation">
          Code:
          <input
            style={style}
            type="text"
            minLength={4}
            maxLength={4}
            value={code || ''}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => handleEnter(e)}
            required
            id="codeValidation"
          />
        </label>
        <button type="button" className="btn btn-outline-success" onClick={submit}>Submit</button>
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
