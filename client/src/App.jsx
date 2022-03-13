import "./App.css";
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { LoginPage, MainPage, RegistrationPage } from "./pages";
import { AuthProvider, useAuth } from "./context/auth";
import { Layout } from "./layouts/Shell";
import { UserProvider } from "./context/user";
import { TodosProvider } from "./context/todo";
import { ListsProvider } from "./context/list";
import { useEffect } from "react";

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
              <UserProvider>
                <ListsProvider>
                  <TodosProvider>
                    <Layout>
                      <MainPage />
                    </Layout>
                  </TodosProvider>
                </ListsProvider>
              </UserProvider>
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

const RequireAuth = ({ children }) => {
  let location = useLocation();
  let navigate = useNavigate();
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
