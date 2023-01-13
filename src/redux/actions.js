import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProject, getProjects, login } from "../api";

export const projectsThunk = createAsyncThunk("projects", getProjects);
export const projectThunk = createAsyncThunk("project", getProject);
export const loginThunk = createAsyncThunk("login", login);
