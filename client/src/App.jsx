import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { LoginPage, MainPage, RegistrationPage } from "./pages";
import { AuthProvider, useAuth } from "./context/auth";
import { Layout } from "./layouts/Layout";
import { TodosProvider } from "./context/todo";
import { ListsProvider } from "./context/list";
import { useEffect } from "react";
import { SubtodosProvider } from "./context/subtodo";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <ListsProvider>
                <TodosProvider>
                  <SubtodosProvider>
                    <Layout>
                      <MainPage />
                    </Layout>
                  </SubtodosProvider>
                </TodosProvider>
              </ListsProvider>
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

const RequireAuth = ({ children }) => {
  let location = useLocation();
  const { user } = useAuth();
  useEffect(() => {
    console.log(user);
  }, [user]);
  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default App;
