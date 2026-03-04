import { useQuery } from "@tanstack/react-query";
import type { Booking } from "../backend";
import { useActor } from "./useActor";

export function useBookingsWithIds() {
  const { actor, isFetching } = useActor();

  return useQuery<Array<[string, Booking]>>({
    queryKey: ["bookings-with-ids"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookingsWithIdsSorted();
    },
    enabled: !!actor && !isFetching,
  });
}
