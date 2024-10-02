import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
//import { differenceInMinutes } from "date-fns";
import { useNavigate } from "react-router-dom";
export function useLogIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: (loginObj) => loginApi(loginObj),
    onSuccess: (data) => {
      //console.log(data.data.user);
      toast.success(`${data.data.user.email} know logged in`);
      localStorage.setItem("token", data.token);
      localStorage.setItem("logintime", JSON.stringify(new Date()));
      queryClient.setQueryData(["user"], data.data.user);
      navigate("/movieslist", { replace: true });
    },
    onError: (error) => {
      //console.log(error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { login, isPending };
}
