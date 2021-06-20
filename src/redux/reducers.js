import { createReducer, createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { projectsThunk, projectThunk } from "./actions";

const mainReducer = createReducer({}, {});

const projectsSlice = createSlice({
  name: "projects",
  initialState: { isReady: false, error: null, projects: null, loading: false },
  reducers: {
    // @ts-ignore
    getProjects(state, action) {
      return {
        projects: action.payload,
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: {
    // @ts-ignore
    [projectsThunk.pending]: (state, action) => {
      state.projects = action.meta.arg;
      state.loading = true;
      state.error = null;
    },
    // @ts-ignore
    [projectsThunk.fulfilled]: (state, action) => {
      state.projects = {
        ...state.projects,
        ...action.payload,
      };
      state.loading = false;
      state.error = null;
    },
    // @ts-ignore
    [projectsThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { getProjects } = projectsSlice.actions;

const projectSlice = createSlice({
  name: "project",
  initialState: { isReady: false, error: null, project: null, loading: false },
  reducers: {
    // @ts-ignore
    getProject(state, action) {
      return {
        project: action.payload,
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: {
    // @ts-ignore
    [projectThunk.pending]: (state, action) => {
      state.project = action.meta.arg;
      state.loading = true;
      state.error = null;
    },
    // @ts-ignore
    [projectThunk.fulfilled]: (state, action) => {
      state.project = {
        ...state.project,
        ...action.payload,
      };
      state.loading = false;
      state.error = null;
    },
    // @ts-ignore
    [projectThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { getProject } = projectSlice.actions;

export default combineReducers({
  main: mainReducer,
  projects: projectsSlice.reducer,
  project: projectSlice.reducer,
});
