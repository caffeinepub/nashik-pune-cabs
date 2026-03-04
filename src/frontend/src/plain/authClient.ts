import type { Identity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";

let authClient: AuthClient | null = null;
let currentIdentity: Identity | null = null;

export async function initAuthClient(): Promise<AuthClient> {
  if (authClient) return authClient;

  authClient = await AuthClient.create();

  if (await authClient.isAuthenticated()) {
    currentIdentity = authClient.getIdentity();
  }

  return authClient;
}

export async function login(): Promise<Identity> {
  const client = await initAuthClient();

  return new Promise((resolve, reject) => {
    const identityProvider =
      import.meta.env.VITE_DFX_NETWORK === "ic"
        ? "https://identity.ic0.app"
        : `http://${import.meta.env.VITE_INTERNET_IDENTITY_CANISTER_ID}.localhost:4943`;

    client.login({
      identityProvider,
      onSuccess: () => {
        currentIdentity = client.getIdentity();
        resolve(currentIdentity);
      },
      onError: (error) => {
        reject(error);
      },
    });
  });
}

export async function logout(): Promise<void> {
  const client = await initAuthClient();
  await client.logout();
  currentIdentity = null;
}

export async function getIdentity(): Promise<Identity | undefined> {
  if (currentIdentity) return currentIdentity;

  const client = await initAuthClient();
  if (await client.isAuthenticated()) {
    currentIdentity = client.getIdentity();
    return currentIdentity;
  }

  return undefined;
}

export async function isAuthenticated(): Promise<boolean> {
  const client = await initAuthClient();
  return await client.isAuthenticated();
}
