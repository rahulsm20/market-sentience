type Message = {
  text: string;
  sender: string;
  id: number;
};
const ChatMessage = ({ message }: { message: Message }) => {
  return (
    <div
      className={`flex justify-${message.sender === "user" ? "end" : "start"}`}
    >
      <div className={`p-4 border border-border w-fit`}>{message.text}</div>
    </div>
  );
};

export default ChatMessage;
