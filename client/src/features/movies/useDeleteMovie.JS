import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMovie as deleteMovieApi } from "../../services/apiMovies";
import toast from "react-hot-toast";
export function useDeleteMovie() {
  const queryClient = useQueryClient();
  const { mutate: deleteMovie, isPending } = useMutation({
    mutationFn: deleteMovieApi,
    onSuccess: () => {
      toast.success("movie deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });
    },
    onError: (error) => {
      //console.log(error);
      const errorMessage = error.message || "Something went wrong";

      toast.error(errorMessage);
    },
  });
  return { deleteMovie, isPending };
}
