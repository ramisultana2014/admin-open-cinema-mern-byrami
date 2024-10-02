import { useQueryClient } from "@tanstack/react-query";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetAllOrders } from "../features/order/useGetAllOrders";
import LoadingPage from "../ui/LoadingPage";
import styled from "styled-components";
import Heading from "../ui/Heading";
const ChartBox = styled.div`
  /* Box */
  background-color: var(--background-color-main);
  //border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;
function Orders({ fill = "#e5e7eb", stroke = "#e5e7eb" }) {
  const { orders, isPending } = useGetAllOrders();
  //console.log(orders);
  const queryClient = useQueryClient();
  const movies = queryClient.getQueryData(["movies"]);
  //console.log(movies.movies);

  if (isPending) return <LoadingPage />;
  const data = movies.movies.map((movie) => {
    return {
      label: movie.title,
      total: orders.orders.reduce((acc, order) => {
        if (order.cart[0].movieTitle === movie.title)
          return order.cart[0].totaldayshowTimePrice;
        else return acc;
      }, 0),
    };
  });
  const data1 = movies.movies.map((movie) => {
    return {
      label: movie.title,
      remainingSeats: movie.showDays.reduce(
        (acc, cur) => acc + cur.availableSeats.length,
        0
      ),
    };
  });
  const data2 = movies.movies.map((movie) => {
    // Calculate the total available seats for each movie
    const remainingSeats = movie.showDays.reduce((acc, showDay) => {
      return acc + showDay.availableSeats.length;
    }, 0);

    return {
      name: movie.title,
      value: remainingSeats,
    };
  });
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#8DD1E1",
  ];
  return (
    <>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data1}>
          <XAxis
            dataKey="label"
            tick={{ fill }}
            tickLine={{ stroke }}
            tickFormatter={(label) =>
              label.length > 4 ? `${label.slice(0, 4)}...` : label
            }
          />
          <YAxis tick={{ fill }} tickLine={{ stroke }} />
          <CartesianGrid strokeDasharray="2" />
          <Tooltip contentStyle={{ backgroundColor: "#fff", color: "#000" }} />
          <Area
            dataKey="remainingSeats"
            type="monotone"
            stroke={"red"}
            fill={"green"}
            strokeWidth={2}
            name="remaining seats"
            // unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill }}
            tickLine={{ stroke }}
            tickFormatter={(label) =>
              label.length > 4 ? `${label.slice(0, 4)}...` : label
            }
          />
          <YAxis unit="$" tick={{ fill }} tickLine={{ stroke }} />
          <CartesianGrid strokeDasharray="2" />
          <Tooltip contentStyle={{ backgroundColor: "#fff", color: "#000" }} />
          <Area
            dataKey="total"
            type="monotone"
            stroke={"red"}
            fill={"green"}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
      <ChartBox>
        <Heading as="h2">Remaining Seats</Heading>
        <ResponsiveContainer height={240} width="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={data2}
              nameKey="name"
              dataKey="value"
              innerRadius={85}
              outerRadius={110}
              cx="40%"
              cy="50%"
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="middle"
              align="right"
              width="30%"
              layout="vertical"
              iconSize={15}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartBox>
    </>
  );
}

export default Orders;
