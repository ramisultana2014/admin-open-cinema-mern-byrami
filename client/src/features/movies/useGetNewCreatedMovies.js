import { useQuery } from "@tanstack/react-query";
import { getAllNewMovies } from "../../services/apiMovies";
export function useGetNewCreatedMovies() {
  const { isPending, data: newRealeses } = useQuery({
    queryKey: ["newmovies"],
    queryFn: () => getAllNewMovies(),
  });
  return { isPending, newRealeses };
}
