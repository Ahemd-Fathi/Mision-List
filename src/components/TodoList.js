import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Todo from "./Todo";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState, useContext, useEffect } from "react";
import { TodosContext } from "../contexts/todosContext";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);

  const [inPutValue, setInputValue] = useState("");
  const [displayTodos, setDisplayTodos] = useState("all");

  const completedTodos = todos.filter((t) => t.isCompleted === true);
  const notCompletedTodos = todos.filter((t) => t.isCompleted !== true);

  let todosToBeDisplayed = todos;

  if (displayTodos === "done") {
    todosToBeDisplayed = completedTodos;
  } else if (displayTodos === "inProgress") {
    todosToBeDisplayed = notCompletedTodos;
  } else {
    todosToBeDisplayed = todos;
  }
  const todosJSX = todosToBeDisplayed.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  function handleAddMission() {
    if (inPutValue === "") {
      alert("Please enter a mission title.");
      return;
    }
    const newMission = {
      id: todos.length + 1,
      title: inPutValue,
      details: "Add Mission Details",
      isCompleted: false,
    };
    setTodos([...todos, newMission]);
    const updatedTodos = [...todos, newMission];
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setInputValue("");
  }

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, []);

  function displayTodosType(e) {
    setDisplayTodos(e.target.value);
  }

  return (
    <Container maxWidth="sm">
      <Card
        sx={{ minWidth: 275 }}
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <CardContent>
          <Typography variant="h2">Missions</Typography>
          <Divider />
          {/* Filter Buttons */}
          <ToggleButtonGroup
            style={{ margin: "10px" }}
            value={displayTodos}
            color="primary"
            exclusive
            onChange={displayTodosType}
            aria-label="Platform"
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="inProgress">In Progress</ToggleButton>
            <ToggleButton value="done">Done</ToggleButton>
          </ToggleButtonGroup>
          {/* Filter Buttons */}
          {/* Todo List */}
          {todosJSX}
          {/* ===Todo List=== */}

          {/* INPUT + BUTTON */}
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            <Grid
              item
              size={8}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <TextField
                value={inPutValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Mission Title"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Button
                onClick={() => {
                  handleAddMission();
                }}
                variant="contained"
                style={{ width: "100%", height: "100%" }}
              >
                Add Mission
              </Button>
            </Grid>
          </Grid>
          {/* ===INPUT + BUTTON=== */}
        </CardContent>
      </Card>
    </Container>
  );
}
