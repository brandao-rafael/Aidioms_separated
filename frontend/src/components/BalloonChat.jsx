import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

export default function BalloonChat({ data }) {
  return (
    <div
      className={data.user ? 'balloon-message' : 'balloon-message-left'}
      key={data.timestamp}
      style={data.user ? { backgroundColor: 'var(--blue)', alignSelf: 'flex-end' } : { backgroundColor: 'var(--dark-gray)', alignSelf: 'flex-start' }}
    >
      <ReactMarkdown className="balloon-text">{ data.payload }</ReactMarkdown>
      <span className="balloon-timestamp">{ data.timestamp }</span>
    </div>
  );
}

BalloonChat.propTypes = {
  data: PropTypes.shape({
    user: PropTypes.bool,
    timestamp: PropTypes.string,
    payload: PropTypes.string,
  }).isRequired,
};
