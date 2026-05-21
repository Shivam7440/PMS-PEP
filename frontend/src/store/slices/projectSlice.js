import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (_, { rejectWithValue }) => {
  try {
    const response = await API.get('/projects');
    return response.data.projects;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const fetchProjectById = createAsyncThunk('projects/fetchProjectById', async (projectId, { rejectWithValue }) => {
  try {
    const response = await API.get(`/projects/${projectId}`);
    return response.data.project;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const createProjectAsync = createAsyncThunk('projects/createProject', async (projectData, { rejectWithValue }) => {
  try {
    const response = await API.post('/projects', projectData);
    return response.data.project;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    items: [],
    currentProject: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentProject: (state) => {
      state.currentProject = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.currentProject = action.payload;
      })
      .addCase(createProjectAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export const { clearCurrentProject } = projectSlice.actions;

export default projectSlice.reducer;
