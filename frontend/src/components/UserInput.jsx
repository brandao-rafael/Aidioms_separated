import React, { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import AudioRecorder from './AudioRecorder';
import AiContext from '../hooks/AiContext';
import { transcript } from '../api';

function UserInput({ submitMessage }) {
  const { style, cookies, notify } = useContext(AiContext);
  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleEnter = ({ key }) => {
    if (key === 'Enter') {
      submitMessage(userMessage);
    }
  };
  const speechToText = useCallback(async (blob) => {
    setIsLoading('true');
    try {
      const response = await transcript(cookies.token, blob);
      if (response.data.text) {
        setUserMessage(response.data.text);
        submitMessage(response.data.text);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      notify('Something gone wrong');
    }
  }, [cookies.token, notify, submitMessage]);
  return (
    <div className="chat-user-section">
      <input
        type="text"
        className="user-text-input"
        style={style}
        name="message"
        onChange={(e) => setUserMessage(e.target.value)}
        onKeyDown={(e) => handleEnter(e)}
        value={userMessage}
      />
      {isLoading ? (
        <i className="fa fa-spinner spinner" aria-hidden="true" />
      ) : (
        <AudioRecorder speechToText={speechToText} />
      )}
      <button
        type="button"
        className="btn btn-outline-success"
        onClick={async () => {
          setUserMessage('');
          await submitMessage(userMessage);
        }}
      >
        <i className="fa fa-arrow-right" aria-hidden="true" />
      </button>
    </div>
  );
}

UserInput.propTypes = {
  submitMessage: PropTypes.func.isRequired,
};

export default UserInput;
