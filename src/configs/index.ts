export const Configs = {
    baseUrl: "https://api.themoviedb.org/3"
}

export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
};