import axios from "@/app/utils/axios";
import {
  loginuser,
  logoutuser,
  iserror,
  removeerror,
  currentuser,
} from "../Reducers/loginReducers";

export const asyncfetchlogin = (formData) => async (dispatch, getState) => {
  try {
    dispatch(removeerror()); // clear previous errors if any
    const { data } = await axios.post("/adminlogin", formData); // send formData via POST

    // Save token (if API returns it)
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    // store only user details in redux
    dispatch(loginuser(data.user));

    return { success: true, payload: data };
  } catch (error) {
    dispatch(iserror(error?.response?.data?.message || "Login failed"));

    return {
      success: false,
      message: error?.response?.data?.message || "Login failed",
    };
  }
};

export const fetchCurrentUser = () => async (dispatch) => {
  try {
    const { data } = await axios.post("/currentadmin"); // your API endpoint
    dispatch(currentuser(data.user));
    return { success: true, payload: data.user };
  } catch (error) {
    console.error("Error fetching current user:", error);
    dispatch(iserror("Failed to fetch user"));
    return { success: false };
  }
};
