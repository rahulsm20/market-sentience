import { Auth0Client } from "@auth0/auth0-spa-js";
import { ApiService } from "./apiService.ts";

const auth0Client = new Auth0Client({
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  authorizationParams: {
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  },
});

export const schedulerApi = new ApiService(
  auth0Client,
  import.meta.env.VITE_SCHEDULER_SERVICE_URL
);
