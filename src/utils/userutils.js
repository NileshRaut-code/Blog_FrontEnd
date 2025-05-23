import axios from "axios";
import { login, logout } from "./userSlice.js";

export const Currentuser = async (dispatch) => {
  try {
    //console.log("called 1");
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/users/current-user`,
      {
        withCredentials: true,
      }
    );

    if (res) {
      //console.log(res);
      dispatch(login(res.data.data));
      //console.log("called 2");
    } else {
      //console.log("logging out called");
      dispatch(logout());
      //console.log("called");
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
  //console.log(email?.current?.value, password?.current?.value);

  axios
    .post(`${process.env.REACT_APP_API_URL}/api/v1/users/login`, body, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((res) => {
      //console.log(res);

      dispatch(login(res.data.data.user));
      if(!res.data.data.user.isVerified){navigate("/verify")}
      else{
        navigate("/");
      }
    })
    .catch((err) => {
      setLoading(false);
     
      seterrmsg(err.response?.data?.message);
    });
};



export const GoogleLoginuser = (
  dispatch,
  navigate,
  seterrmsg,
  setLoading,credentialResponse
) => {
      const token = credentialResponse.credential;
      setLoading(true)
     // console.log(token);
  axios
    .post(`${process.env.REACT_APP_API_URL}/api/v1/users/google-login`, {token}, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((res) => {
      //console.log(res);
      dispatch(login(res.data.data.user));
      navigate("/");
    })
    .catch((err) => {
      setLoading(false);
      //console.log(err.response.statusText);
      seterrmsg(err.response?.data?.message);
    });
};

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // Set withCredentials at the instance level
});

// Use the configured instance to make requests
export const Logoutuser = (dispatch, navigate) => {
  //console.log("logout kar rahe he");
  axiosInstance
    .delete("/api/v1/users/logout")
    .then((res) => {
      //console.log(res);
      dispatch(logout());
      navigate("/");
    })
    .catch((err) => navigate("/"));
};

export const Signupuser = (dispatch, navigate, seterrmsg, body, setLoading) => {
  //console.log("called 1");
  axios
    .post(`${process.env.REACT_APP_API_URL}/api/v1/users/register`, body, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((res) => {
      //console.log(res);
      dispatch(login(res.data.data));
      navigate("/verify");
    })
    .catch((err) => {
      //console.log(err);
      setLoading(false);
      //console.log(err.response);
      seterrmsg(err.response?.data?.message);
    });
};

export const getPostdata = async (slug) => {
  //console.log(slug);
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/blog/post/${slug}`
    );
    //console.log(data);
    if (!data) {
      throw new Error("not Existed Post");
    }
  } catch (err) {
    //console.log(error.message);
    //seterrmsg(err.response?.data?.message);
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
      // ////console.log(res);
      seterr("Post Created Successfully");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    })
    .catch((err) => {
      //////console.log(err);
      seterr(err.response?.data?.message);
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
      //console.log(res);
      seterr("post succesfully added");
      navigate(`/blog/${res.data.data.slug}`);
    })
    .catch((err) => {
      //////console.log(err);
      //navigate("/404");
      seterr(err.response?.data?.message);
    });
};

export const deletePost = (pId, seterr, navigate) => {
  axiosInstance
    .delete(`/api/v1/blog/post/delete/${pId}`)
    .then((res) => {
      //////console.log(res);
      navigate("/");
    })
    .catch((err) => {
      //////console.log(err);
      //navigate("/404");
      seterr(err.response?.data?.message);
    });
};

export const fetchData = async (navigate, slug, setPostdata) => {
  try {
    const postDataResult = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/blog/post/${slug}?state=update`
    );
    setPostdata(postDataResult);
  } catch (err) {
    navigate("/404");
  }
};

export const GoogleSignUser = async (
  data,
  dispatch,
  navigate,
  setClicked,
  setError
) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/users/google-signup`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(login(response.data.checkuser));
    setClicked(false);
    setTimeout(() => {
      navigate("/verify");
    }, 10);
  } catch (err) {
    setClicked(false);
    setError(err.response.data?.message);
  }
};

export const userProfile = async (username, setuserProfiledata, navigate) => {
  try {
    const postDataResult = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/blog/author/${username}`
    );
    setuserProfiledata(postDataResult.data.data);
  } catch (err) {
    navigate("/404");
  }
};

export const verifyUser =(dispatch,navigate,otpCode,seterrmsg)=>{
  axiosInstance
    .post(`${process.env.REACT_APP_API_URL}/api/v1/users/verifyotp`, {code:otpCode},{
      headers: {
        "Content-Type": "application/json",
      },
     
    })
    .then((res) => {
      //console.log(res);
      dispatch(login(res.data.data.user));
      seterrmsg("OTP Verfied succesfully")
      navigate("/");
    }).catch((err)=>{
      seterrmsg(err.response?.data?.message);
    })
}
export const resendOtp =(seterrmsg)=>{
  axiosInstance
  .post(`${process.env.REACT_APP_API_URL}/api/v1/users/reset-otp`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((res) => {
    //console.log(res);
    seterrmsg("OTP SEND succesfully")
    
  }).catch((err)=>{
    // console.log(err.response.status);
    seterrmsg(err.response?.data?.message);
    
  })
}


export const changedPassword =(setErrorMsg,body,setLoading)=>{
  axiosInstance
  .post(`${process.env.REACT_APP_API_URL}/api/v1/users/changed-password`, body,{
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((res) => {
    //console.log(res);
    setErrorMsg("Password Changed Succesfully")
  
  }).catch((err)=>{
    
      setErrorMsg(err.response?.data?.message)
    
    
  }).finally(()=>{
    setLoading(false)
  })
}


export const summaryStat =(settotalpost,settotalViews)=>{
  axiosInstance
  .get(`${process.env.REACT_APP_API_URL}/api/v1/users/stat-summary`, {},{
    
  })
  .then((res) => {
    const {totalViews,totalpost}=res.data.data
    settotalViews(totalViews)
    settotalpost(totalpost)
  
  }).catch((err)=>{
    settotalViews(0)
    settotalpost(0)
  
    
    
  })}
