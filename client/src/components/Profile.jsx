import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useUser } from "../context/user";

export const Component = () => {
  const { user } = useAuth();
  const { updateUser, changePassword } = useUser();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isOldPasswordWrong, setIsOldPasswordWrong] = useState(false);
  const [tooShort, setTooShort] = useState(false);
  const [passwordTooShort, setPasswordTooShort] = useState(false);

  useEffect(() => {
    if (!user) return;
    setUsername(user.username);
    setEmail(user.email);
  }, []);

  const handleSubmitChanges = (e) => {
    if (username.length < 2) {
      setTooShort(true);
      return;
    }
    e.preventDefault();
    updateUser(username, email).then((res) => {});
  };
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 4) return setPasswordTooShort(true);
    changePassword(oldPassword, newPassword)
      .then((res) => {
        setOldPassword("");
        setNewPassword("");
      })
      .catch((err) => {
        setIsOldPasswordWrong(true);
      });
  };

  useEffect(() => {
    console.log("USERPROFILE: ", user);
  }, [user]);
  return (
    <div className="w-full ">
      <div>
        <form onSubmit={(e) => handleSubmitChanges(e)} className="flex-col">
          <label>Username</label>
          <input
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          {tooShort && <span>username too short.</span>}
          <label>E-Mail</label>
          <input
            disabled
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <button>Submit Changes</button>
        </form>
      </div>
      <div>
        <form onSubmit={(e) => handleChangePassword(e)} className="flex-col">
          <label>Old Password</label>
          <input
            name="oldPassword"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          ></input>
          {isOldPasswordWrong && <span>Password wrong</span>}
          <label>New Password</label>
          <input
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          ></input>
          {passwordTooShort && <span>Password too short.</span>}
          <button>Change Password</button>
        </form>
      </div>
    </div>
  );
};
