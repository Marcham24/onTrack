import { Readable } from "./readableDateTime";

const today = new Date();
today.setUTCHours(0, 0, 0, 0);

const ms_day = 1000 * 60 * 60 * 24;

export const TimeToDays = (date) => {
  const formattedDate = new Date(date);
  formattedDate.setUTCHours(0, 0, 0, 0);

  switch (today - formattedDate) {
    case 0:
      return "Today";

    case ms_day:
      return "Yesterday";

    case ms_day * 2:
      return "2 days ago";

    case ms_day * 3:
      return "3 days ago";

    case ms_day * 4:
      return "4 days ago";

    case ms_day * 5:
      return "5 days ago";

    default:
      return "on " + Readable(date, "date");
  }
};
