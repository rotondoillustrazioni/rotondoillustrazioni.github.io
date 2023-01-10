import axios from "axios";

export const getProjects = async () => {
  const response = await axios.get("https://rotondo-server.fly.dev/projects");
  return response.data;
};

export const getProject = async ({ id }) => {
  const response = await axios.get(
    `https://rotondo-server.fly.dev/project/${id}`
  );
  return response.data;
};
