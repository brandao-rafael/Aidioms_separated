import React, { useContext, useState } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import AiContext from '../hooks/AiContext';

export default function VideoPlayer({ urls, subtitle }) {
  const { style } = useContext(AiContext);
  const [selectedUrl, setSelectedUrl] = useState(urls && urls.length > 0 ? urls[0] : null);
  const [index, setIndex] = useState(0);

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
        {subtitle[index] && (
        <div style={style} className="video-subtitle">
          {
          subtitle[index]
        }
        </div>
        )}
      </div>
      <div style={{ width: '30%' }}>
        {urls.map((url, i) => (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div
            key={url}
            style={{
              padding: '5px',
              backgroundColor: url === selectedUrl ? style.backgroundColor : 'transparent',
              display: 'flex',
              alignItems: 'center',
              marginLeft: '10px',
            }}
            onClick={() => {
              setSelectedUrl(url);
              setIndex(i);
            }}
          >
            <ReactPlayer url={url} width="auto" height="70px" />
            <span style={{ color: style.color }} className="subtitle-preview">
              {subtitle[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

VideoPlayer.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.string).isRequired,
  subtitle: PropTypes.arrayOf(PropTypes.string).isRequired,
};
// docs: https://www.npmjs.com/package/react-player
