export default function reducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const newMission = {
        id: currentTodos.length + 1,
        title: action.payload.title,
        details: action.payload.details,
        isCompleted: false,
      };
      const updatedTodos = [...currentTodos, newMission];

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "deleted": {
      const updatedTodos = currentTodos.filter(
        (t) => t.id !== action.payload.id
      );

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "updated": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            details: action.payload.details,
          };
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "completed": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            isCompleted: !t.isCompleted,
          };
        }
        return t;
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "get": {
      const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return storageTodos;
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
