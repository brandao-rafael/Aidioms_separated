import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import AiContext from '../hooks/AiContext';

export default function ConversationInit({ submit }) {
  const {
    setUserMessage,
    notify,
    style,
  } = useContext(AiContext);
  const [examples] = useState([
    'Create 3 English phrasal verb exercises.',
    'Explain the verb "to be" to a 5-year-old child.',
    'How can you support my English classroom?',
  ]);

  const handleNewConversation = async (value) => {
    try {
      notify('Loading');
      setUserMessage(value);
      submit.submitMessage(value);
      return toast.dismiss();
    } catch (error) {
      toast.dismiss();
      notify('Something gone wrong');
    }
  };

  useEffect(() => () => toast.dismiss(), []);

  return (
    <div className="main-chat-init" style={{ color: style.color }}>
      <div className="subject-sujestion-chat">
        <div className="subject-content-title">
          <i className="fa fa-hashtag" aria-hidden="true" />
          <h3>Sujestions</h3>
        </div>
        {examples.slice(0, 3).map((example) => (
          <div className="subject-content" key={`${example.replace(' ', '-')}-${Date.now()}`}>
            <button
              type="button"
              className="btn-subjects"
              style={{ color: style.color }}
              value={example}
              onClick={() => handleNewConversation(example)}
            >
              {example}
            </button>
          </div>
        ))}
      </div>
      <div className="capacity-chat">
        <div className="capacity-content-title">
          <i className="fa fa-bolt" aria-hidden="true" />
          <h3>Capabilities</h3>
        </div>
        <div className="capacity-content">
          <p>Remembers what user said earlier in the conversation;</p>
          <p>Allows user to provide follow-up corrections;</p>
          <p>Trained to decline inappropriate requests.</p>
        </div>
        <div className="capacity-content" />
        <div className="capacity-content" />
      </div>
      <div className="limitation-chat">
        <div className="limitation-content-title">
          <i className="fa fa-exclamation-triangle" aria-hidden="true" />
          <h3>General Guide</h3>
        </div>
        <div className="limitation-content">
          <p>
            May occasionally generate incorrect information;
          </p>
        </div>
        <div className="limitation-content">
          <p>Avoid ambiguous questions, be specific and provide clear tasks;</p>
        </div>
        <div className="limitation-content">
          <p>Limited knowledge of world and events after 2021</p>
        </div>
      </div>
    </div>
  );
}

ConversationInit.propTypes = {
  submit: PropTypes.shape({
    submitMessage: PropTypes.func,
  }).isRequired,
};
