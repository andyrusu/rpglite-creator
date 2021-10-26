import { Timestamp } from "@firebase/firestore";

export function toTimestamp(date) {
  if (date === null || date == undefined) {
    return null;
  }

  if (date instanceof Timestamp) {
    return date;
  }

  if (typeof date === "string" || date instanceof String) {
    return Timestamp.fromDate(new Date(date));
  }

  if (
    typeof date === "object" &&
    date.seconds !== undefined &&
    date.nanoseconds !== undefined
  ) {
    return new Timestamp(date.seconds, date.nanoseconds);
  }
}
