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

  const y = d.getFullYear();
  const m = monthNames[d.getMonth()];
  const da = d.getDate();

  let h = d.getHours();
  let min = d.getMinutes();

  min < 9 ? (min = "0" + min) : min;

  //date
  const dateNoYArr = [m, da];
  const dateNoY = dateNoYArr.join(" ");
  const dateArr = [dateNoY, y];
  const ReadableDate = dateArr.join(", ");

  //time
  let ampm;
  h < 12 ? (ampm = "a.m.") : ((ampm = "p.m."), (h = h - 12));
  const timeArr = [h, min];
  const time = timeArr.join(":");
  const timeAmPm = [time, ampm];
  const ReadableTime = timeAmPm.join(" ");

  //datetime

  const fullArr = [ReadableDate, ReadableTime];
  const ReadableDateTime = fullArr.join(" ");

  return type === "time"
    ? ReadableTime
    : type === "date"
    ? ReadableDate
    : ReadableDateTime;
};
