import React, { useContext, useState } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import AiContext from '../hooks/AiContext';

export default function VideoPlayer({ urls }) {
  const { style } = useContext(AiContext);
  const [selectedUrl, setSelectedUrl] = useState(urls && urls.length > 0 ? urls[0] : null);

  if (!urls || urls.length === 0) {
    return <div>No video found.</div>;
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', flexDirection: 'row', width: '100%',
    }}
    >
      <div style={{ width: 'auto' }}>
        <ReactPlayer url={selectedUrl} controls />
      </div>
      <div style={{ width: '30%' }}>
        {urls.map((url) => (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div
            key={url}
            style={{
              padding: '5px',
              backgroundColor: url === selectedUrl ? style.backgroundColor : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
            onClick={() => setSelectedUrl(url)}
          >
            <ReactPlayer url={url} width="auto" height="70px" />
          </div>
        ))}
      </div>
    </div>
  );
}

VideoPlayer.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.string).isRequired,
};
// docs: https://www.npmjs.com/package/react-player
