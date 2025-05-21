import ChatUI from "@/components/user/ChatUI";
import Navbar from "@/components/user/Navbar";
import Sidebar from "@/components/user/Sidebar";

const Conversation = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-64 shrink-0">
          <Sidebar />
        </div>
        <div className="flex-1 overflow-y-auto custom-scroll">
          <ChatUI />
        </div>
      </div>
    </div>
  );
};

export default Conversation;
