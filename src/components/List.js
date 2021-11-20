export const Component = ({ items }) => {
  return (
    <div className="todo-list">
      {items.map((todo, index) => {
        return (
          <div className="todo">
            <div>
              <input type="checkbox" />
            </div>
            {todo.text}
          </div>
        );
      })}
    </div>
  );
};
