import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

interface CreateBookingInput {
  name: string;
  phone: string;
}

export function useCreateBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateBookingInput) => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }

      const result = await actor.createBooking(input.name, input.phone);
      
      // Extract booking ID from the result string
      // Backend returns: "bookingId name phone"
      const bookingId = result.split(' ')[0];
      
      return bookingId;
    },
    onSuccess: () => {
      // Invalidate bookings query to refetch the list
      queryClient.invalidateQueries({ queryKey: ['bookings-with-ids'] });
    },
  });
}
