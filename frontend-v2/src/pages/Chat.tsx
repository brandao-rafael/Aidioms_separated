import ChatMessagesContainer from "@/components/chatMessagesContainer";
import PromptInput from "@/components/promptInput";
import styles from "./styles/chat.module.scss";
import React from "react";

const Chat: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Chat</h1>
      <ChatMessagesContainer />
      <PromptInput  submitMessage={(value) => console.log(value)} />
    </div>
  );
};
export default Chat;
