import { useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";
import { useInternetIdentity } from "./useInternetIdentity";

export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  const query = useQuery<boolean>({
    queryKey: ["isCallerAdmin", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      try {
        return await actor.isCallerAdmin();
      } catch (error: any) {
        // Handle authorization errors gracefully
        if (
          error.message?.includes("Unauthorized") ||
          error.message?.includes("trap")
        ) {
          return false;
        }
        throw error;
      }
    },
    enabled:
      !!actor &&
      !actorFetching &&
      !!identity &&
      !identity.getPrincipal().isAnonymous(),
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isAdmin: query.data === true,
  };
}
