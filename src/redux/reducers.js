import { createReducer, createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  projectsThunk,
  projectThunk,
  loginThunk,
  aboutUsThunk,
  editAboutUsThunk,
  contactsThunk,
  editContactsThunk,
  deleteProjectThunk,
  newProjectThunk,
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

const deleteProjectSlice = createSlice({
  name: "deleteProject",
  initialState: {
    isReady: false,
    error: null,
    projectDeleted: null,
    loading: false,
  },
  reducers: {
    // @ts-ignore
    deleteProject(state, action) {
      return {
        projectDeleted: null,
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: {
    // @ts-ignore
    [deleteProjectThunk.pending]: (state, action) => {
      state.projectDeleted = action.meta.arg;
      state.loading = true;
      state.error = null;
    },
    // @ts-ignore
    [deleteProjectThunk.fulfilled]: (state, action) => {
      state.projectDeleted = true;
      state.loading = false;
      state.error = null;
    },
    // @ts-ignore
    [deleteProjectThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { deleteProject } = deleteProjectSlice.actions;

const newProjectSlice = createSlice({
  name: "newProject",
  initialState: {
    error: null,
    projectAdded: null,
    loading: false,
  },
  reducers: {
    // @ts-ignore
    deleteProject(state, action) {
      return {
        projectAdded: null,
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: {
    // @ts-ignore
    [newProjectThunk.pending]: (state, action) => {
      state.projectAdded = action.meta.arg;
      state.loading = true;
      state.error = null;
    },
    // @ts-ignore
    [newProjectThunk.fulfilled]: (state, action) => {
      state.projectAdded = true;
      state.loading = false;
      state.error = null;
    },
    // @ts-ignore
    [newProjectThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { newProject } = newProjectSlice.actions;

const aboutUsSlice = createSlice({
  name: "aboutUs",
  initialState: { isReady: false, error: null, aboutUs: null, loading: false },
  reducers: {
    // @ts-ignore
    getAboutUs(state, action) {
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

export const { getAboutUs } = aboutUsSlice.actions;

const contactsSlice = createSlice({
  name: "contacts",
  initialState: { isReady: false, error: null, contacts: null, loading: false },
  reducers: {
    // @ts-ignore
    getContacts(state, action) {
      return {
        contacts: action.payload,
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: {
    // @ts-ignore
    [contactsThunk.pending]: (state, action) => {
      state.contacts = action.meta.arg;
      state.loading = true;
      state.error = null;
    },
    // @ts-ignore
    [contactsThunk.fulfilled]: (state, action) => {
      state.contacts = {
        ...state.contacts,
        ...action.payload,
      };
      state.loading = false;
      state.error = null;
    },
    // @ts-ignore
    [contactsThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { getContacts } = contactsSlice.actions;

const editAboutUsSlice = createSlice({
  name: "editAboutUs",
  initialState: {
    error: null,
    aboutUsEdited: null,
    loading: false,
  },
  reducers: {
    // @ts-ignore
    resetEditAboutUs(state) {
      state.aboutUsEdited = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: {
    // @ts-ignore
    [editAboutUsThunk.pending]: (state, action) => {
      state.aboutUsEdited = null;
      state.loading = true;
      state.error = null;
    },
    // @ts-ignore
    [editAboutUsThunk.fulfilled]: (state, action) => {
      state.aboutUsEdited = true;
      state.loading = false;
      state.error = null;
    },
    // @ts-ignore
    [editAboutUsThunk.rejected]: (state, action) => {
      state.aboutUsEdited = null;
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { resetEditAboutUs } = editAboutUsSlice.actions;

const editContactsSlice = createSlice({
  name: "editContacts",
  initialState: {
    error: null,
    contactsEdited: null,
    loading: false,
  },
  reducers: {
    // @ts-ignore
    resetEditContacts(state) {
      state.contactsEdited = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: {
    // @ts-ignore
    [editContactsThunk.pending]: (state, action) => {
      state.contactsEdited = null;
      state.loading = true;
      state.error = null;
    },
    // @ts-ignore
    [editContactsThunk.fulfilled]: (state, action) => {
      state.contactsEdited = true;
      state.loading = false;
      state.error = null;
    },
    // @ts-ignore
    [editContactsThunk.rejected]: (state, action) => {
      state.contactsEdited = null;
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { resetEditContacts } = editContactsSlice.actions;

export default combineReducers({
  main: mainReducer,
  projects: projectsSlice.reducer,
  project: projectSlice.reducer,
  auth: authSlice.reducer,
  aboutUs: aboutUsSlice.reducer,
  editAboutUs: editAboutUsSlice.reducer,
  contacts: contactsSlice.reducer,
  editContacts: editContactsSlice.reducer,
  deleteProject: deleteProjectSlice.reducer,
  newProject: newProjectSlice.reducer,
});
