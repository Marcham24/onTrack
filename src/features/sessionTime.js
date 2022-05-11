export const sessionTime = ({ start, end }) => {
  return end.getTime() - start.getTime();
};
