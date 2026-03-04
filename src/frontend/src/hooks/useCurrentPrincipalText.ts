import { useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";
import { useInternetIdentity } from "./useInternetIdentity";

export function useCurrentPrincipalText() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  const query = useQuery<string>({
    queryKey: ["currentPrincipalText", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCurrentPrincipalText();
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
    principalText: query.data || "",
  };
}
