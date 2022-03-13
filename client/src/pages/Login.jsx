import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth";

export const Page = () => {
  const { signInUser, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isWrong, setIsWrong] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  let navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("HANDLELOGIN");
    if (!email || !password) {
      setIsEmpty(true);
      return;
    } else {
      setIsEmpty(false);
    }

    signInUser(email, password).then((res) => {
      if (!res) {
        setIsWrong(true);
        return;
      }
      setIsWrong(false);
      navigate("/home");
    });
  };

  useEffect(() => {}, [user]);

  useEffect(() => {
    // xor
    if ((!email && password) || (email && !password)) {
      setIsEmpty(true);
      return;
    } else {
      setIsEmpty(false);
    }
  }, [password, email]);
  return (
    <div className="flex login-page ">
      <div className="login-container flex-grow">
        <div className="items-center">
          <h1 className="logo">Q-Do</h1>
          <span className="">
            A simple Todo-App... <br /> but dark and cool!
          </span>
        </div>
        <div className="items-center">
          <h5>Login</h5>
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
            {isWrong && <span>Wrong email/password combination</span>}
            {isEmpty && <span>No empty fields allowed.</span>}

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
