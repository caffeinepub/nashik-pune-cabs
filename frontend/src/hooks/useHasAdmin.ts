import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useHasAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<boolean>({
    queryKey: ['hasAdmin'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.hasAdmin();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    hasAdmin: query.data === true,
  };
}
