import axios from "axios";

export const PostState = async (state, setdata,setloader) => {
  axios
    .post(`${process.env.REACT_APP_API_URL}/api/v1/admin/post/${state}`,{}, { withCredentials: true })
    .then((res) => {setdata(res.data.data); setloader(true)})
    .catch((err) => console.log(err));
};

export const PostStateChanged = async (s,_id) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/admin/publish?_id=${_id}&state=${s}`,{}, { withCredentials: true })
      .then((res) => {window.location.reload();})
      .catch((err) => console.log(err));
  };
  
