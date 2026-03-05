import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CarCategory, CarModel } from "../backend";
import { useActor } from "./useActor";

export interface CreateBookingInput {
  name: string;
  phone: string;
  carCategory: CarCategory;
  carModel: CarModel;
  price: number;
  stops: string[];
  luggage: { count: number; details: string };
  seats: number;
}

export function useCreateBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateBookingInput) => {
      if (!actor) {
        throw new Error("Actor not initialized");
      }

      // Strip spaces and hyphens from phone so backend validation passes
      const cleanPhone = input.phone.replace(/[\s\-]/g, "");

      const result = await actor.createBooking(
        input.name,
        cleanPhone,
        input.carCategory,
        input.carModel,
        BigInt(input.price),
        input.stops,
        { count: BigInt(input.luggage.count), details: input.luggage.details },
        BigInt(input.seats),
      );

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings-with-ids"] });
    },
  });
}
