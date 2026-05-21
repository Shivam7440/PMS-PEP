import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice';
import teamReducer from './slices/teamSlice';
import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';
import projectReducer from './slices/projectSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    team: teamReducer,
    theme: themeReducer,
    auth: authReducer,
    projects: projectReducer,
    notifications: notificationReducer,
  },
});
