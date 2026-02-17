import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Booking } from '../backend';

export function useBookingsWithIds() {
  const { actor, isFetching } = useActor();

  return useQuery<Array<[string, Booking]>>({
    queryKey: ['bookings-with-ids'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookingsWithIdsSorted();
    },
    enabled: !!actor && !isFetching,
  });
}
