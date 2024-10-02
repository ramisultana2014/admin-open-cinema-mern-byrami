import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getOrder as getOrderApi } from "../../services/apiOrder";
export function useGetOrder() {
  const [searchParams] = useSearchParams();
  const ticketvervicationCodeFromTitle = searchParams.get(
    "ticketvervicationCode"
  );
  const ticketvervicationCode = {
    ticketvervicationCode: ticketvervicationCodeFromTitle,
  };
  const {
    data: order,
    isPending,
    error,
  } = useQuery({
    queryKey: ["order", ticketvervicationCodeFromTitle],
    queryFn: () => getOrderApi({ ticketvervicationCode }),
  });
  return { order, isPending, error };
}
