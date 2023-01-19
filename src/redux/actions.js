import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAboutUs,
  getProject,
  getProjects,
  login,
  editAboutUs,
  getContacts,
  editContacts,
} from "../api";

export const projectsThunk = createAsyncThunk("projects", getProjects);
export const projectThunk = createAsyncThunk("project", getProject);
export const loginThunk = createAsyncThunk("login", login);
export const aboutUsThunk = createAsyncThunk("aboutUs", getAboutUs);
export const editAboutUsThunk = createAsyncThunk("editAboutUs", editAboutUs);
export const contactsThunk = createAsyncThunk("contacts", getContacts);
export const editContactsThunk = createAsyncThunk("editContacts", editContacts);
