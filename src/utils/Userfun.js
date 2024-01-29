import { login, logout } from "./userSlice";
import axios from "axios";

export const Currentuser = async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/users/current-user");

    if (res.data.data) {
      console.log(res.data.data);
      dispatch(login(res.data.data));
      console.log("called 2");
    } else {
      console.log("logging out called");
      dispatch(logout());
      console.log("called");
    }
  } catch (err) {
    //console.log(err);
    // Handle error if needed
    // dispatch(logout());
    // navigate("/login");
  }
};
