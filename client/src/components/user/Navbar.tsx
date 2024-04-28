import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton, LogoutButton } from "./ActionButtons";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  const savedUser =
    localStorage.getItem("user") &&
    JSON.parse(localStorage.getItem("user") as string);
  const { user } = useAuth0();

  if (savedUser || user) {
    console.log(user, savedUser);
    let name, picture;
    if (user) {
      name = user.name;
      picture = user.picture;
    } else if (savedUser) {
      name = savedUser.name;
      picture = savedUser.picture;
    }
    localStorage.setItem("user", JSON.stringify({ name, picture }));
    return (
      <nav>
        <ul className="flex justify-end py-5 gap-5">
          <li>
            <img
              src={picture}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </li>
          <li>
            <LogoutButton />
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    );
  }
  return (
    <nav>
      <ul className="flex justify-end py-5 gap-5">
        <li className="flex gap-5">
          <div>
            <LoginButton />
          </div>
        </li>
        <li>
          <ModeToggle />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
