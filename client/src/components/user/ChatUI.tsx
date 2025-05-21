import { ArrowUpCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ChatMessage from "./ChatMessage";
import Layout from "./Layout";

const ChatUI = () => {
  // const id = useParams().id;
  const messages = [
    {
      id: 1,
      text: "Hello, how can I help you?",
      sender: "bot",
    },
    {
      id: 2,
      text: "I need some information about your services",
      sender: "user",
    },
    {
      id: 3,
      text: "Can you tell me more about your pricing?",
      sender: "user",
    },
    {
      id: 4,
      text: "Sure! Our pricing starts at $99 per month.",
      sender: "bot",
    },
    {
      id: 5,
      text: "That sounds great! How do I sign up?",
      sender: "user",
    },
    {
      id: 6,
      text: "You can sign up on our website or contact our sales team.",
      sender: "bot",
    },
    {
      id: 7,
      text: "I'm interested in your premium plan.",
      sender: "user",
    },
    {
      id: 8,
      text: "The premium plan includes additional features and support.",
      sender: "bot",
    },
    {
      id: 9,
      text: "Can you provide me with a demo?",
      sender: "user",
    },
    {
      id: 10,
      text: "Sure! I can schedule a demo for you.",
      sender: "bot",
    },
    {
      id: 11,
      text: "Thank you! I appreciate your help.",
      sender: "user",
    },
    {
      id: 12,
      text: "You're welcome! Let me know if you have any other questions.",
      sender: "bot",
    },
  ];

  return (
    <Layout className="flex-1 flex flex-col items-center justify-center pb-36">
      <div className="flex flex-col w-2/3 lg:w-1/2 gap-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <div className="fixed bottom-10 w-2/3 md:w-1/3 flex border items-end justify-center gap-2 p-4 bg-background backdrop-blur-lg rounded-[--radius] border-border">
        <Input className="border-0 focus:border-0 focus:ring-0 focus-visible:ring-0 shadow-none bg-background backdrop-blur-lg focus-within:border-0 focus-within:ring-0" />
        <Button variant="ghost" size="icon">
          <ArrowUpCircle className="bottom-10 right-10 block" />
        </Button>
      </div>
    </Layout>
  );
};

export default ChatUI;
