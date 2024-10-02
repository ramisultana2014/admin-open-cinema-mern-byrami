import { useQuery } from "@tanstack/react-query";
import { getAllOrders as getAllOrdersApi } from "../../services/apiOrder";

export function useGetAllOrders() {
  const {
    isPending,
    data: orders,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getAllOrdersApi(),
  });
  //console.log(orders);
  return { isPending, orders, error };
}
