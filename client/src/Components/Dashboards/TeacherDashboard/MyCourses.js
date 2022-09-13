import React,{useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea ,Button } from '@mui/material';
import axios from "axios";
import {useSelector} from  'react-redux';
import {useState} from "react";
import {Link} from "react-router-dom";

export default function  MyCourses() {
  
        let [courses, setCourses] = useState([])
  
        let user = useSelector((store)=>{
              return store.userReducer.currentUser;
            })
        

            
            
            let   course = courses.filter( course=> course.userID == user._id) ;
            useEffect(()=>{
              async function loadCourses(){
                  let resp = await axios.get('/allCourses');
                  setCourses(resp.data);
                }
                loadCourses();
              }, [course])
            
         

            let state = useSelector((store)=>{
              return store.userReducer.state;
        });
       

    return(
        state =="loaded" ? 
        <div  className="MyCourses" > 
        {course.map(course => {
              return (
                <div >
          <Card   sx={{ maxWidth: 280 ,marginBottom:3 }}>
            <CardActionArea  >
              <Link  to={`/CourseDetail${course._id}`}>
              <CardMedia
                component="img"
                height="140"
                image={course.courseImage}
                alt="green iguana"
              />
              </Link>
              <Button variant="contained" onClick={async()=>{

                let resp = await axios.delete(`/delete-course/${course._id}`)
                   

                }}>Delete</Button>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {course.courseName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.description.slice(0,135)}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
                </div>
              );
            })}
            </div>
   : null
   
    ) 
}



              //  setMyCourses(course);
  
               
              // console.log(course.length)
  
              // useEffect(()=>{
              //   async function loadCourses(){
              //     if(user){
              //       console.log(user)
              //       console.log(user._id)
                  
              //           let resp = await axios.get('/userCourses?userid='+user._id )
              //             // setMyCourses(resp.data);
              //             console.log(resp.data)
              //    }
              //     }
              //     loadCourses();
              //   }, [])
  
  
          //     if(user){
          //     console.log(user)
          //     console.log(user._id)
            
          //         let resp =  axios.get('/userCourses?userid='+user._id )
          //           // setMyCourses(resp.data);
          //           console.log(resp.data)
          //  }
         
          //  console.log(myCourses)