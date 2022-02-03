import { useState } from "react";
import "../styles/tasklist.scss";
import { FiTrash, FiCheckSquare } from "react-icons/fi";
import { useShowFeedbackMessage } from "../utils/useShowFeedbackMessage";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    try {
      if (newTaskTitle) {
        const id = Math.floor(Math.random() * 101);
        if (!tasks.find((task) => task?.id === id)) {
          setTasks([
            ...tasks,
            { id: id, title: newTaskTitle, isComplete: false },
          ]);
          setNewTaskTitle("");
          useShowFeedbackMessage({
            type: "success",
            message: "Task inserida com sucesso!",
          });
        }
      } else {
        useShowFeedbackMessage({
          type: "warning",
          message: "O título da task é obrigatório!",
        });
      }
    } catch (error) {
      console.assert(error);
      useShowFeedbackMessage({
        type: "error",
        message: "Ocorreu um erro ao inserir a task!",
      });
    }
  }

  function handleToggleTaskCompletion(id: number) {
    const task = tasks.find((item) => item.id === id);
    if (task) {
      task.isComplete = !task?.isComplete;
      setTasks([...tasks]);
    }
  }

  function handleRemoveTask(id: number) {
    try {
      const index = tasks.findIndex((task) => task.id === id);
      if (index > -1) {
        const remaining = tasks.filter((task) => task.id !== id);
        setTasks(remaining);
        useShowFeedbackMessage({
          type: "success",
          message: "Task removida com sucesso!",
        });
      }
    } catch (error) {
      console.assert(error);
      useShowFeedbackMessage({
        type: "error",
        message: "Ocorreu um erro ao remover a task!",
      });
    }
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks?.length
            ? tasks.map((task) => (
                <li key={task?.id}>
                  <div
                    className={task?.isComplete ? "completed" : ""}
                    data-testid="task"
                  >
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        readOnly
                        checked={task?.isComplete}
                        onClick={() => handleToggleTaskCompletion(task?.id)}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <p>{task?.title}</p>
                  </div>

                  <button
                    type="button"
                    data-testid="remove-task-button"
                    onClick={() => handleRemoveTask(task?.id)}
                  >
                    <FiTrash size={16} />
                  </button>
                </li>
              ))
            : null}
        </ul>
      </main>
    </section>
  );
}
