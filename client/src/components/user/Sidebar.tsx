import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth0 } from "@auth0/auth0-react";
import { GanttChart, Home, Info, LineChart, SidebarOpen } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LoginButton, LogoutButton } from "./ActionButtons";
import { ModeToggle } from "./ModeToggle";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const items = [
    { name: "Conversation 1", id: "1" },
    { name: "Conversation 2", id: "2" },
  ];

  const { user } = useAuth0();

  return (
    <>
      <div className="md:hidden p-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <SidebarOpen />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:w-full md:w-52 p-0">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-lg font-semibold">Menu</span>
            </div>
            <ul className="space-y-2 p-4">
              <div className="flex flex-col items-center justify-between border-b">
                <ul className="flex justify-end p-3 gap-5">
                  {!user && (
                    <>
                      <li>
                        <Link to="/">
                          <GanttChart />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/about"
                          className="flex gap-1 items-center justify-center"
                        >
                          <span>About</span>
                          <Info className="h-4 w-4" />
                        </Link>
                      </li>
                    </>
                  )}
                  {user && (
                    <>
                      <li>
                        <Link
                          to="/home"
                          className="flex gap-1 items-center justify-center"
                        >
                          <span>Home</span>
                          <Home className="h-4 w-4" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/analytics"
                          className="flex gap-1 items-center justify-center"
                        >
                          <span>Analytics</span>
                          <LineChart className="h-4 w-4" />
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
                {user ? (
                  <ul className="flex p-3 gap-5 items-center justify-center">
                    {user?.picture && (
                      <li>
                        <img
                          src={user?.picture}
                          alt="Profile"
                          className="w-8 h-8 rounded-full"
                        />
                      </li>
                    )}
                    <li>
                      <LogoutButton />
                    </li>
                    <li>
                      <ModeToggle />
                    </li>
                  </ul>
                ) : (
                  <ul className="flex justify-end p-3 gap-5">
                    <li className="flex gap-5">
                      <div>
                        <LoginButton />
                      </div>
                    </li>
                    <li>
                      <ModeToggle />
                    </li>
                  </ul>
                )}
              </div>
              {items.map(({ name, id }) => (
                <li key={id}>
                  <Link
                    to={`/conversation/${id}`}
                    className="block px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    onClick={() => setOpen(false)}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-52 h-full border-r dark:bg-zinc-900 p-4 space-y-2">
        {items.map(({ name, id }) => (
          <Link
            key={id}
            to={`/conversation/${id}`}
            className="block px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            {name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
