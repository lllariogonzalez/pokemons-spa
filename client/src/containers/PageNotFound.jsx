import React from "react";
import { useHistory } from "react-router-dom";
import error from "../images/404-error-pokegif.gif";

const PageNotFound = () => {

  const history = useHistory();

  return (
    <div style={{color:"#fff"}}>
      <img style={{maxWidth: "40vh"}} src={error} alt="image/gif not found 404"/>
      <h1>404 PAGE NOT FOUND</h1>
      <p>You seem to be lost, shall we go back home?</p>
      <button onClick={()=>history.replace("/home")}>HOME</button>
    </div>
  )
};

export default PageNotFound;