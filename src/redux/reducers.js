import { createReducer, createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { projectsThunk } from "./actions";

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

export default combineReducers({
  main: mainReducer,
  projects: projectsSlice.reducer,
});
