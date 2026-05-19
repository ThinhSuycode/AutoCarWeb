import { Routes, Route } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./layout/DefaultLayout/DefaultLayout";
import { publicRoutes, privateRoutes, type RouteItem } from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import useScrollToTop from "./hooks/useScrollToTop";
import ProtectedRoute from "./services/ProtedRoute";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { useEffect, useState } from "react";
const queryClient = new QueryClient();

const renderRoute = (item: RouteItem, wrapProtected = false) => {
  let Layout: any = DefaultLayout;
  const Page = item.Component;

  if (item.Layout === null) {
    Layout = ({ children }: any) => <>{children}</>;
  } else if (item.Layout) {
    Layout = item.Layout;
  }

  const pageElement = (
    <Layout>
      <Page />
    </Layout>
  );

  const element = wrapProtected ? (
    <ProtectedRoute requiredRole={item.requiredRole}>
      {pageElement}
    </ProtectedRoute>
  ) : item.requiredRole ? (
    <ProtectedRoute requiredRole={item.requiredRole}>
      {pageElement}
    </ProtectedRoute>
  ) : (
    pageElement
  );

  return <Route key={item.path} path={item.path} element={element} />;
};

const AppContent = () => {
  const [showScroll, setShowScroll] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useScrollToTop();
  return (
    <div className="container">
      <ScrollToTop showScroll={showScroll}></ScrollToTop>
      <Routes>
        {publicRoutes.map((item) => renderRoute(item, false))}
        {privateRoutes.map((item) => renderRoute(item, true))}
      </Routes>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            padding: "15px 25px",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
