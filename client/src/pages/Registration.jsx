import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";

export const Page = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistrated, setIsRegistrated] = useState(false);

  const { signUpUser } = useAuth();

  const onSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    signUpUser(username, email, password)
      .then((res) => {
        setIsRegistrated(true);
        setUsername("");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {}, [username, password, confirmPassword]);
  useEffect(() => {}, [isRegistrated]);
  if (isRegistrated) {
    setTimeout(() => {
      setIsRegistrated(false);
      return (
        <div>
          LOADING
          <ReactLoading type="spinningBubbles" color="#00ff00" />
        </div>
      );
    }, 5000);
  } else {
    return (
      <div className="flex login-page ">
        <div className="login-container flex-grow">
          <div className="items-center">
            <h1 className="logo">Q-Do</h1>
          </div>
          <div className="items-center">
            <h2>Registration</h2>
          </div>
          <div className="flex-col">
            <form onSubmit={onSignUp} className="flex-col">
              <label>Username</label>
              <input
                name="username"
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>E-mail</label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
              />
              <span className="text-sm" hidden={password === confirmPassword}>
                The passwords do not match!
              </span>
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                name="password"
              />
              <button
                disabled={password !== confirmPassword && !username}
                type="submit"
                className="button"
              >
                Sign Up
              </button>
              <span className="text-lg">
                Back to{" "}
                <span className="link" onClick={() => navigate("/")}>
                  Login
                </span>
              </span>
            </form>
          </div>
        </div>
        <div className="flex-grow"></div>
      </div>
    );
  }
};
/*


// SALT should be created ONE TIME upon sign up
// example =>  $2a$10$CwTycUXWue0Thq9StjUM0u => to be added always to the password hash

function App() {
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  function handleLoginForm() {
    const email = emailInputRef.current.value
    const password = passwordInputRef.current.value
    const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u') // hash created previously created upon sign up

    fetch('https://api.sampleapis.com/beers/ale', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: hashedPassword,
      }),
    })
  }

  
}

export default App */
