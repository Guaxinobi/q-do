import { useEffect, useState } from "react";

export const Page = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [hashedPassword, setHashedPassword] = useState();

  useEffect(() => {
    console.log("hashedPassword: ", hashedPassword);
  }, [password]);
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
          <form className="flex-col">
            <label>E-Mail</label>
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
              type="password"
            />
            <button className="button">Sign in</button>
          </form>
        </div>
      </div>
      <div className="flex-grow"></div>
    </div>
  );
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
