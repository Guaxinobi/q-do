import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth";

export const Page = () => {
  const { signInUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isWrong, setIsWrong] = useState(false);
  let navigate = useNavigate();

  const handleLogin = () => {
    console.log("HANDLELOGIN");

    signInUser(email, password)
      .then((res) => {
        setIsWrong(false);
        navigate("/home");
      })
      .catch((err) => {
        console.log("ERRROR:LOGIN: ", err);
        setIsWrong(true);
      });
  };

  useEffect(() => {}, [password, email, isWrong]);
  return (
    <div className="flex login-page ">
      <div className="login-container flex-grow">
        <div className="items-center">
          <h1>Q-Do</h1>
        </div>
        <div className="items-center">
          <h2>Login</h2>
        </div>
        <div className="flex-col">
          <form className="flex-col" onSubmit={(e) => handleLogin(e)}>
            <label>E-Mail</label>
            <input
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <span hidden={!isWrong}>Wrong email/password combination</span>
            <button type="submit" className="button">
              Sign in
            </button>
          </form>
          <span className="text-sm">
            i want to{" "}
            <span className="link" onClick={() => navigate("/signup")}>
              sign up
            </span>
          </span>
        </div>
      </div>
      <div className="flex-grow"></div>
    </div>
  );
};
