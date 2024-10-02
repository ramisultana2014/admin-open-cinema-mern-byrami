import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder as createOrderAPi } from "../../services/apiOrder";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createOrder, isPending } = useMutation({
    mutationFn: (orderObj) => createOrderAPi(orderObj),
    onSuccess: (data) => {
      toast.success(`order successfully created`);
      queryClient.invalidateQueries(["movies"]);
      navigate("/movieslist", { replace: true });
    },
    onError: (error) => {
      //console.log(error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { createOrder, isPending };
}
