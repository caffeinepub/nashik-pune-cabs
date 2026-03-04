import { useMutation } from "@tanstack/react-query";
import type { Booking } from "../backend";
import { useActor } from "./useActor";

export function useFindBookingByPhone() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (phone: string): Promise<[string, Booking] | null> => {
      if (!actor) throw new Error("Actor not initialized");
      try {
        const result = await actor.findBookingByPhone(phone);
        return result;
      } catch (err: any) {
        if (err?.message?.includes("does not exist")) return null;
        throw err;
      }
    },
  });
}
