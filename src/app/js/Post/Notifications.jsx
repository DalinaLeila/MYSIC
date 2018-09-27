import React, { Component } from "react";
import api from "../utils/api";

import { Link } from "react-router-dom";
import { DropdownItem } from "reactstrap";



const Notifications = props =>  {
 

 
    let notePosts = props.list.map((post, index) => {

      return (
        <DropdownItem key={index}>
          <img
            src={post.profilePicture}
            width="50px"
            className="profilePicture"
          />
          <Link to={`profile/${post.othersName}`}> {post.othersName}</Link>{" "}
          {post.kind}s you
          {post.postId && "r post"}
        </DropdownItem>
      );
    });
    return <div>{notePosts}</div>;
  }


export default Notifications;
