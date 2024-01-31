import axios from "axios";
import { login, logout } from "./userSlice.js";

const REACT_APP_API_URI = process.env.REACT_APP_API_URI;
const accessToken = localStorage.getItem("accessToken");
export const Currentuser = async (dispatch) => {
  try {
    console.log("called 1");
    const res = await axios.get(
      `${REACT_APP_API_URI}/api/v1/users/current-user`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
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
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log(res.data.data);
      dispatch(login(res.data.data.user));

      // document.cookie=res.data.data.accessToken
      localStorage.setItem("accessToken", res.data.data.accessToken);

      navigate("/");
    })
    .catch((err) => {
      console.log(err?.response?.statusText);
      let msgdata = err?.response?.statusText;
      if (msgdata === "Unauthorized") {
        msgdata = "Password is Incorrect";
      } else {
        msgdata = "Email is incorrect : user not found";
      }
      seterrmsg(msgdata);
    });
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

export const addPost = async (body, seterr, navigate) => {
  axios
    .post(
      `${REACT_APP_API_URI}/api/v1/blog/addpost`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
      { withCredentials: true }
    )
    .then((res) => {
      // //console.log(res);
      navigate(`/blog/${res.data.data.slug}`);
      seterr("New Post Added");
    })
    .catch((err) => {
      ////console.log(err);
      seterr("Error in Addin post");
    });
};

export const updatePost = (pId, body, seterr, navigate) => {
  axios
    .put(
      `${REACT_APP_API_URI}/api/v1/blog/post/edit/${pId}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
      { withCredentials: true }
    )
    .then((res) => {
      ////console.log(res);
      seterr("post succesfully added");
      navigate(`/blog/${res.data.data.slug}`);
    })
    .catch((err) => {
      ////console.log(err);
      //navigate("/404");
      seterr("You Have No Rights to Update Post ");
    });
};

export const deletePost = (pId, seterr, navigate) => {
  console.log(accessToken);
  axios
    .delete(
      `${REACT_APP_API_URI}/api/v1/blog/post/delete/${pId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      { withCredentials: true }
    )
    .then((res) => {
      ////console.log(res);
      navigate("/");
    })
    .catch((err) => {
      ////console.log(err);
      //navigate("/404");
      seterr("You Have No Rights to Delete Post ");
    });
};
