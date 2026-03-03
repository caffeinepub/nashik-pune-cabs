import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Booking } from '../backend';

export function useGetBookingById(bookingId: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Booking | null>({
    queryKey: ['booking-by-id', bookingId],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      if (!bookingId.trim()) return null;
      try {
        const result = await actor.getBookingById(bookingId.trim());
        return result;
      } catch (err: any) {
        return null;
      }
    },
    enabled: !!actor && !actorFetching && !!bookingId.trim(),
    retry: false,
  });
}
