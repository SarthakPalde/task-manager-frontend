import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function TaskForm({ open, onClose, onSave, initialData }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setPriority(initialData.priority || 'Low');
      setCompleted(initialData.completed);
    } else {
      setTitle('');
      setDescription('');
      setPriority('Low');
      setCompleted(false);
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!title.trim()) return; 
    onSave({ ...initialData, title: title.trim(), description: description.trim(), priority, completed });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? 'Edit Task' : 'Add Task'}</DialogTitle>
      <DialogContent>
        {/* Input fields */}
        <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} fullWidth margin="dense" />
        <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} fullWidth margin="dense" multiline rows={3} />
        <FormControl fullWidth margin="dense">
          <InputLabel>Priority</InputLabel>
          <Select value={priority} onChange={e => setPriority(e.target.value)} label="Priority">
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={<Checkbox checked={completed} onChange={e => setCompleted(e.target.checked)} />}
          label="Completed"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>{initialData ? 'Update' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
}
