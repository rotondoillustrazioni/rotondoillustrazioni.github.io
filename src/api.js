import axios from "axios";

export const getProjects = async () => {
  const response = await axios.get(
    // "https://rotondo-server.fly.dev/projects"
    "http://localhost:3000/projects"
  );
  return response.data;
};

export const getProject = async ({ id }) => {
  const response = await axios.get(
    // `https://rotondo-server.fly.dev/project/${id}`
    `http://localhost:3000/project/${id}`
  );
  return response.data;
};
