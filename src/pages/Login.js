export const Page = () => {
  return (
    <div className="flex login-page ">
      <div className="flex-grow"></div>
      <div className="login-container flex-grow">
        <h1>Q-Do</h1>
        <h2>Login</h2>
        <div className="flex-col">
          <form className="flex-col">
            <label>E-Mail</label>
            <input name="email" type="email" />
            <label>Password</label>
            <input name="password" type="password" />
            <button className="button">Sign in</button>
          </form>
        </div>
      </div>
      <div className="flex-grow"></div>
    </div>
  );
};
