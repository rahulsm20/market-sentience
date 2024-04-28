import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { auth0ClientDomain, auth0ClientID } from "./utils/constants.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain={auth0ClientDomain}
    clientId={auth0ClientID}
    authorizationParams={{
      redirect_uri: import.meta.env.VITE_CLIENT_URL,
    }}
  >
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </ThemeProvider>
  </Auth0Provider>
);
