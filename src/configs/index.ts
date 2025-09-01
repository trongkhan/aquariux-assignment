export const Configs = {
    baseUrl: "https://api.themoviedb.org/3"
}

export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
};

export const formatTime = (time: number) => {
  // Format time to hours and minutes
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours}h ${minutes}m`;
}