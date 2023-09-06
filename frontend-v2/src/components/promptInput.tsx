import React, { useState } from "react";
import styles from "./styles/promptInput.module.scss";
import SendIcon from "remixicon-react/SendPlane2LineIcon";

type PromptInputProps = {
  submitMessage: (value: string) => void;
};

const PromptInput: React.FC<PromptInputProps> = ({ submitMessage }) => {
  const [userMessage, setUserMessage] = useState("");

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitMessage(userMessage);
      setUserMessage("");
    }
  };
  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        className={styles.input}
        name="message"
        onChange={(e) => setUserMessage(e.target.value)}
        onKeyDown={(e) => handleEnter(e)}
        value={userMessage}
      />
      <button
        type="button"
        className={styles.submitButton}
        onClick={() => {
          submitMessage(userMessage);
          setUserMessage("");
        }}
      >
        <SendIcon size='28px'/>
      </button>
    </div>
  );
};

export default PromptInput;
