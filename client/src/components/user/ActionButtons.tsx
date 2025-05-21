import { clientUrl } from "@/utils/constants";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../ui/button";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button size="sm" onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
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
  return (
    <Button size="sm" onClick={handleLogout}>
      Log Out
    </Button>
  );
};
