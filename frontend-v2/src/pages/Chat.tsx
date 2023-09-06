import ChatMessagesContainer from "@/components/chatMessagesContainer";
import PromptInput from "@/components/promptInput";
import React from "react";

const Chat: React.FC = () => {
  return (
    <div>
      <h1>Chat</h1>
      <ChatMessagesContainer />
      <PromptInput  submitMessage={(value) => console.log(value)} />
    </div>
  );
};
export default Chat;
