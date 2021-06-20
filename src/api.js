import axios from "axios";

export const getProjects = async () => {
  const response = await axios.get(
    "https://rotondo-server.herokuapp.com/projects"
  );
  return response.data;
};

export const getProject = async ({ id }) => {
  const response = await axios.get(
    `https://rotondo-server.herokuapp.com/project/${id}`
  );
  return response.data;
};
