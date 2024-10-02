import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMovie as updateMovieApi } from "../../services/apiMovies";
import toast from "react-hot-toast";
export function useUpdateMovie() {
  const queryClient = useQueryClient();
  const { mutate: updateMovie, isPending } = useMutation({
    mutationFn: ({ movieObj, id }) => updateMovieApi({ movieObj, id }),
    onSuccess: (data) => {
      toast.success(`movie successfullt updated`);
      //data is what coming from loginapi//
      //queryClient.setQueryData(["products"]);
      // queryClient.invalidateQueries({
      //   queryKey: ["movies"],
      // });
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      //console.log(error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { updateMovie, isPending };
}
