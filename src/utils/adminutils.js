import axios from "axios";

export const PostState = async (state, setdata,setloader,page,limit) => {
  axios
    .post(`${process.env.REACT_APP_API_URL}/api/v1/admin/post/${state}?page=${page}&limit=${limit}`,{}, { withCredentials: true })
    .then((res) => {setdata(res.data.data); setloader(true)})
    .catch();
};

export const PostStateChanged = async (s,_id) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/admin/publish?_id=${_id}&state=${s}`,{}, { withCredentials: true })
      .then((res) => {window.location.reload();})
      .catch();
  };
  

  export const Alltheusers = async (setdata) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/admin/allusers`,{}, { withCredentials: true })
      .then((res) => {setdata(res.data.data)
       })
      .catch();
  };
  
