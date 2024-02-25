import { format } from "date-fns";

export const formatDateTime = (date) => {
  if (!date) return "";
  return format(new Date(date.substr(0, 16)), "dd MMM yyyy h:mm a");
};