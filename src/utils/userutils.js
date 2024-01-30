import axios from "axios";
import { login, logout } from "./userSlice.js";
const REACT_APP_API_URI = process.env.REACT_APP_API_URI;
export const Currentuser = async (dispatch) => {
  try {
    console.log("called 1");
    const res = await axios.get(
      `${REACT_APP_API_URI}/api/v1/users/current-user`
    );

    if (res) {
      console.log(res);
      dispatch(login(res.data.data));
      console.log("called 2");
    } else {
      console.log("logging out called");
      dispatch(logout());
      console.log("called");
      // throw new Error("user is not loged");
    }
  } catch (err) {
    console.error("User is not logged:", err.message);
    // Handle error if needed
    // dispatch(logout());
    // navigate("/login");
  }
  return true;
};

export const Loginuser = (dispatch, navigate, seterrmsg, email, password) => {
  const data = {
    email: email?.current?.value,
    password: password?.current?.value,
  };
  const body = JSON.stringify(data);
  console.log(email?.current?.value, password?.current?.value);
  // const body = new FormData();
  // body.append("email", email?.current?.value);
  // body.append("password", password?.current?.value);
  // console.log("button clicked", body);

  axios
    .post(`${REACT_APP_API_URI}/api/v1/users/login`, body, {
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
      },
    })
    .then((res) => {
      console.log(res.headers.get("set-cookie"));
      console.log(res);
      dispatch(login(res.data.data.user));
      navigate("/");
    })
    .catch((err) => {
      console.log(err.response.statusText);
      let msgdata = err.response.statusText;
      if (msgdata === "Unauthorized") {
        msgdata = "Password is Incorrect";
      } else {
        msgdata = "Email is incorrect : user not found";
      }
      seterrmsg(msgdata);
    });
};

export const Logoutuser = (dispatch) => {
  console.log("logout kar rahe he");
  axios
    .post(`${REACT_APP_API_URI}/api/v1/users/logout`, { withCredentials: true })
    .then((res) => {
      dispatch(logout());
    })
    .catch((err) => console.log(err));
};

export const Signupuser = (dispatch, navigate, seterrmsg, body) => {
  console.log("called 1");
  axios
    .post(`${REACT_APP_API_URI}/api/v1/users/register`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(login(res.data.data));
      navigate("/");
    })
    .catch((err) => {
      console.log(err);
      seterrmsg(err.response.statusText);
    });
};

export const getPostdata = async (slug) => {
  console.log(slug);
  try {
    const data = await axios.get(
      `${REACT_APP_API_URI}/api/v1/blog/post/${slug}`
    );
    console.log(data);
    if (!data) {
      throw new Error("not Existed Post");
    }
  } catch (error) {
    console.log(error.message);
  }
  // axios
  //   .get(`/api/v1/blog/post/${slug}`)
  //   .then((res) => {
  //     return res;
  //   })
  //   .catch((err) => {
  //     return err;
  //   });
};
