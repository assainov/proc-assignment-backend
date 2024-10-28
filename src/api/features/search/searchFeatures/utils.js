export const getTimeMinutesAgo = (minutes) => {
  if (!minutes) {
    throw new Error('minutes is required');
  }

  const currentTime = new Date();
  return new Date(currentTime.getTime() - minutes * 60 * 1000);
};