import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../api';
import AiContext from '../../hooks/AiContext';

function LoginForm() {
  const {
    notify,
    setCookie,
    toastId,
    loginAuth,
    emailRegex,
    setUserLS,
    style,
  } = useContext(AiContext);

  const history = useHistory();

  const [isPasswordLoginHiden, setIsPasswordLoginHidden] = useState(true);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState(false);

  const passwordShowHide = () => {
    setIsPasswordLoginHidden(!isPasswordLoginHiden);
  };

  const validateLogin = () => {
    if (emailRegex.test(user.email) && user.password.length >= 8) {
      setEmailError(false);
      toast.dismiss(toastId.current);
    } else {
      setEmailError(true);
    }
  };

  const dismissToast = () => {
    toast.dismiss(toastId.current);
  };

  const notifyLoading = () => {
    notify('Loading...');
  };

  const notifyInvalidEmail = () => {
    dismissToast();
    notify('invalid email or password');
  };

  const loginUser = async () => {
    const loginResponse = await login(user);
    return loginResponse;
  };

  const handleLoginResponse = async (loginResponse) => {
    try {
      if (loginResponse.status === 200) {
        setUserLS({
          email: user.email,
          userName: loginResponse.userName,
        });
        setCookie('token', loginResponse.token, { path: '/' });
        loginAuth();
        history.push('./chat');
      } else {
        dismissToast();
        notify(loginResponse);
      }
    } catch (error) {
      notify('Something gone wrong');
    }
  };

  const submitLogin = async () => {
    try {
      dismissToast();
      notifyLoading();

      if (emailError) {
        notifyInvalidEmail();
        return;
      }

      const loginResponse = await loginUser();
      await handleLoginResponse(loginResponse);
    } catch (error) {
      notify('Something gone wrong');
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    validateLogin();
  }, [validateLogin, user]);

  useEffect(() => () => {
    toast.dismiss();
  }, []);
  return (
    <form style={{ color: style.color }} className="fieldset-container-login">
      <div className="fieldset-container-login">
        <span className="login-description" style={{ color: style.color }}>Sign in to continue</span>
        <div className="container-input">
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
          <label htmlFor="password-input" className="input-login-label">
            <div className="login-icon icon-password">
              <i className="fa fa-lock" aria-hidden="true" />
            </div>
            <div style={{ position: 'relative', display: 'inline-block' }}>
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
                }}
                onClick={passwordShowHide}
              >
                {isPasswordLoginHiden
                  ? <i className="fas fa-eye-slash" id="hide_eye" />
                  : <i className="fas fa-eye" id="show_eye" />}
              </button>
            </div>
          </label>
        </div>
        <button
          type="button"
          className="submit-login"
          onClick={submitLogin}
        >
          Submit
          <i className="fa fa-arrow-right" aria-hidden="true" />
        </button>
        <Link to="/reset-password" className="reset-password">Forgot password?</Link>
        <button type="button" className="signup-login" onClick={() => history.push('/signup')}>
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
