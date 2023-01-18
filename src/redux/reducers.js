import { createReducer, createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  projectsThunk,
  projectThunk,
  loginThunk,
  aboutUsThunk,
} from "./actions";

const mainReducer = createReducer({}, {});

const authSlice = createSlice({
  name: "auth",
  initialState: { loading: false, loggedIn: false, token: null, error: null },
  reducers: {
    logout(state) {
      state.loggedIn = false;
      state.token = null;
    },
    cleanUpError(state) {
      state.error = null;
    },
  },
  extraReducers: {
    // @ts-ignore
    [loginThunk.pending]: (state, action) => {
      state.loading = true;
      state.loggedIn = false;
      state.token = null;
      state.error = null;
    },
    // @ts-ignore
    [loginThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.loggedIn = true;
      state.token = action.payload.token;
      state.error = null;
    },
    // @ts-ignore
    [loginThunk.rejected]: (state, action) => {
      state.loading = false;
      state.loggedIn = false;
      state.token = null;
      state.error = action.error;
    },
  },
});
export const { logout, cleanUpError } = authSlice.actions;

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

const aboutUsSlice = createSlice({
  name: "aboutUs",
  initialState: { isReady: false, error: null, aboutUs: null, loading: false },
  reducers: {
    // @ts-ignore
    getProject(state, action) {
      return {
        aboutUs: action.payload,
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: {
    // @ts-ignore
    [aboutUsThunk.pending]: (state, action) => {
      state.aboutUs = action.meta.arg;
      state.loading = true;
      state.error = null;
    },
    // @ts-ignore
    [aboutUsThunk.fulfilled]: (state, action) => {
      state.aboutUs = {
        ...state.aboutUs,
        ...action.payload,
      };
      state.loading = false;
      state.error = null;
    },
    // @ts-ignore
    [aboutUsThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { getAboutUs } = projectSlice.actions;

export default combineReducers({
  main: mainReducer,
  projects: projectsSlice.reducer,
  project: projectSlice.reducer,
  auth: authSlice.reducer,
  aboutUs: aboutUsSlice.reducer,
});
