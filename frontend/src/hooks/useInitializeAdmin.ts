import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useInitializeAdmin() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      await actor.initializeAdmin();
    },
    onSuccess: () => {
      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: ['isCallerAdmin'] });
      queryClient.invalidateQueries({ queryKey: ['hasAdmin'] });
      queryClient.invalidateQueries({ queryKey: ['bookings-with-ids'] });
    },
  });
}
