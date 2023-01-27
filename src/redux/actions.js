import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAboutUs,
  getProject,
  getProjects,
  login,
  editAboutUs,
  getContacts,
  editContacts,
  deleteProject,
  newProject,
  editProject,
  getNotifications,
  deleteNotification,
  editNotification,
  changePassword,
} from "../api";

export const projectsThunk = createAsyncThunk("projects", getProjects);
export const projectThunk = createAsyncThunk("project", getProject);
export const loginThunk = createAsyncThunk("login", login);
export const aboutUsThunk = createAsyncThunk("aboutUs", getAboutUs);
export const editAboutUsThunk = createAsyncThunk("editAboutUs", editAboutUs);
export const contactsThunk = createAsyncThunk("contacts", getContacts);
export const editContactsThunk = createAsyncThunk("editContacts", editContacts);
export const deleteProjectThunk = createAsyncThunk(
  "deleteProject",
  deleteProject
);
export const newProjectThunk = createAsyncThunk("newProject", newProject);
export const editProjectThunk = createAsyncThunk("editProject", editProject);

export const notificationsThunk = createAsyncThunk(
  "notifications",
  getNotifications
);

export const deleteNotificationThunk = createAsyncThunk(
  "deleteNotification",
  deleteNotification
);

export const editNotificationThunk = createAsyncThunk(
  "editNotification",
  editNotification
);

export const changePasswordThunk = createAsyncThunk(
  "changePassword",
  changePassword
);
