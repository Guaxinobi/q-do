import { ListComponent } from "../components";
import { todos } from "../MockData.js";

export const Page = () => {
  return (
    <div className="main-page">
      <div>
        <ListComponent items={todos} />
      </div>
    </div>
  );
};
