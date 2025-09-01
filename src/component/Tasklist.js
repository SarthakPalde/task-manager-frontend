import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

export default function TaskList({ tasks, onEdit, onDelete,onToggleComplete }) {
  
  const sortedTasks = tasks ? [...tasks].sort((a, b) => {
    const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  }) : [];

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Completed</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedTasks.map(task => (
            <TableRow key={task.id} hover>
              <TableCell sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>
                <Chip label={task.priority} color={
                  task.priority === 'High' ? 'error' :
                  task.priority === 'Medium' ? 'warning' : 'default'
                } />
              </TableCell>
              <TableCell><Checkbox checked={task.completed} onChange={() => onToggleComplete(task.id)} color="primary"/></TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(task)} aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(task.id)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
