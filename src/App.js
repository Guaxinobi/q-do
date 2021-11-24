import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { LoginPage, MainPage, ShellPage } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ShellPage />}>
          <Route path="home" element={<MainPage />}></Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
