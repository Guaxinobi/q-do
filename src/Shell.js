import { UserIcon } from "@heroicons/react/solid";

export const Shell = ({ children }) => {
  return (
    <div className="shell">
      <div className="top-nav">
        <div className="logo">Q-DO</div>
        <div className="user-icon">
          <UserIcon className="user-icon" />
        </div>
      </div>

      <div className="wrapper">{children}</div>
    </div>
  );
};
