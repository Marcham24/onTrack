export const Readable = (d, type) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const toDate = new Date(d);

  const y = toDate.getFullYear();
  const m = monthNames[toDate.getMonth()];
  const da = toDate.getDate();

  let h = toDate.getHours();
  let min = toDate.getMinutes();

  min < 10 ? (min = "0" + min) : min;

  //date
  const dateNoYArr = [m, da];
  const dateNoY = dateNoYArr.join(" ");
  const dateArr = [dateNoY, y];
  const ReadableDate = dateArr.join(", ");

  //time
  let ampm;
  h < 12 ? (ampm = "a.m.") : (ampm = "p.m.");
  h > 12 && (h = h - 12);

  const timeArr = [h, min];
  const time = timeArr.join(":");
  const timeAmPm = [time, ampm];
  const ReadableTime = timeAmPm.join(" ");

  //short style for project chart

  const shortArr = [da, m]
  const ReadableShort = shortArr.join(" ");

  //datetime

  const fullArr = [ReadableDate, ReadableTime];
  const ReadableDateTime = fullArr.join(" ");

  return type === "time"
    ? ReadableTime
    : type === "date"
    ? ReadableDate
    : type === "short"
    ? ReadableShort
    : ReadableDateTime;
};
