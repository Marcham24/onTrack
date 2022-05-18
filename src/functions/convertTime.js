export const ConvertTime = (d) => {
  d = Number(d) / 1000;
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);

  var hDisplay = h + "h ";
  var mDisplay = m + "m";
  return hDisplay + mDisplay;
};
