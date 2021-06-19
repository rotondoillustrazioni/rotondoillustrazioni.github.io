import axios from "axios";

export const getProjects = async () => {
  const response = await axios.get(
    "https://rotondo-server.herokuapp.com/projects"
  );
  return response.data;
};
