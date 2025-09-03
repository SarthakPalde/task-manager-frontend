import React, { useState, useEffect, useCallback } from 'react';
import Header from './component/Header';
import TaskList from './component/Tasklist';
import TaskForm from './component/TaskForm';  
import { getTasks, addTask, editTask, deleteTask } from './services/api';
import { Container, Button, Snackbar, Alert } from '@mui/material';

function App() {
  const [tasks, setTasks] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = useCallback((message, severity) => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch {
      showSnackbar('Failed to fetch tasks', 'error');
    }
  }, [showSnackbar]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const handleAddClick = () => {
    setCurrentTask(null);
    setFormOpen(true);
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setFormOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      showSnackbar('Task deleted', 'info');
      fetchTasks();
    } catch {
      showSnackbar('Failed to delete task', 'error');
    }
  };

  const handleSave = async (taskData) => {
    try {
      if (taskData.id) {
        await editTask(taskData.id, taskData);
        showSnackbar('Task updated', 'success');
      } else {
        await addTask(taskData);
        showSnackbar('Task added', 'success');
      }
      fetchTasks();
    } catch {
      showSnackbar('Failed to save task', 'error');
    }
  };
   
  const handleToggleComplete = async (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
  
    try {
      await editTask(taskId, { ...task, completed: !task.completed });
      fetchTasks(); 
    } catch (error) {
      console.error('Failed to update task completion', error);
    }
  };
  

  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Button variant="contained" onClick={handleAddClick}>Add Task</Button>
        <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} onToggleComplete={handleToggleComplete} />
        <TaskForm open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} initialData={currentTask} />
        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={3000} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
        </Snackbar>
      </Container>
    </>
  );
}

export default App;
