import { useAuth0 } from "@auth0/auth0-react";
import { GanttChart, Home, Info, LineChart } from "lucide-react";
import { Link } from "react-router-dom";
import { LoginButton, LogoutButton } from "./ActionButtons";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  const { user } = useAuth0();

  return (
    <nav className="md:flex justify-between items-center text-sm top-0 backdrop-blur-lg bg-background/30 z-50 border-b flex-wrap hidden md:flex-row md:gap-0 gap-2">
      <div className="flex items-center gap-5">
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
      </div>
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
    </nav>
  );
};

export default Navbar;
