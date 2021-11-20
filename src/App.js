import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { LoginPage, ShellPage } from "./pages";

function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<ShellPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
