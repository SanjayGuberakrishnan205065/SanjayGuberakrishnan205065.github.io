import { format } from "date-fns";

export const formatDateTime = (date) => {
  if (!date) return "";
  return format(new Date(date.substr(0, 16)), "dd MMM yyyy h:mm a");
};

export const formatDateTimeWithTimezone = (date) => {
  if (!date) return "";
  return format(new Date(date), "dd MMM yyyy h:mm a");
};

export const shortenText = (text, length) => {
  if (!text) return "";
  if (text.length <= length) return text;
  return text.substr(0, length) + "...";
};
