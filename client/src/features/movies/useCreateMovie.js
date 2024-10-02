import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createMovie as createMovieApi } from "../../services/apiMovies";
import toast from "react-hot-toast";
//import { differenceInMinutes } from "date-fns";
import { useNavigate } from "react-router-dom";
export function useCreateMovie() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createmovie, isPending } = useMutation({
    mutationFn: (movieObj) => createMovieApi(movieObj),
    onSuccess: (data) => {
      //console.log(data.data);
      toast.success(`movie created successfully`);

      queryClient.invalidateQueries({
        queryKey: ["newmovies"],
      });
      navigate("/movieslist", { replace: true });
    },
    onError: (error) => {
      //console.log(error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { createmovie, isPending };
}
