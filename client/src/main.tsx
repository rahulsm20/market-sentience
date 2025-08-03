import { Auth0Provider } from "@auth0/auth0-react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import "./index.css";
import { auth0ClientDomain, auth0ClientID } from "./utils/constants.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain={auth0ClientDomain}
    clientId={auth0ClientID}
    authorizationParams={{
      redirect_uri: import.meta.env.VITE_CLIENT_URL,
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    }}
    useRefreshTokens={true}
    cacheLocation={
      import.meta.env.VITE_NODE_ENV == "development" ? "localstorage" : "memory"
    }
  >
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  </Auth0Provider>
);
