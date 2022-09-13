import axios from "axios";
import {Typography ,Box ,Grid} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea ,Button } from '@mui/material';
import {Link} from "react-router-dom";
import {useState ,useEffect} from 'react';

export default function  UploadCourses({userid}) {

            let [users, setUsers] = useState([]);
            let [courses, setCourses] = useState([])
            
                useEffect( ()=>{
                    
                    async function fetchUsers() {
                        let resp = await axios.get('/allUsers');
                        setUsers(resp.data);
                    }
                    fetchUsers();
                    
                }, []);

                useEffect(()=>{
                    async function loadCourses(){
                        let resp = await axios.get('/allCourses');
                        setCourses(resp.data);
                    }
                    loadCourses();
                    }, [])
            
            let   user = users.filter( user=> user._id == userid) ;
              
            let enrollCourse=  user.map(course => {
                return ( course.enrolledCourses ) 
            })

        //   let  enrollCourse=enrollCourseArray[0]
           
             console.log(user)
            //  console.log( enrollCourse)

            let   course = courses.filter( course=> course.userID == userid) ;
            
            let customCss={
                marginLeft: "15px",
                marginTop: "40px",

            }

    return(
        <>
        <Typography   variant="h4" component ="h2" > 
              <p  className="h"> Enrolled Courses  </p> 
            </Typography>
         <div className="UserProfileCourse" >

               { enrollCourse.map(courses => {
              return (
                courses.map(course => {
                    return(
                <div className="MyCourses" >
          <Card   sx={{ maxWidth: 300 }}>
            <CardActionArea>
              <Link to={`/CourseDetail${course._id}`}>
              <CardMedia
                component="img"
                height="140"
                image={course.courseImage}
                alt="green iguana"
              />
              </Link>
              {/* <Button variant="contained" onClick={async()=>{

                    let resp = await axios.delete(`/delete-course/${course._id}`)
                      
                    window.location.reload(true);

                 }}>Delete</Button> */}
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
                    )})
                );
            })}     
            </div>
       </>
    )
    }