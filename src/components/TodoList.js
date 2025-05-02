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
import { useState, useContext, useEffect, useMemo } from "react";
import { useTodos } from "../contexts/todosContext";
import { ToastContext } from "../contexts/ToastContext";

//  Dialog Imports
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function TodoList() {
  const { todos, dispatch } = useTodos();

  const { showHideToast } = useContext(ToastContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [inPutValue, setInputValue] = useState("");
  const [displayTodos, setDisplayTodos] = useState("all");
  const [dialogTodo, setDialogTodo] = useState({
    title: todos.title,
    details: todos.details,
  });
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  const completedTodos = useMemo(() => {
    return todos.filter((t) => t.isCompleted === true);
  }, [todos]);

  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => t.isCompleted !== true);
  }, [todos]);

  let todosToBeDisplayed = todos;

  if (displayTodos === "done") {
    todosToBeDisplayed = completedTodos;
  } else if (displayTodos === "inProgress") {
    todosToBeDisplayed = notCompletedTodos;
  } else {
    todosToBeDisplayed = todos;
  }

  // EVENT HANDLERS
  function handleAddMission() {
    if (inPutValue === "") {
      alert("Please enter a mission title.");
      return;
    }
    dispatch({
      type: "added",
      payload: { title: inPutValue, details: "" },
    });

    setInputValue("");
    showHideToast("Mission Added Successfully!");
  }

  useEffect(() => {
    dispatch({ type: "get" });
  }, []);

  function displayTodosType(e) {
    setDisplayTodos(e.target.value);
  }

  function handleShowDeleteDialog(todo) {
    setDialogTodo(todo);
    setShowDeleteDialog(true);
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    dispatch({ type: "deleted", payload: { id: dialogTodo.id } });

    setShowDeleteDialog(false);
    showHideToast("Mission Deleted Successfully!");
  }

  function handleUpdateDialogClose() {
    setShowUpdateDialog(false);
  }

  function handleUpdateConfirm() {
    dispatch({
      type: "updated",
      payload: {
        id: dialogTodo.id,
        title: dialogTodo.title,
        details: dialogTodo.details,
      },
    });

    setShowUpdateDialog(false);
    showHideToast("Mission Updated Successfully!");
  }

  function handleShowUpdateDialog(todo) {
    setDialogTodo(todo);
    setShowUpdateDialog(true);
  }

  const todosJSX = todosToBeDisplayed.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        showDelete={handleShowDeleteDialog}
        showUpdate={handleShowUpdateDialog}
      />
    );
  });
  return (
    <div>
      {/* Delete Confirmation Dialog */}
      <Dialog
        onClose={handleDeleteDialogClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are You Sure That You Want To Delete This Mission?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This Action Cannot Be Undone. Are You Sure You Want To Delete This
            Mission?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* ===Delete Confirmation Dialog=== */}

      {/* Update Dialog */}
      <Dialog
        onClose={handleUpdateDialogClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Your Mission</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="Mission Title"
            type="text"
            fullWidth
            variant="standard"
            value={dialogTodo.title}
            onChange={(e) =>
              setDialogTodo({ ...dialogTodo, title: e.target.value })
            }
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="details"
            label="Mission Details"
            type="text"
            fullWidth
            variant="standard"
            value={dialogTodo.details}
            onChange={(e) =>
              setDialogTodo({ ...dialogTodo, details: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>Cancel</Button>
          <Button autoFocus onClick={handleUpdateConfirm}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
      {/* ===Update Dialog=== */}

      <Container maxWidth="lg">
        <Card
          sx={{ minWidth: 500 }}
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
    </div>
  );
}
