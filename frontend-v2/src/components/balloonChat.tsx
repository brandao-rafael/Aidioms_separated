import React from 'react';
import ReactMarkdown from 'react-markdown';
import style from './styles/balloonChat.module.scss';

type BalloonChatProps = {
  data: {
    user: boolean;
    timestamp: string;
    payload: string;
  };
};

const BalloonChat: React.FC<BalloonChatProps> = ({ data }) => {
  return (
    <div
      className={data.user ? style.balloonMessage : style.balloonMessageLeft}
      key={data.timestamp}
    >
      <ReactMarkdown className={style.balloonText}>{data.payload}</ReactMarkdown>
      <span className={style.balloonTimestamp}>{data.timestamp}</span>
    </div>
  );
};

export default BalloonChat;
