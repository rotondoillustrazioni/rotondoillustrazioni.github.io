import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProjects } from "../api";

export const projectsThunk = createAsyncThunk("projects", getProjects);
