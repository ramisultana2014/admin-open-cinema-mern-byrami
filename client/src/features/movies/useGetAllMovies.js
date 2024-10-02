import { useQuery } from "@tanstack/react-query";
import { getAllMovies } from "../../services/apiMovies";

export function useGetAllMovies() {
  const {
    isPending,
    data: movies,
    error,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: () => getAllMovies(),
  });

  return { movies, isPending, error };
}
