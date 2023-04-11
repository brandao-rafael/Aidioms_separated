import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from '../../api';
import AiContext from '../../hooks/AiContext';

function RegisterForm() {
  const {
    notify,
    emailRegex,
    toastId,
    style,
  } = useContext(AiContext);

  const history = useHistory();
  const eighteenYearsAgo = new Date();

  const [userRegister, setUserRegister] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    birth: '',
  });
  const [birthDate, setBirthDate] = useState();
  const [isPasswordHiden, setPasswordHiden] = useState(true);
  const [registerError, setRegisterError] = useState(false);

  const validateRegister = () => {
    if (Object.values(userRegister).some((value) => value.length < 8)
      || birthDate === undefined
      || !emailRegex.test(userRegister.email)) {
      setRegisterError(true);
    } else {
      setRegisterError(false);
      toast.dismiss(toastId.current);
    }
  };

  const handleChage = (e) => {
    const { name, value } = e.target;
    setUserRegister({
      ...userRegister,
      [name]: value,
    });
    validateRegister();
  };

  const formatBirthDay = (value) => {
    const newDate = dayjs(value).format('YYYY-MM-DD');
    setUserRegister({
      ...userRegister,
      birth: newDate,
    });
  };

  const submitClick = async (e) => {
    try {
      e.preventDefault();
      notify('Loading...');

      if (registerError) {
        toast.dismiss();
        return notify('Some fields are invalids');
      }

      const registeredUser = await registerUser(userRegister);

      if (typeof registeredUser === 'string') {
        toast.dismiss(toastId.current);
        return notify(registeredUser);
      }
      return history.push('/validate');
    } catch (error) {
      notify('Something gone wrong');
    }
  };

  const passwordShowHide = () => {
    setPasswordHiden(!isPasswordHiden);
  };

  useEffect(() => {
    validateRegister();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
  }, [validateRegister, userRegister]);

  return (
    <form action="post">
      <fieldset className="fieldset-container-signup">
        <div className="container-input">
          <label htmlFor="name" className="label-signup">
            <div className="icon-signup">
              <i className="fa fa-user" aria-hidden="true" />
            </div>
            <input
              type="text"
              placeholder="Your full name"
              id="name"
              name="name"
              style={style}
              value={userRegister.name}
              onChange={handleChage}
              minLength="6"
              required
            />
          </label>
          <label htmlFor="email" className="label-signup">
            <div className="icon-signup">
              <i className="fa fa-envelope" aria-hidden="true" />
            </div>
            <input
              type="email"
              placeholder="example@example.com"
              id="email"
              name="email"
              style={style}
              value={userRegister.email}
              onChange={handleChage}
              required
            />
          </label>
          <label htmlFor="phone" className="label-signup">
            <div className="icon-signup">
              <i className="fa fa-phone" aria-hidden="true" />
            </div>
            <input
              type="text"
              placeholder="Your phone"
              id="phone"
              name="phone"
              style={style}
              value={userRegister.phone}
              onChange={handleChage}
              minLength="11"
              required
            />
          </label>
          <div>
            <label htmlFor="password" className="label-signup">
              <div className="icon-signup icon-password">
                <i className="fa fa-lock" aria-hidden="true" />
              </div>
              <input
                type={isPasswordHiden ? 'password' : 'text'}
                placeholder="********"
                id="password"
                name="password"
                style={style}
                value={userRegister.password}
                onChange={handleChage}
                minLength="8"
                required
              />
              {isPasswordHiden ? (
                <button
                  type="button"
                  className="btn-hide"
                  style={style}
                  onClick={passwordShowHide}
                >
                  <i className="fas fa-eye-slash" id="hide_eye" />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-hide"
                  onClick={passwordShowHide}
                >
                  <i className="fas fa-eye" id="show_eye" />
                </button>
              )}
            </label>
          </div>
        </div>
        <div className="calendar-container">
          <div className="icon-signup">
            <i className="fa fa-calendar" aria-hidden="true" />
          </div>
          <button
            type="button"
            className="calendar-signup-btn"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            style={{ backgroundColor: style.backgroundColor, color: 'var(--light-gray' }}
          >
            Birthday
          </button>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" style={{ ...style, borderRadius: '10px' }}>
              <div className="modal-content" style={style}>
                <div className="modal-header" style={style}>
                  <h1 className="modal-title fs-5" id="exampleModalLabel" style={style}>
                    BirthDay
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body" style={style}>
                  {/* docs https://www.npmjs.com/package/react-calendar
                    https://github.com/wojtekmaj/react-calendar/blob/main/README.md */}
                  <Calendar
                    className="container"
                    name="date"
                    onChange={(value) => {
                      formatBirthDay(value);
                      setBirthDate(value);
                    }}
                    value={birthDate}
                    required
                    defaultActiveStartDate={new Date(1990, 0, 1)}
                    maxDate={eighteenYearsAgo}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn-submit" onClick={(e) => submitClick(e)}>
          Submit
        </button>
        <span className="sign-in-link-content" style={style}>
          <p>Already have an account?</p>
          {' '}
          <Link to="/" className="sign-in-link">Sign In</Link>
        </span>
      </fieldset>
    </form>
  );
}

export default RegisterForm;
