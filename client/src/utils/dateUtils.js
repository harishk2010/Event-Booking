import { format, parseISO } from "date-fns";

export function formatEventDate(dateStr) {
  try {
    return format(parseISO(dateStr), "MMM d, yyyy · h:mm a");
  } catch {
    return dateStr;
  }
}

export function formatDayMonth(dateStr) {
  try {
    const d = parseISO(dateStr);
    return { day: format(d, "d"), month: format(d, "MMM") };
  } catch {
    return { day: "—", month: "—" };
  }
}
