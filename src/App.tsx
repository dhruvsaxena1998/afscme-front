import { QueryClientProvider } from "react-query";
import Router from "./routes";
import { ToastContainer } from "react-toastify";
import { client as queryClient } from "./utils/react-query-client";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Router />
        <ToastContainer />
      </>
    </QueryClientProvider>
  );
}

export default App;
