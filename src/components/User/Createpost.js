import React from "react";
import Editor from "./Editor";

const Createpost = () => {
  const data = {
    title: "",
    slug: "",
    description: "",
    new: true,
    pId: " ",
  };
  return <Editor data={data} />;
};

export default Createpost;
