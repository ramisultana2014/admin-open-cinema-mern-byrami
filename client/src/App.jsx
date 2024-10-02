import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobaleStyles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartUp from "./pages/StartUp";
import { Toaster } from "react-hot-toast";
import MoviesList from "./pages/MoviesList";
import AppLayOut from "./ui/AppLayOut";
import Orders from "./pages/Orders";
import ReservationConfirm from "./pages/ReservationConfirm";
import Addmovie from "./pages/Addmovie";
import ProtectedRoutes from "./ui/ProtectedRoutes";
import Cart from "./pages/Cart";
import ShowReservation from "./features/order/ShowReservation";
import Realese from "./pages/Realese";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      cacheTime: 1000 * 60 * 50,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartUp />} />
          <Route
            element={
              <ProtectedRoutes>
                <AppLayOut />
              </ProtectedRoutes>
            }
          >
            {/* <Route index element={<Navigate replace to="movieslist" />} /> */}
            <Route path="movieslist" element={<MoviesList />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<Orders />} />
            <Route path="reservationconfirm" element={<ReservationConfirm />} />
            <Route
              path="reservationconfirm/showreservation"
              element={<ShowReservation />}
            />
            <Route path="newrealse" element={<Realese />} />
            <Route path="addmovie" element={<Addmovie />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12} // space between window and toaster
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 6000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            color: "#000",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
