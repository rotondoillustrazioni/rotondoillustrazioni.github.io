import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAboutUs,
  getProject,
  getProjects,
  login,
  editAboutUs,
} from "../api";

export const projectsThunk = createAsyncThunk("projects", getProjects);
export const projectThunk = createAsyncThunk("project", getProject);
export const loginThunk = createAsyncThunk("login", login);
export const aboutUsThunk = createAsyncThunk("aboutUs", getAboutUs);
export const editAboutUsThunk = createAsyncThunk("editAboutUs", editAboutUs);
