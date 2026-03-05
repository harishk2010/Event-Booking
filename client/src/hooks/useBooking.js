import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingService } from "../services/eventService";
import toast from "react-hot-toast";

export function useBooking({ onSuccess } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookingService.createBooking,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success(data.message || "Booking confirmed!");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || "Booking failed. Please try again.");
    },
  });
}
