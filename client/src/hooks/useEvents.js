import { useQuery } from "@tanstack/react-query";
import { eventService } from "../services/eventService";

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: eventService.getEvents,
    staleTime: 30_000,
    retry: 2,
  });
}
