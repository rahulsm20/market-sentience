import { MessageType } from "@/types";

//-----------------------------------------------------------------------------------

const ChatMessage = ({ message }: { message: MessageType }) => {
  return (
    <div
      className={`flex justify-${message.sender === "user" ? "end" : "start"}`}
    >
      <div className={`p-4 border border-border w-fit`}>{message.data}</div>
    </div>
  );
};

export default ChatMessage;
