import React,{useEffect} from "react"
import EnrolledCourses from "./EnrolledCourses"
import {useParams} from 'react-router-dom'
export default function  StudentDashboard() {

   let {id} = useParams();
   useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
   return(
        <>
        <div className="Addcourse">
              <h1 id="myhead"> Courses Enrolled </h1>
             
               <EnrolledCourses id={id} />
        </div>
          </>
   )

}