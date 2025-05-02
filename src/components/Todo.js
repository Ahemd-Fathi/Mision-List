import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

// Components Imports
import { useContext } from "react";
import { ToastContext } from "../contexts/ToastContext";
import { useTodos } from "../contexts/todosContext";

export default function Todo({ todo, showDelete, showUpdate }) {
  const { showHideToast } = useContext(ToastContext);
  const { todos, dispatch } = useTodos();

  // EVENT HANDLERS
  function handleCheckCompleted() {
    dispatch({
      type: "completed",
      payload: todo,
    });

    showHideToast("Mission status updated successfully!");
  }

  function handleDeleteClick() {
    showDelete(todo);
  }

  function handleUpdateClick() {
    showUpdate(todo);
  }

  // ===========EVENT HANDLERS=============

  return (
    <div>
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "#fff",
          marginTop: "10px",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item size={{ xs: 6, md: 8 }}>
              <Typography variant="h5" style={{ textAlign: "left" }}>
                {todo.title}
              </Typography>
              <Typography variant="h6" style={{ textAlign: "left" }}>
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              item
              size={{ xs: 6, md: 4 }}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* Action Buttons */}

              {/* Check Completed Button */}
              <IconButton
                onClick={() => {
                  handleCheckCompleted();
                }}
                className="iconButton"
                aria-label="check"
                style={{
                  color: "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "#fff",
                  border: "1px solid #8bc34a",
                }}
              >
                <CheckIcon
                  style={{ color: todo.isCompleted ? "#fff" : "#8bc34a" }}
                />
              </IconButton>
              {/* ===Check Completed Button=== */}

              {/* Edit Button */}
              <IconButton
                className="iconButton"
                aria-label="edit"
                style={{
                  color: "#1769aa",
                  background: "#fff",
                  border: "1px solid #1769aa",
                }}
                onClick={handleUpdateClick}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
              {/* ===Edit Button=== */}

              {/* Delete Button */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "#fff",
                  border: "1px solid #b23c17",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              {/* ===Delete Button=== */}

              {/* ===Action Buttons=== */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
