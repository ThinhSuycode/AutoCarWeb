import { Routes, Route } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./layout/DefaultLayout/DefaultLayout";
import { publicRoutes, type RouteItem } from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <Routes>
          {publicRoutes.map((item: RouteItem) => {
            let Layout: any = DefaultLayout;
            let Page = item.Component;
            if (item.Layout === null) {
              Layout = ({ children }: any) => <>{children}</>;
            } else if (item.Layout) {
              Layout = item.Layout;
            }
            return (
              <Route
                path={`${item.path}`}
                element={
                  <Layout>
                    <Page></Page>
                  </Layout>
                }
              ></Route>
            );
          })}
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
