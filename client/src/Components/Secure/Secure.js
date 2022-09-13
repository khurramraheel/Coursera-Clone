import React from "react"
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export  function  SecureTeacherRoutes(props) {
   let reducer = useSelector((store) => {
      return store.userReducer;
    });
  
    return reducer.state == "loaded" ? (
      localStorage.getItem("someToken") && reducer.currentUser.userType == "Teacher" ? (
        props.children
      ) : reducer.currentUser.userType != "Teacher" ? (
        <Navigate to="/" />
      ) : (
        <Navigate to="/" />
      )
    ) : reducer.state == "session_failed" ? (
      <Navigate to="/" />
    ) : null;

}



export function  SecureAdminRoutes(props) {
  let reducer = useSelector((store) => {
    return store.userReducer;
  });

  return reducer.state == "loaded" ? (
    localStorage.getItem("someToken") && reducer.currentUser.userType == "Admin" ? (
      props.children
    ) : reducer.currentUser.userType != "admin" ? (
      <Navigate to="/" />
    ) : (
      <Navigate to="/" />
    )
  ) : reducer.state == "session_failed" ? (
    <Navigate to="/" />
  ) : null;
};

export function  SecureStudentRoutes(props) {
   let reducer = useSelector((store) => {
     return store.userReducer;
   });
 
   return reducer.state == "loaded" ? (
     localStorage.getItem("someToken") && reducer.currentUser.userType == "Student" ? (
       props.children
     ) : reducer.currentUser.userType != "Student" ? (
       <Navigate to="/" />
     ) : (
       <Navigate to="/" />
     )
   ) : reducer.state == "session_failed" ? (
     <Navigate to="/" />
   ) : null;
 };
