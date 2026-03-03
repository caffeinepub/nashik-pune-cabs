import { HttpAgent, Actor } from '@dfinity/agent';
import type { backendInterface } from '../backend';
import { getIdentity } from './authClient';

let actorInstance: backendInterface | null = null;

// We need to dynamically import the idlFactory since it's generated
async function getIdlFactory() {
  // The config.ts file is auto-generated and exports createActorWithConfig
  // We'll use a similar approach but create the actor manually
  const config = await import('../config');
  return config;
}

export async function getActor(forceRefresh = false): Promise<backendInterface> {
  if (actorInstance && !forceRefresh) {
    return actorInstance;
  }

  const identity = await getIdentity();

  const config = await getIdlFactory();
  
  // Use the createActorWithConfig from the auto-generated config
  const actorOptions = identity ? {
    agentOptions: {
      identity,
    },
  } : undefined;

  actorInstance = await config.createActorWithConfig(actorOptions);

  return actorInstance;
}

export function clearActor() {
  actorInstance = null;
}
