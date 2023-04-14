import React, {
  useState, useEffect, useRef, useContext, useCallback,
} from 'react';
import dayjs from 'dayjs';
import { useCookies } from 'react-cookie';
import { toast, ToastContainer } from 'react-toastify';
import BalloonChat from '../../components/BalloonChat';
import ConversationInit from '../../components/ConversationInit';
import { chatRespond, getSessionId, transcript } from '../../api/chat';
import AiContext from '../../hooks/AiContext';
import Header from '../../components/Header';
import AudioRecorder from '../../components/AudioRecorder';
import aidioms from '../../assets/images/aidioms_logo_small.png';
// import UserInput from '../../components/UserInput';

function Chat() {
  const {
    userMessage,
    setUserMessage,
    messageData,
    setMessageData,
    hasConversation,
    setHasConversation,
    sessionId,
    setSessionId,
    style,
    notify,
    toastId,
    isLogged,
  } = useContext(AiContext);

  const messageEl = useRef(null);
  const [cookies] = useCookies();
  const [isWriting, setIsWriting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  isLogged();

  const conversation = useCallback(async (userMessages) => {
    const historic = (messageData || []).map((data) => ({
      role: data.user ? 'user' : 'assistant',
      content: data.payload,
    }));
    historic.push({ role: 'user', content: userMessages });

    const historicToSend = historic?.length > 10 ? historic.slice(10) : historic;
    const data = await chatRespond(
      cookies.token,
      sessionId,
      (messageData ? historicToSend : [{ role: 'user', content: userMessages }]),
      userMessages,
    );

    if (typeof data === 'string') {
      return notify(data);
    }

    setMessageData((prevData) => [
      ...prevData,
      {
        session_id: sessionId,
        user: false,
        payload: data.content,
        type: 'text',
        timestamp: dayjs().format('HH:mm:ss'),
      },
    ]);

    setIsWriting(false);
  }, [cookies.token, messageData, sessionId, notify]);

  const speechToText = useCallback(async (blob) => {
    setIsLoading(true);
    try {
      const response = await transcript(cookies.token, blob);
      if (response.data.text) {
        setMessageData((prevData) => [
          ...(prevData || []),
          {
            session_id: sessionId,
            user: true,
            payload: response.data.text,
            type: 'text',
            timestamp: dayjs().format('HH:mm:ss'),
          },
        ]);
        conversation(response.data.text);
        setHasConversation(true);
        setTimeout(() => {
          setIsWriting(true);
          setIsLoading(false);
        }, 500);
      }
    } catch (error) {
      toast.dismiss();
      setIsLoading(false);
      notify('Something gone wrong');
    }
    toast.dismiss();
  }, [cookies.token, conversation, setMessageData, sessionId, setHasConversation]);

  const dismiss = useCallback((id) => toast.dismiss(id), []);

  const handleMessage = useCallback(({ target: { value } }) => {
    setUserMessage(value);
  }, [setUserMessage]);

  const submitMessage = useCallback((message = userMessage) => {
    setMessageData((prevData) => [
      ...(prevData || []),
      {
        session_id: sessionId,
        user: true,
        payload: message,
        type: 'text',
        timestamp: dayjs().format('HH:mm:ss'),
      },
    ]);
    conversation(message);
    setHasConversation(true);
    setUserMessage('');
    setTimeout(() => {
      setIsWriting(true);
    }, 500);
  }, [setMessageData, conversation, sessionId, setHasConversation, setUserMessage, userMessage]);

  const handleEnter = useCallback(({ key }) => {
    if (key === 'Enter') {
      submitMessage();
    }
  }, [submitMessage]);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }

    const getSessionIdf = async () => {
      const result = await getSessionId(cookies.token);
      setSessionId(result.message);
    };

    getSessionIdf();

    return () => {
      setMessageData();
      setHasConversation(false);
      dismiss(toastId);
    };
  }, [
    cookies.token, setMessageData, setHasConversation, setSessionId, messageEl, dismiss, toastId,
  ]);

  useEffect(() => {
    isLogged();
  }, []);

  return (
    <div className="chat-container">
      <Header />
      <div className="chat-header" style={{ color: style.color }}>
        <img className="chat-ia-picture" src={aidioms} alt="logo" style={{ width: '5%' }} />
        <h3 className="chat-ia-name" style={{ color: style.color }}>Ai.dioms</h3>
      </div>
      <div className="chat-conversation" style={{ backgroundColor: style.backgroundColor }} ref={messageEl}>
        {hasConversation && messageData.map((data) => (
          <BalloonChat data={data} key={`${data.timestamp}-${data.user}`} />
        ))}
        {isWriting && (
        <p className="chat-typing">typing...</p>
        )}
        {!hasConversation && (
        <ConversationInit submit={{ submitMessage }} />
        )}
      </div>
      <div className="chat-user-section">
        <input
          type="text"
          className="user-text-input"
          style={style}
          name="message"
          onChange={(e) => handleMessage(e)}
          onKeyDown={(e) => handleEnter(e)}
          value={userMessage}
        />
        {isLoading ? (
          <i className="fa fa-spinner spinner" aria-hidden="true" />
        ) : (
          <AudioRecorder speechToText={speechToText} />
        )}
        <button type="button" className="btn btn-outline-success" onClick={submitMessage}>
          <i className="fa fa-arrow-right" aria-hidden="true" />
        </button>
      </div>
      {/* <UserInput submitMessage={submitMessage} /> */}
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

export default Chat;
