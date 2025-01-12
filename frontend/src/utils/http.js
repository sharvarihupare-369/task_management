import axios from "axios";
const BASE_URL = "http://localhost:8080";

export const registerUser = async (userData) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/register`, userData);
    // console.log("User registered successfully:", res);
    if (res.status === 200) {
      return res.data.message;
    }
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};

export const loginUser = async (userData) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, userData);
    // console.log("User loggedIn successfully:", res.data);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};

export const logoutUser = async(token) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/logout`,null,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
    // return res;
    // console.log(res.data);
    if(res.status === 200){
      return res.data.message
    }
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message
  }
}


export const createTask = async (taskData, token) => {
  try {
    const res = await axios.post(`${BASE_URL}/tasks/`, taskData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(res.data)
    if (res.status === 200) {
      return res.data; 
    }
  } catch (error) {
    console.error('Error creating task:', error.response?.data?.message || error.message);
    return error.response?.data?.message || 'An error occurred while creating the task';
  }
};

export const getAllTasks = async (token,queryParams) => {
  try {
    const res = await axios.get(`${BASE_URL}/tasks?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    // console.log(res.data); 
    return res.data.tasks; 
  } catch (error) {
    console.log(error.message); 
    throw error;
  }
};

export const editTask = async (id, updatedTask, token) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/tasks/${id}`,
      updatedTask,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error.response?.data || error.message);
    return null;
  }
};

export const deleteTask = async (id, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error.response?.data || error.message);
    return null;
  }
};

