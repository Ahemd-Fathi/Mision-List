import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material";
import { TodosContext } from "./contexts/todosContext";
import { useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["Antic"],
  },
  palette: {
    primary: {
      main: "#283593",
    },
  },
});

const initialTodos = [
  {
    id: 1,
    title: "Mission 1",
    details: "Mission 1 Details",
    isCompleted: false,
  },
  {
    id: 2,
    title: "Mission 2",
    details: "Mission 2 Details",
    isCompleted: true,
  },
  {
    id: 3,
    title: "Mission 3",
    details: "Mission 3 Details",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#282c34",
        }}
      >
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
