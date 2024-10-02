import { useMutation } from "@tanstack/react-query";
import { signup as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
export function useSignUp() {
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: (signupObj) => signUpApi(signupObj),
    onSuccess: () => {
      toast.success(`you can know log in`);
    },
    onError: (error) => {
      //console.log(error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { signUp, isPending };
}
