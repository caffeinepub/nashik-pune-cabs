import { useMutation, useQuery } from "@tanstack/react-query";
import type { CarCategory, CarModel } from "../backend";
import { useActor } from "./useActor";

export interface BookingPayload {
  name: string;
  phone: string;
  carCategory: CarCategory;
  carModel: CarModel;
  price: number;
  stops: string[];
  luggageCount: number;
  luggageDetails: string;
  seats: number;
}

export function useCreateBooking() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (payload: BookingPayload) => {
      if (!actor) throw new Error("Not connected");
      const id = await actor.createBooking(
        payload.name,
        payload.phone,
        payload.carCategory,
        payload.carModel,
        BigInt(Math.round(payload.price)),
        payload.stops,
        {
          count: BigInt(payload.luggageCount),
          details: payload.luggageDetails,
        },
        BigInt(payload.seats),
      );
      return id;
    },
  });
}

export function useGetBookingById(id: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["booking", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBookingById(id);
    },
    enabled: !!actor && !isFetching && id.length > 0,
  });
}

export function useGetAllBookings() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookingsWithIdsSorted();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useHasAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["hasAdmin"],
    queryFn: async () => {
      if (!actor) return true;
      return actor.hasAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useInitializeAdmin() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      await actor.initializeAdmin();
    },
  });
}
