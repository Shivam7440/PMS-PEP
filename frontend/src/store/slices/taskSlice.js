import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (projectId, { rejectWithValue }) => {
  try {
    const response = await API.get(`/tasks/project/${projectId}`);
    return response.data.tasks;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const fetchAllTasks = createAsyncThunk('tasks/fetchAllTasks', async (_, { rejectWithValue }) => {
  try {
    const response = await API.get('/tasks/all');
    return response.data.tasks;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const fetchAssignedTasks = createAsyncThunk('tasks/fetchAssignedTasks', async (_, { rejectWithValue }) => {
  try {
    const response = await API.get('/tasks/assigned-to-me');
    return response.data.tasks;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const addTaskAsync = createAsyncThunk('tasks/addTask', async (taskData, { rejectWithValue }) => {
  try {
    const response = await API.post('/tasks', taskData);
    return response.data.task;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const updateTaskStatusAsync = createAsyncThunk('tasks/updateStatus', async ({ taskId, status, columnId }, { rejectWithValue }) => {
  try {
    const response = await API.patch(`/tasks/${taskId}/status`, { status, columnId });
    return response.data.task;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const deleteTaskAsync = createAsyncThunk('tasks/deleteTask', async (taskId, { rejectWithValue }) => {
  try {
    await API.delete(`/tasks/${taskId}`);
    return taskId;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

const initialState = {
  tasks: {},
  assignedTasks: [],
  columns: {
    'todo': { id: 'todo', title: 'To Do', taskIds: [] },
    'inprogress': { id: 'inprogress', title: 'In Progress', taskIds: [] },
    'review': { id: 'review', title: 'Review', taskIds: [] },
    'done': { id: 'done', title: 'Done', taskIds: [] },
  },
  columnOrder: ['todo', 'inprogress', 'review', 'done'],
  selectedTaskId: null,
  loading: false,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    selectTask: (state, action) => {
      state.selectedTaskId = action.payload;
    },
    clearSelectedTask: (state) => {
      state.selectedTaskId = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        const tasks = {};
        const columns = {
          'todo': { id: 'todo', title: 'To Do', taskIds: [] },
          'inprogress': { id: 'inprogress', title: 'In Progress', taskIds: [] },
          'review': { id: 'review', title: 'Review', taskIds: [] },
          'done': { id: 'done', title: 'Done', taskIds: [] },
        };

        action.payload.forEach(task => {
          tasks[task._id] = { ...task, id: task._id };
          const colId = task.columnId || 'todo';
          if (columns[colId]) {
            columns[colId].taskIds.push(task._id);
          }
        });

        state.tasks = tasks;
        state.columns = columns;
      })
      .addCase(fetchAllTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        const tasks = {};
        const columns = {
          'todo': { id: 'todo', title: 'To Do', taskIds: [] },
          'inprogress': { id: 'inprogress', title: 'In Progress', taskIds: [] },
          'review': { id: 'review', title: 'Review', taskIds: [] },
          'done': { id: 'done', title: 'Done', taskIds: [] },
        };

        action.payload.forEach(task => {
          tasks[task._id] = { ...task, id: task._id };
          const colId = task.columnId || 'todo';
          if (columns[colId]) {
            columns[colId].taskIds.push(task._id);
          }
        });

        state.tasks = tasks;
        state.columns = columns;
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        const task = action.payload;
        state.tasks[task._id] = { ...task, id: task._id };
        const colId = task.columnId || 'todo';
        if (state.columns[colId]) {
          state.columns[colId].taskIds.unshift(task._id);
        }
      })
      .addCase(updateTaskStatusAsync.fulfilled, (state, action) => {
        const task = action.payload;
        const oldTask = state.tasks[task._id];

        // Update task data
        state.tasks[task._id] = { ...task, id: task._id };

        // Handle column move if status/columnId changed
        if (oldTask && oldTask.columnId !== task.columnId) {
          // Remove from old column
          if (state.columns[oldTask.columnId]) {
            state.columns[oldTask.columnId].taskIds = state.columns[oldTask.columnId].taskIds.filter(id => id !== task._id);
          }
          // Add to new column
          if (state.columns[task.columnId]) {
            state.columns[task.columnId].taskIds.push(task._id);
          }
        }
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        const taskId = action.payload;
        const task = state.tasks[taskId];
        if (task && state.columns[task.columnId || 'todo']) {
          state.columns[task.columnId || 'todo'].taskIds = state.columns[task.columnId || 'todo'].taskIds.filter(id => id !== taskId);
        }
        delete state.tasks[taskId];
        state.assignedTasks = state.assignedTasks.filter(t => t._id !== taskId);
      })
      .addCase(fetchAssignedTasks.fulfilled, (state, action) => {
        state.assignedTasks = action.payload;
      });
  }
});

export const { selectTask, clearSelectedTask } = taskSlice.actions;
export default taskSlice.reducer;
