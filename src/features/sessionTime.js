export const sessionTime = ({ start, end }) => {
  return end.setSeconds(0, 0) - start.setSeconds(0, 0);
};
