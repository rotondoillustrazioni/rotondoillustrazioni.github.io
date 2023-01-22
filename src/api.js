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

export const editContacts = async ({ contact, content, token }) => {
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + `/contacts/edit/${contact}`,
    { content },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
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

export const editAboutUs = async ({ language, description, token }) => {
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + `/aboutus/edit/${language}`,
    { description },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const deleteProject = async ({ id, projectTitle, token }) => {
  const response = await axios.delete(
    process.env.REACT_APP_BASE_URL + `/project/delete/${id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
      data: { projectTitle: projectTitle },
    }
  );
  return response.data;
};

export const newProject = async ({ newProject, token }) => {
  console.log(newProject);
  const response = await axios.put(
    process.env.REACT_APP_BASE_URL + "/project/new",
    newProject,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
