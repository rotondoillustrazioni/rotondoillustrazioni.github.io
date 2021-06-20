import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProject, getProjects } from "../api";

export const projectsThunk = createAsyncThunk("projects", getProjects);
export const projectThunk = createAsyncThunk("project", getProject);
