import axios from "axios";

export const login = async ({ username, password }) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL + "/login",
      { username, password }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Internal server error");
  }
};

export const getProjects = async () => {
  const response = await axios.get(
    process.env.REACT_APP_BASE_URL + "/projects"
  );
  return response.data;
};

export const getContacts = async () => {
  const response = await axios.get(
    process.env.REACT_APP_BASE_URL + "/contacts"
  );
  return response.data;
};

export const editContacts = async ({ contact, content }) => {
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + `/contacts/${contact}`,
    { content }
  );
  return response.data;
};

export const getProject = async ({ id }) => {
  const response = await axios.get(
    process.env.REACT_APP_BASE_URL + `/project/${id}`
  );
  return response.data;
};

export const getAboutUs = async ({ language }) => {
  const response = await axios.get(
    process.env.REACT_APP_BASE_URL + `/aboutus/${language}`
  );
  return response.data;
};

export const editAboutUs = async ({ language, description }) => {
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + `/aboutus/edit/${language}`,
    { description }
  );
  return response.data;
};
