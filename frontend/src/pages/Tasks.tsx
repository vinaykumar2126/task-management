import { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Button, 
  TextField, Checkbox, Dialog, DialogTitle, DialogContent,
  DialogActions, Grid, Card, CardContent, IconButton // <-- Add this import
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { tasks } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: string;
  title: string;
  description: string;
  isComplete: boolean;
}

const Tasks = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const response = await tasks.getAll();
      setTaskList(response.data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    // Verify token format
    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Invalid token format');
      fetchTasks();
    } catch (err) {
      console.error('Invalid token:', err);
      logout();
      navigate('/login');
    }
  }, [navigate, logout]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await tasks.create(newTask);
      setNewTask({ title: '', description: '' });
      fetchTasks();
    } catch (err) {
      console.error('Failed to create task', err);
    }
  };

  const handleUpdate = async (task: Task) => {
    try {
      await tasks.update(task.id, task);
      setEditTask(null);
      setIsDialogOpen(false);
      fetchTasks();
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await tasks.delete(id);
      fetchTasks();
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container>
      <Box sx={{ 
        mb: 4, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(8px)',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: '1px solid rgba(33,150,243,0.1)'
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            background: 'linear-gradient(45deg, #2196f3 30%, #64b5f6 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Tasks
        </Typography>
        <Button 
          onClick={handleLogout} 
          variant="outlined"
          sx={{
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px'
            }
          }}
        >
          Logout
        </Button>
      </Box>

      <Box component="form" onSubmit={handleCreate} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Task Title"
          value={newTask.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTask({ ...newTask, title: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          value={newTask.description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTask({ ...newTask, description: e.target.value })}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained">Add Task</Button>
      </Box>

      <Grid container spacing={3}>
        {taskList.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: task.isComplete ? 'rgba(76, 175, 80, 0.05)' : 'white'
            }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    checked={task.isComplete}
                    onChange={() => handleUpdate({ ...task, isComplete: !task.isComplete })}
                  />
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ textDecoration: task.isComplete ? 'line-through' : 'none' }}
                    >
                      {task.title}
                    </Typography>
                    <Typography variant="body2">
                      {task.description}
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <IconButton
                    onClick={() => {
                      setEditTask(task);
                      setIsDialogOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(task.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          {editTask && (
            <>
              <TextField
                fullWidth
                label="Task Title"
                value={editTask.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditTask({ ...editTask, title: e.target.value })}
                sx={{ mt: 2, mb: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                value={editTask.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditTask({ ...editTask, description: e.target.value })}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => editTask && handleUpdate(editTask)}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Tasks;
