// @ts-nocheck
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
  editProjectThunk,
  notificationsThunk,
} from "./actions";
import { wsNewNotification } from "../websocket";

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

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notReadNumber: 0,
    error: null,
    notifications: null,
    loading: false,
  },
  reducers: {
    // @ts-ignore
    getNotifications(state, action) {
      return {
        notifications: action.payload,
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: {
    // @ts-ignore
    [notificationsThunk.pending]: (state, action) => {
      state.notifications = action.meta.arg;
      state.loading = true;
      state.error = null;
    },
    // @ts-ignore
    [notificationsThunk.fulfilled]: (state, action) => {
      state.notifications = action.payload;
      state.notReadNumber = action.payload.filter(
        (item) => item.read === false
      ).length;
      state.loading = false;
      state.error = null;
    },
    // @ts-ignore
    [notificationsThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { getNotifications } = notificationsSlice.actions;

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
    isDeleted: false,
    error: null,
    projectDeleted: null,
    loading: false,
  },
  reducers: {
    // @ts-ignore
    resetDeleteProject(state) {
      state.isDeleted = false;
      state.projectDeleted = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: {
    // @ts-ignore
    [deleteProjectThunk.pending]: (state, action) => {
      state.isDeleted = false;
      state.projectDeleted = action.meta.arg;
      state.loading = true;
      state.error = null;
    },
    // @ts-ignore
    [deleteProjectThunk.fulfilled]: (state, action) => {
      state.isDeleted = true;
      state.projectDeleted = true;
      state.loading = false;
      state.error = null;
    },
    // @ts-ignore
    [deleteProjectThunk.rejected]: (state, action) => {
      state.isDeleted = false;
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { resetDeleteProject } = deleteProjectSlice.actions;

const newProjectSlice = createSlice({
  name: "newProject",
  initialState: {
    isAdded: false,
    error: null,
    projectAdded: null,
    loading: false,
  },
  reducers: {
    // @ts-ignore
    resetNewProject(state) {
      state.isAdded = false;
      state.projectAdded = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: {
    // @ts-ignore
    [newProjectThunk.pending]: (state, action) => {
      state.isAdded = false;
      state.projectAdded = action.meta.arg;
      state.loading = true;
      state.error = null;
    },
    // @ts-ignore
    [newProjectThunk.fulfilled]: (state, action) => {
      state.isAdded = true;
      state.projectAdded = true;
      state.loading = false;
      state.error = null;
    },
    // @ts-ignore
    [newProjectThunk.rejected]: (state, action) => {
      state.isAdded = false;
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { resetNewProject } = newProjectSlice.actions;

const editProjectSlice = createSlice({
  name: "editProject",
  initialState: {
    isEdited: false,
    error: null,
    projectEdited: null,
    loading: false,
  },
  reducers: {
    // @ts-ignore
    resetEditProject(state) {
      state.isEdited = false;
      state.projectEdited = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: {
    // @ts-ignore
    [editProjectThunk.pending]: (state, action) => {
      state.isEdited = false;
      state.projectEdited = action.meta.arg;
      state.loading = true;
      state.error = null;
    },
    // @ts-ignore
    [editProjectThunk.fulfilled]: (state, action) => {
      state.isEdited = true;
      state.projectEdited = true;
      state.loading = false;
      state.error = null;
    },
    // @ts-ignore
    [editProjectThunk.rejected]: (state, action) => {
      state.isEdited = false;
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { resetEditProject } = editProjectSlice.actions;

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

const notificationsWSSlice = createSlice({
  name: "notificationsWS",
  initialState: {
    connected: false,
    receivedNotification: null,
  },
  reducers: {
    connectWS(state) {
      // not used for now
      state.connected = true;
    },
    resetNewNotificationWS(state) {
      state.receivedNotification = null;
    },
    newNotificationWS: (state, action) => {
      state.receivedNotification = {
        ...state.receivedNotification,
        ...action.payload,
      };
    },
  },
});

export const { connectWS, newNotificationWS, resetNewNotificationWS } =
  notificationsWSSlice.actions;

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
  editProject: editProjectSlice.reducer,
  notifications: notificationsSlice.reducer,
  notificationsWS: notificationsWSSlice.reducer,
});
