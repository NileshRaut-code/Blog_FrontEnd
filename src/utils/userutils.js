import axios from "axios";
import { login, logout } from "./userSlice.js";

export const Currentuser = async (dispatch) => {
  try {
    console.log("called 1");
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/users/current-user`,
      {
        withCredentials: true,
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
  }
  return true;
};

export const Loginuser = (
  dispatch,
  navigate,
  seterrmsg,
  email,
  password,
  setLoading
) => {
  const data = {
    email: email?.current?.value,
    password: password?.current?.value,
  };
  const body = JSON.stringify(data);
  console.log(email?.current?.value, password?.current?.value);

  axios
    .post(`${process.env.REACT_APP_API_URL}/api/v1/users/login`, body, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log(res);

      dispatch(login(res.data.data.user));
      navigate("/");
    })
    .catch((err) => {
      setLoading(false);
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

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // Set withCredentials at the instance level
});

// Use the configured instance to make requests
export const Logoutuser = (dispatch, navigate) => {
  console.log("logout kar rahe he");
  axiosInstance
    .delete("/api/v1/users/logout")
    .then((res) => {
      console.log(res);
      dispatch(logout());
      navigate("/");
    })
    .catch((err) => navigate("/"));
};

export const Signupuser = (dispatch, navigate, seterrmsg, body, setLoading) => {
  console.log("called 1");
  axios
    .post(`${process.env.REACT_APP_API_URL}/api/v1/users/register`, body, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log(res);
      dispatch(login(res.data.data));
      navigate("/");
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
      console.log(err.response);
      if (err.response.status === 409)
        seterrmsg("User With Email or Username is already Existed");
    });
};

export const getPostdata = async (slug) => {
  console.log(slug);
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/blog/post/${slug}`
    );
    console.log(data);
    if (!data) {
      throw new Error("not Existed Post");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const addPost = async (body, seterr, navigate) => {
  axiosInstance
    .post("/api/v1/blog/addpost", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
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
  axiosInstance
    .put(`/api/v1/blog/post/edit/${pId}`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res);
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
  axiosInstance
    .delete(`/api/v1/blog/post/delete/${pId}`)
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

export const fetchData = async (navigate, slug, setPostdata) => {
  try {
    const postDataResult = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/blog/post/${slug}`
    );
    setPostdata(postDataResult);
  } catch (error) {
    console.error("Error fetching post data:", error.response.status);
    navigate("/404");
  }
};

export const userProfile = async (username, setuserProfiledata, navigate) => {
  try {
    const postDataResult = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/blog/author/${username}`
    );
    setuserProfiledata(postDataResult.data.data);
  } catch (error) {
    console.error("Error fetching post data:", error.response.status);
    navigate("/404");
  }
};
