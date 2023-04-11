import React, {
  useState, useEffect, useRef, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { lightTheme, darkTheme } from '../helpers/theme';
import AiContext from './AiContext';
import useLocalStorage from './myHooks/useLocalStorage';

function AiProvider({ children }) {
  // regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // toast
  const toastId = useRef(null);
  const notify = (message) => {
    toastId.current = toast(message);
  };

  // login
  const [cookies, setCookie] = useCookies(['token', 'refresh_token']);
  const [userLS, setUserLS] = useLocalStorage('user', {});

  // notify
  const [notification, setNotification] = useState({
    title: 'Marvie IOS UI Kit',
    subtitle: 'Now its dark',
    description: 'lorem ipsum indolor',
    backgroundImage: 'https://img.lovepik.com/background/20211030/medium/lovepik-background-of-science-and-technology-mobile-image_400421567.jpg',
  });

  // quantity
  const [quantity, setQuantity] = useState('1');

  // chat
  const [cortexId, setCortexId] = useState();
  const [sessionId, setSessionId] = useState();
  const [userMessage, setUserMessage] = useState('');
  const [messageData, setMessageData] = useState();
  const [hasConversation, setHasConversation] = useState(false);

  // authLoggin
  const [userLogged, setUserLogged] = useLocalStorage('userLogged', false);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  const isLogged = () => {
    if (!userLogged) history.push('/');
  };

  const loginAuth = () => {
    setUserLogged(true);
    setLoggedIn(true);
  };

  const logout = () => {
    setUserLogged(false);
    setLoggedIn(false);
    setUserLS({});
    history.push('/');
  };

  // theme
  const [theme, setTheme] = useState(lightTheme);
  const [lsTheme, SetLsTheme] = useLocalStorage('theme');
  const style = {
    backgroundColor: theme.backgroundColor,
    color: theme.textColor,
    darkColor: theme.darkTextColor,
  };

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
    SetLsTheme(theme === lightTheme ? 'dark' : 'light');
  };

  useEffect(() => {
    if (lsTheme === 'dark') {
      document.body.style.backgroundColor = 'var(--background)';
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
      document.body.style.backgroundColor = 'var(--gray)';
    }
  }, [theme]);

  const context = useMemo(() => ({
    emailRegex,
    notify,
    notification,
    cookies,
    toastId,
    loginAuth,
    logout,
    loggedIn,
    style,
    isLogged,
    messageData,
    hasConversation,
    cortexId,
    sessionId,
    userMessage,
    userLS,
    lsTheme,
    setUserLS,
    userLogged,
    toggleTheme,
    quantity,
    setQuantity,
    setUserLogged,
    setNotification,
    setCookie,
    setUserMessage,
    setMessageData,
    setHasConversation,
    setCortexId,
    setSessionId,
  }), [
    notify,
    notification,
    cookies,
    toastId,
    loginAuth,
    logout,
    loggedIn,
    style,
    isLogged,
    messageData,
    hasConversation,
    cortexId,
    sessionId,
    lsTheme,
    userLS,
    setUserLS,
    userLogged,
    quantity,
    setUserLogged,
  ]);
  return (
    <AiContext.Provider value={context}>
      { children }
    </AiContext.Provider>
  );
}
AiProvider.propTypes = { children: PropTypes.node.isRequired };

export default AiProvider;
