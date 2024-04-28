import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../ui/button";
import { clientUrl } from "@/utils/constants";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};

export const LogoutButton = () => {
  const { logout } = useAuth0();
  const handleLogout = () => {
    try {
      localStorage.clear();
      logout({ logoutParams: { returnTo: clientUrl } });
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };
  return <Button onClick={handleLogout}>Log Out</Button>;
};
