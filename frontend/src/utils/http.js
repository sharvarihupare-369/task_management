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