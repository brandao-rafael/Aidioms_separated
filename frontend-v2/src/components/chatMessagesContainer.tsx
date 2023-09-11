import React from "react";
import styles from "./styles/chatMessagesContainer.module.scss";
import BalloonChat from "./balloonChat";

const ChatMessagesContainer: React.FC = () => {
  const messagesMock = [
    {
      timestamp: "10/08/2023 - 16:00",
      payload: "Hello",
      user: true
    },
    {
      timestamp: "10/08/2023 - 16:00",
      payload: "Hi",
      user: false
    },
    {
      timestamp: "10/08/2023 - 16:00",
      payload: "How are you?",
      user: true
    },
    {
      timestamp: "10/08/2023 - 16:00",
      payload: "Good, you?",
      user: false
    },
  ];
  return (
    <div className={styles.messagesContainer}>
      {
        messagesMock.map((data) => {
          return (
            <BalloonChat
              key={data.timestamp}
              data={data}
            />
          );
        })
      }

    </div>
  );
}

export default ChatMessagesContainer;
